import axios from "axios";
import Button from "components/button/Button";
import HeaderAdmin from "components/header/HeaderAdmin";
import Input from "components/input/Input";
import Label from "components/input/Label";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const AdminCategoriesCreate = () => {
  const navigate = useNavigate();
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    // formState: { errors, isValid },
    // watch,
    // register,
    //mac dinh
  } = useForm({
    mode: onchange,
    // defaultValues: {
    //   status: status.approve,
    // },
    // resolver: yupResolver(schema),
  });
  const handleCreateCategory = async (val) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/category`,
      { ...val }
    );
    if (res) {
      toast.success("Create new category successfully!");
      navigate("/admin/categories");
    }
  };
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <form
        className=" container-admin"
        onSubmit={handleSubmit(handleCreateCategory)}
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
        <Button type="submit">Create category</Button>
      </form>
    </div>
  );
};

export default AdminCategoriesCreate;
