'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send, X, Loader2, User } from 'lucide-react';
import { navigate, type NavigateOutput } from '@/ai/flows/navigate-flow';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Message = {
    id: number;
    sender: 'bot' | 'user';
    text?: string;
    links?: NavigateOutput['suggestedLinks'];
    timestamp: string;
};

const calloutMessages = [
    '¿Necesitas ayuda?',
    '¿Tienes una idea? ¡Te ayudamos!',
    '¡Hagamos tu proyecto realidad!',
    'Puedo guiarte por el sitio.',
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showCallouts, setShowCallouts] = useState(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        let initialTimestamp = '';
        if (typeof window !== 'undefined') {
            initialTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        setMessages([
            { 
                id: 1, 
                sender: 'bot', 
                text: '¡Hola! Soy tu asistente de navegación. ¿Cómo puedo ayudarte a encontrar lo que buscas en JRsistemas?',
                timestamp: initialTimestamp
            }
        ]);
    }, []);

    useEffect(() => {
        if (isOpen || !showCallouts) return;

        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % calloutMessages.length);
        }, 10000); // Change message every 10 seconds

        return () => clearInterval(interval);
    }, [isOpen, showCallouts]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const result = await navigate({ userQuery: inputValue });
            const botMessage: Message = {
                id: Date.now() + 1,
                sender: 'bot',
                text: result.response,
                links: result.suggestedLinks,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error fetching navigation help:', error);
            toast({
                title: 'Ocurrió un Error',
                description: 'No pude procesar tu solicitud. Por favor, inténtalo de nuevo.',
                variant: 'destructive',
            });
            const errorMessage: Message = {
                id: Date.now() + 1,
                sender: 'bot',
                text: 'Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta más tarde.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                 {!isOpen && showCallouts && (
                   <div key={currentMessageIndex} className="w-max max-w-[220px] animate-in fade-in-0 slide-in-from-bottom-2">
                       <div className="relative rounded-lg border bg-background p-3 pr-8 shadow-accent">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 h-5 w-5 rounded-full"
                                onClick={() => setShowCallouts(false)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Cerrar mensajes</span>
                           </Button>
                           <p className="text-sm text-center text-foreground">{calloutMessages[currentMessageIndex]}</p>
                           <div className="absolute bottom-0 right-5 h-3 w-3 translate-y-1/2 rotate-45 transform border-b border-r border-border bg-background"></div>
                       </div>
                   </div>
                )}
                <Button
                    size="icon"
                    className="rounded-full w-14 h-14 shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-md border text-accent hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                    <span className="sr-only">Abrir chat de ayuda</span>
                </Button>
            </div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                    <Card className="w-80 h-[500px] flex flex-col shadow-2xl bg-background/80 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg font-headline">Asistente JR</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn('flex items-start gap-3', message.sender === 'user' ? 'justify-end' : '')}
                                    >
                                        {message.sender === 'bot' && (
                                            <div className="rounded-full p-2 text-primary-foreground bg-gradient-to-br from-primary via-accent to-primary">
                                                <Bot className="h-4 w-4" />
                                            </div>
                                        )}
                                        <div className={cn("flex flex-col gap-1 max-w-[80%]", message.sender === 'user' ? 'items-end' : 'items-start')}>
                                            <span className="text-xs font-medium text-muted-foreground px-1">
                                                {message.sender === 'bot' ? 'Asistente JR' : 'Tú'}
                                            </span>
                                            <div
                                                className={cn('w-fit max-w-full rounded-lg px-3 py-2 text-sm break-words', message.sender === 'user'
                                                        ? 'bg-muted text-muted-foreground'
                                                        : 'bg-card border'
                                                    )}
                                            >
                                                {message.text}
                                                {message.links && message.links.length > 0 && (
                                                    <div className="mt-2 flex flex-col gap-2">
                                                        {message.links.map((link, index) => (
                                                            <Button
                                                                key={index}
                                                                asChild
                                                                variant="secondary"
                                                                className="h-auto w-full justify-start whitespace-normal text-left px-3 py-2"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                <Link href={link.href}>{link.text}</Link>
                                                            </Button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground/60 px-1">
                                                {message.timestamp}
                                            </span>
                                        </div>

                                        {message.sender === 'user' && (
                                            <div className="bg-muted rounded-full p-2">
                                                <User className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full p-2 text-primary-foreground bg-gradient-to-br from-primary via-accent to-primary">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                        <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-card border">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                                <Input
                                    id="message"
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1"
                                    autoComplete="off"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Enviar</span>
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
