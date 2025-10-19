import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
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
            aria-describedby="emailHelpBlock"
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
            aria-describedby="passwordHelpBlock"
          />
        </div>
        <Button className="w-full text-[15.0px] font-[500] font-[inter]">
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
