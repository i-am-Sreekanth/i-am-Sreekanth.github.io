"use client";

import { ArrowRightIcon, GitHubIcon, LinkIcon } from "@/components/Icons";
import { getProjectLanguageDotClass } from "@/utils/projects";

type Meta = { stars?: number; pushed?: string };

function formatUpdated(date?: string) {
  if (!date) return "";
  return new Date(date + "T00:00:00Z").toLocaleString("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ProjectCard({ project, meta }: { project: Project; meta?: Meta }) {
  const href = project.link?.href;
  const Icon = href?.includes("github.com") ? GitHubIcon : LinkIcon;
  const stars = meta?.stars ?? project.stars ?? 0;
  const updated = formatUpdated(meta?.pushed);
  const featured = project.featured && (project.highlights?.length ?? 0) > 0;
  const Wrapper = (href ? "a" : "div") as "a";
  const wrapperProps = href
    ? {
        "data-spot": "",
        href,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": `${project.title} — ${project.link.label}`,
      }
    : { "data-spot": "" };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group border-rule bg-bg text-ink flex h-full w-full flex-col gap-3 rounded-[var(--r-lg)] border p-[18px_20px] no-underline transition-[border-color,transform] duration-150 hover:no-underline ${
        href ? "hover:border-ink-3 hover:-translate-y-0.5" : ""
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="border-rule bg-bg-2 inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md border text-base">
          {project.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-ink block truncate font-serif text-[16px] leading-tight font-semibold">
            {project.title}
          </span>
          <span className="text-ink-3 font-mono text-[10px] tracking-[0.12em] uppercase">
            {project.type}
          </span>
        </div>
        {stars > 0 && <span className="text-ink-3 ml-auto font-mono text-[11px]">★ {stars}</span>}
      </div>

      <p className="text-ink-2 m-0 text-[13.5px] leading-[1.6]">{project.description}</p>

      {featured && (
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
          {project.highlights!.map((h) => (
            <li key={h} className="text-ink-2 flex gap-2 text-[12.5px] leading-[1.55]">
              <span className="text-link mt-[1px] shrink-0">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.tags?.map((tag) => (
          <span
            key={tag}
            className="border-rule bg-bg-3 text-ink-2 inline-block rounded-full border px-2 py-[3px] font-mono text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-rule-2 text-ink-3 mt-auto flex items-center gap-3 border-t pt-2.5 font-mono text-[11px]">
        <span
          className={`inline-block h-[9px] w-[9px] rounded-full ${getProjectLanguageDotClass(project.language)}`}
        />
        <span>{project.language}</span>
        {updated && <span>· updated {updated}</span>}
        <span className="group-hover:text-link ml-auto inline-flex items-center gap-1">
          {href ? <Icon className="h-3.5 w-3.5" /> : null}
          <span>{project.link.label}</span>
          {href && <ArrowRightIcon width={10} height={10} strokeWidth={2.5} />}
        </span>
      </div>
    </Wrapper>
  );
}
