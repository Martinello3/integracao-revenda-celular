import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss'],
  standalone: false,
})
export class StoreFormComponent implements OnInit {
  storeForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(100)
    ]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    manager: new FormControl('', [Validators.required]),
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
      this.storeService.getById(storeId).subscribe({
        next: (store) => {
          if (store) {
            this.storeId = storeId;
            this.storeForm.patchValue(store);
          }
        },
        error: (error) => {
          alert('Erro ao carregar a loja com id ' + storeId);
          console.error(error);
        }
      });
    }
  }

  hasError(field: string, error: string) {
    const formControl = this.storeForm.get(field);
    return formControl?.touched && formControl?.errors?.[error];
  }

  save() {
    const { value } = this.storeForm;
    
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
        alert('Erro ao salvar a loja ' + value.name + '!');
        console.error(error);
      }
    });
  }
}
