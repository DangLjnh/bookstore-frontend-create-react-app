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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "redux/slice/userSlice";
import Cookies from "universal-cookie";
const HeaderAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
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
    dispatch(setProfile(""));
    navigate("/login");
  };
  return (
    <div className="py-2 border-b md:py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-end justify-center gap-x-12">
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
  );
};

export default HeaderAdmin;
