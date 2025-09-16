import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomersService, Customer } from '../customers.service';

@Component({
  selector: 'app-customers-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.scss'
})
export class CustomersFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  customerId?: number;

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });

    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customerId) {
      this.isEdit = true;
      this.customersService.getById(this.customerId).subscribe(c => this.form.patchValue(c));
    }
  }

  salvar(): void {
    if (this.form.invalid) return;

    const customer: Customer = this.form.value;

    const request$ = this.isEdit
      ? this.customersService.update(this.customerId!, customer)
      : this.customersService.create(customer);

    request$.subscribe(() => this.router.navigate(['/clientes']));
  }
}
