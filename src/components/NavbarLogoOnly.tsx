import Link from 'next/link';
import Image from 'next/image';

export default function NavbarLogoOnly() {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/logo2.svg"
              alt="His Royal Cakeness Logo"
              width={280}
              height={70}
              className="h-14 w-auto"
              priority
            />
            <span className="ml-4 text-white text-2xl font-pacifico">His Royal Cakeness</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 