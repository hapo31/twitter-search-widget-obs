import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NumberInput } from "../src/components/atom/NumberInput";
import { TextInput } from "../src/components/atom/TextInput";
import { TwitterSearch } from "../src/components/organisms/TwitterSearch";
import { oauth } from "../src/service/twitter";
import { QueryString } from "../src/util/util";

type Props = {};

type Preference = {
  count: number;
  transition: number;
  tweetChangeInterval: number;
  token: string;
};

export default function Index(props: Props) {
  const [preference, setPreference] = useState<Preference>({} as any);
  const [url, setUrl] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [firstView, setFirstView] = useState(true);
  const [showTweet, setShowTweet] = useState({
    createdAt: new Date(),
    id: "123",
    name: "テスト太郎",
    profileImg: "",
    screenName: "test_taro",
    text: "テストツイートテストツイートテストツイート",
  });

  const timerRef = useRef(0);

  useEffect(() => {
    const storagePreference = localStorage.getItem("preference");
    if (storagePreference) {
      setPreference(JSON.parse(storagePreference));
    } else {
      setPreference({
        count: 15,
        transition: 2,
        tweetChangeInterval: 10,
        token: "",
      });
    }

    setFirstView(false);
  }, []);

  const withSavePreference = useCallback(
    (onChange: (value: string) => void) => {
      if (!firstView) {
        localStorage.setItem("preference", JSON.stringify(preference));
      }
      return (value: string) => onChange(value);
    },
    [preference]
  );

  useEffect(() => {
    if (timerRef.current !== 0) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setShowTweet({
        createdAt: new Date(),
        id: "123",
        name: "テスト太郎",
        profileImg: "",
        screenName: "test_taro",
        text: "テストツイートテストツイートテストツイート",
      });
    }, preference.tweetChangeInterval * 1000);

    return () => {
      if (timerRef.current !== 0) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [preference]);
  return (
    <>
      <Container>
        <H1>Twitter の #ハッシュタグ が順番に流れてくるやつ</H1>
        <Body>
          <p>
            <Text>検索ハッシュタグ </Text>
            #
            <TextInput
              value={searchWord}
              onChange={(v) => {
                setSearchWord(v);
              }}
            />
          </p>
          <p>
            <Text>最大取得件数</Text>
            <NumberInput
              value={preference?.count}
              onChange={withSavePreference((v) => {
                if (preference) {
                  setPreference({
                    ...preference,
                    count: parseInt(v),
                  });
                }
              })}
            />
          </p>
          <p>
            <Text>フェードイン秒数</Text>
            <NumberInput
              value={preference?.transition}
              onChange={withSavePreference((v) => {
                if (preference) {
                  setPreference({
                    ...preference,
                    transition: parseInt(v),
                  });
                }
              })}
            />
          </p>
          <p>
            <Text>ツイートの表示更新間隔</Text>
            <NumberInput
              value={preference?.tweetChangeInterval}
              onChange={withSavePreference((v) => {
                if (preference) {
                  setPreference({
                    ...preference,
                    tweetChangeInterval: parseInt(v),
                  });
                }
              })}
            />
          </p>
          <p>
            <button
              onClick={async () => {
                const word = encodeURI(searchWord);
                if (preference.token === "") {
                  const { token } = await oauth();
                  setPreference({ ...preference, token });
                  withSavePreference(() => {
                    /* */
                  });
                }

                setUrl(`https://${location.host}/widget/${word}?${QueryString(preference)}`);
              }}
            >
              URL生成
            </button>
            {url}
          </p>
        </Body>
      </Container>
      <Preview>
        <TwitterSearch tweet={showTweet} fadeInTimeSec={preference.transition} searchWord={searchWord} />
      </Preview>
    </>
  );
}

const Container = styled.div`
  background-color: #1d98f0;
`;

const H1 = styled.h1`
  padding: 10px;
  color: #fff;
`;

const Text = styled.span`
  display: inline-block;
  width: 250px;
  text-align: left;
  ::after {
    border-right: 1px solid #000;
  }
`;

const Article = styled.article``;

const Body = styled.main`
  margin: 0px;
  background-color: #fff;
  border: 1px solid #1d98f0;
`;

const Preview = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  background-color: white;
  width: 100%;
`;
