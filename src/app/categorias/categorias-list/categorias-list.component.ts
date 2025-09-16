import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category, CategoriasService } from '../../services/categorias.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent],
  templateUrl: './categorias-list.component.html',
})
export class CategoriasListComponent implements OnInit {
  categorias: Category[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  /* Toast */
  showSuccessToast = false;
  showErrorToast = false;
  successMessage = '';
  errorMessage = '';

  /* Controle do modal */
  categoriaSelecionadaId: number | null = null;
  mostrarConfirmacao = false;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.loading = true;
    this.errorMsg = '';

    this.categoriasService.listar().subscribe({
      next: (data) => {
        this.categorias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Erro ao carregar categorias.';
        this.loading = false;
      },
    });
  }

  abrirConfirmacao(id: number): void {
    this.categoriaSelecionadaId = id;
    this.mostrarConfirmacao = true;
  }

  excluirConfirmado() {
    if (!this.categoriaSelecionadaId) return;
    this.categoriasService.excluir(this.categoriaSelecionadaId).subscribe({
      next: () => {
        this.successMsg = 'Categoria excluída com sucesso!';
        this.carregarCategorias(), this.limparMensagens();
        this.fecharModal();
      },
      error: (err) => {
        this.errorMessage = 'Não foi possível excluir a categoria. ', err;
        //this.errorMsg = 'Erro ao excluir a categoria';
        this.limparMensagens();
        this.fecharModal();
        this.showErrorToast = true;
        setTimeout(() => (this.showErrorToast = false), 5000); // auto-hide
      },
    });
  }
  fecharModal(): void {
    this.mostrarConfirmacao = false;
    this.categoriaSelecionadaId = null;
  }
  private limparMensagens(): void {
    setTimeout(() => {
      this.successMsg = '';
      this.errorMsg = '';
    }, 3000);
  }
}
