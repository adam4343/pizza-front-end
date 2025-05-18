"use client";
import useGetAllPizza from "@/lib/hooks/useGetAllPizza";
import { StoriesCarousel } from "./stories-carousel";
import { IntersectionNav } from "../common/intersection-nav";
import React from "react";
import { PizzaSection } from "./pizza-section";
import { TPizza } from "@/types/TPizza";
import { Container } from "../common/container";
import { Skeleton } from "../ui/skeleton";

export function HomePage() {
  const query = useGetAllPizza();

  const pizzaSections = React.useMemo(() => {
    const categorizedPizza = new Map();

    query.data?.forEach((pizza) => {
      if (categorizedPizza.has(pizza.type)) {
        categorizedPizza.set(pizza.type, [
          ...categorizedPizza.get(pizza.type),
          pizza,
        ]);
      } else {
        categorizedPizza.set(pizza.type, [pizza]);
      }
    });

    return Object.fromEntries(categorizedPizza) as Record<string, TPizza[]>;
  }, [query.data]);

  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    const firstKey = Object.keys(pizzaSections)[0];
    if (firstKey && !activeSection) {
      setActiveSection(firstKey);
    }
  }, [pizzaSections, activeSection]);

  return (
    <main className="min-h-screen">
      <StoriesCarousel />
      <IntersectionNav
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="flex flex-col gap-10 pt-5 lg:pt-0 pb-5">
        {query.isLoading ? (
          <section>
            <Container>
              <div className="mb-6">
                <Skeleton className="h-8 w-1/3" />{" "}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center  px-[37px] py-6 justify-center mb-4 rounded-[15px] h-[212px]">
                      <Skeleton className="w-[212px] h-[212px] rounded-md" />
                    </div>

                    <div className="mb-3">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>

                    <div className="flex md:items-center justify-between flex-col md:flex-row gap-2">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-9 w-full md:w-[125px] rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : (
          Object.entries(pizzaSections)
            .sort((a, b) => b[1].length - a[1].length)
            .map(([category, pizzas], id) => (
              <PizzaSection
                setActiveSection={setActiveSection}
                key={id}
                category={category}
                pizzas={pizzas}
              />
            ))
        )}
      </div>
    </main>
  );
}
