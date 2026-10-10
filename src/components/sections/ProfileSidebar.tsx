import { OrgLogo } from "@/components/about/OrgLogo";
import { PinIcon } from "@/components/Icons";
import { SocialIconLink } from "@/components/social/SocialIconLink";
import type { About } from "@/components/about/types";

export default function ProfileSidebar({ about }: { about: About }) {
  return (
    <aside className="flex flex-col items-center self-start text-center">
      <img
        className="mx-auto mb-[18px] block h-[132px] w-[132px] rounded-full object-cover shadow-lg shadow-slate-900/10"
        src={
          about.photo === "/images/placeholder.svg"
            ? "/images/placeholder.svg"
            : about.photo || "/images/placeholder.svg"
        }
        alt={about.name}
        width={132}
        height={132}
        loading="eager"
        decoding="async"
      />

      <h1 className="text-ink m-0 mb-1 font-serif text-[24px] leading-[1.15] font-semibold tracking-[-0.02em]">
        {about.name}
      </h1>

      <p className="text-ink-2 m-0 mb-[6px] text-[13.5px] leading-[1.4]">{about.designation}</p>

      <div className="mb-2">
        <OrgLogo name={about.company.name} />
      </div>

      <p className="text-ink-3 m-0 mb-3 flex flex-col items-center text-[12.5px] leading-[1.5]">
        {about.company.department?.name && (
          <a
            href={about.company.department.url || about.company.url}
            className="text-link hover:text-link-hover decoration-link/35 py-1 underline underline-offset-[3px]"
          >
            {about.company.department.name}
          </a>
        )}
        {about.company.url ? (
          <a href={about.company.url} className="text-ink-3 hover:text-link-hover py-1">
            {about.company.name}
          </a>
        ) : (
          <span className="py-1">{about.company.name}</span>
        )}
      </p>

      {about.location?.name && (
        <a
          href={about.location.url || undefined}
          target="_blank"
          rel="noreferrer"
          className="text-ink-3 hover:text-link mb-3 inline-flex items-center gap-[5px] text-[12.5px] transition-colors"
        >
          <PinIcon className="h-[13px] w-[13px]" /> {about.location.name}
        </a>
      )}

      {about.openTo && about.openTo.length > 0 && (
        <div className="mb-[14px] flex flex-col items-center gap-[6px]">
          {about.openTo.map((label) => (
            <span
              key={label}
              className="border-rule text-ink-2 inline-flex items-center gap-[7px] rounded-full border py-1 pr-[10px] pl-2 font-mono text-[11.5px]"
            >
              <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-emerald-400" />
              {label}
            </span>
          ))}
        </div>
      )}

      <ul className="m-0 mt-3 flex list-none flex-wrap justify-center gap-1.5 p-0">
        {about.academicLinks?.map((s: { name: string; url: string }) => {
          return (
            <li key={s.name}>
              <SocialIconLink name={s.name} url={s.url} />
            </li>
          );
        })}
      </ul>

      <TagGroup title="Academic interests" tags={about.academicInterests} />
      <TagGroup title="Interests" tags={about.interests} />
    </aside>
  );
}

function TagGroup({ title, tags }: { title: string; tags?: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="border-rule mt-4 flex w-full flex-col border-t border-dashed pt-[14px] text-left">
      <span className="text-ink-3 mb-2 block font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase">
        {title}
      </span>
      <div className="flex flex-wrap gap-[5px]">
        {tags.map((t) => (
          <span
            key={t}
            className="bg-bg-2 border-rule text-ink-2 rounded border px-[7px] py-[2px] font-mono text-[9.3px] whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
