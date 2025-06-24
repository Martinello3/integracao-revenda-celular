import { Phone } from "../../phones/models/phone.type";

export interface Accessory {
  id?: number;
  name: string;
  description: string;
  price: number | string;
  category: string;
  image: string;
  compatiblePhones?: Phone[];
  stock: number;
}

export type CreateAccessoryDto = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock?: number;
  compatiblePhoneIds?: number[];
}

export type UpdateAccessoryDto = Partial<CreateAccessoryDto>






