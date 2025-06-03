"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiMethodes from "@/lib/model/apimethods";
import { Order_API } from "@/lib/constant/customer-url";
import { CartItemWithProduct } from "@/lib/interfaces/user-interface";
import toast from "react-hot-toast";

export default function CartPage() {
  const queryClient = useQueryClient();
const { data = [], refetch } = useQuery<CartItemWithProduct[]>({
  queryKey: ['cart-data'],
  queryFn: () => apiMethodes.get(Order_API.GetCart),
  refetchOnWindowFocus: false,
  initialData: [],
});

const checkOutMutation = useMutation({
  mutationKey: ['check-out'],
  mutationFn: () => apiMethodes.post(Order_API.Checkout),
  onSuccess: () => {
      queryClient.setQueryData(['cart-data'], []);
    refetch(); // Re-fetch cart items after order placed
    toast.success('Your Order has been placed successfully');
  },
  onError: () => {
    toast.error('Error while placing order');
  },
});

const calculateSubtotal = (data: CartItemWithProduct[]): number =>
  data.reduce((sum, item) => sum + item.quantity * item.productDetails.price, 0);

const handlePlaceOrder = () => {
  checkOutMutation.mutate();
};

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {data && data.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              your cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {data?.map((cartData, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={cartData} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl font-bold">{`$${calculateSubtotal(data).toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl font-bold">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold">
                     {`$${calculateSubtotal(data).toFixed(2)}`}
                    </span>
                  </div>
                </div>
            
                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                  onClick={handlePlaceOrder}
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
