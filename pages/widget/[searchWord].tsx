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

  const { token, tweets } = twitter;

  const [currentTweet, setCurrentTweet] = useState(0);
  const timerRef = useRef(0);

  useEffect(() => {
    if (timerRef.current === 0) {
      timerRef.current = window.setInterval(() => {
        setCurrentTweet((currentTweet) => currentTweet + 1);
      }, 10000);
    }
  }, [tweets]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (token == null) {
      if (localStorageToken != null) {
        dispatch(storeToken(localStorageToken));
      } else {
        dispatch(appAuthThunk());
      }
    } else if (props.searchWord) {
      localStorage.setItem("token", token);
      dispatch(searchTweetsThunk("#" + props.searchWord, true));
    }
  }, [token]);

  return (
    <>
      <Container>
        <LogoContainer>
          <img src="../../images/twitter-white.png" alt="" />
        </LogoContainer>
        <ContentContainer>
          <Tweet>
            {tweets.length >= 1
              ? tweets
                  .filter((tweet, i) => i === currentTweet % tweets.length)
                  .map((tweet) => (
                    <FadeInFromRight key={`tweet-${tweet.id}`} time={2}>
                      <div>{tweet.text.replaceAll(/#[^\s]+\s?/g, "")}</div>
                      <Author>
                        by{" "}
                        <Name>
                          {tweet.name} @{tweet.screenName}
                        </Name>
                      </Author>
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
  border-top-left-radius: 90px;

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
  padding: 10px;
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

const Author = styled.div`
  font-size: 16px;
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #1d98f0;
`;
