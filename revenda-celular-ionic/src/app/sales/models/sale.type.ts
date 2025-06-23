import { Customer } from "src/app/customers/models/customer.type";
import { Store } from "src/app/stores/models/store.type";
import { SaleItem } from "./sale-item.type";

export type Sale = {
  id?: number | string;
  date: Date | string;
  customer: Customer;
  store: Store;
  items: SaleItem[];
  totalValue: number;
  paymentMethod: 'pix' | 'debit' | 'credit';
  status: 'pending' | 'completed' | 'canceled';
  seller: string;
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
