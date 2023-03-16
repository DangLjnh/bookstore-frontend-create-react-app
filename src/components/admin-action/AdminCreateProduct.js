import axios from "axios";
import Button from "components/button/Button";
import WidgetUpload from "components/cloudinary/WidgetUpload";
import { Dropdown } from "components/dropdown";
import HeaderAdmin from "components/header/HeaderAdmin";
import Input from "components/input/Input";
import Label from "components/input/Label";
import Texarea from "components/texarea/Texarea";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";

const AdminCreateProduct = () => {
  const cloudRef = useRef();
  const widgetRef = useRef();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [selectCategoryID, setSelectCategoryID] = useState("");
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [dataImage, setDataImage] = useState("");
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

  const handleCreateProduct = async (val) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/product`,
      {
        ...val,
        price: parseInt(val.price),
        slug: slugify(val.name),
        quantity: parseInt(val.quantity),
        category_ids: selectCategoryID,
        image_url: dataImage,
        published_date: val.published_date.replace(
          /(\d{4})-(\d{2})-(\d{2})/,
          "$3/$2/$1"
        ),
      }
    );
    if (res) {
      toast.success("Create new category successfully!");
      navigate("/admin/categories");
    }
  };
  const getAllCategory = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/category`
    );
    setCategoryList(res.data);
  };
  const handleClickOption = (item) => {
    setSelectCategoryID([...selectCategoryID, item.id]);
    setSelectCategoryName([...selectCategoryName, item.name]);
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    cloudRef.current = window.cloudinary;
    widgetRef.current = cloudRef.current?.createUploadWidget(
      {
        cloudName: "dwkckmmr7",
        uploadPreset: "dfonqvzr",
      },
      (err, result) => {
        // get photoURL: result.info.files[0].uploadInfo.url
        setDataImage(result?.info?.files[0].uploadInfo.url);
      }
    );
  }, []);
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="text-center">
        <h2 className="my-10 text-2xl">Admin Products</h2>
      </div>
      <form
        className=" container-admin"
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <div className="mt-12 form-layout">
          <div>
            <Label>Name</Label>
            <Input
              control={control}
              className="mt-5"
              name="name"
              placeholder="Enter your product name"
            ></Input>
          </div>
          <div>
            <Label className="mb-5">Upload image</Label>
            <button
              className="px-4 py-2 bg-blue-300 rounded"
              onClick={() => widgetRef.current?.open()}
            >
              Upload file
            </button>
          </div>
        </div>
        <div className="mt-12 form-layout">
          <div>
            <Label className={"mb-5"}>Name</Label>
            <Texarea control={control} name="description"></Texarea>
          </div>
          <div>
            <Label className="mb-5"></Label>
            {dataImage && (
              <img
                src={dataImage}
                alt=""
                className="w-full h-[300px] object-cover"
              />
            )}
          </div>
        </div>
        <div className="mt-12 form-layout">
          <div>
            <Label className={"mb-5"}>Name</Label>
            <Input
              control={control}
              className="mt-5"
              name="author_name"
              placeholder="Enter your author name"
            ></Input>
          </div>
          <div>
            <Label className="mb-5">Published date</Label>
            <Input
              control={control}
              className="mt-5"
              name="published_date"
              type="date"
            ></Input>
          </div>
        </div>
        <div className="mt-12 form-layout">
          <div>
            <Label className={"mb-5"}>Price</Label>
            <Input
              control={control}
              className="mt-5"
              name="price"
              placeholder="Enter your price"
            ></Input>
          </div>
          <div>
            <Label className="mb-5">Quantity</Label>
            <Input
              control={control}
              className="mt-5"
              name="quantity"
              placeholder="Enter quantity"
            ></Input>
          </div>
        </div>
        <div className="mt-12 form-layout">
          <div>
            <Label className={"mb-5"}>Price</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categoryList.length > 0 &&
                  categoryList.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            <div className="grid grid-cols-5 gap-3 mt-5">
              {selectCategoryName &&
                selectCategoryName.map((item) => {
                  return (
                    <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                      {item}
                    </span>
                  );
                })}
            </div>
          </div>
          {/* <div>
            <Label className="mb-5">Quantity</Label>
            <Input
              control={control}
              className="mt-5"
              name="quantity"
              placeholder="Enter quantity"
            ></Input>
          </div> */}
        </div>
        <Button type="submit">Create product</Button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
