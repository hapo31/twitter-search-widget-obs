import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { appAuthThunk, searchTweetsThunk, storeToken } from "../../src/actions/twitter";
import { FadeInFromRight } from "../../src/components/atom/FadeInFromRight";
import { RootState } from "../../src/store/root";

type Props = {
  searchWord?: string;
};

export default function TwitterHashtag(props: Props) {
  const dispatch = useDispatch();
  const { twitter } = useSelector(({ twitter }: RootState) => ({
    twitter,
  }));

  const [currentTweet, setCurrentTweet] = useState(0);
  const timerRef = useRef(0);

  useEffect(() => {
    if (timerRef.current === 0) {
      timerRef.current = window.setInterval(() => {
        setCurrentTweet((currentTweet) => currentTweet + 1);
      }, 10000);
    }
  }, [twitter.tweets]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (twitter.token) {
      return;
    } else if (token != null && !twitter.token) {
      dispatch(storeToken(token));
    } else if (!token && twitter.token != null) {
      localStorage.setItem("token", twitter.token);
    } else {
      dispatch(appAuthThunk());
    }
  }, [twitter.token]);

  useEffect(() => {
    if (props.searchWord) {
      dispatch(searchTweetsThunk("#" + props.searchWord, true));
    }
  }, []);

  return (
    <>
      <Container>
        <LogoContainer>
          <img src="../../images/twitter-white.png" alt="" />
        </LogoContainer>
        <ContentContainer>
          <Tweet>
            {twitter.tweets.length >= 1
              ? twitter.tweets
                  .filter((tweet, i) => i === currentTweet % twitter.tweets.length)
                  .map((tweet) => (
                    <FadeInFromRight key={`tweet-${tweet.id}`} time={2}>
                      <div>{tweet.text.replaceAll(/#[^\s]+\s?/g, "")}</div>
                      <div style={{ fontSize: 20 }}>by {tweet.name}</div>
                    </FadeInFromRight>
                  ))
              : null}
          </Tweet>
          <HashTag>#{props.searchWord}</HashTag>
        </ContentContainer>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const searchWord = context.query["searchWord"] as string;
  return {
    props: {
      searchWord: searchWord ?? null,
    },
  };
};

const Container = styled.main`
  background-color: white;
  width: 98vw;
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
  height: 105%;
  width: 200px;
  min-width: 200px;
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
  overflow: hidden;
`;

const Tweet = styled.div`
  margin: 10px;
  font-size: 48px;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  white-space: nowrap;
  color: #efefef;
`;
