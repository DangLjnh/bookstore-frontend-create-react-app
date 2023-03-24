import axios from "axios";
import Underline from "components/icon/Underline";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { setBookList } from "redux/slice/userSlice";
import styled from "styled-components";
import { v4 } from "uuid";
const SidebarCategoryStyle = styled.div`
  .accordion-content.is-active {
    height: auto;
  }
  .accordion-content {
    height: 0;
    overflow: hidden;
    transition: all 0.25s linear;
  }
`;
const SidebarCategory = ({ className }) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("is-active");
  useEffect(() => {
    const accordionContents = document.querySelectorAll(".accordion-content");
    [...accordionContents].forEach((item) => {
      item.style.height = `${item.scrollHeight}px`;
    });
  }, []);
  const handleClickAccordion = (e) => {
    const content = e.currentTarget.nextElementSibling;
    if (!toggle) {
      content.style.height = `${content.scrollHeight}px`;
      setToggle("is-active");
    } else {
      content.style.height = "0px";
      setToggle("");
    }
  };
  const [categoryList, setCategoryList] = useState([]);
  const getAllCategory = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/category`
    );
    setCategoryList(res.data);
  };
  const handleClickCategoryList = async (item) => {
    navigate(`?id=${item.id}`);
    const res = await axios.get(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/admin/category/product/${search.slice(4)}`
    );
    if (res) {
      dispatch(setBookList(Object.assign({}, ...res.data)));
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <SidebarCategoryStyle className={`flex flex-col flex-1 ${className}`}>
      <div className="border">
        <div className="border-b">
          <div
            className={`flex items-center justify-between p-5 ${toggle}`}
            onClick={(e) => handleClickAccordion(e)}
          >
            <p className="text-[17px] font-medium tracking-wide">Categories</p>
            <Underline></Underline>
          </div>
          <div className="px-5 accordion-content">
            {categoryList?.map((item) => {
              return (
                <p
                  className="mb-3 cursor-pointer"
                  onClick={() => handleClickCategoryList(item)}
                  key={v4()}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </SidebarCategoryStyle>
  );
};

export default SidebarCategory;
