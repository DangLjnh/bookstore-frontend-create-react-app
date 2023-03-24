import axios from "axios";
import BookItem from "components/book/BookItem";
import SidebarCategory from "components/sidebar/SidebarCategory";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { setCart } from "redux/slice/userSlice";
import { v4 } from "uuid";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [bookList, setBookList] = useState();

  const { carts } = useSelector((state) => state.user);
  if (search) {
  }
  const handleBookListCategory = async (item) => {
    const res = await axios.get(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/admin/category/product/${search.slice(4)}`
    );
    if (res) {
      setBookList(...res.data.product_infos);
    }
  };
  const getAllBook = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/product`
    );
    setBookList(res.data);
  };
  useEffect(() => {
    if (search) {
      handleBookListCategory();
    } else {
      getAllBook();
    }
  }, []);

  const handleAddToCart = (item) => {
    const index = carts.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      dispatch(setCart([...carts, { ...item, quantity: 1 }]));
      localStorage.setItem(
        "carts",
        JSON.stringify([...carts, { ...item, quantity: 1 }])
      );
    } else {
      const updatedItem = {
        ...carts[index],
        quantity: carts[index].quantity + 1,
      };
      const updatedCartItems = [
        ...carts.slice(0, index),
        updatedItem,
        ...carts.slice(index + 1),
      ];
      dispatch(setCart(updatedCartItems));
      localStorage.setItem("carts", JSON.stringify(updatedCartItems));
    }
    toast.success(`Add ${item.name.toLowerCase()} to cart successfully!`);
  };
  return (
    <>
      <div className="container flex justify-between gap-x-5">
        <SidebarCategory className="mt-14"></SidebarCategory>
        <div className="mt-14 max-w-[1000px]">
          <div className="flex items-center justify-between mb-10">
            <p>Showing all 20 results</p>
            <p>View all</p>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {/* {bookList?.map((item) => {
              return (
                <BookItem
                  key={v4()}
                  id={item?.id}
                  title={item?.productInfo?.name}
                  author={item?.productInfo?.author_name}
                  imageURL={item?.productInfo?.image_url}
                  price={item?.productInfo?.price}
                  slug={item?.productInfo?.slug}
                  handleAddToCart={() => handleAddToCart(item?.productInfo)}
                  // isExistCart={itemExistCart(item.id)}
                ></BookItem>
              );
            })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
