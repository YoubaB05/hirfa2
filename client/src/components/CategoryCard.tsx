import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    nameEn: string;
    nameFr: string;
    nameAr: string;
    icon: string;
  };
  Icon: LucideIcon;
  artisanCount: number;
}

export function CategoryCard({ category, Icon, artisanCount }: CategoryCardProps) {
  const { i18n } = useTranslation();

  const name =
    i18n.language === 'ar'
      ? category.nameAr
      : i18n.language === 'fr'
      ? category.nameFr
      : category.nameEn;

  return (
    <Link href={`/artisans?category=${category.id}`}>
      <Card className="group relative overflow-hidden p-6 hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer" data-testid={`card-category-${category.id}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
            <Icon className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {artisanCount} {i18n.language === 'ar' ? 'حرفي' : i18n.language === 'fr' ? 'artisans' : 'artisans'}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
