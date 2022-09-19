import { ComponentChildren } from "preact";
import { Head as H } from "$fresh/runtime.ts";

export default function Head(props: { children: ComponentChildren }) {
  return (
    <H>
      <meta charSet={'utf-8'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#16161d" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta http-equiv="x-ua-compatible" content="IE=Edge" />
      {props.children}
      <link href="/root.css" rel="stylesheet" />
      <link href="/menu.css" rel="stylesheet" />
    </H>
  );
}
