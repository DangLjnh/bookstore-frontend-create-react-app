import Button from "components/button/Button";
import Input from "components/input/Input";
import Label from "components/input/Label";
import LayoutSign from "components/layout/LayoutSign";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setProfile } from "redux/slice/userSlice";
import {
  profileUser,
  registerAdminService,
  registerService,
} from "services/userService";
import Cookies from "universal-cookie";

const RegisterAdminPage = () => {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    //mac dinh
  } = useForm({
    mode: onchange,
    // defaultValues: {
    //   status: status.approve,
    // },
    // resolver: yupResolver(schema),
  });
  const handleRegister = async (dataInfo) => {
    const res = await registerAdminService(dataInfo).then((res) => res.json());
    if (res) {
      const profiles = await profileUser(res?.data?.access_token);
      cookies.set("jwt", res?.data?.access_token, { path: "/" });
      if (profiles) {
        dispatch(setProfile(profiles.data));
        toast.success("Login successfully!");
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if (profile) navigate("/");
  }, [profile]);
  return (
    <LayoutSign>
      <form
        className="w-full p-5 bg-white rounded shadow-xl"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="mb-6">
          <Label className={"mb-2"} name="full_name">
            Full name
          </Label>
          <Input
            name={"full_name"}
            placeholder={"Enter full name..."}
            control={control}
          ></Input>
        </div>
        <div className="mb-6">
          <Label className={"mb-2"} name="password">
            Password
          </Label>
          <Input
            name={"password"}
            placeholder={"******************"}
            control={control}
            type={"password"}
          ></Input>
        </div>
        <div className="mb-6">
          <Label className={"mb-2"} name="address">
            Address
          </Label>
          <Input
            name={"address"}
            placeholder={"Please enter your address"}
            control={control}
          ></Input>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="mb-6">
            <Label className={"mb-2"} name="email">
              Email
            </Label>
            <Input
              name={"email"}
              placeholder={"Enter email..."}
              control={control}
            ></Input>
          </div>
          <div className="mb-6">
            <Label className={"mb-2"} name="phone_number">
              Phone
            </Label>
            <Input
              name={"phone_number"}
              placeholder={"Enter phone..."}
              control={control}
            ></Input>
          </div>
        </div>
        <Button className={"w-full"} type="submit">
          Sign up
        </Button>
        <p className="py-4 text-sm font-medium text-center transition-all border-b cursor-pointer text-primary hover:text-red-800"></p>
        <p className="text-center">
          <Button
            className={"my-5"}
            bgColor="light-primary"
            onClick={() => navigate("/login")}
          >
            You already have an account ?
          </Button>
        </p>
      </form>
    </LayoutSign>
  );
};

export default RegisterAdminPage;
