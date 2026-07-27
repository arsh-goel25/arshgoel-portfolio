import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Cursor } from "@/components/portfolio/Cursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { EducationCerts } from "@/components/portfolio/EducationCerts";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Loader } from "@/components/portfolio/Loader";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Arsh Goel — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Arsh Goel — Full Stack Developer building scalable MERN applications, real-time systems, and AI-powered digital experiences.",
      },
      { property: "og:title", content: "Arsh Goel — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Scalable MERN, real-time WebRTC, and AI-powered products — case studies, tech, and contact.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Arsh Goel — Full Stack Developer" },
      {
        name: "twitter:description",
        content:
          "Building scalable web applications, real-time systems, and AI-powered experiences.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="noise relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <EducationCerts />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
