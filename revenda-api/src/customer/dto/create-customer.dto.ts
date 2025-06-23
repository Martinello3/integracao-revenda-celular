export class CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: string;
  customerType?: 'regular' | 'premium' | 'vip';
  active?: boolean;
}
