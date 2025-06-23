import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { SaleService } from '../services/sale.service';
import { Sale, SaleStatus, PaymentMethods } from '../models/sale.type';
import { Phone } from 'src/app/phones/models/phone.type';
import { Accessory } from 'src/app/accessories/models/accessory.type';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss'],
  standalone: false,
})
export class SaleDetailsComponent implements OnInit {
  sale!: Sale;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSale(id);
      } else {
        this.router.navigate(['/sales']);
      }
    });
  }

  loadSale(id: string | number) {
    this.saleService.getById(id).subscribe({
      next: (sale) => {
        this.sale = sale;
      },
      error: (error) => {
        console.error('Erro ao carregar venda', error);
        this.showError('Erro ao carregar detalhes da venda');
        this.router.navigate(['/sales']);
      }
    });
  }

  private showError(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger'
    }).then(toast => toast.present());
  }

  getStatusLabel(status: string): string {
    const statusObj = SaleStatus.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  }

  getPaymentMethodLabel(method: string): string {
    const methodObj = PaymentMethods.find(m => m.value === method);
    return methodObj ? methodObj.label : method;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'canceled': return 'danger';
      default: return 'medium';
    }
  }
  
  getProductName(product: Phone | Accessory, type: 'phone' | 'accessory'): string {
    if (type === 'phone') {
      return (product as Phone).model;
    } else {
      return (product as Accessory).name;
    }
  }

  async cancelSale() {
    if (!this.sale) return;
    
    const alert = await this.alertController.create({
      header: 'Confirmar Cancelamento',
      message: `Tem certeza que deseja cancelar a venda #${this.sale.id}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            const updatedSale = { ...this.sale, status: 'canceled' as 'canceled' };
            this.saleService.save(updatedSale).subscribe({
              next: () => {
                this.toastController.create({
                  message: 'Venda cancelada com sucesso!',
                  duration: 3000,
                  color: 'success'
                }).then(toast => toast.present());
                
                this.sale.status = 'canceled';
              },
              error: (error) => {
                console.error('Erro ao cancelar venda', error);
                this.toastController.create({
                  message: 'Erro ao cancelar venda',
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
