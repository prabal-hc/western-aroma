/**
 * Cart Component
 * Shopping cart sidebar with items and checkout
 */

import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { parsePrice, formatPrice, calculateCartTotals } from "@/utils/price";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const { subtotal, tax, total } = calculateCartTotals(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0c0c0a] border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-2xl">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-brand-primary hover:text-brand-primary/80 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag
                    size={48}
                    className="text-brand-primary/30 mb-4"
                  />
                  <p className="text-brand-text-muted">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 border border-white/5 rounded-xl p-4 bg-white/[0.02]"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-brand-primary font-bold mt-1">
                            {item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Summary and Checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-white/5 pt-2">
                    <span>Total</span>
                    <span className="text-brand-primary">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-brand-primary text-brand-on-primary rounded-full font-semibold hover:bg-brand-primary/90 transition-all">
                  Checkout
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 border border-white/10 rounded-full font-semibold hover:border-brand-primary/50 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
