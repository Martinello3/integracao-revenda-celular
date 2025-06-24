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
              next: () => {
                this.phonesList = this.phonesList.filter(p => p.id !== phone.id);
                this.toastController.create({
                  message: `Celular ${phone.model} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                let errorMessage = 'Erro ao excluir o celular ' + phone.model;
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
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyOEMyNC40MTgzIDI4IDI4IDI0LjQxODMgMjggMjBDMjggMTUuNTgxNyAyNC40MTgzIDEyIDIwIDEyQzE1LjU4MTcgMTIgMTIgMTUuNTgxNyAxMiAyMEMxMiAyNC40MTgzIDE1LjU4MTcgMjggMjAgMjhaIiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik0yMCAyMkMyMS4xMDQ2IDIyIDIyIDIxLjEwNDYgMjIgMjBDMjIgMTguODk1NCAyMS4xMDQ2IDE4IDIwIDE4QzE4Ljg5NTQgMTggMTggMTguODk1NCAxOCAyMEMxOCAyMS4xMDQ2IDE4Ljg5NTQgMjIgMjAgMjJaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=';
  }

}
