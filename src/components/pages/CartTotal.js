import Button from "components/button/Button";
import Table from "components/table/Table";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotal } from "redux/slice/userSlice";

const CartTotal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = JSON.parse(localStorage.getItem("carts"));
  const [cartList, setCartList] = useState(carts);
  const { total } = useSelector((state) => state.user);
  useEffect(() => {
    const sub = cartList.reduce((acc, val) => {
      return (acc += val.quantity * val.price);
    }, 0);
    dispatch(setTotal(sub));
  }, []);
  return (
    <div className="cart-total">
      <h2 className="text-[30px] font-semibold ">Basket totals</h2>
      <Table className={" my-5"}>
        <tbody>
          <tr className="border-b">
            <th className="w-[20%] font-medium ">Subtotal</th>
            <td className="">${total}</td>
          </tr>
          <tr className="border-b">
            <th className="w-[20%] font-medium">Shipping</th>
            <td className="">
              <p>Flat rate: $30.00</p>
              <p>Shipping to Vietnam.</p>
            </td>
          </tr>
          <tr>
            <th className="w-[20%] font-medium">Total</th>
            <td className="!font-bold">${total + 30000}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        className={"px-12 py-3 uppercase tracking-wide"}
        onClick={() => navigate("/checkout")}
      >
        Proceed to checkout
      </Button>
    </div>
  );
};

export default CartTotal;
