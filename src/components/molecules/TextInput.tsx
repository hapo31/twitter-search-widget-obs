import { ChangeEvent, CSSProperties, DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react";
import { Input } from "../atom/Input";

type Props = {
  onChange?: (value: string) => void;
  value?: string | number;
  placeholder?: string;
  style?: CSSProperties;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextInput = (props: Props) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      props.onChange?.(target.value);
    },
    [props.onChange]
  );

  return (
    <Input
      {...props}
      style={props.style}
      type="text"
      onChange={onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};
