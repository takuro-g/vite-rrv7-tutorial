import { useParams } from "react-router";

export default function PostDetail() {
  let { id } = useParams();
  return <div>Post 詳細: {id}</div>;
}
