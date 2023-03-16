import axios from "axios";
import Button from "components/button/Button";
import Input from "components/input/Input";
import Label from "components/input/Label";
import Table from "components/table/Table";
import Texarea from "components/texarea/Texarea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { total } = useSelector((state) => state.user);
  const [bookList, setBookList] = useState([]);
  const books = JSON.parse(localStorage.getItem("carts"));
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    // formState: { errors, isValid },
    // watch,
    reset,
    // register,
    //mac dinh
  } = useForm({
    mode: onchange,
    // defaultValues: {
    //   status: status.approve,
    // },
    // resolver: yupResolver(schema),
  });
  const handleCreateBill = async (val) => {
    console.log("🚀 ~ file: CheckoutPage.js:37 ~ handleCreateBill ~ val:", val);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/bill`,
      { ...val, total_price: total }
    );
    if (res) {
      toast.success("Order successfully!");
      navigate("/");
    }
  };
  useEffect(() => {
    setBookList(books);
  }, []);
  return (
    <form className="container" onSubmit={handleSubmit(handleCreateBill)}>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-[30px] font-semibold">Billing details</h2>
          <h2 className="text-[30px] font-semibold">Your product</h2>
        </div>
        <div className="flex items-start justify-between gap-x-10">
          <div className="w-[50%]">
            <div className="flex items-center justify-center my-10 gap-x-5">
              <div className="w-full h-full">
                <Label className={"mb-2 !text-base"} name="firstName">
                  First name *
                </Label>
                <Input
                  type="text"
                  name={"first_name"}
                  control={control}
                  className="w-full h-full px-4 py-3 leading-tight text-gray-700 border-2 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full h-full">
                <Label className={"mb-2 !text-base"} name="lastName">
                  Last name *
                </Label>
                <Input
                  type="text"
                  name={"last-name"}
                  control={control}
                  className="w-full h-full px-4 py-3 leading-tight text-gray-700 border-2 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex items-center justify-center my-10 gap-x-5">
              <div className="w-full h-full">
                <Label className={"mb-2 !text-base"} name="firstName">
                  Email
                </Label>
                <Input
                  control={control}
                  name={"email"}
                  type="text"
                  className="w-full h-full px-4 py-3 leading-tight text-gray-700 border-2 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full h-full">
                <Label className={"mb-2 !text-base"} name="lastName">
                  Phone
                </Label>
                <Input
                  type="text"
                  control={control}
                  name={"phone_number"}
                  className="w-full h-full px-4 py-3 leading-tight text-gray-700 border-2 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="w-full h-full my-10">
              <Label className={"mb-2 !text-base"} name="firstName">
                Address
              </Label>
              <Input
                name={"address"}
                control={control}
                type="text"
                className="w-full h-full px-4 py-3 leading-tight text-gray-700 border-2 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full h-full">
              <Label className={"mb-2 !text-base"} name="firstName">
                Order notes (optional)
              </Label>
              <Texarea control={control} name="note"></Texarea>
              {/* <textarea
                name="order_comments"
                className="w-full h-[150px] p-3 text-gray-700 border-2 rounded"
                id="order_comments"
                placeholder="Notes about your order, e.g. special notes for delivery."
                rows="2"
                cols="5"
                spellCheck="false"
              ></textarea> */}
            </div>
          </div>
          <div className="w-[50%] h-full]">
            <Table className={"my-5"}>
              <tbody>
                <tr className="border-b">
                  <td className="">Product</td>
                  <td className="">Subtotal</td>
                </tr>
                <tr className="border-b">
                  {bookList?.map((item) => {
                    return (
                      <>
                        <td className="">
                          {item?.name} × <span>{item?.quantity}</span>
                        </td>
                        <td className="">${item.quantity * item.price}</td>
                      </>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="">Shipping</td>
                  <td className="">$300000</td>
                </tr>
                <tr className="border-b">
                  <td className="">Total</td>
                  <td className="!font-bold">${total + 300000}</td>
                </tr>
              </tbody>
            </Table>
            <p className="py-5 text-sm text-center border-b text-lightGray">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy
            </p>
            <div className="text-right">
              <Button
                type="submit"
                className={"px-12 py-3 my-5 uppercase tracking-widest "}
                onClick={() => navigate("/checkout")}
              >
                Place order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
