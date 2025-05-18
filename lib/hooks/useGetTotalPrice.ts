import React from "react";
import { useGetCartItems } from "./useGetCartItems";

export function useGetTotalPrice() {
    const query = useGetCartItems();
  const totalCartPrice = React.useMemo(() => {
    if (!query.data) return 0;
    
    return query.data.reduce((acc, item) => {
      return acc + item.itemPrice;
    }, 0);
  }, [query.data]);

  return totalCartPrice
}

