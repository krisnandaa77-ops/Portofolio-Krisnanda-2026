"use client";

import SplashScreen from "@/components/SplashScreen";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SplashScreen>{children}</SplashScreen>;
}
