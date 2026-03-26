"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Briefcase,
  Wrench,
  Film,
  Award,
  Trophy,
  Link2,
  LogOut,
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ======================== TYPES ========================
type PortfolioData = {
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
    education: { school: string; period: string; location: string; description: string }[];
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
  achievements: { title: string; description: string; image: string; link: string }[];
  certifications: { title: string; issuer: string; year: string; image: string }[];
  footer: {
    tagline: string;
    email: string;
    social: { platform: string; url: string; icon: string }[];
  };
};

type SectionKey = "hero" | "about" | "career" | "skills" | "portfolio" | "achievements" | "certifications" | "footer";

const sections: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "hero", label: "Hero", icon: <Sparkles size={18} /> },
  { key: "about", label: "About", icon: <User size={18} /> },
  { key: "career", label: "Career", icon: <Briefcase size={18} /> },
  { key: "skills", label: "Skills", icon: <Wrench size={18} /> },
  { key: "portfolio", label: "Portfolio", icon: <Film size={18} /> },
  { key: "achievements", label: "Achievements", icon: <Trophy size={18} /> },
  { key: "certifications", label: "Sertifikat", icon: <Award size={18} /> },
  { key: "footer", label: "Footer", icon: <Link2 size={18} /> },
];

// ======================== HELPERS ========================
function Input({ label, value, onChange, ...props }: { label: string; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
        {...props}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
      />
    </div>
  );
}

