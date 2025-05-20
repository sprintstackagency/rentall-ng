
export type UserRole = 'renter' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
  vendorId: string;
  vendorName: string;
  createdAt: string;
}

export interface Rental {
  id: string;
  itemId: string;
  itemTitle: string;
  vendorId: string;
  vendorName: string;
  renterId: string;
  renterName: string;
  startDate: string;
  endDate: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
