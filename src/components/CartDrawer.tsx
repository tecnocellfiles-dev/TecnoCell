import { useCart, formatPrice } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-family-red" />
            <h2 className="font-heading font-bold text-lg">Tu Carrito</h2>
            <span className="bg-family-red text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400 mb-4">
                ¡Agrega productos y empieza a comprar!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-family-red text-white rounded-full font-medium hover:bg-family-red/90 transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  {/* Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/producto/${item.product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="font-medium text-sm line-clamp-2 hover:text-family-red transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-family-red font-bold mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-family-red">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-3 bg-family-red text-white text-center rounded-full font-semibold hover:bg-family-red/90 transition-colors"
              >
                Finalizar Compra
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-3 border border-gray-300 text-gray-700 text-center rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
