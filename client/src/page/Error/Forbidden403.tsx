import { Result } from "antd";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Forbidden403() {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  );
}
