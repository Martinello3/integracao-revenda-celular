import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CustomerService } from '../services/customer.service';
import { dateMask, phoneMask, maskitoElement, parseDateMask, formatDateMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  standalone: false,
})
export class CustomerFormComponent implements OnInit {
  dateMask = dateMask;
  phoneMask = phoneMask;
  maskitoElement = maskitoElement;

  customerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    phone: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    customerType: new FormControl('regular', [Validators.required]),
    active: new FormControl(true)
  });

  customerId!: number;
  
  customerTypes = [
    { value: 'regular', label: 'Regular' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP' }
  ];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const customerId = this.activatedRoute.snapshot.params['id'];
    if (customerId) {
      this.customerService.getById(customerId).subscribe({
        next: (customer) => {
          if (customer) {
            this.customerId = customerId;
            
            if (customer.birthDate instanceof Date) {
              customer.birthDate = formatDateMask(customer.birthDate);
            }
            if (typeof customer.birthDate === 'string') {
              const parsedDate = parseDateMask(customer.birthDate, 'yyyy/mm/dd');
              if (parsedDate) {
                customer.birthDate = formatDateMask(parsedDate);
              }
            }
            
            this.customerForm.patchValue(customer);
          }
        },
        error: (error) => {
          console.error('Erro ao carregar o cliente', error);
          this.toastController.create({
            message: 'Erro ao carregar o cliente',
            duration: 3000,
            color: 'danger'
          }).then(toast => toast.present());
        }
      });
    }
  }

  hasError(field: string, error: string) {
    const formControl = this.customerForm.get(field);
    return formControl?.touched && formControl?.errors?.[error];
  }

  save() {
    let { value } = this.customerForm;
    
    if (value.birthDate) {
      const parsedDate = parseDateMask(value.birthDate);
      if (parsedDate) {
        value.birthDate = parsedDate;
      }
    }
    
    this.customerService.save({
      ...value,
      id: this.customerId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Cliente salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Erro ao salvar o cliente', error);
        this.toastController.create({
          message: 'Erro ao salvar o cliente',
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }
}
