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
              next: () => {
                // Remover da lista usando o ID do acessório original
                this.accessoriesList = this.accessoriesList.filter(a => a.id !== accessory.id);
                this.toastController.create({
                  message: `Acessório ${accessory.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                let errorMessage = 'Erro ao excluir o acessório ' + accessory.name;
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

  onImageError(event: any) {
    // Substituir por imagem padrão quando houver erro
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNSAxNUgyNVYyNUgxNVYxNVoiIGZpbGw9IiNDQ0NDQ0MiLz4KPHBhdGggZD0iTTE4IDE4SDIyVjIySDE4VjE4WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K';
  }
}
