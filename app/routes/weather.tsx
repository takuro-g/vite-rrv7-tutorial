import { Link } from "react-router";

export default function Weather() {
  return (
    <main className="max-w-240 mx-auto my-0 p-6">
      <header className="flex items-baseline gap-3">
        <h1 className="m-0">Weather</h1>
        <Link to="/" className="opacity-80">
          ← Home
        </Link>
      </header>
      <p className="mt-4 opacity-85">
        ここは /weather です。次のステップで Open-Meteo を loader
        から呼び出します。
      </p>
    </main>
  );
}
