import { Chat } from "../components/chat";
import Head from "next/head";


export default function ChatPage() {
  return (
    <>
      <Head>
        <title>Inferno AI</title>
      </Head>
      <Chat />
    </>
  );
}