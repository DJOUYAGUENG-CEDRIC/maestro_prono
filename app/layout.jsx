import './globals.css';

export const metadata = {
  title: 'Maestro Prono',
  description: 'Assistant pronostics sportifs — Code promo 33LAM',
  icons: { icon: '/apple.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
