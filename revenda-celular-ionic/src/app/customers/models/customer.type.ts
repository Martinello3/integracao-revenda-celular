export type Customer = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string | Date;
  address: string;
  customerType: 'regular' | 'premium' | 'vip';
  active: boolean;
}