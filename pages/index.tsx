import styled from "styled-components";
import { TwitterSearch } from "../src/components/organisms/TwitterSearch";

type Props = {};

export default function Index(props: Props) {
  return (
    <>
      <Container>
        <H1>Twitter の #ハッシュタグ が順番に流れてくるやつ</H1>
        <Body>
          <p>設定値1</p>
          <p>設定値1</p>
          <p>設定値1</p>
        </Body>
      </Container>
      <Preview>
        <TwitterSearch
          tweet={{
            createdAt: new Date(),
            id: 123,
            name: "テスト太郎",
            profileImg: "",
            screenName: "test_taro",
            text: "テストツイートテストツイートテストツイート",
          }}
          fadeInTimeSec={2}
          searchWord="テスト"
        />
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

const Body = styled.main`
  margin: 0px;
  background-color: #fff;
`;

const Preview = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  background-color: white;
  width: 100%;
`;
