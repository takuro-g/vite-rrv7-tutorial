import { Link } from "react-router";

type Post = { id: number; title: string; body: string };

export async function loader() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=20",
  );
  if (!res.ok)
    throw new Response("Failed to load posts", { status: res.status });
  const posts = (await res.json()) as Post[];
  return { posts };
}

export default function PostsIndex({
  loaderData,
}: {
  loaderData: { posts: Post[] };
}) {
  return (
    <main className="max-w-240 mx-auto my-0 p-6">
      <h1>Posts</h1>
      <ul>
        {loaderData.posts.map((p) => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`} className="underline text-blue-500">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
