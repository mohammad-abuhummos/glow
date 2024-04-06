"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Product from "@/components/Product/Product";
import productData from "@/data/Product.json";
import useLoginPopup from "@/store/useLoginPopup";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface Props {
  props: string;
}

const AppMenu: React.FC<Props> = ({ props }) => {
  const pathname = usePathname();
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const { openModalCart } = useModalCartContext();
  const { cartState } = useCart();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalSearch } = useModalSearchContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`/search-result?query=${value}`);
    setSearchKeyword("");
  };

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    // Gắn sự kiện cuộn khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const handleGenderClick = (gender: string) => {
    router.push(`/shop/breadcrumb1?gender=${gender}`);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/shop/breadcrumb1?category=${category}`);
  };

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  return (
    <>
      <div
        className={`header-menu style-one ${
          fixedHeader ? " fixed" : "relative"
        } w-full md:h-[74px] h-[56px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex items-center justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            <Link href={"/"} className="flex items-center lg:hidden">
              <div className="heading4">GLOW</div>
            </Link>

            <div className="form-search relative max-lg:hidden z-[1]">
              <Link href={"https://www.instagram.com/"} target="_blank">
                <i className="icon-instagram text-black text-2xl"></i>
              </Link>
            </div>
            <div className="menu-main h-full xl:w-full flex items-center justify-center max-lg:hidden xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center gap-8 h-full">
                <li className="h-full relative">
                  <Link
                    href={"/"}
                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 
                                            ${
                                              pathname.includes("/")
                                                ? "active"
                                                : ""
                                            }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="h-full relative">
                  <Link
                    href={"/Products"}
                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 
                                            ${
                                              pathname.includes("/Products")
                                                ? "active"
                                                : ""
                                            }`}
                  >
                    Products
                  </Link>
                </li>
                <li className="h-full flex items-center justify-center logo">
                  <Link href={"/"} className="heading4">
                    GLOW
                  </Link>
                </li>
                <li className="h-full relative">
                  <Link
                    href={"/Products"}
                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 
                                            ${
                                              pathname.includes("/About")
                                                ? "active"
                                                : ""
                                            }`}
                  >
                    About us
                  </Link>
                </li>
                <li className="h-full relative">
                  <Link
                    href={"/Products"}
                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 
                                            ${
                                              pathname.includes("/Contact")
                                                ? "active"
                                                : ""
                                            }`}
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="right flex gap-12 relative z-[1]">
              <div className="list-action flex items-center gap-4">
                <div
                  className="max-md:hidden wishlist-icon flex items-center cursor-pointer"
                  onClick={openModalWishlist}
                >
                  <Icon.Heart size={24} color="black" />
                </div>
                <div
                  className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                  onClick={openModalCart}
                >
                  <Icon.Handbag size={24} color="black" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    {cartState.cartArray.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl font-semibold text-center"
                >
                  Anvogue
                </Link>
              </div>

              <div className="list-nav mt-6">
                <ul></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppMenu;
