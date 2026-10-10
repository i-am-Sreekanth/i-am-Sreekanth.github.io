import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// cursor spotlight (cheap, no GSAP needed)
document.addEventListener("pointermove", (e) => {
  const el = (e.target as Element | null)?.closest?.("[data-spot]") as HTMLElement | null;
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
});

if (!reduce) {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // hero intro
  const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
  if (lines.length) {
    gsap.from(lines, {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12,
      delay: 0.1,
    });
    gsap.from("[data-hero-fade]", {
      y: 18,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.5,
    });
  }

  // scroll reveals: outermost semantic blocks on every page
  const sel = "[data-reveal], main :is(header, section, h2, ul > li, .activity, article, aside)";
  const targets = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter(
    (el) => !el.closest("[data-hero]") && !el.parentElement?.closest(sel),
  );
  gsap.set(targets, { opacity: 0, y: 28 });
  ScrollTrigger.batch(targets, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      }),
  });

  // count-up numbers
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 95%",
      once: true,
      onEnter: () =>
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
        }),
    });
  });

  // heatmap cells fill in column by column
  document.querySelectorAll<HTMLElement>(".activity").forEach((card) => {
    const cells = card.querySelectorAll(".cell:not(.empty)");
    gsap.set(cells, { scale: 0.2, opacity: 0 });
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(cells, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: { each: 0.0015, from: "start" },
        }),
    });
  });
}
