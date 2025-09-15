import { Routes } from '@angular/router';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component'; 
import { CategoriasListComponent } from './categorias/categorias-list/categorias-list.component'; 
import { CategoriasFormComponent } from './categorias/categorias-form/categorias-form.component'; 
import { VendasListComponent } from './vendas/vendas-list/vendas-list.component'; 

export const routes: Routes = [
  { path: 'produtos/cadastrar', component: ProdutosListComponent },
  { path: 'produtos/editar/:id', component: ProdutosListComponent },
  { path: 'categorias/cadastrar', component: CategoriasFormComponent },
  { path: 'categorias/editar/:id', component: CategoriasFormComponent },  
  { path: 'categorias', component: CategoriasListComponent },
  { path: 'vendas', component: VendasListComponent },
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
];
