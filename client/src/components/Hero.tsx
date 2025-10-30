import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { GeometricPattern } from './GeometricPattern';
import hirfaLogo from '@assets/Screenshot 2025-10-26 091425_1761815097330.png';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="absolute inset-0 overflow-hidden">
        <GeometricPattern className="absolute top-20 left-10 h-32 w-32 text-primary opacity-10 animate-pulse" />
        <GeometricPattern className="absolute bottom-20 right-10 h-24 w-24 text-primary opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <GeometricPattern className="absolute top-1/3 right-1/4 h-20 w-20 text-primary opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-start">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-primary">
              <div className="h-px w-8 bg-primary" />
              <span>Hirfa • حِرفة</span>
              <div className="h-px w-8 bg-primary" />
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground">{t('hero.title')}</span>
              <span className="block text-primary mt-2">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t('hero.tagline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/artisans">
                <Button size="lg" className="gap-2 text-base" data-testid="button-hero-cta">
                  {t('hero.cta')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl" />
              <img
                src={hirfaLogo}
                alt="Hirfa Logo"
                className="relative rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-105"
                data-testid="img-hero-logo"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
