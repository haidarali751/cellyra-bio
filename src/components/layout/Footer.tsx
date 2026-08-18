import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import { CellyraLogo } from "@/components/ui/CellyraLogo";
import { socialLinks } from "@/data";

const renderSocialIcon = (icon: string) => {
  switch (icon) {
    case "github":
      return <GithubIcon size={18} />;
    case "twitter":
      return <TwitterIcon size={18} />;
    case "linkedin":
      return <LinkedinIcon size={18} />;
    default:
      return null;
  }
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-(--cellyra-border) px-6 py-14 lg:px-10 bg-(--cellyra-bg) text-(--cellyra-muted) transition-colors duration-500">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center relative z-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <CellyraLogo size="sm" showBadge={true} href="/" />
          <span className="font-mono text-xs opacity-50">
            © 2026 CELLYRA INC. ALL RIGHTS RESERVED.
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <span className="font-sans text-xs text-(--cellyra-muted)">
            Engineering biological intelligence for the next era.
          </span>
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-(--cellyra-muted) hover:text-(--cellyra-text) transition-colors duration-300"
                aria-label={link.label}
              >
                {renderSocialIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
