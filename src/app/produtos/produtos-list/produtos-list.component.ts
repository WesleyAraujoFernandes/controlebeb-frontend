import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent],
  templateUrl: './produtos-list.component.html',
  styleUrl: './produtos-list.component.scss',
})
export class ProdutosListComponent implements OnInit {
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
  successMsg = '';
  produtoSelecionadoId: number | null = null;
  mostrarConfirmacao = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }
  carregarProdutos(): void {
    this.productsService.listar().subscribe({
      next: (res) => {
        this.produtos = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        this.errorMsg = 'Erro ao carregar produtos.';
        this.loading = false;
      },
    });
  }
  abrirConfirmacao(id: number): void {
    console.log('abrirConfirmacao:' + id);
    this.produtoSelecionadoId = id;
    this.mostrarConfirmacao = true;
  }
  excluirConfirmado(): void {
    this.productsService.deletar(this.produtoSelecionadoId!).subscribe({
      next: () => {
        this.successMsg = 'Produto excluído com sucesso!';
        this.carregarProdutos(), this.limparMensagens();
        this.fecharModal();
      },
      error: (err) => {
        this.errorMsg = 'Erro ao excluir o produto';
        this.limparMensagens();
        this.fecharModal();
      },
    });
  }
  fecharModal(): void {
    this.mostrarConfirmacao = false;
    this.produtoSelecionadoId = null;
  }
  private limparMensagens(): void {
    setTimeout(() => {
      this.successMsg = '';
      this.errorMsg = '';
    }, 3000);
  }
}
