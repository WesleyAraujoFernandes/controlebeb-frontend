export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  minimumStock: number;
  category: {
    id: number;
    description?: string; // opcional, só vem do backend
  };
}
