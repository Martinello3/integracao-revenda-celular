export type Brand = {
  id: number;
  name: string;
  country: string;
}

export type CreateBrandDto = {
  name: string;
  country: string;
}

export type UpdateBrandDto = Partial<CreateBrandDto>
