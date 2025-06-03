"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { updatePagination } from "@/app/shop/product/paginationSlice";
import auth from "@/lib/model/auth";
import { FiLogOut, FiPackage, FiPlus } from "react-icons/fi";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Men's clothes",
        url: "/shop#men-clothes",
        description: "In attractive and spectacular colors and designs",
      },
      {
        id: 12,
        label: "Women's clothes",
        url: "/shop#women-clothes",
        description: "Ladies, your style and tastes are important to us",
      },
      {
        id: 13,
        label: "Kids clothes",
        url: "/shop#kids-clothes",
        description: "For all ages, with happy and beautiful colors",
      },
      {
        id: 14,
        label: "Bags and Shoes",
        url: "/shop#bag-shoes",
        description: "Suitable for men, women and all tastes and styles",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop#on-sale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop#new-arrivals",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Brands",
    url: "/shop#brands",
    children: [],
  },
];

const TopNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.pagination.search);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = auth.getToken();
    setIsLoggedIn(!!token);
  }, [auth.getToken]);

  const handleLogout = () => {
    auth.destroy(); // Implement this in your auth utils
    setIsLoggedIn(false);
    router.push("/"); // or "/signin"
  };

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            Ecommerce
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* SEARCH INPUT */}
        <form className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup>
            <InputGroup.Text>
              <Image
                priority
                src="/icons/search.svg"
                height={20}
                width={20}
                alt="search"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="search"
              name="search"
              value={search}
              onChange={(e) =>
                dispatch(updatePagination({ search: e.target.value, page: 1 }))
              }
              placeholder="Search for products..."
              className="bg-transparent placeholder:text-black/40"
            />
          </InputGroup>
        </form>

        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />

          {isLoggedIn ? (
            <>
              <Link href="/account" className="p-1">
                <Image
                  priority
                  src="/icons/user.svg"
                  height={100}
                  width={100}
                  alt="Account"
                  className="max-w-[22px] max-h-[22px]"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="ml-3 p-1 text-red-600 hover:text-red-700"
                title="Logout"
              >
                <FiLogOut size={22} />
              </button>
              <Link href="/order-history" className="ml-3 p-1 text-blue-600 hover:text-blue-700" title="Order History">
                <FiPackage size={22} />
              </Link>
              <Link href="/product" className="ml-3 p-1 text-blue-600 hover:text-blue-700" title="Add Product">
                <FiPlus size={22} />
              </Link>
            </>
          ) : (
            <Link href="/login" className="p-1">
              <Image
                priority
                src="/icons/user.svg"
                height={100}
                width={100}
                alt="Sign In"
                className="max-w-[22px] max-h-[22px]"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
