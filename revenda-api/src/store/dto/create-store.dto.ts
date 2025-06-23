export class CreateStoreDto {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  manager: string;
  isHeadquarters?: boolean;
  status?: string;
}
