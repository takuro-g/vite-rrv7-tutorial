import { Link } from "react-router";
import type { Route } from "./+types/weather";

type OpenMeteoResponse = {
  latitude: number; // 緯度
  longitude: number; // 経度
  timezone: string; // タイムゾーン
  current?: {
    // 現在の天気（optional）
    time: string; // データ取得時刻
    temperature_2m: number; // 気温（摂氏）
    weather_code: number; // 天気コード
  };
};

const weatherCodes: Record<number, string> = {
  0: "Clear sky（快晴）",
  1: "Mainly clear（概ね晴れ）",
  2: "Partly cloudy（一部曇り）",
  3: "Overcast（曇天）",
  45: "Fog（霧）",
  48: "Depositing rime fog（着氷性の霧）",
  51: "Drizzle: Light（霧雨：弱）",
  53: "Drizzle: Moderate（霧雨：中）",
  55: "Drizzle: Dense intensity（霧雨：強）",
  56: "Freezing Drizzle: Light（着氷性の霧雨：弱）",
  57: "Freezing Drizzle: Dense intensity（着氷性の霧雨：強）",
  61: "Rain: Slight（雨：弱）",
  63: "Rain: Moderate（雨：中）",
  65: "Rain: Heavy intensity（雨：強）",
  66: "Freezing Rain: Light（着氷性の雨：弱）",
  67: "Freezing Rain: Heavy intensity（着氷性の雨：強）",
  71: "Snow fall: Slight（降雪：弱）",
  73: "Snow fall: Moderate（降雪：中）",
  75: "Snow fall: Heavy intensity（降雪：強）",
  77: "Snow grains（霙/雪粒）",
  80: "Rain showers: Slight（にわか雨：弱）",
  81: "Rain showers: Moderate（にわか雨：中）",
  82: "Rain showers: Violent（にわか雨：強/激しい）",
  85: "Snow showers: Slight（にわか雪：弱）",
  86: "Snow showers: Heavy（にわか雪：強）",
  95: "Thunderstorm: Slight or moderate（雷雨：弱または中）",
  96: "Thunderstorm with slight hail（ひょうを伴う雷雨：弱）",
  99: "Thunderstorm with heavy hail（ひょうを伴う雷雨：強）",
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const lat = Number(url.searchParams.get("lat") ?? 35.6895); // Tokyo
  const lon = Number(url.searchParams.get("lon") ?? 139.6917); // Tokyo

  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.searchParams.set("latitude", String(lat));
  endpoint.searchParams.set("longitude", String(lon));
  endpoint.searchParams.set("current", "temperature_2m,weather_code");
  endpoint.searchParams.set("timezone", "Asia/Tokyo");

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Response("Failed to fetch weather data", { status: res.status });
  }

  const data = (await res.json()) as OpenMeteoResponse;

  return {
    endpoint: endpoint.toString(),
    data,
  };
}

export default function Weather({ loaderData }: Route.ComponentProps) {
  const { endpoint, data } = loaderData;
  const current = data.current;

  return (
    <main className="p-4">
      <h1>Weather</h1>

      <p className="text-[12px] opacity-70">
        source: <a href={endpoint}>{endpoint}</a>
      </p>

      {!current ? (
        <p>current data is unavailable</p>
      ) : (
        <ul>
          <li>time: {current.time}</li>
          <li>temperature_2m: {current.temperature_2m}°C</li>
          <li>weather_code: {current.weather_code}</li>
          <li>
            weather:{" "}
            {weatherCodes[current.weather_code] ?? "Unknown weather code"}
          </li>
          <li>timezone: {data.timezone}</li>
        </ul>
      )}
    </main>
  );
}
