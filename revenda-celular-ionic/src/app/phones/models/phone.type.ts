import { Brand } from "../../brands/models/brand.type"

export type Phone = {
  id?: number,
  model: string,
  image: string,
  releaseDate: Date | string,
  price: number | string,
  category: string,
  brandId: number,
  brand?: Brand,
  accessories?: any[]
}

export type CreatePhoneDto = {
  model: string,
  image: string,
  releaseDate: Date | string,
  price: number,
  category: string,
  brandId: number
}

export type UpdatePhoneDto = Partial<CreatePhoneDto>

