export class CreateSaleItemDto {
  productId: number;
  productType: 'phone' | 'accessory';
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export class CreateSaleDto {
  customerId: number;
  storeId: number;
  paymentMethod: 'pix' | 'debit' | 'credit';
  seller: string;
  items: CreateSaleItemDto[];
}
