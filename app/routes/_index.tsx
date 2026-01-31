import { Link } from "react-router";

export default function Home() {
  return (
    <main className="mx-auto max-w-240 p-6">
      <header className="mb-6">
        <h1 className="m-0">Public API Dashboard</h1>
        <p className="mt-2 opacity-80">
          React Router v7（Framework Mode） + Vite / Backendなし（Public
          APIのみ）
        </p>
      </header>

      <section className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <FeatureCard
          title="Weather"
          description="Open-Meteo（APIキー不要）で天気を表示します。"
          to="/weather"
          cta="天気へ"
        />
        <FeatureCard
          title="Posts"
          description="JSONPlaceholderで投稿一覧・詳細・擬似POSTを扱います。"
          to="/posts"
          cta="投稿へ"
        />
      </section>

      <hr className="my-7" />

      <section>
        <h2 className="mt-0">Next steps</h2>
        <ol className="leading-[1.8]">
          <li>
            <code>/weather</code> を作成し、<strong>loader</strong> で
            Open-Meteo を呼ぶ
          </li>
          <li>
            <code>/posts</code> に一覧、<code>/posts/:id</code>{" "}
            に詳細（＋コメント）を追加
          </li>
          <li>
            <code>/posts/new</code> を <strong>action</strong> +{" "}
            <strong>useFetcher</strong> で擬似POST
          </li>
        </ol>
      </section>
    </main>
  );
}

function FeatureCard(props: {
  title: string;
  description: string;
  to: string;
  cta: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 p-4">
      <h3 className="mb-2 mt-0">{props.title}</h3>
      <p className="mb-3.5 mt-0 opacity-[0.85]">{props.description}</p>
      <Link to={props.to} className="no-underline">
        <span className="inline-block rounded-[10px] border border-black/20 px-3 py-2.5">
          {props.cta} →
        </span>
      </Link>
    </div>
  );
}
