"use client";

import React from "react";
import { PiTrashFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "../ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { CartItemWithProduct, ProductInterface } from "@/lib/interfaces/user-interface";

type ProductCardProps = {
  data:CartItemWithProduct;
};

const ProductCard = ({ data }: ProductCardProps) => {

  return (
    <div className="flex items-start space-x-4">
      <Link
        href={`/shop/product/${data.id}/${data.productDetails.name.split(" ").join("-")}`}
        className="bg-[#F0EEED] rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
      >
        <Image
          src={data.productDetails.imageUrl}
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={data.productDetails.imageUrl}
          priority
        />
      </Link>
      <div className="flex w-full self-stretch flex-col">
        <div className="flex items-center justify-between">
          <Link
            href={`/shop/product/${data.id}/${data.productDetails.name.split(" ").join("-")}`}
            className="text-black font-bold text-base xl:text-xl"
          >
            {data.productDetails.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9"
            
          >
            <PiTrashFill className="text-xl md:text-2xl text-red-600" />
          </Button>
        </div>
        
        <div className="flex items-center flex-wrap justify-between">
         
          <span>Quantity:{data.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
