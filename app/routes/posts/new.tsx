import type { Route } from "./+types/new";
import { useFetcher } from "react-router";

type CreatedPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  // 最小バリデーション
  const errors: Record<string, string> = {};
  if (!title) errors.title = "タイトルは必須です";
  if (!body) errors.body = "本文は必須です";
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ title, body, userId: 1 }),
  });

  if (!res.ok) {
    throw new Response("Failed to create post", { status: res.status });
  }

  const created = (await res.json()) as CreatedPost;
  // JSONPlaceholderは永続化されません（返ってくるだけ）:contentReference[oaicite:5]{index=5}
  return { ok: true as const, created };
}

export default function PostNew() {
  const fetcher = useFetcher<typeof action>();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <main className="max-w-240 mx-auto my-0 p-6">
      <h2 className="text-xl font-bold mb-4">Post 新規作成</h2>

      <fetcher.Form method="post" className="grid gap-3 max-w-xl">
        <label className="grid gap-1">
          <span className="font-semibold">Title</span>
          <input
            name="title"
            type="text"
            className="border rounded px-3 py-2"
            aria-invalid={
              fetcher.data?.ok === false && fetcher.data?.errors?.title
                ? true
                : undefined
            }
          />
          {fetcher.data?.ok === false && fetcher.data?.errors?.title ? (
            <span className="text-sm text-red-600">
              {fetcher.data.errors.title}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="font-semibold">Body</span>
          <textarea
            name="body"
            className="border rounded px-3 py-2 min-h-32"
            aria-invalid={
              fetcher.data?.ok === false && fetcher.data?.errors?.body
                ? true
                : undefined
            }
          />
          {fetcher.data?.ok === false && fetcher.data?.errors?.body ? (
            <span className="text-sm text-red-600">
              {fetcher.data.errors.body}
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="border rounded px-3 py-2 w-fit"
        >
          {isSubmitting ? "Sending..." : "Create"}
        </button>
      </fetcher.Form>

      {fetcher.data?.ok === true ? (
        <section className="mt-6">
          <h3 className="font-bold">作成結果（擬似）</h3>
          <p className="text-sm opacity-80">
            ※
            JSONPlaceholderは実際には保存されません（レスポンスとして返るだけです）
          </p>
          <pre className="border rounded p-3 mt-2 overflow-x-auto">
            {JSON.stringify(fetcher.data.created, null, 2)}
          </pre>
        </section>
      ) : null}
    </main>
  );
}
