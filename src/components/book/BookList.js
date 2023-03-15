import React, { useState } from "react";
import { useEffect } from "react";
import BookItem from "./BookItem";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "redux/slice/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const getAllBook = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/product`
    );
    setBookList(res.data);
  };

  useEffect(() => {
    getAllBook();
  }, []);
  const { carts } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  useEffect(() => {
    // if (localStorage.getItem("carts"))
    // const data = JSON.parse(localStorage.getItem("carts"));
    // dispatch(setCart()));
  }, [carts]);
  return (
    <div className="grid grid-cols-5 gap-10 mb-10">
      {bookList?.map((item) => {
        return (
          <BookItem
            key={v4()}
            id={item.id}
            title={item.productInfo.name}
            author={item.productInfo.author_name}
            imageURL={item.productInfo.image_url}
            price={item.productInfo.price}
            slug={item.productInfo.slug}
            handleAddToCart={() => handleAddToCart(item.productInfo)}
            // isExistCart={itemExistCart(item.id)}
          ></BookItem>
        );
      })}
    </div>
  );
};

export default BookList;
