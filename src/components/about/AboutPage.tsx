import { AboutSectionTitle } from "./AboutSection";
import { AboutSidebar } from "./AboutSidebar";
import { AvailabilityCard } from "./AvailabilityCard";
import { EducationList, ExperienceList } from "./CareerSections";
import { PressList } from "./PressList";
import { AwardsList, ServiceGrid, TalksList } from "./RecognitionSections";
import { TimelineList } from "./TimelineList";
import type { AboutPageProps } from "./types";

const linkClass =
  "text-link hover:text-link-hover underline underline-offset-[3px] decoration-[1px] decoration-link/35 hover:decoration-link-hover";

export default function AboutPage({
  about,
  educations,
  experiences,
  awards,
  talks,
  service,
  press,
  availability,
  timeline,
  children,
}: AboutPageProps) {
  const bioParagraphs = about.description.split("\n\n").filter(Boolean);
  const email = about.email || "";
  const has = (category: string) => experiences.some((e) => e.category === category);

  return (
    <div>
      <header className="mb-8 max-w-[720px]">
        <p className="text-ink-3 m-0 mb-[6px] font-mono text-[11px] tracking-[0.14em] uppercase">
          Me
        </p>
        <h1 className="text-ink m-0 font-serif text-[clamp(28px,4.5vw,42px)] leading-[1.05] font-semibold tracking-[-0.02em]">
          {about.name}
        </h1>
        <p className="text-ink-2 m-0 mt-3 max-w-[60ch] text-[15px]">
          {about.designation} at{" "}
          {about.company.url ? (
            <a href={about.company.url} className={linkClass} target="_blank" rel="noreferrer">
              {about.company.name}
            </a>
          ) : (
            about.company.name
          )}
          .
        </p>
      </header>

      <div className="grid grid-cols-1 gap-[44px] md:grid-cols-[240px_1fr]">
        <AboutSidebar about={about} email={email} />

        <div>
          <AboutSectionTitle first>Bio</AboutSectionTitle>
          {bioParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-ink m-0 mb-[1em] max-w-[65ch] font-serif text-[16px] leading-[1.65]"
            >
              {paragraph}
            </p>
          ))}

          {educations.length > 0 && (
            <>
              <AboutSectionTitle>Education</AboutSectionTitle>
              <EducationList educations={educations} />
            </>
          )}

          {has("industry") && (
            <>
              <AboutSectionTitle>Experience</AboutSectionTitle>
              <ExperienceList experiences={experiences} category="industry" showType />
            </>
          )}

          {has("research") && (
            <>
              <AboutSectionTitle>Research</AboutSectionTitle>
              <ExperienceList experiences={experiences} category="research" />
            </>
          )}

          {has("teaching") && (
            <>
              <AboutSectionTitle>Teaching</AboutSectionTitle>
              <ExperienceList experiences={experiences} category="teaching" />
            </>
          )}

          {awards.length > 0 && (
            <>
              <AboutSectionTitle>Honors & Awards</AboutSectionTitle>
              <AwardsList awards={awards} />
            </>
          )}

          {talks.length > 0 && (
            <>
              <AboutSectionTitle>Talks & Presentations</AboutSectionTitle>
              <TalksList talks={talks} />
            </>
          )}

          {service.length > 0 && (
            <>
              <AboutSectionTitle>Service & Reviewing</AboutSectionTitle>
              <ServiceGrid service={service} />
            </>
          )}

          {press.length > 0 && (
            <>
              <AboutSectionTitle>Press & Mentions</AboutSectionTitle>
              <PressList press={press} />
            </>
          )}

          {email && (
            <>
              <AboutSectionTitle>Reach Out</AboutSectionTitle>
              <p className="text-ink m-0 mb-4 max-w-[65ch] font-serif text-[16px] leading-[1.62]">
                The best way to get in touch is{" "}
                <a href={`mailto:${email}`} className={linkClass}>
                  email
                </a>
                , or a message on LinkedIn.
              </p>
            </>
          )}

          {children}

          {availability.days.length > 0 && (
            <AvailabilityCard availability={availability} email={email} />
          )}

          {timeline.length > 0 && (
            <>
              <AboutSectionTitle>Timeline</AboutSectionTitle>
              <TimelineList timeline={timeline} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
