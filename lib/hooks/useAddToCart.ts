import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { toast } from "sonner";
import { useGetCartItems } from "./useGetCartItems";
import { useRouter } from "next/navigation";
import { cartOpenKey } from "../../components/common/shoppig-cart";
import { useUpdateCartQuant } from "./useUpdateCartQuant";


export function useAddToCart() {
    const router = useRouter()
    const query = useGetCartItems()
    const updateQuantity = useUpdateCartQuant()

    return useMutation({
        mutationFn: async (data: {
            pizzaId: number;
            pizzaVariationId: number;
            ingredientsId: number[];
            additionalIngredientsId?: number[];
        }) => {

            const foundCartItem = query.data?.find(cartItem => {
                console.log('\nChecking cart item:', cartItem.id);
                console.log('Cart item pizza:', cartItem.pizza.id, 'vs new pizza:', data.pizzaId);
                console.log('Cart item variation:', cartItem.pizzaVariation.id, 'vs new variation:', data.pizzaVariationId);

                // Check pizza and variation match
                if (cartItem.pizza.id !== data.pizzaId || cartItem.pizzaVariation.id !== data.pizzaVariationId) {
                    console.log('Pizza or variation mismatch - skipping');
                    return false;
                }

                // Get all ingredient IDs from the cart item
                const cartIngredients = cartItem.ingredients.map(i => i.ingredientId);
                // Get all additional ingredient IDs from the cart item
                const cartAdditional = cartItem.additionalIngredients.map(a => a.additionalIngredientId);

                console.log('Cart ingredients:', cartIngredients);
                console.log('New ingredients:', data.ingredientsId);
                console.log('Cart additional:', cartAdditional);
                console.log('New additional:', data.additionalIngredientsId);

                // Check if ingredients match (consider empty arrays)
                const ingredientsMatch = 
                    (data.ingredientsId?.length === 0 && cartIngredients.length === 0) ||
                    (data.ingredientsId?.every(id => cartIngredients.includes(id)) && 
                    cartIngredients.every(id => data.ingredientsId?.includes(id)));

                // Check if additional ingredients match (consider undefined/empty arrays)
                const additionalMatch = 
                    (!data.additionalIngredientsId && cartAdditional.length === 0) ||
                    (data.additionalIngredientsId?.length === 0 && cartAdditional.length === 0) ||
                    (data.additionalIngredientsId?.every(id => cartAdditional.includes(id)) && 
                    cartAdditional.every(id => data.additionalIngredientsId?.includes(id)));

                console.log('Ingredients match:', ingredientsMatch);
                console.log('Additional ingredients match:', additionalMatch);

                const fullMatch = ingredientsMatch && additionalMatch;
                console.log('Full match:', fullMatch);

                return fullMatch;
            });

            if (foundCartItem) {
                console.log('Found matching cart item:', foundCartItem.id, 'with quantity:', foundCartItem.quantity);
                console.log('Updating quantity to:', foundCartItem.quantity + 1);
                updateQuantity.mutate({ cartItemId: foundCartItem.id, quantity: foundCartItem.quantity + 1 });
                return foundCartItem.id;
            }

            console.log('No matching cart item found - creating new one');
            const res = await axiosInstance.post("/cart", {
                pizzaId: data.pizzaId,
                pizzaVariationId: data.pizzaVariationId,
                ingredientsId: data.ingredientsId,
                additionalIngredientsId: data.additionalIngredientsId
            });
            console.log('New cart item created:', res.data.data);
            return res.data.data as string;
        },
        onSuccess: (data) => {
            console.log('Add to cart successful, refetching cart:', data);
            query.refetch().then(() => {
                const urlSearch = new URLSearchParams(window.location.search);
                urlSearch.set(cartOpenKey, "true");
                router.push(window.location.pathname + "?" + urlSearch.toString());
            });
        },
        onError: (e) => {
            console.error('Add to cart error:', e);
            toast.error(e.message);
        }
    });
}