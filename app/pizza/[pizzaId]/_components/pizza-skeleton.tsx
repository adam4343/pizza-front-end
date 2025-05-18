"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/common/container";

export default function PizzaPageSkeleton() {
  return (
    <section className="pt-10">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[46px]">
          <div className="w-full lg:w-[570px] aspect-square p-9 bg-secondary rounded-[20px]">
            <Skeleton className="w-full h-full rounded-[20px]" />
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <div>
              <Skeleton className="h-10 w-3/4 mb-3" />
              <Skeleton className="h-5 w-1/3" />
            </div>

            {/* Pizza Attributes */}
            <div className="flex flex-col gap-4">
              {[1, 2].map((_, i) => (
                <div className="flex gap-3" key={i}>
                  {[1, 2, 3].map((__, j) => (
                    <Skeleton
                      key={j}
                      className="h-[40px] w-[80px] rounded-[30px]"
                    />
                  ))}
                </div>
              ))}
            </div>

            <div>
              <Skeleton className="h-6 w-1/4 mb-4" />
              <div className="flex gap-4">
                {[1, 2, 3].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-[150px] h-[100px] rounded-[12px]"
                  />
                ))}
              </div>
            </div>

            <div className="max-w-[297px]">
              <Skeleton className="h-[55px] w-full rounded-md" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Skeleton className="h-6 w-[200px] mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-square w-full rounded-[16px]" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
