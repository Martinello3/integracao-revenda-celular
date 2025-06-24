import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CustomerService } from '../services/customer.service';
import { dateMask, phoneMask, maskitoElement, parseDateMask, formatDateMask } from '../../core/constants/mask.constants';

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
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailDomainValidator
    ]),
    phone: new FormControl('', [
      Validators.required,
      this.phoneValidator
    ]),
    birthDate: new FormControl('', [
      Validators.required,
      this.ageValidator
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
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
      this.customerService.getById(+customerId).subscribe({
        next: (customer) => {
          if (customer) {
            this.customerId = +customerId;

            let formattedBirthDate = '';
            if (customer.birthDate instanceof Date) {
              formattedBirthDate = formatDateMask(customer.birthDate);
            } else if (typeof customer.birthDate === 'string') {
              const parsedDate = parseDateMask(customer.birthDate, 'yyyy/mm/dd');
              if (parsedDate) {
                formattedBirthDate = formatDateMask(parsedDate);
              } else {
                formattedBirthDate = customer.birthDate;
              }
            }

            this.customerForm.patchValue({
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              birthDate: formattedBirthDate,
              address: customer.address,
              customerType: customer.customerType,
              active: customer.active
            });
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

  save() {
    let { value } = this.customerForm;

    if (value.birthDate) {
      const parsedDate = parseDateMask(value.birthDate);
      if (parsedDate) {
        value.birthDate = parsedDate;
      }
    }

    console.log('Salvando cliente:', value);

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
        let errorMessage = 'Erro ao salvar o cliente ' + value.name + '!';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error('Erro ao salvar o cliente', error);
        this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.customerForm.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }

  // Validators customizados
  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const email = control.value.toLowerCase();
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const domain = email.split('@')[1];

    if (domain && !allowedDomains.includes(domain)) {
      return { invalidDomain: true };
    }
    return null;
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const phone = control.value.replace(/\D/g, '');
    if (phone.length !== 11) {
      return { invalidPhone: true };
    }
    return null;
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 16) {
      return { tooYoung: true };
    }
    if (age > 120) {
      return { tooOld: true };
    }
    return null;
  }
}
