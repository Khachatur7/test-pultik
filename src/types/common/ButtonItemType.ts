import { ComValueType } from "../api";

interface ButtonItemType {
  _id: string;
  tel: string;
  qinReactTime: number;
  qinCoeff: number;
  avitoId: number;
  basePrice: number;
  sku: string;
  stocks: number;
  wStocks?: number;
  bool: number;
  fullName: string;
  i: number;
  com?: ComValueType;
  percent: number;
  avPrice: string;
  mmPrice: string;
  ozPrice: string;
  wbPrice: string;
  yaEPrice: string;
  yaPrice: string;
  fStocks?: number;
  boost?: number;
  wBar: string;
  cP: number;
  cust?: number;
  h?: boolean | undefined;
  edited?: string;
  wbAdded: boolean | undefined;
  place: string;
  group: string;
  ozCommission: number;
}

export default ButtonItemType;
