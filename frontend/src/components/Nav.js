
'use client'
import Link from "next/link";
import useTheme from "@/hooks/useTheme";

export default function Nav() {
    const [theme, toggleTheme] = useTheme();

    return (
        <header className="header-container">
            <div className="header-wrapper">
                <div className="nav-container">
                    <Link href="/" className="logo-wrapper">
                        {/*<video
                            src="/img/itsnotVideo2.mp4"
                            autoPlay
                            muted
                            loop
                            className="logo-video"
                        />*/}
                        <img
                            src="/img/frame_v2.png"
                            className="logo-video"
                        />
                        {/*<span className="logo-title">The Blog</span>*/}
                    </Link>

                    <nav className="list-wrapper">
                        <Link className="nav-link" href="/articles">blog</Link>
                        <Link className="nav-link" href="/projects">projects</Link>
                        <Link className="nav-link" href="/about">about</Link>
                        <Link className="nav-link" href="/contact">contact</Link>

                        <button
                            className="theme-button"
                            aria-label="Toggle theme button"
                            onClick={toggleTheme}
                        >
                            {theme === "dark" ? (
                                <svg
                                    className="icon moon-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            ) : (
                                <svg
                                    className="icon sun-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            )}
                        </button>
                    </nav>
                </div>
            </div>
        </header >
    );
}
