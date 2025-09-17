import { Routes } from '@angular/router';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './produtos/produtos-form/produtos-form.component';
import { CategoriasListComponent } from './categorias/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from './categorias/categorias-form/categorias-form.component';
import { VendasListComponent } from './vendas/vendas-list/vendas-list.component';
import { VendaFormComponent } from './vendas/venda-form/venda-form.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';

export const routes: Routes = [
  // Produtos
  { path: 'produtos/cadastrar', component: ProdutosFormComponent },
  { path: 'produtos/editar/:id', component: ProdutosFormComponent },
  { path: 'produtos', component: ProdutosListComponent },

  // Categorias
  { path: 'categorias/cadastrar', component: CategoriasFormComponent },
  { path: 'categorias/editar/:id', component: CategoriasFormComponent },
  { path: 'categorias', component: CategoriasListComponent },

  // Clientes
  { path: 'clientes/cadastrar', component: CustomersFormComponent },
  { path: 'clientes/editar/:id', component: CustomersFormComponent },
  { path: 'clientes', component: CustomersListComponent },

  // Vendas
  { path: 'vendas/cadastrar', component: VendaFormComponent },
  { path: 'vendas/editar/:id', component: VendaFormComponent },
  { path: 'vendas', component: VendaFormComponent },

  // Default
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
];
