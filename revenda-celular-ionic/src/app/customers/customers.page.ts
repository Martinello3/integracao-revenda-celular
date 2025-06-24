import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Customer } from './models/customer.type';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: false,
})
export class CustomersPage implements OnInit {
  customersList: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  ionViewWillEnter() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (customers) => {
        this.customersList = customers;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    });
  }

  getCustomerTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'regular': 'Regular',
      'premium': 'Premium',
      'vip': 'VIP'
    };
    return types[type] || type;
  }

  getCustomerTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'regular': 'medium',
      'premium': 'warning',
      'vip': 'tertiary'
    };
    return colors[type] || 'medium';
  }

  async remove(customer: Customer) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Deseja excluir o cliente ${customer.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.customerService.remove(customer).subscribe({
              next: () => {
                // Remover da lista usando o ID do cliente original
                this.customersList = this.customersList.filter((c: Customer) => c.id !== customer.id);
                this.toastController.create({
                  message: `Cliente ${customer.name} excluído com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then((toast: any) => toast.present());
              },
              error: (error: any) => {
                let errorMessage = 'Erro ao excluir o cliente ' + customer.name;
                if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                console.error('Erro ao excluir cliente', error);
                this.toastController.create({
                  message: errorMessage,
                  duration: 3000,
                  color: 'danger'
                }).then(toast => toast.present());
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
