export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  minumumStock: number;
  categoryId: number; // FK da categoria
}
