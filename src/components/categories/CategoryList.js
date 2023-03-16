import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";
const CategoryList = () => {
  const bgList = [
    "bg-purple-100",
    "bg-yellow-100",
    "bg-red-100",
    "bg-blue-200",
    "bg-pink-200",
  ];
  const [categoryList, setCategoryList] = useState([]);
  const getAllCategory = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/category`
    );
    setCategoryList(res.data);
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div className="grid grid-cols-5 gap-x-10">
      {categoryList.map((item, index) => {
        return (
          <div
            key={v4()}
            className={`flex items-center ${bgList[index]} justify-center h-[120px] h- rounded`}
          >
            {item.name}
          </div>
        );
      })}
      {/* <div className="flex items-center justify-center bg-yellow-100 h-[120px] rounded">
        <Gallery className="w-[35px] h-[35px]"></Gallery>
      </div> */}
    </div>
  );
};

export default CategoryList;
