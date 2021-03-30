import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TwitterError } from "../@types/twitter";
import { Form } from "../src/components/atom/Form";
import { NumberInput } from "../src/components/molecules/NumberInput";
import { TextInput } from "../src/components/molecules/TextInput";
import { TwitterSearch } from "../src/components/organisms/TwitterSearch";
import { oauth } from "../src/service/twitter";
import { QueryString } from "../src/util/util";

type Props = {
  noneval: unknown;
};

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
  const [error, setError] = useState<TwitterError | null>(null);
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

  const onClickButton = useCallback(async () => {
    const word = encodeURI(preference.searchWord);
    let newPreference = preference;
    if (!preference.token) {
      const res = await oauth();
      if ("errors" in res) {
        if (res.errors.length > 0) {
          setError(res.errors[0]);
          return;
        } else {
          console.error(res);
        }
      } else {
        const { token } = res;
        newPreference = { ...preference, token };
        setError(null);
        setPreference(newPreference);
      }
    }
    const url = `https://${location.host}/widget/${word}?${QueryString({
      count: newPreference.count,
      transition: newPreference.transition,
      tweetChangeInterval: newPreference.tweetChangeInterval,
      token: newPreference.token,
    })}`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied((copied) => {
        if (!copied) {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        }
        return copied;
      });
    }
  }, [preference]);

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
              <FormItem>
                <Text>検索ハッシュタグ</Text>
                <Hash />
                <TextInput name="searchWord" defaultValue={preference.searchWord} />
              </FormItem>
              <FormItem>
                <Text>最大取得件数</Text>
                <NumberInput name="count" defaultValue={preference.count} />
              </FormItem>
              <FormItem>
                <Text>フェードイン秒数</Text>
                <NumberInput name="transition" defaultValue={preference.transition} />
              </FormItem>
              <FormItem>
                <Text>
                  ツイートの表示更新間隔<SmallText>(最低10秒、それ以下を指定しても10秒になります)</SmallText>
                </Text>
                <NumberInput name="tweetChangeInterval" defaultValue={preference.tweetChangeInterval} />
              </FormItem>
            </Form>
            <CopyButtonWrapper>
              <button onClick={onClickButton}>URLをコピー</button>
              <TextCopied className={copied ? "show" : ""}>☑ クリップボードにURLをコピーしました！</TextCopied>
              {error != null ? <ErrorMessage>エラーが発生しました: {error.message}</ErrorMessage> : null}
            </CopyButtonWrapper>
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
  margin: 0;
  padding: 10px;
  color: #fff;
`;

const Body = styled.main`
  margin: 0px;
  padding: 5px 10px 0;
  background-color: #fff;
  border: 1px solid #1d98f0;
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.p`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  display: inline-block;
  max-width: 70%;
  text-align: left;
  font-size: 16px;
`;

const Hash = styled.span`
  margin-left: auto;
  ::before {
    display: inline-block;
    content: "#";
    font-size: 1.2em;
  }
`;

const SmallText = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-right: auto;
  font-size: small;
  color: #6f6f6f;
`;

const CopyButtonWrapper = styled.div`
  margin: 5px 0 10px;
  width: 100%;
`;

const Preview = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  background-color: white;
  width: 100%;
`;

const TextCopied = styled.span`
  display: inline-block;
  margin-left: 10px;
  color: #009c2f;
  font-size: 14px;
  transition: 3s;
  visibility: hidden;
  &.show {
    visibility: visible;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;
