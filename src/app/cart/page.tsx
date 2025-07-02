import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-work-sans flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-left w-full">Your Cart</h1>
          <p className="mb-8 text-gray-600 text-base w-full">Your selected items will appear here.</p>
          <button className="w-full bg-[#c7b8ea] text-black text-base font-semibold py-2 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow">Checkout</button>
        </div>
      </div>
      <Footer />
    </main>
  );
} 