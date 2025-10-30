import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../stores/store";
import type React from "react";
import { useEffect, useState } from "react";
import { getUserlist } from "../../apis/user.api";
import Swal from "sweetalert2";

export default function Login() {
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const user = users.find(
      (user) => user.email === input.email && user.password === input.password
    );

    if (user) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        showConfirmButton: false,
        text: "Please wait a moment!",
        timer: 1500,
      });
      setTimeout(() => {
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }, 1600);
    } else if (input.email === "" || input.password === "") {
      Swal.fire({
        title: "Error!",
        text: `${
          input.email === "" ? "email" : "password"
        } không được để trống`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Email hoặc mật khẩu không trùng khớp",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    dispatch(getUserlist());
  }, []);

  return (
    <div className="flex flex-col items-center mt-[5rem] not-last:">
      <form className="w-[448px] h-[384px] flex flex-col flex-1 gap-4 rounded-[8px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] p-8">
        <p className="text-center text-[24.6px] font-bold m-0 font-[inter]">
          Đăng nhập
        </p>
        <div>
          <Form.Label
            htmlFor="inputEmail"
            className="m-0 text-[15.2px] font-[500] text-[#374151] font-[inter]"
          >
            Email
          </Form.Label>
          <Form.Control
            type="email"
            id="inputEmail"
            name="email"
            value={input.email}
            aria-describedby="emailHelpBlock"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Form.Label
            htmlFor="inputPassword5"
            className="m-0 text-[15.2px] font-[500] text-[#374151] font-[inter]"
          >
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            name="password"
            value={input.password}
            aria-describedby="passwordHelpBlock"
            onChange={handleChangeInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
        <Button
          className="w-full text-[15.0px] font-[500] font-[inter]"
          onClick={handleSubmit}
        >
          Đăng nhập
        </Button>
        <p className="text-center m-0 font-[inter]">
          Chưa có tài khoản?{" "}
          <Link to="/auth/register" className="!no-underline  font-[inter]">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
