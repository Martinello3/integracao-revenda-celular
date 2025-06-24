import { Component, OnInit } from '@angular/core';
import { SaleService } from '../sales/services/sale.service';
import { Sale, DashboardStats } from '../sales/models/sale.type';
import { PhoneService } from '../phones/services/phone.service';
import { AccessoryService } from '../accessories/services/accessory.service';

interface TopProduct {
  productId: number;
  productType: 'phone' | 'accessory';
  name?: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface MonthlyData {
  month: number;
  year: number;
  count: number;
  revenue: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  dashboardStats: DashboardStats = {
    totalSales: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingSales: 0
  };

  topProducts: TopProduct[] = [];
  monthlyData: MonthlyData[] = [];
  recentSales: Sale[] = [];

  constructor(
    private saleService: SaleService,
    private phoneService: PhoneService,
    private accessoryService: AccessoryService
  ) {}
  
  ngOnInit() {
    this.loadDashboardData();
  }
  
  ionViewWillEnter() {
    this.loadDashboardData();
  }
  
  loadDashboardData() {
    // Carregar estatísticas do dashboard
    this.saleService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas', error);
      }
    });

    // Carregar dados mensais
    this.saleService.getSalesByMonth().subscribe({
      next: (data) => {
        this.monthlyData = data;
      },
      error: (error) => {
        console.error('Erro ao carregar dados mensais', error);
      }
    });

    // Carregar top produtos
    this.saleService.getTopProducts().subscribe({
      next: (products) => {
        this.topProducts = products;
        this.loadProductNames();
      },
      error: (error) => {
        console.error('Erro ao carregar top produtos', error);
      }
    });

    // Carregar vendas recentes
    this.saleService.getRecentSales(5).subscribe({
      next: (sales) => {
        this.recentSales = sales;
      },
      error: (error) => {
        console.error('Erro ao carregar vendas recentes', error);
      }
    });
  }
  
  loadProductNames() {
    // Carregar nomes dos produtos para os top produtos
    this.topProducts.forEach(product => {
      if (product.productType === 'phone') {
        this.phoneService.getById(product.productId).subscribe({
          next: (phone) => {
            product.name = phone.model;
          },
          error: (error) => {
            console.error('Erro ao carregar nome do celular', error);
            product.name = `Celular #${product.productId}`;
          }
        });
      } else if (product.productType === 'accessory') {
        this.accessoryService.getById(product.productId).subscribe({
          next: (accessory) => {
            product.name = accessory.name;
          },
          error: (error) => {
            console.error('Erro ao carregar nome do acessório', error);
            product.name = `Acessório #${product.productId}`;
          }
        });
      }
    });
  }

  getAverageTicket(): number {
    return this.dashboardStats.totalSales > 0
      ? this.dashboardStats.totalRevenue / this.dashboardStats.totalSales
      : 0;
  }
  
  getMonthName(month: number): string {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    return months[month - 1] || '';
  }
  
  getStatusLabel(status: string): string {
    const statusMap: {[key: string]: string} = {
      'pending': 'Pendente',
      'completed': 'Concluída',
      'canceled': 'Cancelada'
    };
    return statusMap[status] || status;
  }
  
  getStatusColor(status: string): string {
    const colorMap: {[key: string]: string} = {
      'pending': 'warning',
      'completed': 'success',
      'canceled': 'danger'
    };
    return colorMap[status] || 'medium';
  }
}
