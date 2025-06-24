import { Component, OnInit } from '@angular/core';
import { Brand } from './models/brand.type';
import { BrandService } from './services/brand.service';
import { AlertController, ToastController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
  standalone: false,
})
export class BrandsPage implements OnInit, ViewDidEnter {

  brandsList: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  ionViewDidEnter(): void {
    this.loadBrands();
  }

  ngOnInit() { }

  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (response) => {
        this.brandsList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de marcas');
        console.error(error);
      }
    });
  }

  remove(brand: Brand) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão da marca ${brand.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.brandService.remove(brand).subscribe({
              next: () => {
                // Remover da lista usando o ID da marca original
                this.brandsList = this.brandsList.filter(b => b.id !== brand.id);
                this.toastController.create({
                  message: `Marca ${brand.name} excluída com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                let errorMessage = 'Erro ao excluir a marca ' + brand.name;
                if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                alert(errorMessage);
                console.error(error);
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }
}
