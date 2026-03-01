export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  seller_id: string;
  created_at: string;
  status: 'active' | 'sold' | 'draft';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  user_id: string;
  products: { product_id: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  payment_intent_id?: string;
  created_at: string;
}
