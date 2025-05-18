import { Container } from "@/components/common/container";
import React, { Suspense } from "react";
import Pizza from "./pizza";
import PizzaPageSkeleton from "./_components/pizza-skeleton";

export default async function PizzaPage({
  params,
  searchParams,
}: {
  params: Promise<{ pizzaId: string }>;
  searchParams: Promise<{ pizzaVariation: string }>;
}) {
  const {pizzaId} = await params;
  const {pizzaVariation} = await searchParams;
  return (
    <section className="pt-10">
      <Container>
        <Suspense fallback={<PizzaPageSkeleton />}>
          <Pizza pizzaId={pizzaId} pizzaVariation={pizzaVariation} />
        </Suspense>
      </Container>
    </section>
  );
}
