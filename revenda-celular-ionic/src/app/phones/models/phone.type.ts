import { Brand } from "src/app/brands/models/brand.type"

export type Phone = {
  id?: number,
  image: string | null,
  model: string,
  releaseDate: Date | string,
  price: number | string,
  category: string,
  brands: Brand[]
}

