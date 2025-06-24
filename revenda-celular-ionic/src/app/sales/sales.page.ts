import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Sale, SaleStatus, PaymentMethods } from './models/sale.type';
import { SaleService } from './services/sale.service';
import { StoreService } from '../stores/services/store.service';
import { Store } from '../stores/models/store.type';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: false,
})
export class SalesPage implements OnInit {
  salesList: Sale[] = [];
  storesList: Store[] = [];
  saleStatusOptions = SaleStatus;
  paymentMethodOptions = PaymentMethods;
  
  filters = {
    storeId: null as number | null,
    status: null as string | null
  };

  constructor(
    private saleService: SaleService,
    private storeService: StoreService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadSales();
    this.loadStores();
  }

  ionViewWillEnter() {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getAll().subscribe({
      next: (sales) => {
        this.salesList = sales;
      },
      error: (error) => {
        console.error('Erro ao carregar vendas', error);
      }
    });
  }

  loadStores() {
    this.storeService.getList().subscribe({
      next: (stores) => {
        this.storesList = stores;
      },
      error: (error) => {
        console.error('Erro ao carregar lojas', error);
      }
    });
  }

  applyFilters() {
    this.saleService.getAll(this.filters.status || undefined).subscribe({
      next: (sales) => {
        if (this.filters.storeId) {
          this.salesList = sales.filter(sale => sale.storeId === this.filters.storeId);
        } else {
          this.salesList = sales;
        }
      },
      error: (error) => {
        console.error('Erro ao filtrar vendas', error);
      }
    });
  }

  clearFilters() {
    this.filters = {
      storeId: null,
      status: null
    };
    this.loadSales();
  }

  getStatusLabel(status: string): string {
    const statusObj = this.saleStatusOptions.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  }

  getPaymentMethodLabel(method: string): string {
    const methodObj = this.paymentMethodOptions.find(m => m.value === method);
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

  async cancelSale(sale: Sale) {
    const alert = await this.alertController.create({
      header: 'Confirmar Cancelamento',
      message: `Tem certeza que deseja cancelar a venda #${sale.id}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (sale.id) {
              this.saleService.updateStatus(sale.id, 'canceled').subscribe({
                next: () => {
                  this.loadSales();
                  this.toastController.create({
                    message: `Venda #${sale.id} cancelada com sucesso!`,
                    duration: 3000,
                    color: 'secondary',
                    keyboardClose: true,
                  }).then(toast => toast.present());
                },
                error: (error) => {
                  let errorMessage = 'Erro ao cancelar venda';
                  if (error.error?.message) {
                    errorMessage = error.error.message;
                  }
                  window.alert(errorMessage);
                  console.error('Erro ao cancelar venda', error);
                }
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteSale(sale: Sale) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir a venda #${sale.id}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.saleService.remove(sale).subscribe({
              next: () => {
                this.salesList = this.salesList.filter(s => s.id !== sale.id);
                this.toastController.create({
                  message: `Venda #${sale.id} excluída com sucesso!`,
                  duration: 3000,
                  color: 'secondary',
                  keyboardClose: true,
                }).then(toast => toast.present());
              },
              error: (error) => {
                let errorMessage = 'Erro ao excluir venda';
                if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                window.alert(errorMessage);
                console.error('Erro ao excluir venda', error);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
