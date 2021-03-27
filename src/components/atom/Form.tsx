import { FormEvent, ReactNode, useCallback } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  onChangedValue: (name: string, value: string) => void;
};

export const Form = (props: Props) => {
  const onChangeChild = useCallback(
    (e: FormEvent) => {
      const target = e.target as HTMLInputElement;
      const name = target.getAttribute("name");
      const value = target.value;
      if (name != null && value != null) {
        props.onChangedValue(name, value);
      }
    },
    [props.onChangedValue]
  );

  return <StyledForm onChange={onChangeChild}>{props.children}</StyledForm>;
};

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;
