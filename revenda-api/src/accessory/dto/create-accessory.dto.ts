export class CreateAccessoryDto {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock?: number;
}
