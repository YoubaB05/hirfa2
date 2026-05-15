import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { GeometricPattern } from '@/components/GeometricPattern';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

const faqKeys = [
  'what', 'how', 'cost', 'safety', 'artisan', 'cancel', 'languages', 'areas',
];

export default function FAQ() {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<string | null>('what');

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GeometricPattern className="absolute top-8 right-8 h-32 w-32 text-primary opacity-25" />
          <GeometricPattern className="absolute bottom-8 left-8 h-24 w-24 text-primary opacity-20" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 max-w-3xl">
        <div className="space-y-3">
          {faqKeys.map((key) => {
            const isOpen = openItem === key;
            return (
              <div
                key={key}
                className="border rounded-md overflow-hidden"
                data-testid={`faq-item-${key}`}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-background hover-elevate transition-colors"
                  onClick={() => setOpenItem(isOpen ? null : key)}
                  data-testid={`faq-toggle-${key}`}
                >
                  <span className="font-medium text-foreground pr-4">
                    {t(`faq.items.${key}.q`)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-5 pb-5 pt-1 text-muted-foreground leading-relaxed border-t bg-muted/20 text-sm">
                    {t(`faq.items.${key}.a`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center rounded-lg bg-primary/5 border border-primary/10 p-10">
          <GeometricPattern className="mx-auto mb-4 h-12 w-12 text-primary opacity-60" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            {t('faq.ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">{t('faq.ctaText')}</p>
          <Link href="/contact">
            <Button className="gap-2" data-testid="button-faq-contact">
              {t('footer.contact')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
