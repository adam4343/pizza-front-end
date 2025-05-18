'use client'
import { useGetPizzaType } from "@/lib/hooks/useGetPizzaType";
import { Tabs } from "../ui";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Container } from "./container";
import React from "react";

interface Props {
  activeSection: string | null,
  setActiveSection: (activeSection: string) => void;
}

export function IntersectionNav({ activeSection, setActiveSection }: Props) {
  const query = useGetPizzaType();

  React.useEffect(() => {
    if (!activeSection && query.data?.length) {
      setActiveSection(query.data[0]);
    }
  }, [activeSection, query.data, setActiveSection]);

  if (query.isLoading) {
    return (
      <section className="sticky top-0 z-50 bg-white-color py-5 hidden sm:block">
        <Container>
          <div className="flex gap-[5px] w-full bg-muted/30 text-lg p-2 h-[55px] rounded-lg animate-pulse overflow-hidden max-w-[480px]">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="h-full w-[80px] rounded-md bg-muted" />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="sticky top-0 z-50 bg-white-color py-8 hidden sm:block">
      <Container>
        <Tabs
          value={activeSection ?? ""}
          onValueChange={(val) => {
            setActiveSection(val);
            const el = document.getElementById(val);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          defaultValue={activeSection ?? ""}
          className="w-fit"
        >
          <TabsList className="flex gap-[5px] w-full bg-muted/30 text-lg p-2 h-[55px]">
            {query.data?.map((type, index) => (
              <TabsTrigger
                className="py-[10px] px-4 h-full font-bold"
                key={index}
                value={type}
                onClick={() => setActiveSection(type)}
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </Container>
    </section>
  );
}
