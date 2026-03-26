import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Krisnanda Portfolio",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
