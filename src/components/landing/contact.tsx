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
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
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
      let userInquiry = `The user's message is: "${values.message || 'No message provided.'}".`;
      if (values.service) {
        userInquiry = `The user is interested in the "${values.service}" service. ` + userInquiry;
      }
      if (values.company) {
          userInquiry = `The user works at ${values.company}. ` + userInquiry;
      }
      userInquiry = `Contact details: Name: ${values.name}, Email: ${values.email}, Phone: ${values.phone}. ` + userInquiry;

      const aiResult = await personalizeContent({ userInquiry });
      setResult(aiResult);
      setIsDialogOpen(true);
      form.reset();
    } catch (error) {
      console.error('Error personalizing content:', error);
      toast({
        title: 'An Error Occurred',
        description: 'We could not get a suggestion for you. Please try again later.',
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Contact Us</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a project in mind? Fill out the form below to get in touch. Our AI assistant will analyze your request to suggest the best services for you.
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
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
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
                          <FormLabel>Phone</FormLabel>
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
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
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
                          <FormLabel>Service of Interest (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Web Design">Web Design</SelectItem>
                              <SelectItem value="Automation">Automation</SelectItem>
                              <SelectItem value="IT Services">IT Services</SelectItem>
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
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project or what you need help with..."
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
                      Get AI-Powered Suggestions
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
              Here are our suggestions for you!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Based on your inquiry, we believe the following services would be a great fit for your project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {result && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Suggested Services:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.suggestedServices.map((service) => (
                    <Badge key={service} variant="default" className="bg-primary text-primary-foreground">{service}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reasoning:</h3>
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
