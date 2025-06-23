import { Phone } from "src/app/phones/models/phone.type";
export interface Accessory {
  id?: string;  
  name: string;
  description: string;  
  price: number | string;
  category: string;
  image: string;
  compatiblePhones?: Phone[];
  stock: number;
}






