import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio-data.json");

export type PortfolioData = {
  hero: {
    badge: string;
    heading: string;
    titles: string[];
    description: string;
    ctaText: string;
    ctaLink: string;
    cvFile: string;
  };
  about: {
    name: string;
    photo: string;
    bio: string[];
    location: string;
    education: {
      school: string;
      period: string;
      location: string;
      description: string;
    }[];
  };
  career: {
    company: string;
    role: string;
    period: string;
    description: string;
    achievement: string;
    icon: string;
    color: string;
  }[];
  skills: {
    marketing: { name: string; icon: string; level: number }[];
    it: { name: string; icon: string; level: number }[];
  };
  portfolio: {
    marketing: {
      title: string;
      subtitle: string;
      description: string;
      reelUrl: string;
      thumbnail: string;
      gradient: string;
      account: string;
    }[];
    it: {
      title: string;
      subtitle: string;
      description: string;
      liveUrl: string;
      gradient: string;
    }[];
  };
  achievements: {
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
    image: string;
  }[];
  footer: {
    tagline: string;
    email: string;
    social: {
      platform: string;
      url: string;
      icon: string;
    }[];
  };
};

export async function getPortfolioData(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
