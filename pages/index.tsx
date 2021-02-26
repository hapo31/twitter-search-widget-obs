import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <LogoContainer>
        <img src="./images/twitter-white.png" alt="" />
      </LogoContainer>
      <TextContainer>#ばあああああああーか</TextContainer>
    </Container>
  );
}

const Container = styled.main`
  background-color: white;
  width: 1200px;
  height: 200px;
  border: solid 2px #1d98f0;
  border-radius: 16px;
  display: flex;
  justify-content: flex-start;
`;

const LogoContainer = styled.div`
  width: 200px;
  background-color: #1d98f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 60%;
    height: 60%;
    object-fit: scale-down;
    display: block;
  }
`;

const TextContainer = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  flex: 3;
`;
