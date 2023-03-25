import axios from "axios";
import HeaderAdmin from "components/header/HeaderAdmin";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const AdminUser = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const getAllUser = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/user`
    );
    setUserList(res?.data?.filter((user) => user?.full_name !== "Admin"));
  };
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="text-center container-admin">
        <h2 className="my-10 text-2xl">Admin Users</h2>
        <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th scope="col">Full name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone number</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {userList?.length > 0 ? (
              userList?.map((product) => {
                return (
                  <tr key={v4()}>
                    <td>{product?.full_name}</td>
                    <td>{product?.email}</td>
                    <td>{product?.address.slice(0, 14)}</td>
                    <td>{product?.phone_number}</td>
                    {/* <td className="gap-2 d-flex d-flex-col justify-content-center align-items-center">
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
                            navigate(`/admin/products/update/${product?.id}`)
                          }
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-200 rounded-lg"
                          // onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </td> */}
                  </tr>
                );
              })
            ) : (
              <tr key={v4()}>
                <td>Not found bills</td>
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

export default AdminUser;
