import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { v4 } from "uuid";

const CartItem = ({ cartList, setCartList }) => {
  const handleMinus = (id) => {
    const updateCart = cartList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartList(updateCart);
    localStorage.setItem("carts", JSON.stringify(updateCart));
  };
  const handlePlus = (id) => {
    const updateCart = cartList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartList(updateCart);
    localStorage.setItem("carts", JSON.stringify(updateCart));
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleted = cartList.filter((item) => {
          return item.id !== id;
        });
        setCartList(deleted);
        localStorage.removeItem("carts");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        // if (res) {
        //   getAllProduct();
        // }
      }
    });
  };
  return (
    <>
      {cartList?.map((item) => {
        return (
          <tr key={v4()}>
            <td
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              X
            </td>
            <td className="w-[120px] h-[160px]">
              <img
                src={item.image_url}
                alt=""
                width="600"
                className="object-cover w-full h-full"
              />
            </td>
            <td className="max-w-[200px]">{item.name}</td>
            <td> ${item.price}</td>
            <td>
              <div className="inline-block gap-x-5 bg-slate-200">
                <div className="flex items-center justify-center gap-x-5">
                  <button
                    className="w-10 h-10 transition-all hover:bg-slate-100"
                    onClick={() => handleMinus(item.id)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="w-10 h-10 transition-all hover:bg-slate-100"
                    onClick={() => handlePlus(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </td>
            <td>${item.price * item.quantity}</td>
          </tr>
        );
      })}
    </>
  );
};

export default CartItem;
