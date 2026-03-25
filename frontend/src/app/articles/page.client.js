
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";


export default function Articles() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //const res = await fetch("http://127.0.0.1:8000/api/posts/");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`);
        if (!res.ok) throw new Error('Erreur ${res.status}');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("You can panick now. We couldn't find this page. AAAHHHHHHH!");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const postsSorted = [...posts].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );

  const start = (page - 1) * pageSize;
  const paged = postsSorted.slice(start, start + pageSize);
  const hasPrev = page > 1;
  const hasNext = start + pageSize < postsSorted.length;

  function getDriveImage(url) {
    if (!url) return "/img/post-placeholder.jpg";
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  }

  return (

    <div className="blog-container">
      <section className="articles-wrapper">
        <div className="blog-page-title">Latest</div>
        <section className="latest-post">
          {loading && <p className="loading-message">Please wait while the minions do their work..</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && paged.length === 0 && (
            <p> No article found.</p>
          )}
          {!loading && !error && paged.map(post => (

            <Link key={post.id} href={`/articles/${post.slug}`} className="post-link">
              <div className="post-wrapper">
                <div className="post-media">
                  <img
                    src={getDriveImage(post.image_url)}
                    alt={post.title}
                    loading="lazy"
                    // eslint-disable-next-line @next/next/no-img-element
                  />
                </div>
                <div className="post-title">
                  {post.title}
                </div>
                <div className="post-date">
                  posted on {new Date(post.published_at).toLocaleDateString('en-US', options)}
                </div>
                <div className="post-excerpt">{post.excerpt}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </section>

      {!loading && !error && posts.length > pageSize && (
        <div className="pager">
          <button disabled={!hasPrev} onClick={() => setPage(p => p - 1)}>Prev</button>
          <span className="pager-page">{page}</span>
          <button disabled={!hasNext} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
