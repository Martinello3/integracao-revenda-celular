import { Phone } from "../../phones/models/phone.type";
import { Accessory } from "../../accessories/models/accessory.type";

export type SaleItem = {
  id?: number;
  saleId?: number;
  productId: number;
  product?: Phone | Accessory;
  productType: 'phone' | 'accessory';
  quantity: number;
  unitPrice: number;
  subtotal: number;
}