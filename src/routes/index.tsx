import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { BlurReveal } from "@/components/spell/blur-reveal";
import { HighlightedText } from "@/components/spell/highlighted-text";
import { QRCode } from "@/components/spell/qr-code";
import brandIcon from "@/assets/italo-dev-256.png.asset.json";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Download,
  ExternalLink,
  Bot,
  CalendarCheck,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Loader,
  Code2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { content, LINKS, RESUME_EN_URL, RESUME_PT_URL, type Lang } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ítalo Lemos de Freitas — TI, Automação & Dados" },
      {
        name: "description",
        content:
          "Portfólio de Ítalo Lemos de Freitas: profissional de TI com experiência em suporte N1/N3, infraestrutura de redes, automações (chatbot corporativo) e análise de dados. Currículo em português e inglês.",
      },
      { property: "og:title", content: "Ítalo Lemos de Freitas — TI, Automação & Dados" },
      {
        property: "og:description",
        content:
          "Suporte técnico N1/N3, redes, automação com Node.js e análise de dados. Conheça meus projetos e baixe meu currículo em PT ou EN.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Portfolio,
});

const LightRays = lazy(() => import("@/components/spell/light-rays"));
const sectionIds = ["inicio", "sobre", "experiencia", "projetos", "competencias", "educacao", "contato"] as const;

function PageRays() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [colors, setColors] = useState<[string, string] | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const styles = getComputedStyle(document.documentElement);
    setColors([styles.getPropertyValue("--rays-primary").trim(), styles.getPropertyValue("--rays-secondary").trim()]);
    setMounted(true);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  if (!mounted || !colors) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-svh overflow-hidden opacity-75 [backface-visibility:hidden] [transform:translateZ(0)]"
    >
      <Suspense fallback={null}>
        <LightRays
          intensity={26}
          rays={28}
          reach={20}
          position={52}
          raysColor={{ mode: "multi", color1: colors[0], color2: colors[1] }}
          animation={{ animate: !reduceMotion, speed: 12 }}
        />
      </Suspense>
    </div>
  );
}

