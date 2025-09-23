import { EB_Garamond } from 'next/font/google';
import './global.css';
import Providers from './providers';

const ebGaramond = EB_Garamond({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ebGaramond.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
