import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brand.type';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
  standalone: false,
})
export class BrandFormComponent implements OnInit {

  brandForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(100)
    ]),
    country: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(100)
    ])
  });
  
  brandId!: number;

  constructor(
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const brandId = this.activatedRoute.snapshot.params['id'];
    if (brandId) {
      this.brandService.getById(+brandId).subscribe({
        next: (brand: Brand) => {
          if (brand) {
            this.brandId = +brandId;
            this.brandForm.patchValue({
              name: brand.name,
              country: brand.country
            });
          }
        },
        error: (error: any) => {
          console.error('Erro ao carregar marca', error);
          this.toastController.create({
            message: 'Erro ao carregar a marca com id ' + brandId,
            duration: 3000,
            color: 'danger'
          }).then(toast => toast.present());
        }
      });
    }
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.brandForm.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }

  save() {
    const { value } = this.brandForm;
    console.log('Salvando marca:', value);

    this.brandService.save({
      ...value,
      id: this.brandId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Marca salva com sucesso!',
          duration: 3000,
          color: 'secondary'
        }).then(toast => toast.present());
        this.router.navigate(['/brands']);
      },
      error: (error: any) => {
        let errorMessage = 'Erro ao salvar a marca ' + value.name + '!';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error('Erro ao salvar a marca', error);
        this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }
}
