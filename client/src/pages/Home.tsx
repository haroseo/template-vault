/**
 * Archive Index style: Swiss archive rail, warm paper, carbon ink, vermilion index.
 * The page prioritizes classified browsing over decorative landing-page patterns.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Command,
  Filter,
  Grid2X2,
  LayoutTemplate,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type Template = {
  id: string;
  number: string;
  title: string;
  category: string;
  format: string;
  accent: string;
  tone: "light" | "dark";
  motif: "orbit" | "bars" | "grid" | "column" | "split" | "type";
};

const guideTemplates: Template[] = [
  { id: "g01", number: "01", title: "Foundation Manual", category: "브랜드 기본", format: "32 pages", accent: "#F2D34F", tone: "light", motif: "column" },
  { id: "g02", number: "02", title: "Brand Voice Notes", category: "브랜드 기본", format: "18 pages", accent: "#1E1E1A", tone: "dark", motif: "type" },
  { id: "g03", number: "03", title: "Color Field System", category: "비주얼", format: "24 pages", accent: "#2660C9", tone: "dark", motif: "orbit" },
  { id: "g04", number: "04", title: "Digital Product Kit", category: "디지털", format: "40 pages", accent: "#DB735B", tone: "light", motif: "grid" },
  { id: "g05", number: "05", title: "Studio Identity", category: "브랜드 기본", format: "28 pages", accent: "#1E756E", tone: "dark", motif: "split" },
  { id: "g06", number: "06", title: "Editorial Framework", category: "에디토리얼", format: "36 pages", accent: "#EBA333", tone: "light", motif: "bars" },
  { id: "g07", number: "07", title: "Campaign Fieldbook", category: "마케팅", format: "22 pages", accent: "#D94C33", tone: "light", motif: "column" },
  { id: "g08", number: "08", title: "Monogram Rules", category: "비주얼", format: "16 pages", accent: "#39349A", tone: "dark", motif: "type" },
  { id: "g09", number: "09", title: "Architecture Notes", category: "에디토리얼", format: "30 pages", accent: "#A9B8B0", tone: "light", motif: "grid" },
  { id: "g10", number: "10", title: "Commerce Playbook", category: "마케팅", format: "34 pages", accent: "#EA4F31", tone: "light", motif: "split" },
  { id: "g11", number: "11", title: "Cultural Program", category: "에디토리얼", format: "26 pages", accent: "#1D273C", tone: "dark", motif: "orbit" },
  { id: "g12", number: "12", title: "Service Blueprint", category: "디지털", format: "42 pages", accent: "#5FA4A0", tone: "dark", motif: "bars" },
  { id: "g13", number: "13", title: "Hospitality Guide", category: "브랜드 기본", format: "38 pages", accent: "#A65F49", tone: "light", motif: "column" },
  { id: "g14", number: "14", title: "Motion Principles", category: "디지털", format: "20 pages", accent: "#DCD8CC", tone: "light", motif: "type" },
  { id: "g15", number: "15", title: "Packaging Code", category: "비주얼", format: "30 pages", accent: "#536F45", tone: "dark", motif: "grid" },
  { id: "g16", number: "16", title: "Community Handbook", category: "마케팅", format: "32 pages", accent: "#D392A0", tone: "light", motif: "split" },
  { id: "g17", number: "17", title: "Material Library", category: "브랜드 기본", format: "24 pages", accent: "#E6BE70", tone: "light", motif: "orbit" },
  { id: "g18", number: "18", title: "Launch Sequence", category: "마케팅", format: "28 pages", accent: "#0B3441", tone: "dark", motif: "bars" },
  { id: "g19", number: "19", title: "Typographic Index", category: "에디토리얼", format: "18 pages", accent: "#F0EEE8", tone: "light", motif: "type" },
  { id: "g20", number: "20", title: "Product Narrative", category: "디지털", format: "36 pages", accent: "#AD4036", tone: "light", motif: "column" },
];

const cardTemplates: Template[] = [
  { id: "c01", number: "01", title: "Quiet Practice", category: "미니멀", format: "90 × 50 mm", accent: "#E9E3D9", tone: "light", motif: "type" },
  { id: "c02", number: "02", title: "Redline Studio", category: "크리에이티브", format: "85 × 55 mm", accent: "#EB4D2F", tone: "light", motif: "orbit" },
  { id: "c03", number: "03", title: "North Office", category: "비즈니스", format: "90 × 50 mm", accent: "#18242C", tone: "dark", motif: "grid" },
  { id: "c04", number: "04", title: "Frame & Form", category: "크리에이티브", format: "85 × 55 mm", accent: "#2D5EBA", tone: "dark", motif: "split" },
  { id: "c05", number: "05", title: "Common Ground", category: "비즈니스", format: "90 × 50 mm", accent: "#C3A56A", tone: "light", motif: "column" },
  { id: "c06", number: "06", title: "Olive Bureau", category: "미니멀", format: "85 × 55 mm", accent: "#6B7656", tone: "dark", motif: "bars" },
  { id: "c07", number: "07", title: "The Paper House", category: "에디토리얼", format: "90 × 50 mm", accent: "#D7A4A8", tone: "light", motif: "type" },
  { id: "c08", number: "08", title: "Tide Workshop", category: "크리에이티브", format: "85 × 55 mm", accent: "#197C82", tone: "dark", motif: "orbit" },
  { id: "c09", number: "09", title: "Lumen Atelier", category: "에디토리얼", format: "90 × 50 mm", accent: "#F0C948", tone: "light", motif: "grid" },
  { id: "c10", number: "10", title: "Second Sight", category: "비즈니스", format: "85 × 55 mm", accent: "#252525", tone: "dark", motif: "split" },
  { id: "c11", number: "11", title: "Plain Signal", category: "미니멀", format: "90 × 50 mm", accent: "#EDE7DD", tone: "light", motif: "column" },
  { id: "c12", number: "12", title: "Cobalt Works", category: "크리에이티브", format: "85 × 55 mm", accent: "#263DA0", tone: "dark", motif: "bars" },
  { id: "c13", number: "13", title: "Morning Market", category: "비즈니스", format: "90 × 50 mm", accent: "#E17A46", tone: "light", motif: "type" },
  { id: "c14", number: "14", title: "Elsewhere Co.", category: "에디토리얼", format: "85 × 55 mm", accent: "#3C4550", tone: "dark", motif: "orbit" },
  { id: "c15", number: "15", title: "Soft Geometry", category: "미니멀", format: "90 × 50 mm", accent: "#B6C3C0", tone: "light", motif: "grid" },
  { id: "c16", number: "16", title: "District 11", category: "비즈니스", format: "85 × 55 mm", accent: "#A23E32", tone: "light", motif: "split" },
  { id: "c17", number: "17", title: "Form Office", category: "크리에이티브", format: "90 × 50 mm", accent: "#1A1A18", tone: "dark", motif: "column" },
  { id: "c18", number: "18", title: "Sand & Ink", category: "에디토리얼", format: "85 × 55 mm", accent: "#D3B48A", tone: "light", motif: "bars" },
  { id: "c19", number: "19", title: "Lateral Studio", category: "미니멀", format: "90 × 50 mm", accent: "#735FBA", tone: "dark", motif: "type" },
  { id: "c20", number: "20", title: "New Standard", category: "비즈니스", format: "85 × 55 mm", accent: "#D8DE74", tone: "light", motif: "orbit" },
];

const sections = [
  { id: "guide", label: "Design guides", short: "가이드", count: guideTemplates.length, art: "/manus-storage/template-vault-guide-art_56c73540.jpg" },
  { id: "card", label: "Business cards", short: "명함", count: cardTemplates.length, art: "/manus-storage/template-vault-card-art_431aa252.jpg" },
];

function TemplateVisual({ item, compact = false }: { item: Template; compact?: boolean }) {
  return (
    <div className={`template-visual ${item.tone === "dark" ? "is-dark" : ""} ${compact ? "is-compact" : ""}`} style={{ "--accent": item.accent } as React.CSSProperties}>
      <span className="visual-number">{item.number}</span>
      <span className={`motif motif-${item.motif}`} aria-hidden="true"><i /><i /><i /></span>
      <div className="visual-label"><span>TV / {item.id.toUpperCase()}</span><strong>{item.title.split(" ").slice(0, 2).join(" ")}</strong></div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<"guide" | "card">("guide");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [saved, setSaved] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const activeTemplates = activeSection === "guide" ? guideTemplates : cardTemplates;
  const filters = ["전체", ...Array.from(new Set(activeTemplates.map((item) => item.category)))];
  const filtered = useMemo(() => activeTemplates.filter((item) => {
    const byFilter = filter === "전체" || item.category === filter;
    const needle = query.trim().toLowerCase();
    const bySearch = !needle || `${item.title} ${item.category}`.toLowerCase().includes(needle);
    return byFilter && bySearch;
  }), [activeTemplates, filter, query]);
  const shown = showAll || query || filter !== "전체" ? filtered : filtered.slice(0, 8);

  const switchSection = (id: "guide" | "card") => {
    setActiveSection(id);
    setFilter("전체");
    setQuery("");
    setShowAll(false);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleSave = (id: string) => setSaved((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  return (
    <main className="archive-shell">
      <aside className="index-rail" aria-label="템플릿 카테고리">
        <div className="rail-top">
          <a href="#top" className="brand-mark" aria-label="Template Vault 홈">
            <img src="/manus-storage/template-vault-logo_d08026d6.png" alt="" />
            <span><b>Template</b><b>Vault</b></span>
          </a>
          <p className="rail-kicker">A practical archive<br />for independent brands.</p>
        </div>
        <nav className="rail-nav">
          <span className="rail-heading">Collection</span>
          {sections.map((section) => (
            <button key={section.id} onClick={() => switchSection(section.id as "guide" | "card")} className={`rail-link ${activeSection === section.id ? "is-active" : ""}`}>
              <span>{section.short}</span><em>{String(section.count).padStart(2, "0")}</em>
            </button>
          ))}
        </nav>
        <div className="rail-bottom">
          <span>Index status</span>
          <strong>40 / 40</strong>
          <i className="status-line" />
          <a href="#collection">Browse all <ArrowDownRight size={16} /></a>
        </div>
      </aside>

      <div className="content-canvas" id="top">
        <header className="mobile-header">
          <a href="#top" className="brand-mark" aria-label="Template Vault 홈"><img src="/manus-storage/template-vault-logo_d08026d6.png" alt="" /><span><b>Template</b><b>Vault</b></span></a>
          <span>40 templates</span>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="index-line"><span />ISSUE 01 — TEMPLATE LIBRARY</p>
            <h1 id="hero-title">시작은 취향보다<br /><em>구조에서.</em></h1>
            <p className="hero-description">독립 브랜드를 위한 디자인 가이드와 명함 레이아웃을 한곳에 모았습니다. 필요한 구조를 고르고, 고유한 목소리를 얹으세요.</p>
            <div className="hero-actions">
              <button onClick={() => switchSection("guide")} className="ink-button">가이드 둘러보기 <ArrowUpRight size={17} /></button>
              <button onClick={() => switchSection("card")} className="text-button">명함 20종 보기 <ArrowDownRight size={17} /></button>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true"><img src="/manus-storage/template-vault-hero_0e1ea406.jpg" alt="" /><div className="hero-art-stamp">NO.<br />001</div></div>
        </section>

        <section className="collection-intro" id="collection">
          <p className="index-line"><span />CURRENT COLLECTION</p>
          <div className="section-title-row">
            <h2>{activeSection === "guide" ? "Design\nguides." : "Business\ncards."}</h2>
            <div className="collection-art"><img src={activeSection === "guide" ? sections[0].art : sections[1].art} alt="" /></div>
            <div className="section-count"><strong>{String(activeTemplates.length).padStart(2, "0")}</strong><span>templates<br />available</span></div>
          </div>
          <p className="section-intro">{activeSection === "guide" ? "브랜드 언어부터 시스템 규칙까지, 흔들리지 않는 출발점을 만드는 구조화된 가이드입니다." : "작은 면적 안에서 브랜드의 첫인상을 정리하는, 균형 잡힌 명함 레이아웃입니다."}</p>
        </section>

        <section className="collection-tools" aria-label="템플릿 필터 및 검색">
          <div className="filter-row"><Filter size={15} /><span>FILTER</span>{filters.map((item) => <button key={item} onClick={() => { setFilter(item); setShowAll(true); }} className={filter === item ? "selected" : ""}>{item}</button>)}</div>
          <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(true); }} placeholder="템플릿 검색" /><kbd><Command size={12} /> K</kbd></label>
        </section>

        <section className="template-grid" aria-live="polite">
          {shown.map((item, index) => (
            <article key={item.id} className={`template-card ${index % 5 === 0 ? "offset-card" : ""}`}>
              <button className="save-button" onClick={() => toggleSave(item.id)} aria-label={`${item.title} 저장`}>
                {saved.includes(item.id) ? <Check size={17} /> : <Bookmark size={17} />}
              </button>
              <TemplateVisual item={item} compact={activeSection === "card"} />
              <div className="template-meta"><span>{item.category}</span><span>{item.format}</span></div>
              <div className="template-name"><h3>{item.title}</h3><button onClick={() => toggleSave(item.id)}>{saved.includes(item.id) ? "보관됨" : "보관하기"} <ArrowUpRight size={15} /></button></div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && <div className="empty-state"><X size={22} /><h3>찾는 템플릿이 없습니다.</h3><button onClick={() => { setQuery(""); setFilter("전체"); }}>필터 초기화</button></div>}
        {filtered.length > shown.length && <div className="view-more"><button onClick={() => setShowAll(true)}>나머지 {filtered.length - shown.length}개 더 보기 <ChevronDown size={17} /></button></div>}

        <section className="editorial-cta">
          <span className="cta-index">/ 02</span>
          <div><p className="index-line"><span />YOUR OWN INDEX</p><h2>좋은 시작은<br />정리된 <em>한 장</em>에서.</h2></div>
          <a href="#top">첫 템플릿으로 돌아가기 <ArrowUpRight size={18} /></a>
        </section>

        <footer><span>© 2026 TEMPLATE VAULT</span><span>DESIGNED FOR INDEPENDENT WORK.</span><span>SEOUL / WORLDWIDE</span></footer>
      </div>
    </main>
  );
}
