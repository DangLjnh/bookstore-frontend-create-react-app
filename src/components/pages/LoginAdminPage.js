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
import { loginService, profileUser } from "services/userService";
import Cookies from "universal-cookie";

const LoginAdminPage = () => {
  const { profile } = useSelector((state) => state.user);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    // formState: { errors, isValid },
    // watch,
    // reset,
    // register,
    //mac dinh
  } = useForm({
    mode: onchange,
    // defaultValues: {
    //   status: status.approve,
    // },
    // resolver: yupResolver(schema),
  });
  const handleLogin = async (val) => {
    const res = await loginAdminService(val.username, val.password);
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
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="mb-6">
          <Label className={"mb-2"} name="username">
            Username
          </Label>
          <Input
            name={"username"}
            placeholder={"Please enter your username"}
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
        <Button className={"w-full"} type="submit">
          Sign in
        </Button>
        <p className="py-5 text-sm font-medium text-center transition-all border-b cursor-pointer text-primary hover:text-red-800">
          Forgot Password?
        </p>
        <p className="text-center">
          <Button
            className={"my-5"}
            bgColor="light-primary"
            onClick={() => navigate("/register")}
          >
            Create new account
          </Button>
        </p>
      </form>
    </LayoutSign>
  );
};

export default LoginAdminPage;
