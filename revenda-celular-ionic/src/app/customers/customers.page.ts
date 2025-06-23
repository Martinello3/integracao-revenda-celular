import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Customer } from './models/customer.type';
import { CustomerService } from './services/customer.service';
import { IonHeader } from "@ionic/angular/standalone";

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
    private alertController: AlertController
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
            if (customer.id) {
              this.customerService.delete(customer.id).subscribe({
                next: () => {
                  this.loadCustomers();
                },
                error: (error) => {
                  console.error('Erro ao excluir cliente', error);
                }
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
