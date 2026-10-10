import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTagInfoFromKind, stripEmoji } from "@/utils/about";
import type { About } from "@/components/about/types";

export function HeroBio({ about }: { about: About }) {
  const shortBio = about.shortBio || about.description.split("\n\n")[0];

  return (
    <div className="mb-8">
      <SectionHeader title="Short Intro" href="/about" action="Full bio" />
      <p className="text-ink m-0 max-w-[60ch] font-serif text-[17px] leading-[1.55] text-pretty">
        {shortBio}
      </p>
    </div>
  );
}

export function RecentNews({
  news,
}: {
  news: Array<{ year: number; items: Array<{ kind: string; title?: string; text: string }> }>;
}) {
  // Flatten timeline items and take top 5
  const flattenedEvents: Array<{
    year: number;
    kind: string;
    title?: string;
    text: string;
  }> = [];

  news.forEach((yearGroup) => {
    yearGroup.items.forEach((item) => {
      flattenedEvents.push({ year: yearGroup.year, ...item });
    });
  });

  const topEvents = flattenedEvents.slice(0, 6);

  return (
    <div className="mb-10">
      <SectionHeader title="News" href="/about" action="Full timeline" />
      <ul className="m-0 list-none p-0">
        {topEvents.map((n, i) => {
          const tagInfo = getTagInfoFromKind(n.kind);
          return (
            <li
              key={i}
              className="border-rule grid grid-cols-[50px_1fr] items-baseline gap-x-3 gap-y-1 border-b border-dashed py-3 last:border-0 md:grid-cols-[78px_1fr]"
            >
              <span className="text-ink-3 font-mono text-[11px] tracking-[0.02em]">{n.year}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-ink font-serif text-[15px] leading-snug font-semibold">
                    {stripEmoji(n.title ?? n.text)}
                  </span>
                  <span
                    className={`rounded-[3px] px-[6px] py-[2px] text-center font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase ${tagInfo.className}`}
                  >
                    {tagInfo.label}
                  </span>
                </div>
                {n.title && (
                  <p className="text-ink-2 m-0 mt-1 text-[13.5px] leading-[1.55]">
                    {stripEmoji(n.text)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
