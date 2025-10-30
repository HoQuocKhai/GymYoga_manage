import { Result } from "antd";
import { NavLink } from "react-router-dom";

export default function Forbidden403() {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<NavLink to={"/"}>Back Home</NavLink>}
      />
    </div>
  );
}
