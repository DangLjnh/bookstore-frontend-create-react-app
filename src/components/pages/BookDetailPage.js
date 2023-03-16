import axios from "axios";
import BookItem from "components/book/BookItem";
import Button from "components/button/Button";
import Counter from "components/counter/Counter";
import Delivery from "components/icon/Delivery";
import Question from "components/icon/Question";
import SecurityCard from "components/icon/SecurityCard";
import TickShield from "components/icon/TickShield";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const BookDetailPageStyle = styled.div`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
`;
const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const getSignleBook = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/product/${id}`
    );
    if (res) setBook(res?.data);
  };
  useEffect(() => {
    getSignleBook();
  }, []);
  // const books = bookList.filter((item) => {
  //   return item.slug === slug;
  // });
  // const bookDetail = Object.assign({}, ...books);
  return (
    <>
      {book && (
        <BookDetailPageStyle className="container">
          <div className="grid grid-cols-4 grid-rows-2 gap-10 my-10">
            <div className="w-full h-full">
              <img
                src={book?.productInfo?.image_url}
                alt=""
                className="object-cover w-full h-full rounded"
              />
            </div>
            <div className="col-span-2">
              <p className="uppercase tracking-[0.2rem] text-lightGray font-medium text-sm">
                BY {book?.productInfo?.author_name}
              </p>
              <h2 className="text-[40px] my-3 font-medium font-cormorant">
                {book?.productInfo?.name}
              </h2>
              <p className="text-[28px] font-medium font-cormorant">
                ${book?.productInfo?.price}
              </p>
              <p className="mt-5 mb-10">{book?.productInfo?.desc}</p>
              <div className="flex gap-x-5">
                <Counter></Counter>
                <Button className="px-48 py-4 text-lg">Add to cart</Button>
              </div>
              <p className="mt-10">SKU (stock): {book?.inStock?.quantity}</p>
              <p>Categories: Best Sellers, History, Love Stories</p>
            </div>
            <div className="h-full col-span-1 row-span-2">
              <div className="grid w-full grid-cols-1 gap-[30px] p-[30px] border">
                <div className="flex items-center justify-center gap-x-3">
                  <div className="w-[150px] h-[120px]">
                    <img
                      src="https://source.unsplash.com/random"
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="">
                    <p
                      title="Dark in Death: An Eve Dallas Novel (In Death, Book 46)"
                      className="mb-2 font-medium"
                    >
                      {"Dark in Death: An Eve Dallas Novel (In Death, Book 46)".slice(
                        0,
                        30
                      ) + "..."}
                    </p>
                    <p className="">$14.20</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-3">
                  <div className="w-[150px] h-[120px]">
                    <img
                      src="https://source.unsplash.com/random"
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="">
                    <p
                      title="Dark in Death: An Eve Dallas Novel (In Death, Book 46)"
                      className="mb-2 font-medium"
                    >
                      {"Dark in Death: An Eve Dallas Novel (In Death, Book 46)".slice(
                        0,
                        30
                      ) + "..."}
                    </p>
                    <p className="">$14.20</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-x-3">
                  <div className="w-[150px] h-[120px]">
                    <img
                      src="https://source.unsplash.com/random"
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="">
                    <p
                      title="Dark in Death: An Eve Dallas Novel (In Death, Book 46)"
                      className="mb-2 font-medium"
                    >
                      {"Dark in Death: An Eve Dallas Novel (In Death, Book 46)".slice(
                        0,
                        30
                      ) + "..."}
                    </p>
                    <p className="">$14.20</p>
                  </div>
                </div>
              </div>
              <div className="grid w-full mt-10 border">
                <div className="flex items-center justify-start gap-x-5 border-b p-[30px]">
                  <Delivery size="40" color="#f75454"></Delivery>
                  <div className="">
                    <p className="text-lg font-medium">Free Delivery</p>
                    <p className="tracking-wider">Orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-x-5 border-b p-[30px]">
                  <SecurityCard size="40" color="#f75454"></SecurityCard>
                  <div className="">
                    <p className="text-lg font-medium">Secure Payment</p>
                    <p className="tracking-wider">100% Secure Payment</p>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-x-5 border-b p-[30px]">
                  <TickShield size="40" color="#f75454"></TickShield>
                  <div className="">
                    <p className="text-lg font-medium">Money Back Guarantee</p>
                    <p className="tracking-wider">Within 30 Days</p>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-x-5 border-b p-[30px]">
                  <Question width={"40"} height="40" color="#f75454"></Question>
                  <div className="">
                    <p className="text-lg font-medium">24/7 Support</p>
                    <p className="tracking-wider">Within 1 Business Day</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 col-span-3 border-t">
              <div className="border-r p-[30px]">
                <p className="text-lg font-medium underline">Description</p>
              </div>
              <div className="p-[30px] col-span-3 flex flex-col gap-3">
                <p>
                  We aim to show you accurate product information.
                  Manufacturers, suppliers and others provide what you see here,
                  and we have not verified it. See our disclaimer
                </p>
                <p>#1 New York Times Bestseller</p>
                <p>A Reese Witherspoon x Hello Sunshine Book Club Pick</p>
                <p>
                  “I can’t even express how much I love this book! I didn’t want
                  this story to end!”–Reese Witherspoon
                </p>
                <p>“Painfully beautiful.”–The New York Times Book Review</p>
                <p>“Perfect for fans of Barbara Kingsolver.”–Bustle</p>
                <p>
                  For years, rumors of the “Marsh Girl” have haunted Barkley
                  Cove, a quiet town on the North Carolina coast. So in late
                  1969, when handsome Chase Andrews is found dead, the locals
                  immediately suspect Kya Clark, the so-called Marsh Girl. But
                  Kya is not what they say. Sensitive and intelligent, she has
                  survived for years alone in the marsh that she calls home,
                  finding friends in the gulls and lessons in the sand. Then the
                  time comes when she yearns to be touched and loved. When two
                  young men from town become intrigued by her wild beauty, Kya
                  opens herself to a new life–until the unthinkable happens.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="mb-10 text-2xl font-medium">Related books</h2>
            <div className="grid grid-cols-5 gap-x-5">
              <BookItem></BookItem>
              <BookItem></BookItem>
              <BookItem></BookItem>
              <BookItem></BookItem>
              <BookItem></BookItem>
            </div>
          </div>
        </BookDetailPageStyle>
      )}
    </>
  );
};

export default BookDetailPage;
