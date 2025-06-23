import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Accessory } from './models/accessory.type';
import { AccessoryService } from './services/accessory.service';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
  standalone: false,
})
export class AccessoriesPage implements OnInit, ViewWillEnter,
  ViewDidEnter, ViewWillLeave, ViewDidLeave {

  accessoriesList: Accessory[] = [];

  constructor(
    private accessoryService: AccessoryService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
  }
  
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave');
  }
  
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }
  
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter');

    this.accessoryService.getList().subscribe({
      next: (response) => {
        this.accessoriesList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de acessórios');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  remove(accessory: Accessory) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão do acessório ${accessory.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.accessoryService.remove(accessory).subscribe({
              next: (response) => {
                this.accessoriesList = this.accessoriesList.filter(a => a.id !== response.id);
                this.toastController.create({
                  message: `Acessório ${accessory.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert('Erro ao excluir o acessório ' + accessory.name);
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
