import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductInterface } from "@/lib/interfaces/user-interface";

type ProductCardProps = {
  data: ProductInterface;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/product/${data.id}`}
      className="flex flex-col items-start aspect-auto"
    >
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={data.imageUrl}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.name}
          priority
          unoptimized
        />
      </div>
      <strong className="text-black xl:text-xl">{data.name}</strong>
       
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
        (
          
          <span className="font-bold text-black text-xl xl:text-2xl">
            ${data.price.toFixed(2)}
          </span>
        )

       
       
      </div>
      
        <div>
           <span className=" text-base">
            {data.description.slice(0,30)}
          </span>
        </div>
    </Link>
  );
};

export default ProductCard;
