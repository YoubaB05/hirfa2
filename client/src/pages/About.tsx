import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GeometricPattern, ArabicCorner } from '@/components/GeometricPattern';
import { Heart, Users, MapPin, Star, ArrowRight, Shield, Handshake, Sparkles } from 'lucide-react';

const stats = [
  { key: 'artisans', value: '1,200+', icon: Users },
  { key: 'cities', value: '69', icon: MapPin },
  { key: 'reviews', value: '8,500+', icon: Star },
  { key: 'satisfaction', value: '98%', icon: Heart },
];

const values = [
  { key: 'trust', icon: Shield },
  { key: 'community', icon: Handshake },
  { key: 'craft', icon: Sparkles },
];

const team = [
  { nameEn: 'Bettayeb Hiba Ghofrane', role: 'en', city: 'Tlemcen', initials: 'BH' },
  { nameEn: 'Benbada Ayoub', role: 'fr', city: 'Algiers', initials: 'BA' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-background to-accent/10 py-20 md:py-32 border-b">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GeometricPattern className="absolute top-10 right-10 h-40 w-40 text-primary opacity-20" />
          <GeometricPattern className="absolute bottom-10 left-10 h-32 w-32 text-primary opacity-15" />
          <ArabicCorner className="absolute top-0 left-0 h-24 w-24 text-primary opacity-25" />
          <ArabicCorner className="absolute bottom-0 right-0 h-24 w-24 text-primary opacity-25 rotate-180" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('about.heroTitle')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('about.heroSubtitle')}
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map(({ key, value, icon: Icon }) => (
              <Card key={key} className="p-6 text-center" data-testid={`stat-${key}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{t(`about.stats.${key}`)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t('about.storyTitle')}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('about.storyP1')}</p>
                <p>{t('about.storyP2')}</p>
                <p>{t('about.storyP3')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/10 aspect-square flex items-center justify-center">
                    <span className="font-arabic text-6xl text-primary">حرفة</span>
                  </div>
                  <div className="rounded-lg bg-accent/10 aspect-video flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-accent-foreground/40" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-lg bg-muted aspect-video flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/10 aspect-square flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary/40" />
                  </div>
                </div>
              </div>
              <GeometricPattern className="absolute -top-6 -right-6 h-20 w-20 text-primary opacity-30" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.valuesTitle')}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ key, icon: Icon }) => (
              <Card key={key} className="p-8 text-center space-y-4" data-testid={`value-${key}`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t(`about.values.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`about.values.${key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.teamTitle')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('about.teamSubtitle')}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            {team.map((member) => (
              <Card key={member.nameEn} className="p-6 text-center space-y-3" data-testid={`card-team-${member.initials.toLowerCase()}`}>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto font-display text-2xl font-bold">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{member.nameEn}</h3>
                  <p className="text-sm text-muted-foreground">{t(`about.team.${member.role}`)}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3" />{member.city}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <GeometricPattern className="mx-auto h-16 w-16 text-primary opacity-60" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t('about.ctaTitle')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('about.ctaText')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/artisans">
                <Button size="lg" className="gap-2" data-testid="button-explore-artisans">
                  {t('hero.cta')} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-contact-us">
                  {t('about.contactUs')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
