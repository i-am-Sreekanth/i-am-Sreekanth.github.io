export type LogoInfo = { kind: "img"; src: string; alt: string } | { kind: "text"; label: string };

export function getOrgLogo(name: string): LogoInfo {
  const n = name.toLowerCase();
  if (n.includes("vit") || n.includes("vellore")) {
    return { kind: "img", src: "/images/logos/vit.jpeg", alt: "VIT Vellore" };
  }
  if (n.includes("xmplar")) {
    return { kind: "img", src: "/images/logos/xmplar.jpeg", alt: "Xmplar" };
  }
  if (n.includes("adiyen")) {
    return { kind: "img", src: "/images/logos/adiyen.jpeg", alt: "Adiyen Technologies" };
  }

  const words = name.trim().split(/\s+/);
  const label =
    words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : name.slice(0, 3).toUpperCase();

  return { kind: "text", label };
}

export function formatDegree(degree: string, major: string, minor?: string): string {
  const [full, abbr] = degree.split(" - ");
  const base = abbr ? `${full} · ${abbr} in ${major}` : `${full} in ${major}`;

  return minor ? `${base} · Minor in ${minor}` : base;
}

export function firstSentence(text: string): string {
  const sentence = text.split(".")[0]?.trim();
  return sentence ? `${sentence}.` : text;
}

export function getSocialLink(
  socialLinks: Array<{ name: string; url: string }>,
  name: string,
  fallback = "#",
): string {
  return socialLinks.find((link) => link.name === name)?.url || fallback;
}

export function getTalkTypeClass(type: string): string {
  if (type === "oral") return "bg-bg-3 text-ink-2";
  if (type === "poster") return "bg-bg-3 text-ink-2";
  if (type === "workshop") return "bg-bg-3 text-ink-2";
  return "bg-bg-2 text-ink-3";
}

export function getTimelineKindClass(kind: string): string {
  if (kind === "paper") return "bg-bg-3 text-ink-2";
  if (kind === "award") return "bg-bg-3 text-ink-2";
  if (kind === "project") return "bg-bg-3 text-ink-2";
  if (kind === "career") return "bg-bg-3 text-ink-2";
  return "bg-bg-3 text-ink-2";
}

export function getTagInfoFromKind(kind: string): {
  label: string;
  className: string;
} {
  switch (kind) {
    case "paper":
      return { label: "paper", className: "bg-bg-3 text-ink-2" };
    case "award":
      return {
        label: "award",
        className: "bg-bg-3 text-ink-2",
      };
    case "career":
      return {
        label: "career",
        className: "bg-bg-3 text-ink-2",
      };
    case "project":
      return {
        label: "project",
        className: "bg-bg-3 text-ink-2",
      };
    case "talk":
      return {
        label: "talk",
        className: "bg-bg-3 text-ink-2",
      };
    default:
      return { label: "milestone", className: "bg-bg-3 text-ink-2" };
  }
}

export function getNewsTagFromTitle(title: string): {
  label: string;
  className: string;
} {
  const lower = title.toLowerCase();

  if (lower.includes("paper")) return { label: "paper", className: "bg-bg-3 text-ink-2" };
  if (lower.includes("grant") || lower.includes("award")) {
    return {
      label: "award",
      className: "bg-bg-3 text-ink-2",
    };
  }
  if (lower.includes("working") || lower.includes("role")) {
    return {
      label: "career",
      className: "bg-bg-3 text-ink-2",
    };
  }
  if (lower.includes("talk") || lower.includes("presentation")) {
    return {
      label: "talk",
      className: "bg-bg-3 text-ink-2",
    };
  }

  return { label: "milestone", className: "bg-bg-3 text-ink-2" };
}

export function stripEmoji(text: string): string {
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    "",
  );
}
