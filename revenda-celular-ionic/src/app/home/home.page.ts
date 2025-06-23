import { Component, OnInit } from '@angular/core';
import { SaleService } from '../sales/services/sale.service';
import { Sale, SaleStatus } from '../sales/models/sale.type';

interface TopProduct {
  id: number | string;
  name: string;
  type: 'phone' | 'accessory';
  quantity: number;
  revenue: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  totalRevenue: number = 0;
  monthlyRevenue: number = 0;
  weeklyRevenue: number = 0;
  
  totalSalesMonth: number = 0;
  totalSalesWeek: number = 0;
  averageTicket: number = 0;

  topProducts: TopProduct[] = [];
  
  recentSales: Sale[] = [];
  
  constructor(private saleService: SaleService) {}
  
  ngOnInit() {
    this.loadDashboardData();
  }
  
  ionViewWillEnter() {
    this.loadDashboardData();
  }
  
  loadDashboardData() {
    this.saleService.getAll().subscribe({
      next: (sales) => {
        const completedSales = sales.filter(sale => sale.status === 'completed');
        
        this.calculateFinancialSummary(completedSales);
        
        this.calculateSalesStats(completedSales);
        
        this.calculateTopProducts(completedSales);
        
        this.recentSales = [...sales]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do dashboard', error);
      }
    });
  }
  
  calculateFinancialSummary(sales: Sale[]) {
    this.totalRevenue = sales.reduce((sum, sale) => sum + sale.totalValue, 0);
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    this.monthlyRevenue = sales
      .filter(sale => new Date(sale.date) >= startOfMonth)
      .reduce((sum, sale) => sum + sale.totalValue, 0);
    
    this.weeklyRevenue = sales
      .filter(sale => new Date(sale.date) >= startOfWeek)
      .reduce((sum, sale) => sum + sale.totalValue, 0);
  }
  
  calculateSalesStats(sales: Sale[]) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const monthSales = sales.filter(sale => new Date(sale.date) >= startOfMonth);
    this.totalSalesMonth = monthSales.length;
    
    const weekSales = sales.filter(sale => new Date(sale.date) >= startOfWeek);
    this.totalSalesWeek = weekSales.length;
    
    // Ticket médio
    this.averageTicket = sales.length > 0 ? this.totalRevenue / sales.length : 0;
  }
  
  calculateTopProducts(sales: Sale[]) {
    const productMap = new Map<string, TopProduct>();

    sales.forEach(sale => {
      sale.items.forEach(item => {
        const productId = item.product.id?.toString() || '';
        const productName = this.getProductName(item.product, item.productType);
        const productType = item.productType as 'phone' | 'accessory';
        const quantity = item.quantity;
        const revenue = item.subtotal;
        
        if (productMap.has(productId)) {
          const existingProduct = productMap.get(productId)!;
          existingProduct.quantity += quantity;
          existingProduct.revenue += revenue;
        } else {
          productMap.set(productId, {
            id: productId,
            name: productName,
            type: productType,
            quantity: quantity,
            revenue: revenue
          });
        }
      });
    });
    
    this.topProducts = Array.from(productMap.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }
  
  getProductName(product: any, type: string): string {
    if (type === 'phone') {
      return product.model || 'Celular';
    } else {
      return product.name || 'Acessório';
    }
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
