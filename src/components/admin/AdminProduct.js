import axios from "axios";
import HeaderAdmin from "components/header/HeaderAdmin";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Swal from "sweetalert2";
import { v4 } from "uuid";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const getAllProduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/product`
    );
    setProductList(res.data);
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const handleDelete = (id) => {
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
          `${process.env.REACT_APP_BACKEND_URL}/admin/product/${id}`
        );
        if (res) {
          getAllProduct();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="text-center container-admin">
        <h2 className="my-10 text-2xl">Admin Products</h2>
        <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Author</th>
              <th scope="col">Stock</th>
              <th scope="col">Publish</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList?.length > 0 ? (
              productList.map((product) => {
                return (
                  <tr key={v4()}>
                    <td title={product.id}>
                      {product.id.slice(0, 10) + "..."}
                    </td>
                    <td>{product.productInfo.name}</td>
                    <td>${product.productInfo.price}</td>
                    <td>{product.productInfo.author_name}</td>
                    <td>{product.inStock.quantity}</td>
                    <td>{product.productInfo.published_date}</td>
                    <td className="gap-2 d-flex d-flex-col justify-content-center align-items-center">
                      <td className="">
                        <button
                          className="px-4 py-2 mr-5 bg-green-200 rounded-lg"
                          onClick={() => navigate(`/admin/products/create`)}
                        >
                          Create
                        </button>
                        <button
                          className="px-4 py-2 mr-5 bg-yellow-200 rounded-lg"
                          onClick={() =>
                            navigate(`/admin/products/update/${product.id}`)
                          }
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-200 rounded-lg"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
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

export default AdminProduct;
