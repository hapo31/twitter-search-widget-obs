import { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  time: number;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export const FadeInFromRight = (props: Props) => (
  <FadeInContainer t={props.time} style={props.style}>
    {props.children}
  </FadeInContainer>
);

const FadeInContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  animation: move ${({ t }: { t: number }) => `${t}`}s ease 0s 1;

  @keyframes move {
    0% {
      position: absolute;
      margin-left: 100%;
    }

    100% {
      position: inherit;
      margin-left: 0;
    }
  }
`;
