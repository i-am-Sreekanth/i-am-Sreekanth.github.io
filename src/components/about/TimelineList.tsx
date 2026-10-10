import { getTimelineKindClass } from "@/utils/about";
import type { TimelineYear } from "./types";

export function TimelineList({ timeline }: { timeline: TimelineYear[] }) {
  return (
    <div>
      {timeline.map((year) => (
        <div
          key={year.year}
          className="border-rule grid grid-cols-[60px_1fr] items-baseline gap-[14px] border-b border-dashed py-[10px] last:border-b-0"
        >
          <div className="text-ink font-mono text-[13px] font-semibold">{year.year}</div>
          <div className="grid gap-[5px]">
            {year.items.map((item, index) => (
              <div
                key={`${item.kind}-${index}`}
                className="text-ink-2 grid grid-cols-[60px_1fr] gap-2.5 text-[13px]"
              >
                <span
                  className={`h-fit rounded-[3px] px-[6px] py-[2px] font-mono text-[9.5px] tracking-[0.1em] uppercase ${getTimelineKindClass(
                    item.kind,
                  )}`}
                >
                  {item.kind}
                </span>
                <span>
                  {item.title ? (
                    <strong className="text-ink font-semibold">{item.title}. </strong>
                  ) : null}
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
