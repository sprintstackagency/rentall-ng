import React, { createContext, useContext } from "react";
import { Item, Rental, Category } from "@/types";

// Mock categories
const categories: Category[] = [
  { id: "1", name: "Sound Systems", icon: "speaker" },
  { id: "2", name: "Lighting", icon: "lamp" },
  { id: "3", name: "Catering Equipment", icon: "utensils" },
  { id: "4", name: "Furniture", icon: "chair" },
  { id: "5", name: "Decoration", icon: "sparkles" },
  { id: "6", name: "Photography", icon: "camera" },
  { id: "7", name: "Party Supplies", icon: "party" },
  { id: "8", name: "Tents & Structures", icon: "tent" },
];

// Mock items
const items: Item[] = [
  {
    id: "1",
    title: "Premium Sound System",
    description: "High-quality sound system perfect for events up to 200 people. Includes 2 speakers, amplifier, and mixing board.",
    price: 250,
    quantity: 5,
    category: "1",
    images: ["/placeholder.svg"],
    vendorId: "v1",
    vendorName: "Audio Masters",
    createdAt: "2023-04-15T10:30:00Z"
  },
  {
    id: "2",
    title: "LED Party Lights Pack",
    description: "Set of 8 LED lights with various colors and patterns. Perfect for creating atmosphere at any event.",
    price: 120,
    quantity: 10,
    category: "2",
    images: ["/placeholder.svg"],
    vendorId: "v2",
    vendorName: "Bright Nights",
    createdAt: "2023-05-20T14:45:00Z"
  },
  {
    id: "3",
    title: "Catering Kit - Complete",
    description: "Full catering kit including chafing dishes, utensils, serving platters, and warming trays for up to 50 guests.",
    price: 180,
    quantity: 3,
    category: "3",
    images: ["/placeholder.svg"],
    vendorId: "v3",
    vendorName: "Catering Supplies Co.",
    createdAt: "2023-02-10T09:15:00Z"
  },
  {
    id: "4",
    title: "Event Chairs (Set of 10)",
    description: "Comfortable folding chairs suitable for outdoor or indoor events. Sleek design and easy to transport.",
    price: 75,
    quantity: 15,
    category: "4",
    images: ["/placeholder.svg"],
    vendorId: "v1",
    vendorName: "Audio Masters",
    createdAt: "2023-03-28T16:20:00Z"
  },
  {
    id: "5",
    title: "Balloon Decoration Kit",
    description: "Professional balloon decoration kit with pump, arches, and 500 assorted balloons for any celebration.",
    price: 95,
    quantity: 8,
    category: "5",
    images: ["/placeholder.svg"],
    vendorId: "v4",
    vendorName: "Party Perfect",
    createdAt: "2023-06-05T11:30:00Z"
  },
  {
    id: "6",
    title: "Professional Camera Setup",
    description: "DSLR camera with tripod, lighting kit, and multiple lenses for professional event photography.",
    price: 320,
    quantity: 2,
    category: "6",
    images: ["/placeholder.svg"],
    vendorId: "v5",
    vendorName: "Photo Pros",
    createdAt: "2023-01-15T13:45:00Z"
  }
];

// Mock rentals
const rentals: Rental[] = [
  {
    id: "r1",
    itemId: "1",
    itemTitle: "Premium Sound System",
    vendorId: "v1",
    vendorName: "Audio Masters",
    renterId: "u1",
    renterName: "John Smith",
    startDate: "2023-07-15T00:00:00Z",
    endDate: "2023-07-18T00:00:00Z",
    quantity: 1,
    totalPrice: 750,
    status: "completed",
    createdAt: "2023-07-01T09:30:00Z"
  },
  {
    id: "r2",
    itemId: "3",
    itemTitle: "Catering Kit - Complete",
    vendorId: "v3",
    vendorName: "Catering Supplies Co.",
    renterId: "u2",
    renterName: "Emily Jones",
    startDate: "2023-08-20T00:00:00Z",
    endDate: "2023-08-21T00:00:00Z",
    quantity: 2,
    totalPrice: 360,
    status: "ongoing",
    createdAt: "2023-08-10T14:15:00Z"
  }
];

interface MockDataContextType {
  items: Item[];
  categories: Category[];
  rentals: Rental[];
  getFeaturedItems: () => Item[];
  getItemById: (id: string) => Item | undefined;
  getItemsByCategory: (categoryId: string) => Item[];
  getItemsByVendor: (vendorId: string) => Item[];
  getRentalsByRenter: (renterId: string) => Rental[];
  getRentalsByVendor: (vendorId: string) => Rental[];
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getFeaturedItems = () => {
    return items.slice(0, 4);
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  const getItemsByCategory = (categoryId: string) => {
    return items.filter(item => item.category === categoryId);
  };

  const getItemsByVendor = (vendorId: string) => {
    return items.filter(item => item.vendorId === vendorId);
  };

  const getRentalsByRenter = (renterId: string) => {
    return rentals.filter(rental => rental.renterId === renterId);
  };

  const getRentalsByVendor = (vendorId: string) => {
    return rentals.filter(rental => rental.vendorId === vendorId);
  };

  return (
    <MockDataContext.Provider
      value={{
        items,
        categories,
        rentals,
        getFeaturedItems,
        getItemById,
        getItemsByCategory,
        getItemsByVendor,
        getRentalsByRenter,
        getRentalsByVendor
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
