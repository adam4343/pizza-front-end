import { TAdditionalIngredient, TPizza, TPizzaVariation } from "./TPizza";

export interface TCartItem {
    id: number;
    quantity: number;
    pizzaId: number;
    pizzaVariationId: number;
    userId: number;
    pizza: TPizza;
    pizzaVariation: TPizzaVariation;
    ingredients: Ingredient[]
    additionalIngredients: AdditionalIngredient[]
    itemPrice: number
  }

  export interface Ingredient {
    cartItemId: number
    ingredientId: number
    createdAt: string
    updatedAt: string
  }
  
  export interface AdditionalIngredient {
    cartItemId: number
    additionalIngredientId: number
    createdAt: string
    updatedAt: string
    additionalIngredient: TAdditionalIngredient
  }
  
 