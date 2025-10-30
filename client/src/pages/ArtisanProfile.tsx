import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ContactForm } from '@/components/ContactForm';
import { MapPin, Star, Phone, Mail, MessageCircle } from 'lucide-react';
import { Artisan } from '@shared/schema';

export default function ArtisanProfile() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const { data: artisan, isLoading } = useQuery<Artisan>({
    queryKey: ['/api/artisans', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">{t('common.error')}</p>
          <Button onClick={() => window.history.back()}>{t('common.tryAgain')}</Button>
        </div>
      </div>
    );
  }

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

  const services =
    i18n.language === 'ar'
      ? artisan.servicesAr
      : i18n.language === 'fr'
      ? artisan.servicesFr
      : artisan.servicesEn;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        {artisan.portfolioImages.length > 0 && (
          <>
            <img
              src={artisan.portfolioImages[0]}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={artisan.profileImage} alt={name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                      {name}
                    </h1>
                    {artisan.featured === 1 && (
                      <Badge className="bg-primary">
                        {t('artisan.featured')}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{artisan.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">{artisan.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({artisan.reviewCount} {t('artisan.reviews')})
                    </span>
                    <div className="h-4 w-px bg-border mx-2" />
                    <Badge variant="outline">{artisan.priceRange}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2" data-testid="button-contact-artisan">
                        <MessageCircle className="h-4 w-4" />
                        {t('artisan.contact')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{t('contact.title')}</DialogTitle>
                      </DialogHeader>
                      <ContactForm artisanId={artisan.id} />
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="gap-2" asChild>
                    <a href={`tel:${artisan.phone}`} data-testid="link-phone">
                      <Phone className="h-4 w-4" />
                      {artisan.phone}
                    </a>
                  </Button>

                  {artisan.email && (
                    <Button variant="outline" className="gap-2" asChild>
                      <a href={`mailto:${artisan.email}`} data-testid="link-email">
                        <Mail className="h-4 w-4" />
                        {artisan.email}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <Card className="p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">
                  {t('artisan.about')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </Card>

              <Card className="p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">
                  {t('artisan.services')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </Card>

              {artisan.portfolioImages.length > 0 && (
                <Card className="p-6">
                  <h2 className="font-display text-2xl font-semibold mb-4">
                    {t('artisan.portfolio')}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {artisan.portfolioImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                      >
                        <img
                          src={image}
                          alt={`${name} portfolio ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          data-testid={`img-portfolio-${index}`}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold">
                  {t('artisan.contact')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{t('artisan.location')}</p>
                      <p className="text-sm text-muted-foreground">{artisan.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{t('artisan.phone')}</p>
                      <p className="text-sm text-muted-foreground">{artisan.phone}</p>
                    </div>
                  </div>
                  {artisan.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{t('artisan.email')}</p>
                        <p className="text-sm text-muted-foreground break-all">{artisan.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
