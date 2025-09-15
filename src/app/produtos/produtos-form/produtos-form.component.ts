import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoriasService } from '../../core/categorias.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit {
  produtos: Product[] = [];
  categorias: Category[] = [];
  form!: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  produtoId?: number;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      minimumStock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required] // ainda usamos no form
    });

    // carrega categorias para o select
    this.categoriasService.listar().subscribe({
      next: (cats) => (this.categorias = cats),
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    // monta objeto do jeito que o backend espera
    const product: Product = {
      id: undefined,
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      quantity: formValue.quantity,
      minimumStock: formValue.minimumStock,
      category: { id: formValue.categoryId }
    };

    this.productsService.salvar(product).subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: (err) => console.error('Erro ao salvar o produto:', err)
    });
  }
}
