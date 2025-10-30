import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertContactMessageSchema } from '@shared/schema';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = insertContactMessageSchema.extend({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

interface ContactFormProps {
  artisanId: string;
  onSuccess?: () => void;
}

export function ContactForm({ artisanId, onSuccess }: ContactFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      artisanId,
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof contactFormSchema>) =>
      apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: t('contact.success'),
      });
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: t('contact.error'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.name')}</FormLabel>
              <FormControl>
                <Input {...field} data-testid="input-contact-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.email')}</FormLabel>
              <FormControl>
                <Input type="email" {...field} data-testid="input-contact-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.phone')}</FormLabel>
              <FormControl>
                <Input {...field} data-testid="input-contact-phone" />
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
                  {...field}
                  rows={4}
                  className="resize-none"
                  data-testid="textarea-contact-message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
          data-testid="button-send-message"
        >
          {mutation.isPending ? t('common.loading') : t('contact.send')}
        </Button>
      </form>
    </Form>
  );
}
