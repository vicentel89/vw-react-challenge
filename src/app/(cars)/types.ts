export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  name: string;
  brandId: string;
}
