export interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  technicalSpecifications: { [key: string]: string };
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

