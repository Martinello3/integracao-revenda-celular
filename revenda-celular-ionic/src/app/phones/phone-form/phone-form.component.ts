import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, priceMask, maskitoElement, parseDateMask, formatDateMask, parseNumberMask, formatNumberMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { PhoneService } from '../services/phone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/brands/services/brand.service';
import { Brand } from 'src/app/brands/models/brand.type';
import { ToastController } from '@ionic/angular';
import { maskitoParseNumber, maskitoStringifyNumber } from '@maskito/kit';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
  standalone: false,
})
export class PhoneFormComponent implements OnInit {

  dateMask = dateMask;
  priceMask = priceMask;
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
      Validators.required, Validators.minLength(3), Validators.maxLength(150)
    ]),
    image: new FormControl('', [
      Validators.required,
      ApplicationValidators.urlValidator
    ]),
    releaseDate: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    brands: new FormControl('', Validators.required)
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
      this.phoneService.getById(phoneId).subscribe({
        next: (phone) => {
          if (phone) {
            this.phoneId = phoneId;
            if (phone.releaseDate instanceof Date) {
              phone.releaseDate = formatDateMask(phone.releaseDate);
            }
            if (typeof phone.releaseDate === 'string') {
              const parsedDate = parseDateMask(phone.releaseDate, 'yyyy/mm/dd');
              if (parsedDate) {
                phone.releaseDate = formatDateMask(parsedDate);
              }
            }
            if (phone.price && typeof phone.price === 'number') {
              phone.price = formatNumberMask(phone.price);
            }
            this.phoneForm.patchValue(phone);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o celular com id ' + phoneId)
          console.error(error);
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
        alert('Erro ao carregar marcas.');
        console.error(error)
      }
    });
  }

  compareWith(o1: Brand | null, o2: Brand | null): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  hasError(field: string, error: string) {
    const formControl = this.phoneForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.phoneForm;
    if (value.releaseDate) {
      const parsedDate = parseDateMask(value.releaseDate);
      if (parsedDate) {
        value.releaseDate = parsedDate;
      }
    }
    if (value.price) {
      value.price = parseNumberMask(value.price);
    }
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
        alert('Erro ao salvar o celular ' + value.model + '!');
        console.error(error);
      }
    });
  }
}
