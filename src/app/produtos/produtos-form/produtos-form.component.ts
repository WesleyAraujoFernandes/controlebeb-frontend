import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriasService, Category } from '../../services/categorias.service';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss'],
})
export class ProdutosFormComponent implements OnInit {
  //produtos: Product[] = [];
  categorias: Category[] = [];
  produtoForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  produtoId?: number;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriasService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produtoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      minimumStock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required], // ainda usamos no form
    });
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.produtoId = paramId ? Number(paramId) : undefined; // 👈 evita cair em 0

    if (this.produtoId) {
      this.carregarProduto(this.produtoId);
    }

    this.categoriasService.listar().subscribe({
      next: (cats) => (this.categorias = cats),
      error: (err) => console.error('Erro ao carregar categorias:', err),
    });
  }

  carregarProduto(id: number) {
    this.loading = true;
    this.productsService.buscarPorId(id).subscribe({
      next: (data) => {
        this.produtoForm.patchValue({
          id: data.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          minimumStock: data.minimumStock,
          description: data.description,
          categoryId: data.category?.id,
        });
        this.loading = false;
        console.log('category:' + data.category.description);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Erro ao carregar produto.';
        this.loading = false;
      },
    });
  }

  salvar(): void {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }

    const formValue = this.produtoForm.value;
    const product: Product = {
      id: this.produtoId, // só vem preenchido se edição
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      quantity: formValue.quantity,
      minimumStock: formValue.minimumStock,
      category: { id: formValue.categoryId },
    };

    console.log('Id do produto ao salvar:', this.produtoId);

    this.loading = true;

    const request$ =
      this.produtoId && this.produtoId > 0 // 👈 garante que só PUT se id > 0
        ? this.productsService.atualizar(this.produtoId, product)
        : this.productsService.salvar(product);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/produtos']);
      },
      error: (err) => {
        console.error('Erro ao salvar/atualizar produto:', err);
        this.loading = false;
      },
    });
  }

}
