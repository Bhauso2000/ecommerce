export interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string; // Or 'admin' | 'user' if you prefer literal union
  address: Address[];
  created: Date;
}
export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  customerId: string;
  customer?: Customer; // optional to avoid circular references if needed
}

export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
}
export interface ProductPaginationResponse {
  data: ProductInterface[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginResponse{
  token:string
}

export interface LoginRequest{
  email:string,
  password:string
}
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}
export interface AddToCartRequest {
  productId: string;
  quantity: number;
}
export interface CartItemWithProduct {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productDetails: ProductInterface;
}

// types/order.ts

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  productDetails: ProductDetails;
}

export interface OrderHistoryItem {
  id: string;
  userId: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface ProductFormInput {
  name: string;
  description: string;
  price: string;    
  stock: string;  
  file: File | null;
}

