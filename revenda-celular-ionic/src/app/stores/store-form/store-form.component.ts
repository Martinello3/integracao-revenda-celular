import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StoreService } from '../services/store.service';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { phoneMask, maskitoElement } from '../../core/constants/mask.constants';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss'],
  standalone: false,
})
export class StoreFormComponent implements OnInit {
  phoneMask = phoneMask;
  maskitoElement = maskitoElement;

  storeForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      ApplicationValidators.storeNameValidator
    ]),
    address: new FormControl('', [
      Validators.required,
      ApplicationValidators.addressValidator
    ]),
    city: new FormControl('', [
      Validators.required,
      ApplicationValidators.cityValidator
    ]),
    state: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      ApplicationValidators.storePhoneValidator
    ]),
    manager: new FormControl('', [
      Validators.required,
      ApplicationValidators.managerValidator
    ]),
    isHeadquarters: new FormControl(false),
    status: new FormControl('active', [Validators.required])
  });

  storeId!: number;
  
  stateOptions: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
  
  statusOptions = [
    { value: 'active', label: 'Ativa' },
    { value: 'inactive', label: 'Inativa' },
    { value: 'underMaintenance', label: 'Em Manutenção' }
  ];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const storeId = this.activatedRoute.snapshot.params['id'];
    if (storeId) {
      this.storeService.getById(+storeId).subscribe({
        next: (store) => {
          if (store) {
            this.storeId = +storeId;
            this.storeForm.patchValue({
              name: store.name,
              address: store.address,
              city: store.city,
              state: store.state,
              phone: store.phone,
              manager: store.manager,
              isHeadquarters: store.isHeadquarters,
              status: store.status
            });
          }
        },
        error: (error) => {
          console.error('Erro ao carregar loja', error);
          this.toastController.create({
            message: 'Erro ao carregar a loja com id ' + storeId,
            duration: 3000,
            color: 'danger'
          }).then(toast => toast.present());
        }
      });
    }
  }


  save() {
    const { value } = this.storeForm;

    console.log('Salvando loja:', value);

    this.storeService.save({
      ...value,
      id: this.storeId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Loja salva com sucesso!',
          duration: 3000,
        }).then(toast => toast.present());
        this.router.navigate(['/stores']);
      },
      error: (error) => {
        let errorMessage = 'Erro ao salvar a loja ' + value.name + '!';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error('Erro ao salvar a loja', error);
        this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.storeForm.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }
}
