import { ChangeEvent, CSSProperties, DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react";
import { Input } from "../atom/Input";

type Props = {
  onChange?: (value: string) => void;
  value?: string | number;
  placeholder?: string;
  style?: CSSProperties;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const NumberInput = (props: Props) => {
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
      name={props.name}
      type="number"
      onChange={onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};
