import NavbarLogoOnly from '@/components/NavbarLogoOnly';
import Footer from '@/components/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-white">
      <NavbarLogoOnly />
      <div className="flex-1 flex items-center justify-center py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
} 