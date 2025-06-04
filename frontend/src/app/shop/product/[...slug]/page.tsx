'use client';

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product_API } from "@/lib/constant/customer-url";
import { ProductInterface } from "@/lib/interfaces/user-interface";
import apiMethodes from "@/lib/model/apimethods";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);
  const slugStr = slug.join("/");

  const { data: productData } = useQuery({
    queryKey: ["products-data", slugStr],
    queryFn: () =>
      apiMethodes.get<ProductInterface>(`${Product_API.GetById}/${slugStr}`),
    staleTime: 0,
    refetchOnWindowFocus: false,
    initialData: {} as ProductInterface,
  });

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.name ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        {/* <ProductListSec title="You might also like" data={relatedProductData} /> */}
      </div>
    </main>
  );
}
