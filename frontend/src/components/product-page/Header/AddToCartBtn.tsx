"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { AddToCartRequest, ProductInterface } from "@/lib/interfaces/user-interface";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import apiMethodes from "@/lib/model/apimethods";
import { Order_API } from "@/lib/constant/customer-url";
import { data } from "framer-motion/client";
import auth from "@/lib/model/auth";

const AddToCartBtn = ({ data }: { data: ProductInterface & { quantity: number } }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = auth.getToken();
    setIsLoggedIn(!!token);
  }, [auth.getToken]);
  const addToCartMutation = useMutation({
    mutationKey: ['add-to-cart'],
    mutationFn: (data: AddToCartRequest) => apiMethodes.post(Order_API.AddToCart, data),
    onSuccess: () => {
      toast.success('Product has been added to your cart')
      router.push('/cart')
    },
    onError: () => {
      toast.error('Please try again later')
    }

  })
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error("Please Login")
    }
    const finalData: AddToCartRequest = { productId: data.id, quantity: data.quantity }
    addToCartMutation.mutate(finalData)
  }
  return (
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
