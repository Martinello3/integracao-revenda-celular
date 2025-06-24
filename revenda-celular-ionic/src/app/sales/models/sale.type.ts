import { Customer } from "../../customers/models/customer.type";
import { Store } from "../../stores/models/store.type";
import { SaleItem } from "./sale-item.type";

export type Sale = {
  id?: number;
  date: Date | string;
  customerId: number;
  storeId: number;
  customer?: Customer;
  store?: Store;
  items: SaleItem[];
  totalValue: number;
  paymentMethod: 'pix' | 'debit' | 'credit';
  status: 'pending' | 'completed' | 'canceled';
  seller: string;
}

export type CreateSaleDto = {
  customerId: number;
  storeId: number;
  paymentMethod: 'pix' | 'debit' | 'credit';
  status?: 'pending' | 'completed' | 'canceled';
  seller: string;
  items: CreateSaleItemDto[];
}

export type CreateSaleItemDto = {
  productId: number;
  productType: 'phone' | 'accessory';
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type UpdateSaleDto = Partial<CreateSaleDto>

export type DashboardStats = {
  totalSales: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingSales: number;
}

export const PaymentMethods = [
  { value: 'pix', label: 'PIX' },
  { value: 'debit', label: 'Cartão de Débito' },
  { value: 'credit', label: 'Cartão de Crédito' }
];

export const SaleStatus = [
  { value: 'pending', label: 'Pendente' },
  { value: 'completed', label: 'Concluída' },
  { value: 'canceled', label: 'Cancelada' }
];
