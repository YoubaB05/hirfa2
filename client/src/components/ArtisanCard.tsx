import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { MapPin, Star, Phone } from 'lucide-react';
import { Artisan } from '@shared/schema';

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  const { t, i18n } = useTranslation();

  const name =
    i18n.language === 'ar'
      ? artisan.nameAr
      : i18n.language === 'fr'
      ? artisan.nameFr
      : artisan.nameEn;

  const bio =
    i18n.language === 'ar'
      ? artisan.bioAr
      : i18n.language === 'fr'
      ? artisan.bioFr
      : artisan.bioEn;

  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-artisan-${artisan.id}`}>
      <div className="relative h-48 overflow-hidden bg-muted">
        {artisan.portfolioImages.length > 0 ? (
          <img
            src={artisan.portfolioImages[0]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {artisan.featured === 1 && (
          <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
            {t('artisan.featured')}
          </Badge>
        )}

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
            <AvatarImage src={artisan.profileImage} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="p-6 pt-14 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="font-display text-xl font-semibold text-foreground">
            {name}
          </h3>
          
          <div className="flex items-center justify-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{artisan.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({artisan.reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 text-center">
          {bio}
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{artisan.location}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="outline" className="font-medium">
            {artisan.priceRange}
          </Badge>
          <Link href={`/artisan/${artisan.id}`}>
            <Button size="sm" data-testid={`button-view-profile-${artisan.id}`}>
              {t('artisan.viewProfile')}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
