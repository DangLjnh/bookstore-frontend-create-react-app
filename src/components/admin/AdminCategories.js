import axios from "axios";
import HeaderAdmin from "components/header/HeaderAdmin";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { v4 } from "uuid";
import Swal from "sweetalert2";

const AdminCategories = () => {
  const navigate = useNavigate();
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
  const handleDeleteCategory = (id) => {
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
        const res = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/admin/category/${id}`
        );
        if (res) {
          getAllCategory();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="text-center container-admin">
        <h2 className="my-10 text-2xl">Admin Categories</h2>
        <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.length > 0 ? (
              categoryList.map((category) => {
                return (
                  <tr key={v4()}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{slugify(category.name)}</td>
                    <td className="">
                      <button
                        className="px-4 py-2 mr-5 bg-green-200 rounded-lg"
                        onClick={() => navigate(`/admin/categories/create`)}
                      >
                        Create
                      </button>
                      <button
                        className="px-4 py-2 mr-5 bg-yellow-200 rounded-lg"
                        onClick={() =>
                          navigate(`/admin/categories/update/${category.id}`)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-200 rounded-lg"
                        onClick={() => {
                          handleDeleteCategory(category.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr key={v4()}>
                <td>Not found users</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
