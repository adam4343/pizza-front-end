export interface TPizza {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  pizzaToIngredients: PizzaToIngredient[];
  pizzaToVariations: PizzaToVariation[];
}

export interface PizzaToIngredient {
  pizzaId: number;
  ingredientId: number;
  ingredient: TIngredient;
}

export interface TIngredient {
  id: number;
  name: string;
  isRemovable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PizzaToVariation {
  pizzaId: number;
  pizzaVariationId: number;
  pizzaVariation: TPizzaVariation;
}

export interface TPizzaVariation {
  id: number;
  image: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  pizzaVariationToIngredients: PizzaVariationToIngredient[];
  pizzaVariationToAdditional: PizzaVariationToAdditional[];
  pizzaVariationToAttribute: PizzaVariationToAttribute[];
}

export interface PizzaVariationToIngredient {
  pizzaVariationId: number;
  ingredientId: number;
  ingredient: TIngredient;
}

export interface PizzaVariationToAdditional {
  pizzaVariationId: number;
  additionalIngredientId: number;
  additionalIngredient: TAdditionalIngredient;
}

export interface TAdditionalIngredient {
  id: number;
  image: string;
  name: string;
  price: number;
}

export interface PizzaVariationToAttribute {
  pizzaVariationId: number;
  attributeId: number;
  attribute: TAttribute;
}

export interface TAttribute {
  id: number;
  type: string;
  name: string;
}
