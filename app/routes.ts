// app/routes.ts
import {
  type RouteConfig,
  route,
  index,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  // /
  index("./routes/_index.tsx"),

  // /weather
  route("weather", "./routes/weather.tsx"),

  // /posts 以下
  // ...prefix("posts", [
  //   // /posts （index route）
  //   index("./routes/posts/_index.tsx"),

  //   // /posts/new
  //   route("new", "./routes/posts/new.tsx"),

  //   // /posts/:id
  //   route(":id", "./routes/posts/id.tsx"),
  // ]),

  // もし「/posts全体に共通UI（タブ/サイドバー）」が欲しいなら
  // prefix の代わりに layout を使う（URLは増えずネストだけ作れる）
  //
  layout("./routes/posts/layout.tsx", [
    ...prefix("posts", [
      index("./routes/posts/_index.tsx"),
      route("new", "./routes/posts/new.tsx"),
      route(":id", "./routes/posts/id.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
