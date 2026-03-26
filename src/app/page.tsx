import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import { getPortfolioData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <ClientWrapper>
      <main>
        <Navbar />
        <Hero data={data.hero} />
        <About data={data.about} />
        <Career data={data.career} />
        <Skills data={data.skills} />
        <Portfolio data={data.portfolio} />
        <Achievements data={data.achievements} />
        <Certifications data={data.certifications} />
        <Footer data={data.footer} />
      </main>
    </ClientWrapper>
  );
}
