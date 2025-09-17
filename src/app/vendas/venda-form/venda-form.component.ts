import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { SaleItemDTO } from '../../models/sale-item-dto';
import { ProductsService } from '../../services/products.service';
import { SaleService } from '../../services/sale.service';
import { SaleDTO } from '../../models/sale-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [FormsModule, NgFor, DecimalPipe, CommonModule],
  templateUrl: './venda-form.component.html',
  styleUrl: './venda-form.component.scss',
})
export class VendaFormComponent implements OnInit {
  customers: Customer[] = [];
  products: Product[] = [];

  saleItems: SaleItemDTO[] = [];
  selectedCustomerId?: number;
  selectedProductId?: number;
  quantity = 1;
  desconto = 0;

  totalBruto = 0;
  totalLiquido = 0;

  constructor(
    private customerService: CustomerService,
    private productsService: ProductsService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.customerService.listar().subscribe((data) => (this.customers = data));
    this.productsService.listar().subscribe((data) => (this.products = data));
  }

  adicionarItem(): void {
    if (!this.selectedProductId || this.quantity <= 0) return;

    const product = this.products.find((p) => p.id == this.selectedProductId);
    if (!product) return;

    const existing = this.saleItems.find((i) => i.productId == product.id);

    if (existing) {
      existing.quantity += this.quantity;
      existing.subtotal = (existing.quantity * (product.price || 0));
    } else {
      this.saleItems.push({
        productId: product.id!,
        quantity: this.quantity,
        price: product.price,
        subtotal: product.price * this.quantity,
        description: product.description
      });
    }

    this.atualizarTotais();
    this.quantity = 1;
  }

  removerItem(productId: number): void {
    this.saleItems = this.saleItems.filter((i) => i.productId !== productId);
    this.atualizarTotais();
  }

  atualizarTotais(): void {
    this.totalBruto = this.saleItems.reduce(
      (acc, item) => acc + (item.subtotal || 0),
      0
    );
    this.totalLiquido = this.totalBruto - this.desconto;
  }

  finalizarVenda(): void {
    if (!this.selectedCustomerId || this.saleItems.length === 0) return;

    const sale: SaleDTO = {
      customerId: this.selectedCustomerId,
      desconto: this.desconto,
      totalBruto: this.totalBruto,
      totalLiquido: this.totalLiquido,
      items: this.saleItems,
    };

    this.saleService.criarVenda(sale).subscribe({
      next: (res) => {
        alert('Venda criada com sucesso!');
        this.saleItems = [];
        this.selectedCustomerId = undefined;
        this.desconto = 0;
        this.atualizarTotais();
      },
      error: (err) => console.error(err),
    });
  }
  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : '';
  }

}
/*
export class VendaFormComponent implements OnInit {
  customers: Customer[] = [];
  products: Product[] = [];

  saleItems: SaleItemDTO[] = [];
  selectedCustomerId?: number;
  selectedProductId?: number;
  quantity = 1;
  desconto = 0;
  saleId?: number;

  constructor(
    private customerService: CustomerService,
    private productsService: ProductsService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.customerService.listar().subscribe(data => this.customers = data);
    this.productsService.listar().subscribe(data => this.products = data);
  }

  adicionarItem(): void {
    if (!this.selectedProductId || this.quantity <= 0) return;

    const existing = this.saleItems.find(i => i.productId === this.selectedProductId);
    if (existing) {
      existing.quantity += this.quantity;
    } else {
      this.saleItems.push({ productId: this.selectedProductId, quantity: this.quantity });
    }
  }

  finalizarVenda(): void {
    if (!this.selectedCustomerId || this.saleItems.length === 0) return;

    const sale: SaleDTO = {
      customerId: this.selectedCustomerId,
      items: this.saleItems
    };

    this.saleService.criarVenda(sale).subscribe({
      next: res => {
        this.saleId = res.id;
        alert('Venda criada com sucesso!');
      },
      error: err => console.error(err)
    });
  }

  adicionarItemEmVendaAberta(): void {
    if (!this.saleId || !this.selectedProductId) return;

    this.saleService
      .addItem(this.saleId, this.selectedProductId, this.quantity)
      .subscribe({
        next: (res) => {
          this.saleItems = res.items;
        },
        error: (err) => console.error(err),
      });
  }
}
*/
