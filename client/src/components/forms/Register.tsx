import ValidatedInput from "../../utils/ValidatedInput";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../stores/store";
import { createUser } from "../../apis/user.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [changeTypePass, setChangeTypePass] = useState<"text" | "password">(
    "password"
  );
  const [changeTypeComfiPass, setChangeTypeComfiPass] = useState<
    "text" | "password"
  >("password");

  // const { loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setSuccess(
      userName &&
        validateEmail(email) &&
        password &&
        confirmPassword === password
        ? false
        : true
    );
  }, [userName, email, password, confirmPassword]);

  const validateName = (v: string) => v.trim().length > 0;
  const validateEmail = (v: string) => /^[\w.-]+@gmail\.\w+$/.test(v);
  const validatePassword = (v: string) => v.trim().length >= 8;
  const validateConfirmPassword = (v: string) =>
    v === password && v.trim().length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      name: userName,
      email: email,
      password: password,
      rule: "user",
    };

    dispatch(createUser(newUser))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => alert("Đăng ký thất bại"));
  };

  return (
    <div className="flex flex-col items-center mt-[2rem]">
      <form
        className="w-[448px] flex flex-col gap-4 rounded-[8px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] p-8"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-[24.6px] font-bold m-0 font-[inter] select-none">
          Đăng ký tài khoản
        </p>

        <ValidatedInput
          label="Họ và tên"
          id="name"
          value={userName}
          onChange={setUserName}
          validator={validateName}
          tooltipMsg="Họ và tên không được để trống"
        />

        <ValidatedInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
          validator={validateEmail}
          tooltipMsg="Nhập đúng định dạng: tên@gmail.tên_miền"
        />

        <div className="relative">
          <ValidatedInput
            label="Mật khẩu"
            id="password"
            type={changeTypePass}
            value={password}
            onChange={setPassword}
            validator={validatePassword}
            tooltipMsg={
              <>
                <p className="m-0">Mật khẩu không được để trống</p>
                <p className="m-0">Mật khẩu tối thiểu 8 ký tự</p>
              </>
            }
          />
          <FontAwesomeIcon
            icon={changeTypePass === "password" ? faEyeSlash : faEye}
            className="z-1000 absolute right-2 top-8 hover:cursor-pointer hover:text-cyan-500"
            onClick={() =>
              setChangeTypePass &&
              setChangeTypePass(
                changeTypePass === "password" ? "text" : "password"
              )
            }
          />
        </div>

        <div className="relative">
          <ValidatedInput
            label="Xác nhận mật khẩu"
            id="confirmPassword"
            type={changeTypeComfiPass}
            value={confirmPassword}
            onChange={setConfirmPassword}
            validator={validateConfirmPassword}
            tooltipMsg="Mật khẩu xác nhận phải trùng khớp với mật khẩu và không được để trống"
          />
          <FontAwesomeIcon
            icon={changeTypeComfiPass === "password" ? faEyeSlash : faEye}
            className="z-1000 absolute right-2 top-8 hover:cursor-pointer hover:text-cyan-500"
            onClick={() =>
              setChangeTypeComfiPass &&
              setChangeTypeComfiPass(
                changeTypeComfiPass === "password" ? "text" : "password"
              )
            }
          />
        </div>

        <Button
          type="submit"
          disabled={success}
          className="w-full text-[15px] font-[500]"
          style={{
            cursor: success ? "not-allowed" : "pointer",
            background: success ? "#b0b0b0" : "#3B82F6",
            borderColor: success ? "#b0b0b0" : "#3B82F6",
            color: success ? "#d1d1d1" : "white",
          }}
        >
          Đăng ký
        </Button>

        <p className="text-center m-0 font-[inter] select-none">
          Đã có tài khoản?{" "}
          <Link to="/auth/login" className="!no-underline font-[inter]">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
