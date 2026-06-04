import {add} from "./math";

function greet(name: string): string {
  return `Hello, ${name}!`;
}

async function main() {
  console.log(greet("TypeScript"));
  console.log("2 + 3 =", add(2, 3));

  // Example: typed JSON fetch (Node 18+ has fetch built-in)
  type Post = { id: number; title: string };
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = (await res.json()) as Post;
  console.log("Sample post title:", data.title);
}

main().catch((err) => {
  console.error("Unhandled error:", err);
});