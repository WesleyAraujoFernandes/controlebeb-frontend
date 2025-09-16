import { SaleItemDTO } from "./sale-item-dto";

export interface SaleDTO {
  id?: number;
  customerId: number;
  saleDate?: string;
  status?: string;
  totalBruto?: number;
  desconto?: number;
  totalLiquido?: number;
  items: SaleItemDTO[];
}
