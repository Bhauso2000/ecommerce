"use client";

import { ProductInterface } from "@/lib/interfaces/user-interface";
import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";

const PhotoSection = ({ data }: { data: ProductInterface }) => {

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">


      <div className="flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            width={444}
            height={530}
            alt="Product"
          />
        ) : (
          <div className="w-[444px] h-[530px] flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default PhotoSection;
