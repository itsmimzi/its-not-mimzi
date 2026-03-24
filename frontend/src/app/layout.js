import "./style/globals.css";
import "./style/projects.css";
import "./style/about.css";
import "./style/blog.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeClient from "@/components/ThemeClient";


export const metadata = {
  title: "Home | It's not Mimzi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeClient />

        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}