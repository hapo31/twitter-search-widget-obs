import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Input = (props: Props) => <StyledInput {...(props as any)} />;

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border-color: #cfcfcf;
  border-style: solid;
  :focus {
    outline: none;
    border-color: #1a8cdd;
    box-shadow: 0 0 8px #1d98f0;
  }
`;
