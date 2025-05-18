'use client'
import { TPizza } from "@/types/TPizza";
import { Container } from "../common/container";
import { Title } from "./title";
import { ProductCard } from "../common/product-card";
import { useInView } from "react-intersection-observer";
import React from "react";

export function PizzaSection({
  category,
  pizzas,
  setActiveSection
}: {
  category: string;
  pizzas: TPizza[];
  setActiveSection: (section: string) => void

}) {
  const { ref, inView } = useInView({
    threshold: 1, 
  });
  React.useEffect(() => {
    if (inView) {
      setActiveSection(category);
    }
  }, [inView, category, setActiveSection]);
  return (
    <section ref={ref} id={category}>
      <Container>
        <Title text={category} size="lg" className="text-2xl font-bold mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pizzas.map((pizza) => (
            <ProductCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </Container>
    </section>
  );
}
