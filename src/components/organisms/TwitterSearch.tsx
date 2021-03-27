import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tweet } from "../../store/twitter";
import { FadeInFromRight } from "../atom/FadeInFromRight";

type Props = {
  searchWord: string;
  tweet: Tweet;
  fadeInTimeSec: number;
};

export const TwitterSearch = (props: Props) => {
  const { tweet, searchWord, fadeInTimeSec } = props;
  const [isPlay, setIsPlay] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    setShowAuthor(false);
    setIsPlay(true);
    setTimeout(() => {
      setShowAuthor(true);
    }, 500);
    setTimeout(() => {
      setIsPlay(false);
    }, fadeInTimeSec * 1000);
  }, [tweet]);

  return (
    <>
      <Container>
        <LogoContainer>
          <img src="../../images/twitter-white.png" alt="" />
        </LogoContainer>
        <ContentContainer>
          <TweetContainer>
            <FadeInFromRight play={isPlay} time={fadeInTimeSec} delay={0}>
              <div>{tweet.text.replace(/#[^\s]+\s?/g, "")}</div>
              {showAuthor && tweet.screenName.length !== 0 ? (
                <FadeInFromRight play={true} time={fadeInTimeSec} delay={0}>
                  <Author>
                    by{" "}
                    <Name>
                      {tweet.name} @{tweet.screenName}
                    </Name>
                  </Author>
                </FadeInFromRight>
              ) : null}
            </FadeInFromRight>
          </TweetContainer>
          <HashTag>#{searchWord}</HashTag>
        </ContentContainer>
      </Container>
    </>
  );
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

const TweetContainer = styled.div`
  padding: 10px;
  padding-right: 0;
  color: #000;
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
