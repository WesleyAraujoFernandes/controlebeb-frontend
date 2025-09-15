import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasService, Category } from '../../core/categorias.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  excluir(categoria: Category) {
    if (!categoria.id) return;
    if (
      !confirm(
        `Tem certeza que deseja excluir a categoria "${categoria.description}"?`
      )
    )
      return;

    this.categoriasService.excluir(categoria.id).subscribe({
      next: () => {
        // Remove da lista local
        this.categorias = this.categorias.filter((c) => c.id !== categoria.id);

        // Exibe toast de sucesso
        this.successMessage = `Categoria "${categoria.description}" excluída com sucesso!`;
        this.showSuccessToast = true;
        setTimeout(() => (this.showSuccessToast = false), 5000); // auto-hide
      },
      error: (err) => {
        const backendMsg = err.error || 'Erro ao excluir a categoria.';
        this.errorMessage = `Não foi possível excluir a categoria "${categoria.description}"`;
        this.showErrorToast = true;
        setTimeout(() => (this.showErrorToast = false), 5000); // auto-hide
      },
    });
  }
}
