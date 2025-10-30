import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { ArtisanCard } from '@/components/ArtisanCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Artisan, Category } from '@shared/schema';

export default function Artisans() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (searchQuery) params.search = searchQuery;
    return new URLSearchParams(params).toString();
  }, [selectedCategory, searchQuery]);

  const { data: artisans = [], isLoading } = useQuery<Artisan[]>({
    queryKey: ['/api/artisans', queryParams],
    queryFn: async () => {
      const url = `/api/artisans${queryParams ? `?${queryParams}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch artisans');
      return response.json();
    },
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16 border-b">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {t('nav.artisans')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                data-testid="input-search-artisans"
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-64" data-testid="select-category-filter">
                  <SelectValue placeholder={t('search.allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allCategories')}</SelectItem>
                  {categories.map((cat) => {
                    const name =
                      i18n.language === 'ar'
                        ? cat.nameAr
                        : i18n.language === 'fr'
                        ? cat.nameFr
                        : cat.nameEn;
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        {name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground" data-testid="text-results-count">
            {artisans.length} {t('search.results')}
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : artisans.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {t('common.noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
