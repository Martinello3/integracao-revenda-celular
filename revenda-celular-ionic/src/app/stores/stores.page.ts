import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Store } from './models/store.type';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
  standalone: false,
})
export class StoresPage implements OnInit, ViewWillEnter,
  ViewDidEnter, ViewWillLeave, ViewDidLeave {

  storesList: Store[] = [];

  constructor(
    private storeService: StoreService,
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

    this.storeService.getList().subscribe({
      next: (response) => {
        this.storesList = response;
      },
      error: (error) => {
        console.error('Erro ao carregar lista de lojas', error);
        this.toastController.create({
          message: 'Erro ao carregar lista de lojas',
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  ngOnInit() { }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      case 'underMaintenance': return 'warning';
      default: return 'medium';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Ativa';
      case 'inactive': return 'Inativa';
      case 'underMaintenance': return 'Em Manutenção';
      default: return status;
    }
  }

  remove(store: Store) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão da loja ${store.name}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.storeService.remove(store).subscribe({
              next: () => {
                // Remover da lista usando o ID da loja original
                this.storesList = this.storesList.filter(s => s.id !== store.id);
                this.toastController.create({
                  message: `Loja ${store.name} excluída com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                let errorMessage = 'Erro ao excluir a loja ' + store.name;
                if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                console.error('Erro ao excluir loja', error);
                this.toastController.create({
                  message: errorMessage,
                  duration: 3000,
                  color: 'danger'
                }).then(toast => toast.present());
              }
            });
          }
        },
        'Não'
      ]
    }).then(alert => alert.present());
  }
}
