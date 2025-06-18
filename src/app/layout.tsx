import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gerador de Cartazes',
    description: 'Gere cartazes de promoções facilmente',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className="bg-gray-100">{children}</body>
        </html>
    );
}
