import { A } from "@solidjs/router";
import WebBoard from "~/components/web/board";

export default function Web() {
  return (
    <>
      <A href="/" class="absolute top-4 left-4 z-50 text-black">
        Home
      </A>
      <h1 class="text-6xl text-sky-700 font-thin uppercase text-center my-16">
        Web Version
      </h1>
      <WebBoard />
    </>
  );
}
