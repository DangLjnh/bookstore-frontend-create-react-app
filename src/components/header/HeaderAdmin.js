import React from "react";
import { NavLink } from "react-router-dom";

const HeaderAdmin = () => {
  const listHeader = [
    {
      id: 2,
      name: "Categories",
      url: "/admin/categories",
    },
    {
      id: 1,
      name: "Users",
      url: "/admin/users",
    },
    {
      id: 3,
      name: "Products",
      url: "/admin/products",
    },
    {
      id: 5,
      name: "Stocks",
      url: "/admin/stocks",
    },
    {
      id: 4,
      name: "Bills",
      url: "/admin/bills",
    },
  ];
  return (
    <ul className="flex items-center justify-center py-4 gap-x-5 bg-slate-300">
      {listHeader.map((item) => {
        return (
          <NavLink
            className="cursor-pointer hover:text-red-500"
            key={item.id}
            to={item.url}
          >
            {item.name}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default HeaderAdmin;
