import { getOrgLogo } from "@/utils/about";

export function OrgLogo({ name }: { name: string }) {
  const logo = getOrgLogo(name);

  return (
    <div className="border-rule flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[6px] border bg-white">
      {logo.kind === "img" ? (
        <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain p-0.5" />
      ) : (
        <span className="text-ink-2 font-serif text-[14px] font-bold">{logo.label}</span>
      )}
    </div>
  );
}
