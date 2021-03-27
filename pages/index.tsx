import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Form } from "../src/components/atom/Form";
import { NumberInput } from "../src/components/molecules/NumberInput";
import { TextInput } from "../src/components/molecules/TextInput";
import { TwitterSearch } from "../src/components/organisms/TwitterSearch";
import { oauth } from "../src/service/twitter";
import { QueryString } from "../src/util/util";

type Props = {};

type Preference = {
  count: number;
  transition: number;
  tweetChangeInterval: number;
  token: string;
  searchWord: string;
};

export default function Index(props: Props) {
  const [preference, setPreference] = useState<Preference>({} as any);
  const [copied, setCopied] = useState(false);
  const [firstView, setFirstView] = useState(true);
  const [showTweet, setShowTweet] = useState({
    createdAt: new Date(),
    id: "123",
    name: "テスト太郎",
    profileImg: "",
    screenName: "test_taro",
    text: "テストツイートテストツイートテストツイート",
    token: "",
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
        searchWord: "",
      });
    }

    setFirstView(false);
  }, []);

  const onChangeValue = useCallback(
    (name: string, value: string) => {
      if (!firstView) {
        const newPreference = {
          ...preference,
          [name]: value,
        };
        localStorage.setItem("preference", JSON.stringify(newPreference));
        setPreference(newPreference);
      }
    },
    [preference, firstView]
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
        token: "",
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
        {!firstView ? (
          <Body>
            <Form onChangedValue={onChangeValue}>
              <p>
                <Text>検索ハッシュタグ</Text>
                #
                <TextInput name="searchWord" defaultValue={preference.searchWord} />
              </p>
              <p>
                <Text>最大取得件数</Text>
                <NumberInput name="count" />
              </p>
              <p>
                <Text>フェードイン秒数</Text>
                <NumberInput name="transition" defaultValue={preference.transition} />
              </p>
              <p>
                <Text>ツイートの表示更新間隔</Text>
                <NumberInput name="tweetChangeInterval" defaultValue={preference.tweetChangeInterval} />
              </p>
            </Form>
            <p>
              <button
                onClick={async () => {
                  const word = encodeURI(preference.searchWord);
                  let newPreference = preference;
                  if (!preference.token) {
                    const { token } = await oauth();
                    newPreference = { ...preference, token };
                    setPreference(newPreference);
                  }
                  const url = `https://${location.host}/widget/${word}?${QueryString({
                    count: newPreference.count,
                    transition: newPreference.transition,
                    tweetChangeInterval: newPreference.tweetChangeInterval,
                    token: newPreference.token,
                  })}`;

                  if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    if (!copied) {
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 3000);
                    }
                  }
                }}
              >
                URLをコピー
              </button>
              <TextCopied className={copied ? "show" : ""}>☑ クリップボードにURLをコピーしました！</TextCopied>
            </p>
          </Body>
        ) : null}
      </Container>
      <Preview>
        <TwitterSearch tweet={showTweet} fadeInTimeSec={preference.transition} searchWord={preference.searchWord} />
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

const TextCopied = styled.span`
  color: #009c2f;
  transition: 3s;
  visibility: hidden;
  &.show {
    visibility: visible;
  }
`;
