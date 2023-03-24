import Button from "components/button/Button";
import Bag from "components/icon/Bag";
import Heart from "components/icon/Heart";
import Nav from "components/icon/Nav";
import Phone from "components/icon/Phone";
import Question from "components/icon/Question";
import User from "components/icon/User";
import InputSearch from "components/input/InputSearch";
import LogoBookWorm from "components/logo/LogoBookWorm";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "redux/slice/userSlice";
import Cookies from "universal-cookie";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const data = JSON.parse(localStorage.getItem("carts"));
  const { profile } = useSelector((state) => state.user);
  const listHeader = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "Categories",
      url: "/product-category",
    },
    {
      id: 3,
      title: "Shop",
      url: "/",
    },
    {
      id: 4,
      title: "Pages",
      url: "/",
    },
    {
      id: 5,
      title: "Blog",
      url: "/",
    },
    {
      id: 6,
      title: "Others",
      url: "/",
    },
  ];
  const handleLogout = () => {
    cookies.remove("jwt");
    localStorage.removeItem("carts");
    dispatch(setProfile(""));
    navigate("/login");
  };

  return (
    <header>
      <div className="py-2 border-b md:py-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-10">
            <div className="flex items-center justify-center gap-x-2">
              <Question width={20} height={20}></Question>
              <p>Can we help you?</p>
            </div>
            <div className="flex items-center justify-center gap-x-2">
              <Phone width={16} height={20}></Phone>
              <p>0969 552 196</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-7">
            <Heart width={20} height={20}></Heart>
            <Bag
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => navigate("/cart")}
            ></Bag>
            {data?.length}
            {profile ? (
              <>
                {/* <User width={20} height={20}></User> */}
                <Button onClick={() => handleLogout()}>Logout</Button>
              </>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}
          </div>
        </div>
      </div>
      <div className="py-2 border-b md:py-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-end justify-center gap-x-12">
            <Nav></Nav>
            <LogoBookWorm></LogoBookWorm>
            {listHeader.map((item) => {
              return (
                <p
                  key={item.id}
                  className="transition-[200ms] header-title hover:text-primary cursor-pointer"
                  onClick={() => {
                    navigate(item.url);
                  }}
                >
                  {item.title}
                </p>
              );
            })}
          </div>
          <div className="">
            <InputSearch></InputSearch>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
