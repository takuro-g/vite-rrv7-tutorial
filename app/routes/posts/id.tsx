import { Link, Outlet } from "react-router";

type Post = { id: number; title: string; body: string };
type Comment = { id: number; name: string; email: string; body: string };

export async function loader({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const id = params.id;
  if (!id) throw new Response("Missing id", { status: 400 });

  const postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

  const [postRes, commentsRes] = await Promise.all([
    fetch(postUrl),
    fetch(commentsUrl),
  ]);
  if (!postRes.ok)
    throw new Response("Failed to load post", { status: postRes.status });
  if (!commentsRes.ok)
    throw new Response("Failed to load comments", {
      status: commentsRes.status,
    });

  const post = (await postRes.json()) as Post;
  const comments = (await commentsRes.json()) as Comment[];

  return { post, comments };
}

export default function PostDetail({
  loaderData,
}: {
  loaderData: { post: Post; comments: Comment[] };
}) {
  const { post, comments } = loaderData;

  return (
    <main className="max-w-240 mx-auto my-0 p-6">
      <p>
        <Link to="/posts" className="underline text-blue-500">
          ← Posts
        </Link>
      </p>

      <h1>{post.title}</h1>
      <p className="whitespace-pre-wrap">{post.body}</p>

      <hr className="my-6" />

      <h2>Comments</h2>
      <ul className="border-2 h-64 overflow-y-scroll p-4">
        {comments.map((c) => (
          <li key={c.id} className="mb-3">
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm opacity-80">{c.email}</div>
            <div className="whitespace-pre-wrap">{c.body}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
