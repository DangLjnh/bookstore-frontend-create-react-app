import Button from "components/button/Button";
import CartCoupon from "components/cart/CartCoupon";
import CartItem from "components/cart/CartItem";
import Table from "components/table/Table";
import React from "react";
import CartTotal from "./CartTotal";

const CartPage = () => {
  return (
    <div className="container">
      <Table className="">
        <thead className="border-b">
          <tr>
            <th className="w-0 !px-0 !py-0"></th>
            <th className="w-0 !px-0 !py-0"></th>
            <th>Name</th>
            <th>Slug</th>
            <th className="w-[20%]">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="border-b">
          <CartItem></CartItem>
        </tbody>
      </Table>
      <div className="flex items-center justify-between my-10">
        <CartCoupon></CartCoupon>
        <Button
          className={"px-8 py-3 uppercase tracking-wide"}
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Update basket
        </Button>
      </div>
      <CartTotal></CartTotal>
    </div>
  );
};

export default CartPage;
