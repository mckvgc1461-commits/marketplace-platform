export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  seller_id: string;
  seller_name?: string;
  seller_phone?: string;
  seller_email?: string;
  created_at: string;
  status: 'active' | 'sold' | 'draft';
}

export interface Order {
  id: string;
  user_id: string;
  products: { product_id: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  payment_intent_id?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  customer_address?: string;
  customer_city?: string;
  created_at: string;
}
