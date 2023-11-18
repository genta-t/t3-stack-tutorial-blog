import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>T3 ブログ</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 text-white">
        <div className="container px-4 mx-auto">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] mb-10">
            <span className="text-[hsl(280,100%,70%)]">T3</span>App ブログ
          </h1>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="mb-2 text-2xl font-bold">タイトル</h3>
              <div className="mb-2 text-lg">本文</div>
              <span className="text-base text-gray-400">2023/11/18</span>
            </Link>
          </div>
          
        </div>
      </main>
    </>
  );
}
