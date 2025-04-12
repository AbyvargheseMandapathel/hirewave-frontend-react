// If you have a layout component, ensure it has the dark background
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};