import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GeometricPattern } from '@/components/GeometricPattern';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { key: 'email', icon: Mail, value: 'contact@hirfa.dz' },
  { key: 'phone', icon: Phone, value: '+213 555 123 456' },
  { key: 'address', icon: MapPin, value: 'Algiers, Algeria' },
  { key: 'hours', icon: Clock, value: 'Sun–Thu, 9am–6pm' },
];

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest('POST', '/api/contact', {
        artisanId: 'hirfa-support',
        clientName: data.name,
        clientEmail: data.email,
        message: `Subject: ${data.subject}\n\n${data.message}`,
      });
    },
    onSuccess: () => {
      toast({ title: t('contactPage.successTitle'), description: t('contactPage.successText') });
      form.reset();
    },
    onError: () => {
      toast({ title: t('contact.error'), variant: 'destructive' });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GeometricPattern className="absolute top-8 right-8 h-32 w-32 text-primary opacity-25" />
          <GeometricPattern className="absolute bottom-8 left-8 h-24 w-24 text-primary opacity-20" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('contactPage.title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('contactPage.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                {t('contactPage.infoTitle')}
              </h2>
              <p className="text-sm text-muted-foreground">{t('contactPage.infoText')}</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ key, icon: Icon, value }) => (
                <div key={key} className="flex items-center gap-4" data-testid={`contact-info-${key}`}>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t(`contactPage.${key}`)}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-primary/5 border border-primary/10 p-6">
              <GeometricPattern className="mb-3 h-10 w-10 text-primary opacity-60" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('contactPage.supportNote')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                {t('contactPage.formTitle')}
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contactPage.namePlaceholder')} data-testid="input-contact-name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" data-testid="input-contact-email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contactPage.subject')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contactPage.subjectPlaceholder')} data-testid="input-contact-subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contactPage.messagePlaceholder')}
                            rows={5}
                            data-testid="input-contact-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="gap-2 w-full" disabled={mutation.isPending} data-testid="button-contact-submit">
                    <Send className="h-4 w-4" />
                    {mutation.isPending ? t('common.loading') : t('contactPage.send')}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
