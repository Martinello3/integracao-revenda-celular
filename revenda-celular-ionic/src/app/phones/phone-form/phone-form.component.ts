import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, maskitoElement, parseDateMask, formatDateMask } from '../../core/constants/mask.constants';
import { ApplicationValidators } from '../../core/validators/url.validator';
import { PhoneService } from '../services/phone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../brands/services/brand.service';
import { Brand } from '../../brands/models/brand.type';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
  standalone: false,
})
export class PhoneFormComponent implements OnInit {

  dateMask = dateMask;
  maskitoElement = maskitoElement;
  
  // Lista de categorias predefinidas em português do Brasil
  categories: string[] = [
    'Smartphone', 
    'Celular Básico', 
    'Premium', 
    'Intermediário', 
    'Entrada', 
    'Gamer', 
    'Corporativo', 
    'Resistente'
  ];

  phoneForm: FormGroup = new FormGroup({
    model: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150),
      ApplicationValidators.phoneModelValidator
    ]),
    image: new FormControl('', [
      Validators.required,
      ApplicationValidators.urlValidator
    ]),
    releaseDate: new FormControl('', [ApplicationValidators.releaseDateValidator]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      ApplicationValidators.phonePriceValidator
    ]),
    category: new FormControl('', Validators.required),
    brandId: new FormControl(null, Validators.required),
    stock: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
      ApplicationValidators.phoneStockValidator
    ])
  });
  phoneId!: number;
  brands: Brand[] = []

  constructor(
    private phoneService: PhoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private toastController: ToastController
  ) {
    const phoneId = this.activatedRoute.snapshot.params['id'];
    if (phoneId) {
      this.phoneService.getById(+phoneId).subscribe({
        next: (phone) => {
          if (phone) {
            this.phoneId = +phoneId;
            if (phone.releaseDate instanceof Date) {
              phone.releaseDate = formatDateMask(phone.releaseDate);
            }
            if (typeof phone.releaseDate === 'string') {
              const parsedDate = parseDateMask(phone.releaseDate, 'yyyy/mm/dd');
              if (parsedDate) {
                phone.releaseDate = formatDateMask(parsedDate);
              }
            }
            // Tratar preço como number
            let priceValue = 0;
            if (phone.price) {
              if (typeof phone.price === 'number') {
                priceValue = phone.price;
              } else if (typeof phone.price === 'string') {
                priceValue = parseFloat(phone.price) || 0;
              }
            }

            // Usar brandId em vez de brands
            this.phoneForm.patchValue({
              model: phone.model,
              image: phone.image,
              releaseDate: phone.releaseDate,
              price: priceValue,
              category: phone.category,
              brandId: phone.brandId,
              stock: phone.stock || 0
            });
          }
        },
        error: (error) => {
          console.error('Erro ao carregar celular', error);
          this.toastController.create({
            message: 'Erro ao carregar o celular com id ' + phoneId,
            duration: 3000,
            color: 'danger'
          }).then(toast => toast.present());
        }
      });
    }
  }
  ngOnInit() {
    this.brandService.getBrands().subscribe({
      next: (data: Brand[]) => {
        console.log('brands: ', data);
        this.brands = data;
      },
      error: (error) => {
        console.error('Erro ao carregar marcas', error);
        this.toastController.create({
          message: 'Erro ao carregar marcas',
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  compareWith(o1: number | null, o2: number | null): boolean {
    return o1 === o2;
  }




  save() {
    let { value } = this.phoneForm;
    if (value.releaseDate) {
      const parsedDate = parseDateMask(value.releaseDate);
      if (parsedDate) {
        value.releaseDate = parsedDate;
      }
    }
    // Garantir que o preço seja number
    value.price = Number(value.price) || 0;
    // Garantir que brandId seja number
    if (value.brandId) {
      value.brandId = +value.brandId;
    }
    // Garantir que o estoque seja number
    value.stock = Number(value.stock) || 0;
    console.log(value);
    this.phoneService.save({
      ...value,
      id: this.phoneId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Celular salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/phones']);
      },
      error: (error) => {
        let errorMessage = 'Erro ao salvar o celular ' + value.model + '!';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error('Erro ao salvar o celular', error);
        this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.phoneForm.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }

}
