import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <A href="/web">Web Game</A>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world {count()}!
      </h1>
      <button
        class="bg-purple-700 text-white"
        onClick={() => setCount((prev) => prev + 1)}
      >
        click me
      </button>
    </main>
  );
}
