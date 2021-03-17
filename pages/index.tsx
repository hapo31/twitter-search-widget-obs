import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { appAuthThunk, storeToken } from "../src/actions/twitter";
import { RootState } from "../src/store/root";

export default function Home() {
  const dispatch = useDispatch();
  const { twitter } = useSelector(({ twitter }: RootState) => ({
    twitter,
  }));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      dispatch(storeToken(token));
    } else if (!token && twitter.token != null) {
      localStorage.setItem("token", twitter.token);
    } else {
      dispatch(appAuthThunk());
    }
  }, [twitter.token]);

  return (
    <Container>
      <LogoContainer>
        <img src="./images/twitter-white.png" alt="" />
      </LogoContainer>
      <ContentContainer>
        <Tweet>test1</Tweet>
        <HashTag>{twitter.token}</HashTag>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.main`
  background-color: white;
  width: 1200px;
  height: 200px;
  border: solid 3px #1d98f0;
  border-radius: 90px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  display: flex;
  justify-content: flex-start;

  overflow: hidden;
`;

const LogoContainer = styled.div`
  width: 200px;
  margin: -2px;
  border-radius: 90px;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: solid 2px #0880c0;
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

const ContentContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Tweet = styled.div`
  margin: 10px;
  font-size: 72px;
  height: 70%;
`;

const HashTag = styled.div`
  border: solid 2px #0880c0;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  flex: 3;
  background-color: #1d98f0;
  color: #efefef;
`;
