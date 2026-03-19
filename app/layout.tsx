export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              MLB Matchups Dashboard
            </h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
