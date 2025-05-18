import { Container } from "@/components/common/container";
import { Title } from "@/components/shared/title";
import { SearchFilters } from "./_components/search-filters";
import SearchedProducts from "./_components/searched-products";
import { MobileFilterDialog } from "./_components/mobile-filter-dialog";
import { Suspense } from "react";

export default async function Search(pageProps: {
  searchParams: Promise<{
    search: string;
  }>;
}) {
  const query = (await pageProps.searchParams).search ?? "";

  return (
    <>
      <section className="py-5 md:py-8">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Title
              size="2xl"
              className="text-xl md:text-2xl font-bold break-words"
              text={`Search Result for: ${query}`}
            />

            <MobileFilterDialog />
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-[62px]">
            <div className="hidden md:block w-full md:w-[220px] lg:w-[244px] flex-shrink-0">
              <Suspense fallback={<p>Loading search params...</p>}>
                <SearchFilters />
              </Suspense>
            </div>

            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
                <Suspense fallback={<p>Loading search params...</p>}>
                  <SearchedProducts />
                </Suspense>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
