'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


export default function ArticlePage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;
        const fetchPost = async () => {
            try {
                //const res = await fetch(`http://127.0.0.1:8000/api/posts/${slug}/`);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}/`);
                if (!res.ok) throw new Error('The article is having an existential crisis. Please try again later.');
                const data = await res.json();
                setPost(data);
            } catch (err) {
                console.error(err);
                setError('The article is having an existential crisis. Please try again later.')
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return <p className='loading-message'>Please wait while the minions do their work..</p>
    if (error) return <p>{error}</p>;
    if (!post) return <p>You can panick now. We couldn&apos;t find the article. AAAHHHHHHH!</p>

    const getDriveImage = (url) => {
        const match = url?.match(/\/d\/(.*?)\//);
        return match ? `https://lh3.googleusercontent.com/d/${match[1]}=w1600` : url;
    };

    return (
        <div className='home-container'>
            <div className='home-wrapper'>
                <section className='article-wrapper'>
                    <div className='article-title'> {post.title} </div>
                    {/*<div className='article-excerpt'> {post.excerpt}</div>*/}

                    <div className='article-image-wrapper'>
                        <img
                            src={getDriveImage(post.image_url)}
                            alt={post.title}
                            className='article-image'
                        />
                    </div>
                    <div className='article-date'> posted on {new Date(post.published_at).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}</div>
                    <div className='article-content'>
                        {(() => {
                            const content = post.content || "";
                            const hasParagraphs = content.includes("</p>");
                            let firstPart, rest;

                            if (hasParagraphs) {
                                const parts = content.split(/<\/p>/i);
                                firstPart = parts[0] + parts[1] + parts[2] + "</p>";
                                rest = parts.slice(3).join("</p>");
                            } else {
                                const cut = Math.floor(content.length / 3);
                                firstPart = content.slice(0, cut);
                                rest = content.slice(cut);
                            }


                            return (
                                <>
                                    <div dangerouslySetInnerHTML={{ __html: firstPart }} />
                                    {post.highlight && (
                                        <div className='article-highlight'>
                                            {post.highlight}
                                        </div>
                                    )}
                                    <div dangerouslySetInnerHTML={{ __html: rest }} />
                                </>
                            );
                        })()}
                    </div>
                </section>
            </div>
        </div>
    );
}
