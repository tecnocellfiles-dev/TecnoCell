import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/catalogo', label: 'Productos' },
    { to: '/reservas', label: 'Reservas' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-family-cream/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="font-heading font-bold text-xl md:text-2xl text-family-text hover:text-family-red transition-colors"
            >
              FamilyCell
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-family-red text-white'
                      : 'text-family-text-secondary hover:text-family-text hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search - Desktop */}
              <Link
                to="/catalogo"
                className="hidden sm:flex p-2.5 text-family-text-secondary hover:text-family-text hover:bg-white/50 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-family-text-secondary hover:text-family-text hover:bg-white/50 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-family-red text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA - Desktop */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 bg-family-red text-white rounded-full text-sm font-semibold hover:bg-family-red/90 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 text-family-text hover:bg-white/50 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-family-cream shadow-2xl transition-transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-heading font-bold text-xl">Menú</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-family-red text-white'
                    : 'hover:bg-white'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/catalogo"
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  location.pathname === '/catalogo'
                    ? 'bg-family-red text-white'
                    : 'hover:bg-white'
                }`}
              >
                Productos
              </Link>
              <Link
                to="/reservas"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                  location.pathname === '/reservas'
                    ? 'bg-family-red text-white'
                    : 'hover:bg-white'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Reservar Turno
              </Link>
            </nav>

            <div className="mt-8 pt-8 border-t">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-family-red text-white rounded-full font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
