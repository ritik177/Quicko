import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import { footerLinkGroups, socialLinks } from "./footer/footerLinks";

const socialIcons = {
  linktree: SiLinktree,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 text-slate-100" aria-label="Site footer">
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full bg-slate-700 px-4 py-4 text-sm font-medium transition-colors hover:bg-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-100"
      >
        Back to top
      </button>

      <div className="bg-slate-900">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {footerLinkGroups.map((group) => (
            <section key={group.title} aria-labelledby={`footer-${group.title}`}>
              <h2 id={`footer-${group.title}`} className="mb-4 text-base font-semibold text-white">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        className="block w-fit text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        to={link.to}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        className="block w-fit text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-700 bg-slate-950">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-7 text-center sm:flex-row sm:text-left lg:px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white transition-colors hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
          >
            Quicko
          </Link>

          <div className="flex items-center gap-2" aria-label="Quicko social links">
            {socialLinks.map((socialLink) => {
              const Icon = socialIcons[socialLink.icon];

              return (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-600 text-lg text-slate-200 transition-colors hover:border-primary-100 hover:bg-primary-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>

          <p className="text-sm text-slate-400">© {currentYear} Quicko. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
