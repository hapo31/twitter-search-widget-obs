import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTweetsThunk, storeToken, storeTweets } from "../../src/actions/twitter";
import { TwitterSearch } from "../../src/components/organisms/TwitterSearch";
import { ERR_REQUIRE_TOKEN } from "../../src/constants/error";
import { RootState } from "../../src/store/root";
import { Tweet } from "../../src/store/twitter";

type Props = {
  searchWord?: string;
  token?: string;
  transition: number;
  count: number;
  tweetChangeInterval: number;
};

export default function TwitterHashtag(props: Props) {
  const dispatch = useDispatch();
  const { twitter } = useSelector(({ twitter }: RootState) => ({
    twitter,
  }));

  const { token, tweets } = twitter;

  const [showTweet, setShowTweet] = useState<Tweet>({
    createdAt: new Date(),
    id: "0",
    name: "",
    profileImg: "",
    screenName: "",
    text: "",
  });
  const [error, setError] = useState(0);
  const timerRef = useRef(0);

  useEffect(() => {
    if (timerRef.current !== 0) {
      window.clearInterval(timerRef.current);
    }
    if (showTweet.id === "0" && tweets.length > 0) {
      const newShowTweet = tweets.shift();
      if (newShowTweet) {
        dispatch(storeTweets([...tweets]));
        setShowTweet(newShowTweet);
      }
    }
    timerRef.current = window.setInterval(() => {
      if (tweets.length <= 1) {
        dispatch(searchTweetsThunk("#" + props.searchWord, props.count, true));
        if (tweets.length === 0) {
          return;
        }
      }

      const newShowTweet = tweets.shift();
      if (newShowTweet) {
        dispatch(storeTweets([...tweets]));
        setShowTweet(newShowTweet);
      }
    }, props.tweetChangeInterval * 1000);

    return () => {
      if (timerRef.current !== 0) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [tweets]);

  useEffect(() => {
    if (token == null) {
      if (props.token != null) {
        dispatch(storeToken(props.token));
      } else {
        setError(ERR_REQUIRE_TOKEN);
      }
    } else if (props.searchWord) {
      localStorage.setItem("token", token);
      dispatch(searchTweetsThunk("#" + props.searchWord, props.count, true));
    }
  }, [token]);

  useEffect(() => {
    const html = document.getElementsByTagName("html");
    html[0].style.overflow = "hidden";
  }, []);

  return showTweet ? (
    <TwitterSearch searchWord={props.searchWord ?? ""} tweet={showTweet} fadeInTimeSec={props.transition} />
  ) : null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const searchWord = context.params?.["searchWord"] as string;
  const token = context.query?.["token"] as string;
  const transition = context.query?.["transition"] as string;
  const count = context.query?.["count"] as string;
  const tweetChangeInterval = context.query?.["tweetChangeInterval"] as string;

  return {
    props: {
      searchWord: searchWord ?? null,
      token: token ?? null,
      transition: transition ? parseInt(transition) : 2,
      count: count ? parseInt(count) : 15,
      tweetChangeInterval: tweetChangeInterval ? parseInt(tweetChangeInterval) : 10,
    },
  };
};
