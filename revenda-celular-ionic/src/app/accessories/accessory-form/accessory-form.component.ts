import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AccessoryService } from '../services/accessory.service';
import { PhoneService } from '../../phones/services/phone.service';
import { Phone } from '../../phones/models/phone.type';
import { ApplicationValidators } from '../../core/validators/url.validator';


@Component({
  selector: 'app-accessory-form',
  templateUrl: './accessory-form.component.html',
  styleUrls: ['./accessory-form.component.scss'],
  standalone: false,
})
export class AccessoryFormComponent implements OnInit {

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

  accessoryId!: number;
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
      this.accessoryService.getById(+accessoryId).subscribe({
        next: (accessory) => {
          if (accessory) {
            this.accessoryId = +accessoryId;

            // Tratar preço como number
            let priceValue = 0;
            if (accessory.price) {
              if (typeof accessory.price === 'number') {
                priceValue = accessory.price;
              } else if (typeof accessory.price === 'string') {
                priceValue = parseFloat(accessory.price) || 0;
              }
            }

            console.log('Carregando acessório:', accessory);
            console.log('Celulares compatíveis do acessório:', accessory.compatiblePhones);

            this.accessoryForm.patchValue({
              name: accessory.name,
              description: accessory.description,
              price: priceValue,
              category: accessory.category,
              image: accessory.image,
              compatiblePhones: accessory.compatiblePhones || [],
              stock: accessory.stock
            });
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

    // Garantir que o preço seja number
    value.price = Number(value.price) || 0;
    // Garantir que o stock seja number
    value.stock = Number(value.stock) || 0;

    console.log('Salvando acessório - Dados do formulário:', value);
    console.log('Celulares compatíveis selecionados:', value.compatiblePhones);

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
        let errorMessage = 'Erro ao salvar o acessório ' + value.name + '!';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        alert(errorMessage);
        console.error(error);
      }
    });
  }
}
