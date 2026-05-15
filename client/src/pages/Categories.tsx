import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import {
  ChefHat, Scissors, Wrench, Sparkles,
  Palette, BookOpen, Flower2, Monitor,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GeometricPattern } from '@/components/GeometricPattern';
import { Category, Artisan } from '@shared/schema';

const categoryIcons: Record<string, any> = {
  cooking: ChefHat,
  sewing: Scissors,
  repairs: Wrench,
  cleaning: Sparkles,
  design: Palette,
  tutoring: BookOpen,
  beauty: Flower2,
  tech: Monitor,
};

const categoryGradients: Record<string, string> = {
  cooking: 'from-orange-500/20 to-amber-400/10',
  sewing: 'from-rose-500/20 to-pink-400/10',
  repairs: 'from-blue-500/20 to-sky-400/10',
  cleaning: 'from-emerald-500/20 to-teal-400/10',
  design: 'from-violet-500/20 to-purple-400/10',
  tutoring: 'from-yellow-500/20 to-lime-400/10',
  beauty: 'from-fuchsia-500/20 to-pink-300/10',
  tech: 'from-cyan-500/20 to-blue-400/10',
};

const categoryDescriptions: Record<string, { en: string; fr: string; ar: string }> = {
  cooking: {
    en: 'Traditional Algerian recipes, home-cooked meals, pastries, and catering services by skilled home chefs.',
    fr: 'Recettes algériennes traditionnelles, repas faits maison, pâtisseries et services de traiteur.',
    ar: 'وصفات جزائرية تقليدية، وجبات منزلية، حلويات وخدمات تقديم الطعام من طرف طهاة منزليين مهرة.',
  },
  sewing: {
    en: 'Tailoring, embroidery, traditional dress-making, alterations, and handcrafted fashion design.',
    fr: 'Couture, broderie, confection de vêtements traditionnels, retouches et design de mode artisanal.',
    ar: 'الخياطة والتطريز وصناعة الأزياء التقليدية والتعديلات والتصميم اليدوي.',
  },
  repairs: {
    en: 'Household repairs, plumbing, electrical work, furniture restoration, and general home maintenance.',
    fr: 'Réparations ménagères, plomberie, travaux électriques, restauration de meubles et entretien général.',
    ar: 'إصلاحات منزلية، السباكة، الأعمال الكهربائية، ترميم الأثاث والصيانة العامة للمنزل.',
  },
  cleaning: {
    en: 'Professional home cleaning, deep cleaning, laundry services, and post-construction cleanup.',
    fr: 'Nettoyage professionnel à domicile, nettoyage en profondeur et nettoyage post-construction.',
    ar: 'تنظيف منزلي احترافي، تنظيف عميق، خدمات غسيل الملابس وتنظيف ما بعد البناء.',
  },
  design: {
    en: 'Logo design, brand identity, social media visuals, Arabic calligraphy, and digital illustration.',
    fr: 'Design de logo, identité de marque, visuels réseaux sociaux, calligraphie arabe et illustration numérique.',
    ar: 'تصميم الشعارات والهوية البصرية والجرافيك للسوشيال ميديا والخط العربي والرسم الرقمي.',
  },
  tutoring: {
    en: 'Private lessons in math, science, languages, and more. Flexible online and in-person sessions.',
    fr: 'Cours particuliers en maths, sciences, langues et plus. Sessions flexibles en ligne et en présentiel.',
    ar: 'دروس خصوصية في الرياضيات والعلوم واللغات وأكثر. جلسات مرنة أونلاين وحضورية.',
  },
  beauty: {
    en: 'Makeup artistry, hair styling, skincare, henna, and wellness treatments at your home.',
    fr: 'Maquillage, coiffure, soins de la peau, henné et bien-être à domicile.',
    ar: 'فن المكياج وتصفيف الشعر والعناية بالبشرة والحناء وعلاجات العافية في منزلك.',
  },
  tech: {
    en: 'Web development, IT support, social media management, and digital marketing services.',
    fr: 'Développement web, support IT, gestion réseaux sociaux et marketing digital.',
    ar: 'تطوير الويب، دعم تقنية المعلومات، إدارة السوشيال ميديا والتسويق الرقمي.',
  },
};

export default function Categories() {
  const { t, i18n } = useTranslation();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: artisans = [] } = useQuery<Artisan[]>({
    queryKey: ['/api/artisans'],
  });

  const categoriesWithData = categories.map(cat => ({
    ...cat,
    count: artisans.filter(a => a.categoryId === cat.id).length,
    icon: categoryIcons[cat.icon] || ChefHat,
    gradient: categoryGradients[cat.id] || 'from-primary/20 to-primary/10',
    description:
      categoryDescriptions[cat.id]?.[i18n.language as 'en' | 'fr' | 'ar'] ||
      categoryDescriptions[cat.id]?.en || '',
  }));

  const lang = i18n.language as 'en' | 'fr' | 'ar';
  const talentWord = lang === 'ar' ? 'موهبة' : lang === 'fr' ? 'talents' : 'talents';

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GeometricPattern className="absolute top-8 right-8 h-32 w-32 text-primary opacity-30" />
          <GeometricPattern className="absolute bottom-8 left-8 h-24 w-24 text-primary opacity-20" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('categoriesPage.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('categoriesPage.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {categoriesWithData.map((cat) => {
            const Icon = cat.icon;
            const name =
              i18n.language === 'ar' ? cat.nameAr :
              i18n.language === 'fr' ? cat.nameFr : cat.nameEn;

            return (
              <Card key={cat.id} className="group overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-category-${cat.id}`}>
                <div className={`relative p-8 bg-gradient-to-br ${cat.gradient}`}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-full bg-background/80 backdrop-blur text-primary shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-10 w-10" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-display text-2xl font-bold text-foreground">{name}</h2>
                        <Badge variant="secondary">{cat.count} {talentWord}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{cat.description}</p>
                      <Link href={`/artisans?category=${cat.id}`}>
                        <Button className="gap-2 mt-2" data-testid={`button-browse-${cat.id}`}>
                          {t('categoriesPage.browse')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center rounded-lg bg-primary/5 border border-primary/10 p-12">
          <GeometricPattern className="mx-auto mb-6 h-16 w-16 text-primary opacity-60" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            {t('categoriesPage.ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {t('categoriesPage.ctaText')}
          </p>
          <Link href="/artisans">
            <Button size="lg" className="gap-2" data-testid="button-view-all-artisans">
              {t('categories.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
