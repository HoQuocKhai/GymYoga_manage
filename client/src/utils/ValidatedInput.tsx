import { Form } from "react-bootstrap";
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

interface ValidatedInputProps {
  label: string;
  type?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  validator: (value: string) => boolean;
  tooltipMsg: string | React.ReactNode;
}

export default function ValidatedInput({
  label,
  type = "text",
  id,
  value,
  onChange,
  validator,
  tooltipMsg,
}: ValidatedInputProps) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsValid(validator(value));
  }, [value, validator]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Form.Label
          htmlFor={id}
          className="m-0 text-[15.2px] font-[500] text-[#374151] font-[inter] select-none"
        >
          {label}
        </Form.Label>

        {focused && (
          <FontAwesomeIcon
            icon={!isValid ? faCircleXmark : faCircleCheck}
            style={{ color: !isValid ? "#ff6666" : "#63E6BE" }}
          />
        )}
      </div>

      <Tooltip
        title={!isValid ? tooltipMsg : ""}
        color="red"
        placement="left"
        open={focused && !isValid}
      >
        <Form.Control
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="focus:!ring-2 focus:!ring-blue-400"
        />
      </Tooltip>
    </div>
  );
}
