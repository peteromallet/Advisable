import React from "react";
import { Twitter, LinkedinIn, Facebook } from "@styled-icons/fa-brands";
import Logo from "../Logo";

function SocialLink(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="grid place-items-center w-10 h-10 rounded-full border border-solid text-neutral-600 border-neutral-200 hover:text-neutral-900"
    />
  );
}

function FooterLink(props) {
  return <a className="hover:underline underline-offset-4" {...props} />;
}

function FooterMenu({ title, links }) {
  return (
    <div className="w-[200px] lg:w-[150px]">
      <h5 className="mb-2 text-lg font-medium">{title}</h5>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="pt-12 pb-20 border-t border-solid border-neutral100">
      <div className="justify-between px-10 mx-auto w-full md:flex max-w-[1300px]">
        <div className="mb-8">
          <div className="mb-1">
            <Logo />
          </div>
          <p className="mb-5 text-sm text-neutral-500">
            &copy; Advisable {year}
          </p>
          <div className="flex gap-2">
            <SocialLink href="https://www.facebook.com/advisablehq/">
              <Facebook size={20} />
            </SocialLink>
            <SocialLink href="https://ie.linkedin.com/company/advisable-com">
              <LinkedinIn size={20} />
            </SocialLink>
            <SocialLink href="https://twitter.com/advisablehq">
              <Twitter size={20} />
            </SocialLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 lg:grid-cols-4">
          <FooterMenu
            title="Overview"
            links={[
              {
                children: "Pricing",
                href: "https://more.advisable.com/pricing",
              },
              {
                children: "Vetting",
                href: "https://more.advisable.com/vetting",
              },
              { children: "FAQ", href: "https://more.advisable.com/faq" },
            ]}
          />

          <FooterMenu
            title="Contact"
            links={[
              { children: "Careers", href: "mailto:hello@advisable.com" },
              {
                children: "Contact Us",
                href: "mailto:hello@advisable.com?subject=Inquiry",
              },
              {
                children: "Terms of Service",
                href: "https://more.advisable.com/legal/terms-of-service",
              },
              {
                children: "Cookie Policy",
                href: "https://more.advisable.com/legal/cookie-policy",
              },
            ]}
          />

          <FooterMenu
            title="Get Started"
            links={[
              { children: "Create Account", href: "/join" },
              { children: "Login", href: "/login" },
            ]}
          />

          <FooterMenu
            title="More"
            links={[
              {
                children: "Podcast",
                href: "https://more.advisable.com/podcast",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
