import { useTranslation } from 'react-i18next';
import { GeometricPattern } from '@/components/GeometricPattern';
import { Lock } from 'lucide-react';

const sections = [
  'collect', 'use', 'sharing', 'cookies', 'retention', 'rights', 'security', 'contact',
];

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 border-b overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GeometricPattern className="absolute top-8 right-8 h-24 w-24 text-primary opacity-20" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('privacy.lastUpdated')}</p>
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('privacy.intro')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 max-w-3xl">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={section} data-testid={`privacy-section-${section}`}>
              <h2 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {index + 1}
                </span>
                {t(`privacy.sections.${section}.title`)}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t(`privacy.sections.${section}.text`)}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{t('privacy.footer')}</p>
        </div>
      </div>
    </div>
  );
}
