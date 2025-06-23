import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AccessoryService } from '../services/accessory.service';
import { PhoneService } from 'src/app/phones/services/phone.service';
import { Phone } from 'src/app/phones/models/phone.type';
import { priceMask, maskitoElement, parseNumberMask, formatNumberMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { IonInput, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-accessory-form',
  templateUrl: './accessory-form.component.html',
  styleUrls: ['./accessory-form.component.scss'],
  standalone: false,
})
export class AccessoryFormComponent implements OnInit {

  priceMask = priceMask;
  maskitoElement = maskitoElement;

  accessoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required, Validators.minLength(10), Validators.maxLength(500)
    ]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    image: new FormControl('', [
      Validators.required,
      ApplicationValidators.urlValidator
    ]),
    compatiblePhones: new FormControl([]),
    stock: new FormControl(0, [
      Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')
    ])
  });
  
  accessoryId!: string;
  phones: Phone[] = [];
  categories: string[] = ['Capa', 'Carregador', 'Fone de Ouvido', 'Película', 'Bateria Externa', 'Outro'];

  constructor(
    private accessoryService: AccessoryService,
    private phoneService: PhoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadPhones();
    
    const accessoryId = this.activatedRoute.snapshot.params['id'];
    if (accessoryId) {
      this.accessoryService.getById(accessoryId).subscribe({
        next: (accessory) => {
          if (accessory) {
            this.accessoryId = accessoryId;
            if (accessory.price && typeof accessory.price === 'number') {
              accessory.price = formatNumberMask(accessory.price);
            }
            this.accessoryForm.patchValue(accessory);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o acessório com id ' + accessoryId);
          console.error(error);
        }
      });
    }
  }

  loadPhones() {
    this.phoneService.getList().subscribe({
      next: (phones) => {
        this.phones = phones;
      },
      error: (error) => {
        alert('Erro ao carregar lista de celulares');
        console.error(error);
      }
    });
  }

  compareWith(o1: Phone, o2: Phone): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.accessoryForm.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }

  save() {
    let { value } = this.accessoryForm;
    if (value.price) {
      value.price = parseNumberMask(value.price);
    }
    
    this.accessoryService.save({
      ...value,
      id: this.accessoryId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Acessório salvo com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/accessories']);
      },
      error: (error) => {
        alert('Erro ao salvar o acessório ' + value.name + '!');
        console.error(error);
      }
    });
  }
}
