export class UpdateSaleDto {
  customerId?: number;
  storeId?: number;
  paymentMethod?: 'pix' | 'debit' | 'credit';
  seller?: string;
  status?: 'pending' | 'completed' | 'canceled';
}
