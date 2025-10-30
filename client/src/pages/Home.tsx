import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Hero } from '@/components/Hero';
import { CategoryCard } from '@/components/CategoryCard';
import { ArtisanCard } from '@/components/ArtisanCard';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ChefHat, Scissors, Wrench, Sparkles, ArrowRight } from 'lucide-react';
import { Artisan, Category } from '@shared/schema';

const categoryIcons: Record<string, any> = {
  cooking: ChefHat,
  sewing: Scissors,
  repairs: Wrench,
  cleaning: Sparkles,
};

export default function Home() {
  const { t } = useTranslation();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: artisans = [] } = useQuery<Artisan[]>({
    queryKey: ['/api/artisans'],
  });

  const featuredArtisans = artisans.filter(a => a.featured === 1).slice(0, 3);

  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: artisans.filter(a => a.categoryId === cat.id).length,
  }));

  return (
    <div className="flex flex-col">
      <Hero />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t('categories.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCounts.map((category) => {
              const Icon = categoryIcons[category.icon] || ChefHat;
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  Icon={Icon}
                  artisanCount={category.count}
                />
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/artisans">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-all-artisans">
                {t('categories.viewAll')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {featuredArtisans.length > 0 && (
        <section className="py-16 md:py-24 bg-accent/5">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t('hero.featured')}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
