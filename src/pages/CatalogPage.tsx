import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, Star, ShoppingBag } from 'lucide-react';
import { products, categories, formatPrice, type Product } from '@/data/inventory';
import { useCart } from '@/context/CartContext';

const sortOptions = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-low', label: 'Precio: Menor a Mayor' },
  { value: 'price-high', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Valorados' },
  { value: 'newest', label: 'Más Nuevos' },
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get category from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoria');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (selectedSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSort, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 2000000]);
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || priceRange[1] < 2000000;

  return (
    <div className="min-h-screen bg-family-cream pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl mb-2">Catálogo</h1>
          <p className="text-gray-600">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-gray-200 focus:border-family-red focus:ring-2 focus:ring-family-red/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none w-full sm:w-48 px-4 py-3 bg-white rounded-full border border-gray-200 focus:border-family-red focus:ring-2 focus:ring-family-red/20 outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-full border border-gray-200"
          >
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-family-red/10 text-family-red text-sm rounded-full">
                {categories.find((c) => c.id === selectedCategory)?.name}
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchParams({});
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-family-red/10 text-family-red text-sm rounded-full">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-family-red hover:underline"
            >
              Limpiar todos
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden sm:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 card-shadow sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold">Filtros</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-family-red hover:underline"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categorías</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="w-4 h-4 text-family-red focus:ring-family-red"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory('')}
                      className="w-4 h-4 text-family-red focus:ring-family-red"
                    />
                    <span className="text-sm">Todas</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Precio Máximo</h4>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, parseInt(e.target.value)])
                  }
                  className="w-full accent-family-red"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">No se encontraron productos</p>
                <p className="text-sm text-gray-400">
                  Intenta con otros filtros o términos de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Filtros</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categorías</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category-mobile"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="w-4 h-4 text-family-red"
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category-mobile"
                    checked={!selectedCategory}
                    onChange={() => setSelectedCategory('')}
                    className="w-4 h-4 text-family-red"
                  />
                  <span className="text-sm">Todas</span>
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Precio Máximo</h4>
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, parseInt(e.target.value)])
                }
                className="w-full accent-family-red"
              />
              <div className="text-center text-sm text-gray-600 mt-2">
                Hasta {formatPrice(priceRange[1])}
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-3 bg-family-red text-white rounded-full font-semibold"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: () => void;
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-card-hover transition-all">
      <Link to={`/producto/${product.id}`} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Nuevo
          </span>
        )}
        {product.isBestseller && (
          <span className="absolute top-2 right-2 bg-family-red text-white text-xs px-2 py-1 rounded-full">
            Más vendido
          </span>
        )}
        {product.stock < 10 && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            ¡Últimas {product.stock}!
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/producto/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-family-red transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-family-red">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          disabled={product.stock === 0}
          className="w-full py-2 bg-family-red text-white rounded-full text-sm font-medium hover:bg-family-red/90 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" />
          {product.stock === 0 ? 'Sin stock' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}
