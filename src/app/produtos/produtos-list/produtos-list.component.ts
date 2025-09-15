import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produtos-list.component.html',
  styleUrl: './produtos-list.component.scss'
})
export class ProdutosListComponent {
  /*
  produtos = [
    { id: 1, nome: 'Cerveja', preco: 8.5, estoque: 50 },
    { id: 2, nome: 'Refrigerante', preco: 5.0, estoque: 30 },
    { id: 3, nome: 'Água', preco: 3.0, estoque: 100 }
  ];
} */
  produtos: Product[] = [];
  loading = true;
  errorMsg = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit():void {
    this.productsService.listar().subscribe({
      next: (res) => {
        this.produtos = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:',err);
        this.errorMsg = 'Erro ao carregar produtos.';
        this.loading = false;
      }
    })
  }
}
