import axios from "axios";
import Button from "components/button/Button";
import HeaderAdmin from "components/header/HeaderAdmin";
import Input from "components/input/Input";
import Label from "components/input/Label";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCategoriesUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const getSingleCategory = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/category/${id}`
    );
    if (res) setCategory(res?.data);
  };
  useEffect(() => {
    getSingleCategory();
  }, []);
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
  const handleUpdateCategory = async (val) => {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/admin/category/${id}`,
      {
        ...val,
      }
    );
    if (res) {
      toast.success(`Update category successfully!`);
      navigate("/admin/categories");
    }
  };
  useEffect(() => {
    if (category) reset(category);
  }, [category]);
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <form
        className=" container-admin"
        onSubmit={handleSubmit(handleUpdateCategory)}
      >
        <div className="mt-12 form-layout">
          <div>
            <Label>Name</Label>
            <Input
              control={control}
              className="mt-5"
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </div>
        </div>
        <Button type="submit">Update category</Button>
      </form>
    </div>
  );
};

export default AdminCategoriesUpdate;
