/**
 * Archive Index style: Swiss archive rail, warm paper, carbon ink, vermilion index.
 * Corporate systems are linked to their official sources; external card work is credited.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Command,
  ExternalLink,
  Filter,
  Search,
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
  source?: string;
  url?: string;
  image?: string;
};

const guideTemplates: Template[] = [
  { id: "g01", number: "01", title: "Human Interface Guidelines", category: "플랫폼", format: "Official guide", accent: "#E7C746", tone: "light", motif: "column", source: "Apple Developer", url: "https://developer.apple.com/design/human-interface-guidelines" },
  { id: "g02", number: "02", title: "Toss Design System", category: "금융·제품", format: "Official article", accent: "#0064FF", tone: "dark", motif: "type", source: "Toss Tech", url: "https://toss.tech/article/toss-design-system" },
  { id: "g03", number: "03", title: "Material Design 3", category: "플랫폼", format: "Official system", accent: "#304EC6", tone: "dark", motif: "orbit", source: "Google", url: "https://m3.material.io/" },
  { id: "g04", number: "04", title: "Primer", category: "개발 도구", format: "Official system", accent: "#5D65E8", tone: "light", motif: "grid", source: "GitHub", url: "https://primer.style/" },
  { id: "g05", number: "05", title: "Polaris", category: "커머스", format: "Official docs", accent: "#1A8560", tone: "dark", motif: "split", source: "Shopify", url: "https://shopify.dev/docs/api/polaris" },
  { id: "g06", number: "06", title: "Carbon", category: "엔터프라이즈", format: "Open source", accent: "#0F62FE", tone: "light", motif: "bars", source: "IBM", url: "https://carbondesignsystem.com/" },
  { id: "g07", number: "07", title: "Atlassian Design System", category: "협업", format: "Official system", accent: "#1867DB", tone: "light", motif: "column", source: "Atlassian", url: "https://atlassian.design/" },
  { id: "g08", number: "08", title: "Spectrum", category: "크리에이티브", format: "Official system", accent: "#5933C6", tone: "dark", motif: "type", source: "Adobe", url: "https://spectrum.adobe.com/" },
  { id: "g09", number: "09", title: "Fluent 2", category: "플랫폼", format: "Official system", accent: "#3F67B8", tone: "light", motif: "grid", source: "Microsoft", url: "https://fluent2.microsoft.design/" },
  { id: "g10", number: "10", title: "Lightning Design System", category: "엔터프라이즈", format: "Official system", accent: "#0176D3", tone: "light", motif: "split", source: "Salesforce", url: "https://www.lightningdesignsystem.com/" },
  { id: "g11", number: "11", title: "GOV.UK Design System", category: "공공 서비스", format: "Official system", accent: "#1D70B8", tone: "dark", motif: "orbit", source: "GOV.UK", url: "https://design-system.service.gov.uk/" },
  { id: "g12", number: "12", title: "Mozilla Protocol", category: "웹·브랜드", format: "Official guide", accent: "#5137C1", tone: "dark", motif: "bars", source: "Mozilla", url: "https://protocol.mozilla.org/" },
  { id: "g13", number: "13", title: "Uber Base", category: "모빌리티", format: "Official system", accent: "#9CCB3B", tone: "light", motif: "column", source: "Uber", url: "https://base.uber.com/" },
  { id: "g14", number: "14", title: "Elastic UI", category: "개발 도구", format: "Open source", accent: "#00BFB3", tone: "light", motif: "type", source: "Elastic", url: "https://eui.elastic.co/" },
  { id: "g15", number: "15", title: "Vercel Geist", category: "개발 도구", format: "Official system", accent: "#1B1B19", tone: "dark", motif: "grid", source: "Vercel", url: "https://vercel.com/geist" },
  { id: "g16", number: "16", title: "GitLab Pajamas", category: "개발 도구", format: "Official system", accent: "#7759C2", tone: "light", motif: "split", source: "GitLab", url: "https://design.gitlab.com/" },
  { id: "g17", number: "17", title: "Wise Design System", category: "금융·제품", format: "Official system", accent: "#9FE870", tone: "light", motif: "orbit", source: "Wise", url: "https://wise.design/" },
  { id: "g18", number: "18", title: "Mailchimp Design", category: "마케팅", format: "Official guide", accent: "#FFE01B", tone: "light", motif: "bars", source: "Mailchimp", url: "https://mailchimp.com/design/" },
  { id: "g19", number: "19", title: "Auth0 Cosmos", category: "개발 도구", format: "Public repository", accent: "#6C3CF2", tone: "dark", motif: "type", source: "Auth0 · GitHub", url: "https://github.com/auth0/cosmos" },
  { id: "g20", number: "20", title: "BBC GEL", category: "미디어", format: "Official guide", accent: "#D51D24", tone: "light", motif: "column", source: "BBC", url: "https://www.bbc.co.uk/gel" },
];

const cardTemplates: Template[] = [
  { id: "c01", number: "01", title: "Bureau Glyzerin business cards", category: "공개 레퍼런스", format: "Original work", accent: "#1D1D1B", tone: "dark", motif: "type", source: "Multiple Owners · Behance", url: "https://www.behance.net/gallery/71262535/Bureau-Glyzerin-business-cards", image: "/manus-storage/bureau-glyzerin_dd4f7727.jpg" },
  { id: "c02", number: "02", title: "Tarjetas Viuda©", category: "공개 레퍼런스", format: "Original work", accent: "#6F182C", tone: "dark", motif: "orbit", source: "Viuda Studio · Behance", url: "https://www.behance.net/gallery/152490795/Tarjetas-Viuda", image: "/manus-storage/tarjetas-viuda_4753d22a.jpg" },
  { id: "c03", number: "03", title: "Wave – Identity", category: "공개 레퍼런스", format: "Original work", accent: "#1E9AAC", tone: "dark", motif: "grid", source: "Mike · Behance", url: "https://www.behance.net/gallery/39024325/Wave-Identity", image: "/manus-storage/wave-identity_5f98ec40.png" },
  { id: "c04", number: "04", title: "Semicolon Cafe", category: "공개 레퍼런스", format: "Original work", accent: "#E1B24B", tone: "light", motif: "split", source: "Diana Piatnytska · Behance", url: "https://www.behance.net/gallery/215415703/Semicolon-Cafe-brand-identity", image: "/manus-storage/semicolon-cafe_e63f9ccb.jpg" },
  { id: "c05", number: "05", title: "Business Card – ASIDW", category: "공개 레퍼런스", format: "Original work", accent: "#C68D50", tone: "light", motif: "column", source: "Ali Rasheed · Behance", url: "https://www.behance.net/gallery/20522873/Business-Card-ASIDW", image: "/manus-storage/asidw_d2ef4027.jpg" },
  { id: "c06", number: "06", title: "Summer business card", category: "공개 레퍼런스", format: "Original work", accent: "#E37949", tone: "light", motif: "bars", source: "Maxime Archambault · Behance", url: "https://www.behance.net/gallery/27977533/Summer-business-card", image: "/manus-storage/summer-card_46715cd7.jpg" },
  { id: "c07", number: "07", title: "Aline Gouvêa Odontologia", category: "공개 레퍼런스", format: "Original work", accent: "#D7A4A8", tone: "light", motif: "type", source: "Renan Matthews · Behance", url: "https://www.behance.net/gallery/172339231/Aline-Gouvea-Odontologia", image: "/manus-storage/aline-odontologia_f15323c3.jpg" },
  { id: "c08", number: "08", title: "Codelia – Brand Identity", category: "공개 레퍼런스", format: "Original work", accent: "#2B6DA5", tone: "dark", motif: "orbit", source: "eslam alaa · Behance", url: "https://www.behance.net/gallery/244617081/Codelia-Branding-Identity-for-a-Modern-Coding-Academy", image: "/manus-storage/codelia_7234b319.png" },
  { id: "c09", number: "09", title: "Quiet Practice", category: "TV 템플릿", format: "90 × 50 mm", accent: "#E9E3D9", tone: "light", motif: "type", source: "Template Vault" },
  { id: "c10", number: "10", title: "Redline Studio", category: "TV 템플릿", format: "85 × 55 mm", accent: "#EB4D2F", tone: "light", motif: "orbit", source: "Template Vault" },
  { id: "c11", number: "11", title: "North Office", category: "TV 템플릿", format: "90 × 50 mm", accent: "#18242C", tone: "dark", motif: "grid", source: "Template Vault" },
  { id: "c12", number: "12", title: "Frame & Form", category: "TV 템플릿", format: "85 × 55 mm", accent: "#2D5EBA", tone: "dark", motif: "split", source: "Template Vault" },
  { id: "c13", number: "13", title: "Common Ground", category: "TV 템플릿", format: "90 × 50 mm", accent: "#C3A56A", tone: "light", motif: "column", source: "Template Vault" },
  { id: "c14", number: "14", title: "Olive Bureau", category: "TV 템플릿", format: "85 × 55 mm", accent: "#6B7656", tone: "dark", motif: "bars", source: "Template Vault" },
  { id: "c15", number: "15", title: "The Paper House", category: "TV 템플릿", format: "90 × 50 mm", accent: "#D7A4A8", tone: "light", motif: "type", source: "Template Vault" },
  { id: "c16", number: "16", title: "Tide Workshop", category: "TV 템플릿", format: "85 × 55 mm", accent: "#197C82", tone: "dark", motif: "orbit", source: "Template Vault" },
  { id: "c17", number: "17", title: "Lumen Atelier", category: "TV 템플릿", format: "90 × 50 mm", accent: "#F0C948", tone: "light", motif: "grid", source: "Template Vault" },
  { id: "c18", number: "18", title: "Second Sight", category: "TV 템플릿", format: "85 × 55 mm", accent: "#252525", tone: "dark", motif: "split", source: "Template Vault" },
  { id: "c19", number: "19", title: "Plain Signal", category: "TV 템플릿", format: "90 × 50 mm", accent: "#EDE7DD", tone: "light", motif: "column", source: "Template Vault" },
  { id: "c20", number: "20", title: "Cobalt Works", category: "TV 템플릿", format: "85 × 55 mm", accent: "#263DA0", tone: "dark", motif: "bars", source: "Template Vault" },
];

const sections = [
  { id: "guide", label: "Design systems", short: "가이드", count: guideTemplates.length, art: "/manus-storage/template-vault-guide-art_56c73540.jpg" },
  { id: "card", label: "Business cards", short: "명함", count: cardTemplates.length, art: "/manus-storage/template-vault-card-art_431aa252.jpg" },
];

function TemplateVisual({ item, compact = false }: { item: Template; compact?: boolean }) {
  if (item.image) {
    return <div className={`template-visual reference-visual ${compact ? "is-compact" : ""}`}><img src={item.image} alt={`${item.title} 명함 레퍼런스 미리보기`} /><span className="reference-number">REF / {item.number}</span><span className="registration-mark" aria-hidden="true" /></div>;
  }
  return (
    <div className={`template-visual ${item.tone === "dark" ? "is-dark" : ""} ${compact ? "is-compact" : ""}`} style={{ "--accent": item.accent } as React.CSSProperties}>
      <span className="visual-number">{item.number}</span><span className="registration-mark" aria-hidden="true" />
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
    const bySearch = !needle || `${item.title} ${item.category} ${item.source ?? ""}`.toLowerCase().includes(needle);
    return byFilter && bySearch;
  }), [activeTemplates, filter, query]);
  const shown = showAll || query || filter !== "전체" ? filtered : filtered.slice(0, 8);
  const title = activeSection === "guide" ? "Design\nsystems." : "Business\ncards.";
  const intro = activeSection === "guide"
    ? "기업이 직접 공개한 디자인 시스템과 가이드의 원문을 모았습니다. 카드에서 공식 문서로 바로 이동하세요."
    : "원작자와 원문을 명시한 공개 명함 레퍼런스 8개, Template Vault에서 바로 활용할 수 있는 구성안 12개를 함께 제공합니다.";
  const switchSection = (id: "guide" | "card") => {
    setActiveSection(id); setFilter("전체"); setQuery(""); setShowAll(false);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggleSave = (id: string) => setSaved((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  return (
    <main className="archive-shell">
      <aside className="index-rail" aria-label="템플릿 카테고리">
        <div className="rail-top"><a href="#top" className="brand-mark" aria-label="Template Vault 홈"><img src="/manus-storage/template-vault-logo_d08026d6.png" alt="" /><span><b>Template</b><b>Vault</b></span></a><p className="rail-kicker">A practical archive<br />for independent brands.</p></div>
        <nav className="rail-nav"><span className="rail-heading">Collection</span>{sections.map((section) => <button key={section.id} onClick={() => switchSection(section.id as "guide" | "card")} className={`rail-link ${activeSection === section.id ? "is-active" : ""}`}><span>{section.short}</span><em>{String(section.count).padStart(2, "0")}</em></button>)}</nav>
        <div className="rail-bottom"><span>Index status</span><strong>40 / 40</strong><i className="status-line" /><a href="#collection">Browse all <ArrowDownRight size={16} /></a></div>
      </aside>

      <div className="content-canvas" id="top">
        <header className="mobile-header"><a href="#top" className="brand-mark" aria-label="Template Vault 홈"><img src="/manus-storage/template-vault-logo_d08026d6.png" alt="" /><span><b>Template</b><b>Vault</b></span></a><span>40 sources</span></header>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy"><p className="index-line"><span />ISSUE 02 — SOURCE LIBRARY</p><h1 id="hero-title">브랜드의 규칙을<br /><em>바로 읽다.</em></h1><p className="hero-description">애플·토스·구글·GitHub 등 20개의 공개 디자인 시스템과, 원문 출처가 있는 실제 명함 레퍼런스를 인덱스에 모았습니다.</p><div className="hero-actions"><button onClick={() => switchSection("guide")} className="ink-button">기업 가이드 보기 <ArrowUpRight size={17} /></button><button onClick={() => switchSection("card")} className="text-button">명함 레퍼런스 보기 <ArrowDownRight size={17} /></button></div></div>
          <div className="hero-art" aria-hidden="true"><img src="/manus-storage/template-vault-hero_0e1ea406.jpg" alt="" /><div className="hero-art-stamp">NO.<br />002</div></div>
        </section>

        <section className="collection-intro" id="collection"><p className="index-line"><span />VERIFIED COLLECTION</p><div className="section-title-row"><h2>{title}</h2><div className="collection-art"><img src={activeSection === "guide" ? sections[0].art : sections[1].art} alt="" /></div><div className="section-count"><strong>{String(activeTemplates.length).padStart(2, "0")}</strong><span>{activeSection === "guide" ? "official\nsources" : "cards &\ntemplates"}</span></div></div><p className="section-intro">{intro}</p>{activeSection === "card" && <p className="source-notice">REF 표시는 Behance의 공개 원문으로 연결되는 외부 작품입니다. 각 카드에 원작자 표기를 유지합니다.</p>}</section>

        <section className="collection-tools" aria-label="컬렉션 필터 및 검색"><div className="filter-row"><Filter size={15} /><span>FILTER</span>{filters.map((item) => <button key={item} onClick={() => { setFilter(item); setShowAll(true); }} className={filter === item ? "selected" : ""}>{item}</button>)}</div><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(true); }} placeholder={activeSection === "guide" ? "기업 또는 시스템 검색" : "명함 또는 원작자 검색"} /><kbd><Command size={12} /> K</kbd></label></section>

        <section className="template-grid" aria-live="polite">{shown.map((item, index) => <article key={item.id} className={`template-card ${index % 5 === 0 ? "offset-card" : ""} ${item.image ? "has-reference" : ""}`}><button className="save-button" onClick={() => toggleSave(item.id)} aria-label={`${item.title} 저장`}>{saved.includes(item.id) ? <Check size={17} /> : <Bookmark size={17} />}</button><TemplateVisual item={item} compact={activeSection === "card"} /><div className="template-meta"><span>{item.source ?? item.category}</span><span>{item.format}</span></div><div className="template-name"><h3>{item.title}</h3>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">원문 <ExternalLink size={14} /></a> : <button onClick={() => toggleSave(item.id)}>{saved.includes(item.id) ? "보관됨" : "보관하기"} <ArrowUpRight size={15} /></button>}</div></article>)}</section>

        {filtered.length === 0 && <div className="empty-state"><X size={22} /><h3>찾는 항목이 없습니다.</h3><button onClick={() => { setQuery(""); setFilter("전체"); }}>필터 초기화</button></div>}
        {filtered.length > shown.length && <div className="view-more"><button onClick={() => setShowAll(true)}>나머지 {filtered.length - shown.length}개 더 보기 <ChevronDown size={17} /></button></div>}
        <section className="editorial-cta"><span className="cta-index">/ 03</span><div><p className="index-line"><span />SOURCE, NOT COPY</p><h2>좋은 기준은<br />정확한 <em>출처</em>에서.</h2></div><a href="#top">인덱스 처음으로 <ArrowUpRight size={18} /></a></section>
        <footer><span>© 2026 TEMPLATE VAULT</span><span>OUTBOUND SOURCES ARE CREDITED.</span><span>SEOUL / WORLDWIDE</span></footer>
      </div>
    </main>
  );
}
