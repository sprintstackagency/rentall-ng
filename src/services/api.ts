
import { supabase } from "@/integrations/supabase/client";
import { Item, Rental, User } from "@/types";

// Item services
export const itemsService = {
  getAll: async (): Promise<Item[]> => {
    const { data, error } = await supabase
      .from("items")
      .select(`
        *,
        vendor:vendor_id (
          name:name
        )
      `);

    if (error) {
      console.error("Error fetching items:", error);
      throw error;
    }

    // Transform the data to match our Item type
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      images: item.images || [],
      vendorId: item.vendor_id,
      vendorName: item.vendor?.name || "Unknown Vendor",
      createdAt: item.created_at,
    }));
  },

  getById: async (id: string): Promise<Item> => {
    const { data, error } = await supabase
      .from("items")
      .select(`
        *,
        vendor:vendor_id (
          name:name
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      images: data.images || [],
      vendorId: data.vendor_id,
      vendorName: data.vendor?.name || "Unknown Vendor",
      createdAt: data.created_at,
    };
  },

  getByVendorId: async (vendorId: string): Promise<Item[]> => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("vendor_id", vendorId);

    if (error) {
      console.error(`Error fetching vendor items:`, error);
      throw error;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      images: item.images || [],
      vendorId: item.vendor_id,
      vendorName: "Current Vendor",
      createdAt: item.created_at,
    }));
  },

  create: async (item: Omit<Item, "id" | "createdAt" | "vendorName">): Promise<Item> => {
    const { data, error } = await supabase
      .from("items")
      .insert({
        title: item.title,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        images: item.images,
        vendor_id: item.vendorId,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating item:", error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      images: data.images || [],
      vendorId: data.vendor_id,
      vendorName: "Current Vendor",
      createdAt: data.created_at,
    };
  },

  update: async (id: string, item: Partial<Item>): Promise<Item> => {
    const updateData: any = {};
    if (item.title) updateData.title = item.title;
    if (item.description) updateData.description = item.description;
    if (item.price) updateData.price = item.price;
    if (item.quantity !== undefined) updateData.quantity = item.quantity;
    if (item.category) updateData.category = item.category;
    if (item.images) updateData.images = item.images;

    const { data, error } = await supabase
      .from("items")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating item ${id}:`, error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      images: data.images || [],
      vendorId: data.vendor_id,
      vendorName: "Current Vendor",
      createdAt: data.created_at,
    };
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }
};

// Rental services
export const rentalsService = {
  getAll: async (): Promise<Rental[]> => {
    const { data, error } = await supabase
      .from("rentals")
      .select(`
        *,
        item:item_id (
          title:title
        ),
        vendor:vendor_id (
          name:name
        ),
        renter:renter_id (
          name:name
        )
      `);

    if (error) {
      console.error("Error fetching rentals:", error);
      throw error;
    }

    return data.map((rental: any) => ({
      id: rental.id,
      itemId: rental.item_id,
      itemTitle: rental.item?.title || "Unknown Item",
      vendorId: rental.vendor_id,
      vendorName: rental.vendor?.name || "Unknown Vendor",
      renterId: rental.renter_id,
      renterName: rental.renter?.name || "Unknown Renter",
      startDate: rental.start_date,
      endDate: rental.end_date,
      quantity: rental.quantity,
      totalPrice: rental.total_price,
      status: rental.status,
      createdAt: rental.created_at,
    }));
  },

  getByRenterId: async (renterId: string): Promise<Rental[]> => {
    const { data, error } = await supabase
      .from("rentals")
      .select(`
        *,
        item:item_id (
          title:title
        ),
        vendor:vendor_id (
          name:name
        )
      `)
      .eq("renter_id", renterId);

    if (error) {
      console.error(`Error fetching renter rentals:`, error);
      throw error;
    }

    return data.map((rental: any) => ({
      id: rental.id,
      itemId: rental.item_id,
      itemTitle: rental.item?.title || "Unknown Item",
      vendorId: rental.vendor_id,
      vendorName: rental.vendor?.name || "Unknown Vendor",
      renterId: rental.renter_id,
      renterName: "You",
      startDate: rental.start_date,
      endDate: rental.end_date,
      quantity: rental.quantity,
      totalPrice: rental.total_price,
      status: rental.status,
      createdAt: rental.created_at,
    }));
  },

  getByVendorId: async (vendorId: string): Promise<Rental[]> => {
    const { data, error } = await supabase
      .from("rentals")
      .select(`
        *,
        item:item_id (
          title:title
        ),
        renter:renter_id (
          name:name
        )
      `)
      .eq("vendor_id", vendorId);

    if (error) {
      console.error(`Error fetching vendor rentals:`, error);
      throw error;
    }

    return data.map((rental: any) => ({
      id: rental.id,
      itemId: rental.item_id,
      itemTitle: rental.item?.title || "Unknown Item",
      vendorId: rental.vendor_id,
      vendorName: "You",
      renterId: rental.renter_id,
      renterName: rental.renter?.name || "Unknown Renter",
      startDate: rental.start_date,
      endDate: rental.end_date,
      quantity: rental.quantity,
      totalPrice: rental.total_price,
      status: rental.status,
      createdAt: rental.created_at,
    }));
  },

  create: async (rental: Omit<Rental, "id" | "createdAt" | "status" | "itemTitle" | "vendorName" | "renterName">): Promise<Rental> => {
    const { data, error } = await supabase
      .from("rentals")
      .insert({
        item_id: rental.itemId,
        vendor_id: rental.vendorId,
        renter_id: rental.renterId,
        quantity: rental.quantity,
        total_price: rental.totalPrice,
        start_date: rental.startDate,
        end_date: rental.endDate,
        status: "pending"
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating rental:", error);
      throw error;
    }

    return {
      id: data.id,
      itemId: data.item_id,
      itemTitle: "Item Rented",
      vendorId: data.vendor_id,
      vendorName: "Vendor",
      renterId: data.renter_id,
      renterName: "You",
      startDate: data.start_date,
      endDate: data.end_date,
      quantity: data.quantity,
      totalPrice: data.total_price,
      status: data.status,
      createdAt: data.created_at,
    };
  },

  updateStatus: async (id: string, status: Rental["status"]): Promise<void> => {
    const { error } = await supabase
      .from("rentals")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(`Error updating rental status:`, error);
      throw error;
    }
  },

  initializePayment: async (rentalId: string) => {
    const { data, error } = await supabase.functions.invoke("initialize-payment", {
      body: { rentalId },
    });

    if (error) {
      console.error("Error initializing payment:", error);
      throw error;
    }

    return data;
  }
};

// User services
export const usersService = {
  getAll: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (error) {
      console.error("Error fetching users:", error);
      throw error;
    }

    return data.map((profile: any) => ({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      phone: profile.phone,
      address: profile.address,
      createdAt: profile.created_at,
    }));
  },

  updateProfile: async (id: string, profile: Partial<User>): Promise<User> => {
    const updateData: any = {};
    if (profile.name) updateData.name = profile.name;
    if (profile.phone) updateData.phone = profile.phone;
    if (profile.address) updateData.address = profile.address;
    
    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating profile:`, error);
      throw error;
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone,
      address: data.address,
      createdAt: data.created_at,
    };
  }
};
