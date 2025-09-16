import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Customer, CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getAll().subscribe(data => this.customers = data);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.customersService.delete(id).subscribe(() => this.loadCustomers());
    }
  }
}
