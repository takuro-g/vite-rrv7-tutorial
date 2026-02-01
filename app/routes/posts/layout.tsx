import { Outlet, NavLink } from "react-router";

export default function PostsLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Posts</h1>
      <nav className="flex gap-3">
        <NavLink to="/posts">一覧</NavLink>
        <NavLink to="/posts/new">新規</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
