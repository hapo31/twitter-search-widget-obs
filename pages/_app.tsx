import { ComponentClass } from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: ComponentClass;
  pageProps: Record<string, unknown>;
}) {
  return <Component {...pageProps} />;
}

export default MyApp;
