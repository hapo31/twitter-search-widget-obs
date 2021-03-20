import React, { ComponentClass } from "react";
import { Provider } from "react-redux";
import { rootStore } from "../src/store/root";

function MyApp({ Component, pageProps }: { Component: ComponentClass; pageProps: Record<string, unknown> }) {
  return (
    <Provider store={rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
