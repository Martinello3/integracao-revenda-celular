export type Store = {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  manager: string;
  isHeadquarters: boolean;
  status: 'active' | 'inactive' | 'underMaintenance';
}

export type CreateStoreDto = {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  manager: string;
  isHeadquarters?: boolean;
  status?: string;
}

export type UpdateStoreDto = Partial<CreateStoreDto>