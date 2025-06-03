'use client';

import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ProductPaginationResponse } from "@/lib/interfaces/user-interface";
import { useQuery } from "@tanstack/react-query";
import apiMethodes from "@/lib/model/apimethods";
import { Product_API } from "@/lib/constant/customer-url";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { updatePagination } from "./product/paginationSlice";

export default function ShopPage() {
  const { limit, page, search, order } = useAppSelector((state: RootState) => state.pagination);
  const dispatch = useAppDispatch();

  const { data: productData } = useQuery({
    queryKey: ['products', page, limit, search, order],
    queryFn: () =>
      apiMethodes.get<ProductPaginationResponse>(
        `${Product_API.Pagination}?page=${page}&limit=${limit}&search=${search || ''}&order=${order}`
      ),
    staleTime: 0,
    refetchOnWindowFocus: false,
    initialData: {} as ProductPaginationResponse,
  });

  const totalPages = Math.ceil((productData?.total || 0) / limit);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {(page - 1) * limit + 1}-
                  {Math.min(page * limit, productData?.total || 0)} of {productData?.total || 0} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select
                    value={order} // order from Redux state
                    onValueChange={(value: 'asc' | 'desc') => dispatch(updatePagination({ order: value }))}
                  >
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />  {/* This is needed to display selected value */}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Low Price</SelectItem>
                      <SelectItem value="desc">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {productData?.data?.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>

            <hr className="border-t-black/10" />

            {totalPages > 1 && (
              <Pagination className="justify-between">
                <PaginationPrevious
                  href="#"
                  className="border border-black/10"
                  onClick={() => dispatch(updatePagination({ page: Math.max(1, page - 1) }))}
                />
                <PaginationContent>
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      Math.abs(pageNumber - page) <= 1
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            className="text-black/50 font-medium text-sm"
                            isActive={pageNumber === page}
                            onClick={() => dispatch(updatePagination({ page: pageNumber }))}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    if (
                      (pageNumber === 2 && page > 3) ||
                      (pageNumber === totalPages - 1 && page < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={`ellipsis-${pageNumber}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                </PaginationContent>
                <PaginationNext
                  href="#"
                  className="border border-black/10"
                  onClick={() => dispatch(updatePagination({ page: Math.min(totalPages, page + 1) }))}
                />
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
