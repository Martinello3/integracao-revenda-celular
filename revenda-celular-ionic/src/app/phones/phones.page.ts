import { Component, OnInit } from '@angular/core';
import { Phone } from './models/phone.type';
import { PhoneService } from './services/phone.service';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';


@Component({
  selector: 'app-phones',
  templateUrl: './phones.page.html',
  styleUrls: ['./phones.page.scss'],
  standalone: false,
})
export class PhonesPage implements OnInit, ViewWillEnter,
  ViewDidEnter, ViewWillLeave, ViewDidLeave {

  phonesList: Phone[] = [];

  constructor(
    private phoneService: PhoneService,
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

    this.phoneService.getList().subscribe({
      next: (response) => {
        this.phonesList = response;
      },
      error: (error) => {
        alert('Erro ao carregar lista de celulares');
        console.error(error);
      }
    });
  }

  ngOnInit() { }

  remove(phone: Phone) {
    this.alertController.create({
      header: 'Exclusão',
      message: `Confirma a exclusão do celular ${phone.model}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.phoneService.remove(phone).subscribe({
              next: (response) => {
                this.phonesList = this.phonesList.filter(p => p.id !== response.id);
                this.toastController.create({
                  message: `Celular ${phone.model} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                alert('Erro ao excluir o celular ' + phone.model);
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
