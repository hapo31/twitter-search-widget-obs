import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appAuthThunk, searchTweetsThunk, storeToken } from "../../src/actions/twitter";
import { TwitterSearch } from "../../src/components/organisms/TwitterSearch";
import { ERR_REQUIRE_TOKEN } from "../../src/constants/error";
import { RootState } from "../../src/store/root";

type Props = {
  searchWord?: string;
  token?: string;
  transition: number;
};

export default function TwitterHashtag(props: Props) {
  const dispatch = useDispatch();
  const { twitter } = useSelector(({ twitter }: RootState) => ({
    twitter,
  }));

  const { token, tweets } = twitter;

  const [currentTweet, setCurrentTweet] = useState(0);
  const [error, setError] = useState(0);
  const timerRef = useRef(0);

  useEffect(() => {
    if (timerRef.current !== 0) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setCurrentTweet((currentTweet) => (currentTweet = (currentTweet + 1) % tweets.length));
    }, 10000);

    return () => {
      if (timerRef.current !== 0) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [tweets]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (token == null) {
      if (localStorageToken != null) {
        dispatch(storeToken(localStorageToken));
      } else if (props.token != null) {
        dispatch(storeToken(props.token));
      } else {
        setError(ERR_REQUIRE_TOKEN);
      }
    } else if (props.searchWord) {
      localStorage.setItem("token", token);
      dispatch(searchTweetsThunk("#" + props.searchWord, true));
    }
  }, [token]);

  useEffect(() => {
    const html = document.getElementsByTagName("html");
    html[0].style.overflow = "hidden";
  }, []);

  return tweets[currentTweet] ? (
    <TwitterSearch searchWord={props.searchWord ?? ""} tweet={tweets[currentTweet]} fadeInTimeSec={props.transition} />
  ) : null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const searchWord = context.query["searchWord"] as string;
  const token = context.params?.["token"] as string;
  const transition = context.params?.["token"] as string;
  return {
    props: {
      searchWord: searchWord ?? null,
      token: token ?? null,
      transition: transition ? parseInt(transition) : 2,
    },
  };
};
