'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { personalizeContent, type PersonalizeContentOutput } from '@/ai/flows/personalize-content';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo electrónico válida.' }),
  phone: z.string().min(1, { message: 'El número de teléfono es obligatorio.' }),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizeContentOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      let userInquiry = `El mensaje del usuario es: "${values.message || 'No se proporcionó ningún mensaje.'}".`;
      if (values.service) {
        userInquiry = `El usuario está interesado en el servicio "${values.service}". ` + userInquiry;
      }
      if (values.company) {
          userInquiry = `El usuario trabaja en ${values.company}. ` + userInquiry;
      }
      userInquiry = `Detalles de contacto: Nombre: ${values.name}, Email: ${values.email}, Teléfono: ${values.phone}. ` + userInquiry;

      const aiResult = await personalizeContent({ userInquiry });
      setResult(aiResult);
      setIsDialogOpen(true);
      form.reset();
    } catch (error) {
      console.error('Error personalizing content:', error);
      toast({
        title: 'Ocurrió un Error',
        description: 'No pudimos obtener una sugerencia para ti. Por favor, inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid items-center justify-center gap-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Contáctanos</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              ¿Tienes un proyecto en mente? Completa el formulario a continuación para ponerte en contacto. Nuestro asistente de IA analizará tu solicitud para sugerirte los mejores servicios para ti.
            </p>
          </div>
          <div className="mx-auto w-full max-w-lg">
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan Pérez" {...field} />
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
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="juan.perez@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa (Opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu Empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Servicio de Interés (Opcional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un servicio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Diseño Web">Diseño Web</SelectItem>
                              <SelectItem value="Automatización">Automatización</SelectItem>
                              <SelectItem value="Servicios de TI">Servicios de TI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Mensaje (Opcional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Cuéntanos sobre tu proyecto o en qué necesitas ayuda..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loading} className="w-full sm:col-span-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Obtener Sugerencias con IA
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="text-accent" />
              ¡Aquí tienes nuestras sugerencias para ti!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Basado en tu consulta, creemos que los siguientes servicios serían ideales para tu proyecto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {result && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Servicios Sugeridos:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.suggestedServices.map((service) => (
                    <Badge key={service} variant="default" className="bg-primary text-primary-foreground">{service}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Justificación:</h3>
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction>¡Entendido!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
