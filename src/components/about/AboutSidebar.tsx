import { EmailIcon, GitHubIcon, LinkedInIcon, PinIcon } from "@/components/Icons";
import type { About } from "./types";

export function AboutSidebar({ about, email }: { about: About; email: string }) {
  const social = (n: string) => about.socialLinks.find((l) => l.name === n);
  const linkedIn = social("linkedin");
  const github = social("github");

  return (
    <aside>
      <img
        className="aspect-square w-full max-w-[220px] rounded-[10px] object-cover"
        src={about.photo || "/images/placeholder.svg"}
        alt={about.name}
      />
      <div className="text-ink-2 mt-[14px] grid gap-[6px] text-[12.5px]">
        {about.location?.name && (
          <a
            href={about.location.url || undefined}
            target="_blank"
            rel="noreferrer"
            className="hover:text-link inline-flex items-center gap-[6px] transition-colors"
          >
            <PinIcon className="h-[13px] w-[13px]" /> {about.location.name}
          </a>
        )}
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-link inline-flex items-center gap-[6px] transition-colors"
        >
          <EmailIcon className="h-[13px] w-[13px]" /> {email}
        </a>
        {linkedIn && (
          <a
            href={linkedIn.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-link inline-flex items-center gap-[6px] transition-colors"
          >
            <LinkedInIcon className="h-[13px] w-[13px]" /> {linkedIn.username || "LinkedIn"}
          </a>
        )}
        {github && (
          <a
            href={github.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-link inline-flex items-center gap-[6px] transition-colors"
          >
            <GitHubIcon className="h-[13px] w-[13px]" /> {github.username || "GitHub"}
          </a>
        )}
      </div>
    </aside>
  );
}
