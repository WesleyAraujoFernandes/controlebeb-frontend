import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../core/categorias.service';
import { ProductsService } from '../../services/products.service';
import { CategoriasService } from '../../core/categorias.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.scss'
})
export class ProdutosFormComponent implements OnInit {
  form!: FormGroup;
  categorias: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity:[0, Validators.required, Validators.min(1)],
      minimumStock:[0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    })
    this.categoriasService.listar().subscribe(cats => this.categorias = cats);
  }

  salvar():void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const product: Product = this.form.value;
    this.productsService.salvar(product).subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: (err) => console.error('Erro ao salvar o produto:', err)
    })
  }
}
