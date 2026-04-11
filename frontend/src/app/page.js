async function fetchPosts() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${base}/api/posts/`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function getDriveImage(url) {
  if (!url) return "/img/post-placeholder.jpg";
  const match = url.match(/\/d\/(.*?)\//);
  return match ? `https://lh3.googleusercontent.com/d/${match[1]}=w1200` : url;
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const SECTION_LABELS = ["AI", "Startups", "Security", "Venture", "Apps"];

export default async function Homepage() {
  const posts = await fetchPosts();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );

  const hero = sorted.find((p) => p.highlight) || sorted[0] || null;
  const heroId = hero?.id;
  const rest = sorted.filter((p) => p.id !== heroId);
  const latest = rest.slice(0, 5);
  const sectionPool = rest.slice(5);

  return (
    <main className="mag-container">
      <div className="mag-wrapper">
        <header className="mag-masthead">
          <p className="mag-kicker">It&apos;s not Mimzi</p>
          <h1 className="mag-title">Notes from the in-between.</h1>
          <p className="mag-sub">
            A blog about building, pivoting, and thinking out loud.
          </p>
        </header>

        <section className="mag-top">
          {hero ? (
            <a href={`/articles/${hero.slug}`} className="mag-hero">
              <div className="mag-hero-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getDriveImage(hero.image_url)} alt={hero.title} />
              </div>
              <div className="mag-hero-body">
                <span className="mag-tag">Featured</span>
                <h2 className="mag-hero-title">{hero.title}</h2>
                {hero.excerpt && <p className="mag-hero-excerpt">{hero.excerpt}</p>}
                <span className="mag-hero-date">{formatDate(hero.published_at)}</span>
              </div>
            </a>
          ) : (
            <div className="mag-hero mag-empty">No posts yet — come back soon.</div>
          )}

          <aside className="mag-latest">
            <h3 className="mag-col-title">Latest</h3>
            <ul className="mag-latest-list">
              {latest.length === 0 && <li className="mag-empty-row">Nothing here yet.</li>}
              {latest.map((post) => (
                <li key={post.id} className="mag-latest-item">
                  <a href={`/articles/${post.slug}`}>
                    <span className="mag-latest-title">{post.title}</span>
                    <span className="mag-latest-date">{formatDate(post.published_at)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mag-sections">
          {SECTION_LABELS.map((label, idx) => {
            const slice = sectionPool.slice(idx * 2, idx * 2 + 2);
            if (slice.length === 0) return null;
            return (
              <div key={label} className="mag-section">
                <h3 className="mag-section-title">{label}</h3>
                <div className="mag-section-grid">
                  {slice.map((post) => (
                    <a
                      key={post.id}
                      href={`/articles/${post.slug}`}
                      className="mag-card"
                    >
                      <div className="mag-card-media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={getDriveImage(post.image_url)} alt={post.title} />
                      </div>
                      <h4 className="mag-card-title">{post.title}</h4>
                      {post.excerpt && (
                        <p className="mag-card-excerpt">{post.excerpt}</p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