function Portfolio() {
  const [lang, setLang] = useState<Lang>("pt");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [arrowsExpanded, setArrowsExpanded] = useState(true);
  const [arrowInteraction, setArrowInteraction] = useState(0);
  const [arrowPosition, setArrowPosition] = useState<{ left: number; top: number } | null>(null);
  const arrowDrag = useRef<{ pointerId: number; startX: number; startY: number; left: number; top: number; width: number; height: number; moved: boolean } | null>(null);
  const suppressArrowClick = useRef(false);
  const t = content[lang];

  useEffect(() => {
    if (!arrowsExpanded) return;
    const timeout = window.setTimeout(() => setArrowsExpanded(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [arrowsExpanded, arrowInteraction]);

  const revealArrows = () => {
    setArrowsExpanded(true);
    setArrowInteraction((count) => count + 1);
  };

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const drag = arrowDrag.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (!drag.moved && Math.hypot(deltaX, deltaY) < 8) return;
      drag.moved = true;
      suppressArrowClick.current = true;
      event.preventDefault();
      const left = Math.max(8, Math.min(window.innerWidth - drag.width - 8, drag.left + deltaX));
      const top = Math.max(8, Math.min(window.innerHeight - drag.height - 8, drag.top + deltaY));
      setArrowPosition({ left, top });
    };
    const end = (event: PointerEvent) => {
      if (arrowDrag.current?.pointerId !== event.pointerId) return;
      const wasDragged = arrowDrag.current.moved;
      arrowDrag.current = null;
      if (wasDragged) window.setTimeout(() => { suppressArrowClick.current = false; }, 0);
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);

  const startArrowDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    arrowDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      moved: false,
    };
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const position = window.scrollY + 120;
        let current = 0;
        sectionIds.forEach((id, index) => {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top + window.scrollY <= position) current = index;
        });
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sectionIds.length - 1;
        setActiveSection(current);
      });
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
    };
  }, []);

  const goToSection = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(sectionIds.length - 1, activeSection + direction));
    const nextId = sectionIds[next];
    if (!nextId) return;
    const target = document.getElementById(nextId);
    if (!target) return;
    setMobileMenuOpen(false);
    setActiveSection(next);
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };

  const navItems = [
    { href: "#sobre", label: t.nav.about },
    { href: "#experiencia", label: t.nav.experience },
    { href: "#projetos", label: t.nav.projects },
    { href: "#competencias", label: t.nav.skills },
    { href: "#contato", label: t.nav.contact },
  ];

  return (
    <div id="inicio" className="relative min-h-screen bg-background text-foreground">
      <PageRays />
      <div className="relative z-10 pt-[4.5rem] lg:pt-[3.6875rem]">
        {/* Nav */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid h-[4.5rem] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 lg:flex lg:h-[3.6875rem] lg:justify-between lg:gap-3">
              <a
                href="#inicio"
                aria-label="Ítalo.dev — voltar ao início"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display flex min-w-0 items-center gap-2 whitespace-nowrap text-xl font-bold transition-colors hover:text-primary"
              >
                <img src="/italo-dev-256.png" alt="Ítalo Logo" className="h-9 w-9 shrink-0 rounded-md lg:h-8 lg:w-8 object-cover" width={36} height={36} />
                Ítalo<span className="text-primary">.</span>dev
              </a>
              <nav aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"} className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-border p-1 text-xs font-semibold">
                {(["pt", "en"] as Lang[]).map((l) => (
                  <Button
                    key={l}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setLang(l)}
                    aria-label={l === "pt" ? "Português" : "English"}
                    aria-pressed={lang === l}
                    className={`h-8 min-w-9 rounded-full px-2 uppercase btn-anim hover:bg-accent ${
                      lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l}
                  </Button>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 lg:hidden"
                aria-label={mobileMenuOpen ? (lang === "pt" ? "Fechar menu" : "Close menu") : (lang === "pt" ? "Abrir menu" : "Open menu")}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                <span aria-hidden="true" className="relative block h-5 w-6">
                  <span className={`absolute left-0 top-[2px] h-0.5 w-6 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${mobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
                  <span className={`absolute left-0 top-[16px] h-0.5 w-6 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
              </Button>
            </div>
          </div>
          <nav
            id="mobile-navigation"
            aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
            aria-hidden={!mobileMenuOpen}
            inert={!mobileMenuOpen}
            data-open={mobileMenuOpen}
            className={`mobile-nav-panel absolute inset-x-0 top-full grid overflow-hidden bg-background transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${mobileMenuOpen ? "grid-rows-[1fr] border-b shadow-lg opacity-100" : "grid-rows-[0fr] border-b-0 shadow-none opacity-0 pointer-events-none"}`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="mx-auto grid max-w-5xl px-4 py-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-item border-b border-border/50 px-2 py-3.5 text-base font-medium text-foreground transition-colors last:border-0 hover:text-primary focus-visible:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </header>

        <nav aria-label={lang === "pt" ? "Navegar entre áreas" : "Navigate between sections"} onPointerDown={startArrowDrag} onClickCapture={(event) => { if (suppressArrowClick.current) { event.preventDefault(); event.stopPropagation(); suppressArrowClick.current = false; } }} style={arrowPosition ? { left: arrowPosition.left, top: arrowPosition.top } : undefined} className={`fixed z-40 touch-none select-none overflow-hidden rounded-full border border-border/60 bg-background/45 shadow-lg backdrop-blur-md transition-[width,height,right,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${arrowPosition ? "" : "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4"} ${arrowsExpanded ? "h-[5.75rem] w-[3.125rem] p-1 opacity-100" : "h-11 w-11 opacity-30"}`}>
          <Button type="button" variant="ghost" size="icon" className={`absolute inset-0 h-full w-full flex-col gap-0 rounded-full text-section-arrow transition-opacity duration-300 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:stroke-[2.5] ${arrowsExpanded ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-label={lang === "pt" ? "Mostrar setas de navegação" : "Show navigation arrows"} title={lang === "pt" ? "Mostrar setas" : "Show arrows"} tabIndex={arrowsExpanded ? -1 : 0} aria-hidden={arrowsExpanded} onClick={revealArrows}>
            <ArrowUp /><ArrowDown />
          </Button>
          <div className={`flex flex-col gap-1 transition-opacity duration-300 motion-reduce:transition-none ${arrowsExpanded ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!arrowsExpanded} inert={!arrowsExpanded}>
            <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-full text-section-arrow transition-colors hover:bg-accent/50 hover:text-section-arrow disabled:opacity-50 [&_svg]:size-5.5 [&_svg]:stroke-[2.5]" aria-label={lang === "pt" ? "Área anterior" : "Previous section"} title={lang === "pt" ? "Área anterior" : "Previous section"} disabled={activeSection === 0} onClick={() => { revealArrows(); goToSection(-1); }}>
              <ArrowUp className="h-5 w-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-full text-section-arrow transition-colors hover:bg-accent/50 hover:text-section-arrow disabled:opacity-50 [&_svg]:size-5.5 [&_svg]:stroke-[2.5]" aria-label={lang === "pt" ? "Próxima área" : "Next section"} title={lang === "pt" ? "Próxima área" : "Next section"} disabled={activeSection === sectionIds.length - 1} onClick={() => { revealArrows(); goToSection(1); }}>
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-20 md:pt-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {t.hero.badge}
            </span>
            <p className="mt-6 text-muted-foreground">{t.hero.greeting}</p>
            <h1 className="font-display mt-1 text-4xl font-bold tracking-tight md:text-6xl">
              <HighlightedText from="left" delay={0.1}>
                {t.hero.name}
              </HighlightedText>
            </h1>
            <BlurReveal
              key={lang}
              as="p"
              delay={0.12}
              speedReveal={2.5}
              className="font-display mt-3 text-lg text-primary md:text-xl"
            >
              {t.hero.role}
            </BlurReveal>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{t.hero.summary}</p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {t.hero.location}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="btn-anim btn-primary-anim">
                <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> {t.hero.ctaPrimary}
                </a>
              </Button>
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold btn-anim hover:bg-accent"
              >
                {t.hero.ctaSecondary}
              </a>
              <a
                href={RESUME_PT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground btn-anim hover:bg-accent hover:text-foreground"
              >
                <Download className="h-4 w-4" /> {t.hero.downloadPt}
              </a>
              <a
                href={RESUME_EN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground btn-anim hover:bg-accent hover:text-foreground"
              >
                <Download className="h-4 w-4" /> {t.hero.downloadEn}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-anim hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-anim hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={LINKS.email} aria-label="Email" className="social-anim hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {t.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="sobre" className="section-divider">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              <HighlightedText from="bottom" inView>
                {t.about.title}
              </HighlightedText>
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
              {t.about.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experiencia" className="section-divider bg-card/40">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="font-display flex items-center gap-2 text-2xl font-bold md:text-3xl">
              <Briefcase className="h-6 w-6 text-primary" />{" "}
              <HighlightedText from="right" inView>
                {t.experience.title}
              </HighlightedText>
            </h2>
            <div className="mt-8 space-y-6">
              {t.experience.items.map((job) => (
                <article
                  key={job.company + job.period}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {job.role} <span className="text-primary">· {job.company}</span>
                    </h3>
                    <span className="text-xs font-medium text-muted-foreground">{job.period}</span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {job.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projetos" className="section-divider">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              <HighlightedText from="top" inView>
                {t.projects.title}
              </HighlightedText>
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {t.projects.items.map((p) => (
                <article
                  key={p.title}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:last:odd:col-span-2 md:last:odd:w-[calc(50%-0.75rem)] md:last:odd:justify-self-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                       {p.link === LINKS.portfolio ? <Code2 className="h-5 w-5" /> : p.link ? <CalendarCheck className="h-5 w-5" /> : p.tags.includes("ERP") ? <Briefcase className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </span>
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {p.linkLabel} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="competencias" className="section-divider bg-card/40">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              <HighlightedText from="left" inView>
                {t.skills.title}
              </HighlightedText>
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {t.skills.groups.map((g) => (
                <div key={g.name} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display font-semibold text-primary">{g.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="educacao" className="section-divider">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="font-display flex items-center gap-2 text-2xl font-bold md:text-3xl">
              <GraduationCap className="h-6 w-6 text-primary" />{" "}
              <HighlightedText from="bottom" inView>
                {t.education.title}
              </HighlightedText>
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display font-semibold">{t.education.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.education.school}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.education.period}</p>
                <h4 className="font-display mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Loader className="h-4 w-4" /> {t.education.inProgress}
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {t.education.inProgressItems.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="font-display flex items-center gap-2 text-sm font-semibold text-primary">
                  <Award className="h-4 w-4" /> {t.education.certs}
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {t.education.certItems.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <h4 className="font-display mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Languages className="h-4 w-4" /> {t.education.langs}
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {t.education.langItems.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contato" className="section-divider bg-card/40">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  <HighlightedText from="right" inView>
                    {t.contact.title}
                  </HighlightedText>
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{t.contact.text}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="btn-anim btn-primary-anim">
                    <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" /> {t.contact.whatsappCta}
                    </a>
                  </Button>
                  <a
                    href={LINKS.email}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold btn-anim hover:bg-accent"
                  >
                    <Mail className="h-4 w-4" /> {t.contact.email}
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-4 text-muted-foreground">
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="social-anim hover:text-primary"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="social-anim hover:text-primary"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-lg border border-border bg-qr-background p-3 shadow-lg">
                  <QRCode
                    value={LINKS.whatsapp}
                    size={180}
                    fgColor="var(--qr-foreground)"
                    bgColor="var(--qr-background)"
                    className="h-[180px] w-[180px]"
                    role="img"
                    aria-label="QR code WhatsApp"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t.contact.qrLabel}</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="section-divider py-6 text-center text-xs text-muted-foreground">{t.footer}</footer>
      </div>
    </div>
  );
}
