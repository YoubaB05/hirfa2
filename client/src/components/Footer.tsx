import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GeometricPattern } from './GeometricPattern';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: t('nav.artisans'), href: '/artisans' },
      { label: t('nav.categories'), href: '/categories' },
    ],
    support: [
      { label: t('footer.contact'), href: '#' },
      { label: t('footer.faq'), href: '#' },
      { label: t('footer.terms'), href: '#' },
      { label: t('footer.privacy'), href: '#' },
    ],
  };

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative border-t bg-card text-card-foreground">
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <GeometricPattern className="absolute top-10 left-10 h-24 w-24 text-primary" />
        <GeometricPattern className="absolute bottom-10 right-10 h-24 w-24 text-primary" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-serif text-xl font-bold">
                ح
              </div>
              <span className="font-display text-xl font-bold">Hirfa</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.aboutText')}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  asChild
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">{t('footer.support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">{t('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.newsletterText')}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-subscribe">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Hirfa. Supporting 1000+ {t('footer.artisans')}.</p>
        </div>
      </div>
    </footer>
  );
}
