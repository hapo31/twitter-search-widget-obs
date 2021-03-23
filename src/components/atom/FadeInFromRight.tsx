import { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  time: number;
  delay: number;
  play: boolean;
  onAnimationEnd?: () => void;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export const FadeInFromRight = (props: Props) => (
  <FadeInContainer
    className={props.play ? "anim" : ""}
    t={props.time}
    d={props.delay}
    style={props.style}
    onAnimationEnd={props.onAnimationEnd}
  >
    {props.children}
  </FadeInContainer>
);

type FadeInContainerProps = {
  t: number;
  d: number;
};

const FadeInContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  &.anim {
    animation: move ${({ t }: FadeInContainerProps) => `${t}`}s ease ${({ d }: FadeInContainerProps) => `${d}`}s 1;

    @keyframes move {
      0% {
        margin-left: 100%;
      }

      100% {
        margin-left: 0;
      }
    }
  }
`;
