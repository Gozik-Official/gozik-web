import "./globals.css"; // ← indispensable pour activer Tailwind

export const metadata = {
  title: "Go-Zik",
  description: "Plateforme des artistes Go-Zik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