function Card({ title, children, collapsible = false }: { title: string; children: React.ReactNode; collapsible?: boolean }) {
  const [open, setOpen] = useState(!collapsible);
  return (
    <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
      <button
        onClick={() => collapsible && setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 ${collapsible ? "cursor-pointer hover:bg-[#151515]" : "cursor-default"} transition-colors`}
      >
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {collapsible && (open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />)}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// ======================== FILE UPLOAD ========================
function FileUpload({ label, currentUrl, folder, onUploaded }: { label: string; currentUrl: string; folder: string; onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onUploaded(data.url);
    } catch {
      alert("Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        {currentUrl && (
          <div className="w-16 h-16 rounded-lg bg-[#0a0a0a] border border-[#333] overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#333] text-sm cursor-pointer hover:border-purple-500 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? "Uploading..." : "Pilih File"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
        {currentUrl && <span className="text-xs text-gray-600 truncate max-w-[200px]">{currentUrl}</span>}
      </div>
    </div>
  );
}

// ======================== SECTION EDITORS ========================

function HeroEditor({ data, onChange }: { data: PortfolioData["hero"]; onChange: (d: PortfolioData["hero"]) => void }) {
  return (
    <div className="space-y-4">
      <Card title="Teks Utama">
        <Input label="Badge" value={data.badge} onChange={(v) => onChange({ ...data, badge: v })} />
        <Textarea label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
        <Textarea label="Deskripsi" value={data.description} onChange={(v) => onChange({ ...data, description: v })} />
      </Card>
      <Card title="Animated Titles">
        {data.titles.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={t}
              onChange={(e) => {
                const newTitles = [...data.titles];
                newTitles[i] = e.target.value;
                onChange({ ...data, titles: newTitles });
              }}
              className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button onClick={() => onChange({ ...data, titles: data.titles.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-400 p-1">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button onClick={() => onChange({ ...data, titles: [...data.titles, ""] })} className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300">
          <Plus size={14} /> Tambah Title
        </button>
      </Card>
      <Card title="CTA & CV">
        <Input label="CTA Text" value={data.ctaText} onChange={(v) => onChange({ ...data, ctaText: v })} />
        <Input label="CTA Link" value={data.ctaLink} onChange={(v) => onChange({ ...data, ctaLink: v })} />
        <Input label="CV File Path" value={data.cvFile} onChange={(v) => onChange({ ...data, cvFile: v })} />
      </Card>
    </div>
  );
}

function AboutEditor({ data, onChange }: { data: PortfolioData["about"]; onChange: (d: PortfolioData["about"]) => void }) {
  return (
    <div className="space-y-4">
      <Card title="Profil">
        <Input label="Nama" value={data.name} onChange={(v) => onChange({ ...data, name: v })} />
        <Input label="Lokasi" value={data.location} onChange={(v) => onChange({ ...data, location: v })} />
        <FileUpload label="Foto Profil" currentUrl={data.photo} folder="profile" onUploaded={(url) => onChange({ ...data, photo: url })} />
      </Card>
      <Card title="Bio">
        {data.bio.map((p, i) => (
          <Textarea key={i} label={`Paragraf ${i + 1}`} value={p} onChange={(v) => { const newBio = [...data.bio]; newBio[i] = v; onChange({ ...data, bio: newBio }); }} />
        ))}
      </Card>
      <Card title="Pendidikan">
        {data.education.map((edu, i) => (
          <div key={i} className="bg-[#0a0a0a] rounded-lg p-4 space-y-3 border border-[#222]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">Pendidikan {i + 1}</span>
              <button onClick={() => onChange({ ...data, education: data.education.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
            <Input label="Sekolah" value={edu.school} onChange={(v) => { const ne = [...data.education]; ne[i] = { ...ne[i], school: v }; onChange({ ...data, education: ne }); }} />
            <Input label="Periode" value={edu.period} onChange={(v) => { const ne = [...data.education]; ne[i] = { ...ne[i], period: v }; onChange({ ...data, education: ne }); }} />
            <Input label="Lokasi" value={edu.location} onChange={(v) => { const ne = [...data.education]; ne[i] = { ...ne[i], location: v }; onChange({ ...data, education: ne }); }} />
            <Textarea label="Deskripsi" value={edu.description} onChange={(v) => { const ne = [...data.education]; ne[i] = { ...ne[i], description: v }; onChange({ ...data, education: ne }); }} rows={2} />
          </div>
        ))}
        <button onClick={() => onChange({ ...data, education: [...data.education, { school: "", period: "", location: "", description: "" }] })} className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300">
          <Plus size={14} /> Tambah Pendidikan
        </button>
      </Card>
    </div>
  );
}

function CareerEditor({ data, onChange }: { data: PortfolioData["career"]; onChange: (d: PortfolioData["career"]) => void }) {
  return (
    <div className="space-y-4">
      {data.map((c, i) => (
        <Card key={i} title={c.company || `Karier ${i + 1}`} collapsible>
          <div className="flex justify-end">
            <button onClick={() => onChange(data.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={12} /> Hapus</button>
          </div>
          <Input label="Perusahaan" value={c.company} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], company: v }; onChange(nd); }} />
          <Input label="Role" value={c.role} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], role: v }; onChange(nd); }} />
          <Input label="Periode" value={c.period} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], period: v }; onChange(nd); }} />
          <Textarea label="Deskripsi" value={c.description} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], description: v }; onChange(nd); }} />
          <Textarea label="Achievement" value={c.achievement} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], achievement: v }; onChange(nd); }} />
          <Input label="Icon (Lucide name)" value={c.icon} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], icon: v }; onChange(nd); }} />
          <Input label="Color Gradient" value={c.color} onChange={(v) => { const nd = [...data]; nd[i] = { ...nd[i], color: v }; onChange(nd); }} />
        </Card>
      ))}
      <button onClick={() => onChange([...data, { company: "", role: "", period: "", description: "", achievement: "", icon: "Briefcase", color: "from-blue-500 to-cyan-500" }])} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[#333] text-sm text-purple-400 hover:border-purple-500 hover:text-purple-300 transition-colors">
        <Plus size={16} /> Tambah Karier
      </button>
    </div>
  );
}

function SkillsEditor({ data, onChange }: { data: PortfolioData["skills"]; onChange: (d: PortfolioData["skills"]) => void }) {
  const renderSkillGroup = (group: "marketing" | "it", label: string) => (
    <Card title={label}>
      {data[group].map((s, i) => (
        <div key={i} className="flex items-end gap-3">
          <div className="flex-1"><Input label="Nama" value={s.name} onChange={(v) => { const ns = { ...data }; ns[group] = [...ns[group]]; ns[group][i] = { ...ns[group][i], name: v }; onChange(ns); }} /></div>
          <div className="w-24">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Level</label>
            <input type="number" min={0} max={100} value={s.level} onChange={(e) => { const ns = { ...data }; ns[group] = [...ns[group]]; ns[group][i] = { ...ns[group][i], level: Number(e.target.value) }; onChange(ns); }} className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" />
          </div>
          <button onClick={() => { const ns = { ...data }; ns[group] = ns[group].filter((_, j) => j !== i); onChange(ns); }} className="text-red-500 hover:text-red-400 pb-2"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={() => { const ns = { ...data }; ns[group] = [...ns[group], { name: "", icon: "Code2", level: 50 }]; onChange(ns); }} className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300">
        <Plus size={14} /> Tambah Skill
      </button>
    </Card>
  );

  return (
    <div className="space-y-4">
      {renderSkillGroup("marketing", "Marketing Skills")}
      {renderSkillGroup("it", "IT & Development Skills")}
    </div>
  );
}

function PortfolioEditor({ data, onChange }: { data: PortfolioData["portfolio"]; onChange: (d: PortfolioData["portfolio"]) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-purple-400">Marketing / Reels</h3>
      {data.marketing.map((p, i) => (
        <Card key={i} title={p.title || `Konten ${i + 1}`} collapsible>
          <div className="flex justify-end">
            <button onClick={() => onChange({ ...data, marketing: data.marketing.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={12} /> Hapus</button>
          </div>
          <Input label="Judul" value={p.title} onChange={(v) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], title: v }; onChange({ ...data, marketing: nm }); }} />
          <Input label="Subtitle" value={p.subtitle} onChange={(v) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], subtitle: v }; onChange({ ...data, marketing: nm }); }} />
          <Textarea label="Deskripsi" value={p.description} onChange={(v) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], description: v }; onChange({ ...data, marketing: nm }); }} rows={2} />
          <Input label="URL Reel/Instagram" value={p.reelUrl} onChange={(v) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], reelUrl: v }; onChange({ ...data, marketing: nm }); }} />
          <Input label="Akun Instagram" value={p.account} onChange={(v) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], account: v }; onChange({ ...data, marketing: nm }); }} />
          <Input label="Gradient CSS" value={p.gradient} onChange={(v) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], gradient: v }; onChange({ ...data, marketing: nm }); }} />
          <FileUpload label="Thumbnail" currentUrl={p.thumbnail} folder="portfolio" onUploaded={(url) => { const nm = [...data.marketing]; nm[i] = { ...nm[i], thumbnail: url }; onChange({ ...data, marketing: nm }); }} />
        </Card>
      ))}
      <button onClick={() => onChange({ ...data, marketing: [...data.marketing, { title: "", subtitle: "", description: "", reelUrl: "", thumbnail: "", gradient: "from-pink-500 via-purple-500 to-indigo-500", account: "" }] })} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[#333] text-sm text-purple-400 hover:border-purple-500 transition-colors">
        <Plus size={16} /> Tambah Konten Marketing
      </button>

      <div className="border-t border-[#222] pt-6">
        <h3 className="text-sm font-semibold text-blue-400 mb-4">IT Projects</h3>
        {data.it.map((p, i) => (
          <Card key={i} title={p.title || `Project ${i + 1}`} collapsible>
            <div className="flex justify-end">
              <button onClick={() => onChange({ ...data, it: data.it.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={12} /> Hapus</button>
            </div>
            <Input label="Judul" value={p.title} onChange={(v) => { const ni = [...data.it]; ni[i] = { ...ni[i], title: v }; onChange({ ...data, it: ni }); }} />
            <Input label="Subtitle" value={p.subtitle} onChange={(v) => { const ni = [...data.it]; ni[i] = { ...ni[i], subtitle: v }; onChange({ ...data, it: ni }); }} />
            <Textarea label="Deskripsi" value={p.description} onChange={(v) => { const ni = [...data.it]; ni[i] = { ...ni[i], description: v }; onChange({ ...data, it: ni }); }} rows={2} />
            <Input label="Live URL" value={p.liveUrl} onChange={(v) => { const ni = [...data.it]; ni[i] = { ...ni[i], liveUrl: v }; onChange({ ...data, it: ni }); }} />
            <Input label="Gradient CSS" value={p.gradient} onChange={(v) => { const ni = [...data.it]; ni[i] = { ...ni[i], gradient: v }; onChange({ ...data, it: ni }); }} />
          </Card>
        ))}
        <button onClick={() => onChange({ ...data, it: [...data.it, { title: "", subtitle: "", description: "", liveUrl: "", gradient: "from-blue-500 to-cyan-500" }] })} className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl border border-dashed border-[#333] text-sm text-blue-400 hover:border-blue-500 transition-colors">
          <Plus size={16} /> Tambah Project IT
        </button>
      </div>
    </div>
  );
}

function AchievementsEditor({ data, onChange }: { data: PortfolioData["achievements"]; onChange: (d: PortfolioData["achievements"]) => void }) {
  return (
    <div className="space-y-4">
      {data.map((a, i) => (
        <Card key={i} title={a.title || `Achievement ${i + 1}`} collapsible>
          <div className="flex justify-end">
            <button onClick={() => onChange(data.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={12} /> Hapus</button>
          </div>
          <Input label="Judul" value={a.title} onChange={(v) => { const na = [...data]; na[i] = { ...na[i], title: v }; onChange(na); }} />
          <Textarea label="Deskripsi" value={a.description} onChange={(v) => { const na = [...data]; na[i] = { ...na[i], description: v }; onChange(na); }} />
          <Input label="Link (Instagram/Web)" value={a.link} onChange={(v) => { const na = [...data]; na[i] = { ...na[i], link: v }; onChange(na); }} />
          <FileUpload label="Gambar Achievement" currentUrl={a.image} folder="achievements" onUploaded={(url) => { const na = [...data]; na[i] = { ...na[i], image: url }; onChange(na); }} />
        </Card>
      ))}
      <button onClick={() => onChange([...data, { title: "", description: "", image: "", link: "" }])} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[#333] text-sm text-purple-400 hover:border-purple-500 transition-colors">
        <Plus size={16} /> Tambah Achievement
      </button>
    </div>
  );
}

function CertificationsEditor({ data, onChange }: { data: PortfolioData["certifications"]; onChange: (d: PortfolioData["certifications"]) => void }) {
  return (
    <div className="space-y-4">
      {data.map((c, i) => (
        <Card key={i} title={c.title || `Sertifikat ${i + 1}`} collapsible>
          <div className="flex justify-end">
            <button onClick={() => onChange(data.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={12} /> Hapus</button>
          </div>
          <Input label="Judul" value={c.title} onChange={(v) => { const nc = [...data]; nc[i] = { ...nc[i], title: v }; onChange(nc); }} />
          <Input label="Penerbit" value={c.issuer} onChange={(v) => { const nc = [...data]; nc[i] = { ...nc[i], issuer: v }; onChange(nc); }} />
          <Input label="Tahun" value={c.year} onChange={(v) => { const nc = [...data]; nc[i] = { ...nc[i], year: v }; onChange(nc); }} />
          <FileUpload label="Gambar Sertifikat" currentUrl={c.image} folder="certs" onUploaded={(url) => { const nc = [...data]; nc[i] = { ...nc[i], image: url }; onChange(nc); }} />
        </Card>
      ))}
      <button onClick={() => onChange([...data, { title: "", issuer: "", year: new Date().getFullYear().toString(), image: "" }])} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[#333] text-sm text-purple-400 hover:border-purple-500 transition-colors">
        <Plus size={16} /> Tambah Sertifikat
      </button>
    </div>
  );
}

function FooterEditor({ data, onChange }: { data: PortfolioData["footer"]; onChange: (d: PortfolioData["footer"]) => void }) {
  return (
    <div className="space-y-4">
      <Card title="Info Umum">
        <Textarea label="Tagline Footer" value={data.tagline} onChange={(v) => onChange({ ...data, tagline: v })} />
        <Input label="Email" value={data.email} onChange={(v) => onChange({ ...data, email: v })} />
      </Card>
      <Card title="Social Media Links">
        {data.social.map((s, i) => (
          <div key={i} className="flex items-end gap-3">
            <div className="w-28"><Input label="Platform" value={s.platform} onChange={(v) => { const ns = [...data.social]; ns[i] = { ...ns[i], platform: v }; onChange({ ...data, social: ns }); }} /></div>
            <div className="flex-1"><Input label="URL" value={s.url} onChange={(v) => { const ns = [...data.social]; ns[i] = { ...ns[i], url: v }; onChange({ ...data, social: ns }); }} /></div>
            <button onClick={() => onChange({ ...data, social: data.social.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-400 pb-2"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => onChange({ ...data, social: [...data.social, { platform: "", url: "", icon: "Link" }] })} className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300">
          <Plus size={14} /> Tambah Link
        </button>
      </Card>
    </div>
  );
}

// ======================== MAIN DASHBOARD ========================
export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/data");
    const json = await res.json();
    setData(json);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 size={32} className="text-purple-500 animate-spin" />
      </div>
    );
  }

  const updateSection = (section: SectionKey, value: unknown) => {
    setData({ ...data, [section]: value });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-[#111] border border-[#333] flex items-center justify-center"
      >
        <LayoutDashboard size={18} />
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-[#1a1a1a]">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <LayoutDashboard size={16} />
            </div>
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => { setActiveSection(s.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === s.key ? "bg-purple-600/10 text-purple-400 border border-purple-600/20" : "text-gray-400 hover:text-white hover:bg-[#151515]"}`}
            >
              {s.icon}{s.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1a1a1a] space-y-2">
          <a href="/" target="_blank" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-[#151515] transition-colors">
            <ImageIcon size={16} /> Lihat Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="pl-12 lg:pl-0">
            <h1 className="text-xl font-bold text-white">{sections.find((s) => s.key === activeSection)?.label}</h1>
            <p className="text-xs text-gray-500">Edit konten section ini</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? "bg-green-600 text-white" : "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"} disabled:opacity-50`}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
            {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan"}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-w-3xl">
          {activeSection === "hero" && <HeroEditor data={data.hero} onChange={(v) => updateSection("hero", v)} />}
          {activeSection === "about" && <AboutEditor data={data.about} onChange={(v) => updateSection("about", v)} />}
          {activeSection === "career" && <CareerEditor data={data.career} onChange={(v) => updateSection("career", v)} />}
          {activeSection === "skills" && <SkillsEditor data={data.skills} onChange={(v) => updateSection("skills", v)} />}
          {activeSection === "portfolio" && <PortfolioEditor data={data.portfolio} onChange={(v) => updateSection("portfolio", v)} />}
          {activeSection === "achievements" && <AchievementsEditor data={data.achievements} onChange={(v) => updateSection("achievements", v)} />}
          {activeSection === "certifications" && <CertificationsEditor data={data.certifications} onChange={(v) => updateSection("certifications", v)} />}
          {activeSection === "footer" && <FooterEditor data={data.footer} onChange={(v) => updateSection("footer", v)} />}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden" />}
    </div>
  );
}
