import {
  TPizza,
  TPizzaVariation,
} from "./TPizza";
import { AdditionalIngredient, Ingredient } from "./TCart";

export type TOrder = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  timeOfDelivery: Date;
  totalPrice: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  pizzaId: number;
  pizzaVariationId: number;
  ingredientsId: number[];
  additionalIngredientsId: number[];
  orderItem: TOrderItem[];
};


export interface TOrderItem {
  id: number;
  quantity: number;
  pizzaId: number;
  pizzaVariationId: number;
  userId: number;
  pizza: TPizza;
  pizzaVariation: TPizzaVariation;
  ingredients: Ingredient[];
  additionalIngredients: AdditionalIngredient[];
  itemPrice: number;
}
