import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController
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
    this.saleService.filterSales(this.filters).subscribe({
      next: (sales) => {
        this.salesList = sales;
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
            const updatedSale = { ...sale, status: 'canceled' as 'canceled' };
            this.saleService.save(updatedSale).subscribe({
              next: () => {
                this.loadSales();
              },
              error: (error) => {
                console.error('Erro ao cancelar venda', error);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
