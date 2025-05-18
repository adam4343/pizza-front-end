import { notFound } from "next/navigation";
import SinglePizza from "./_components/single-pizza";
import { axiosInstance } from "@/lib/configs/axios.config";
import { TPizza } from "@/types/TPizza";
import RecomendedPizzas from "./_components/recomended-pizzas";

async function getPizzaData(pizzaId: string) {
  try {
    const res = await axiosInstance.get(`/pizza/${pizzaId}`);
    return res.data.data as TPizza;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function Pizza({ pizzaId, pizzaVariation }: { pizzaId: string, pizzaVariation: string }) {
  const pizza = await getPizzaData(pizzaId);

  if (!pizza) {
    notFound();
  }


  return (
    <>
      <SinglePizza pizza={pizza} pizzaVariation={pizzaVariation} />
      <div className="pb-5">
        <RecomendedPizzas pizza={pizza} />
      </div>
    </>
  );
}
