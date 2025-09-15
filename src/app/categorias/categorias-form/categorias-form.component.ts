import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriasService, Category } from '../../core/categorias.service';

@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categorias-form.component.html'
})
export class CategoriasFormComponent implements OnInit {
  categoriaForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  categoriaId?: number;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoriaId) {
      this.carregarCategoria(this.categoriaId);
    }
  }

  carregarCategoria(id: number) {
    this.loading = true;
    this.categoriasService.buscarPorId(id).subscribe({
      next: (data) => {
        this.categoriaForm.patchValue({id: data.id, description: data.description});
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Erro ao carregar categoria.';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    if (this.categoriaId) {
      this.categoriasService.atualizar(this.categoriaId, this.categoriaForm.value).subscribe({
        next: () => {
          this.successMsg = 'Categoria atualizada com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/categorias']), 1000);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Erro ao atualizar categoria.';
          this.loading = false;
        }
      });
    } else {
      this.categoriasService.salvar(this.categoriaForm.value).subscribe({
        next: () => {
          this.successMsg = 'Categoria cadastrada com sucesso!';
          this.categoriaForm.reset();
          this.loading = false;
          setTimeout(() => this.router.navigate(['/categorias']), 1000);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Erro ao salvar a categoria.';
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.categoriaForm.controls;
  }
}
