
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Item } from "@/types";
import { Link } from "react-router-dom";
import { formatNairaPrice } from "@/utils/price-formatter";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden card-hover-effect animate-fade-in">
      <Link to={`/listings/${item.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-muted relative">
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0]}
              alt={item.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link to={`/listings/${item.id}`} className="block">
            <h3 className="font-semibold hover:text-brand transition-colors line-clamp-1">{item.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div>
          <p className="text-lg font-bold">{formatNairaPrice(item.price)}/day</p>
          <p className="text-xs text-muted-foreground">{item.quantity} available</p>
        </div>
        <Button asChild size="sm" className="bg-brand hover:bg-brand-dark button-hover-effect">
          <Link to={`/listings/${item.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
