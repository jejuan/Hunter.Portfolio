import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Approach />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
