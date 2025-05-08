import { useEffect, useState } from "react";
import "./AppCalc.css";

type Post = {
  id: number;
  userId: number;
  title: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((allPosts) => {
        setPosts((prev) => {
          const start = page * ITEMS_PER_PAGE;
          const end = start + ITEMS_PER_PAGE;
          const newPosts = [...prev, ...allPosts.slice(start, end)];
          console.log(newPosts.length, start, end);
          return newPosts;
        });
      });
  }, [page]);

  return (
    <>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div>User ID: {post.userId}</div>
            <div>Post ID: {post.id}</div>
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
