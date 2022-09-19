import { PageProps } from "$fresh/server.ts";

import Head from '../components/Head.tsx';
import Body from "../components/Body.tsx";
import Profile from '../islands/Profile.tsx';

export default function Index(props: PageProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Welcome to the Fresh Board." />
        <title>Fresh Board | Profile</title>
        <link href="/profile.css" rel="stylesheet" />
      </Head>
      <Body>
        <Profile />
      </Body>
    </>
  );
}
