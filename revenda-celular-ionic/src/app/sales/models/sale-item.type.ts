import { Phone } from "src/app/phones/models/phone.type";
import { Accessory } from "src/app/accessories/models/accessory.type";

export type SaleItem = {
  id?: number;
  product: Phone | Accessory;
  productType: 'phone' | 'accessory';
  quantity: number;
  unitPrice: number;
  subtotal: number;
}