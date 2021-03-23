import { ChangeEvent, CSSProperties, useCallback } from "react";

type Props = {
  onChange: (value: string) => void;
  value: string | number;
  placeholder?: string;
  style?: CSSProperties;
};

export const TextInput = (props: Props) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      props.onChange(target.value);
    },
    [props.onChange]
  );

  return (
    <input style={props.style} type="number" onChange={onChange} value={props.value} placeholder={props.placeholder} />
  );
};
