/**
 * Navbar Component
 * Premium navigation bar with dropdown support and mobile menu
 */

import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  X,
  Search,
  Heart,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  {
    name: "Shop",
    active: true,
    hasDropdown: true,
    dropdown: [
      "All Products",
      "Coffee",
      "Spices",
      "Gift Boxes",
      "Best Sellers",
    ],
  },
  { name: "Coffee", active: false },
  { name: "Spices", active: false },
  { name: "Our Estate", active: false },
  { name: "Stories", active: false },
];

interface NavbarProps {
  cartCount?: number;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  onCartClick?: () => void;
}

export function Navbar({
  cartCount = 0,
  onNavigate,
  currentPage = "home",
  onCartClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── HEADER ─────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-brand-surface/10 backdrop-blur-2xl border-b border-brand-outline/10">
        <div className="flex justify-between items-center w-full px-6 md:px-20 py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => handleNavigate("home")}
            className="font-display text-4xl md:text-5xl text-brand-primary tracking-tighter cursor-pointer select-none hover:opacity-80 transition-opacity"
          >
            Malabar & Co.
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="relative"
                onMouseEnter={() =>
                  link.hasDropdown && setShopDropdownOpen(true)
                }
                onMouseLeave={() =>
                  link.hasDropdown && setShopDropdownOpen(false)
                }
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.name.toLowerCase());
                  }}
                  className={`flex items-center gap-2 text-label-caps transition-colors duration-300 text-xs tracking-widest ${
                    currentPage === link.name.toLowerCase() ||
                    (link.active && currentPage === "home")
                      ? "text-brand-primary border-b border-brand-primary pb-1"
                      : "text-brand-text-muted hover:text-brand-primary"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </a>

                {/* Dropdown Menu */}
                {link.hasDropdown && shopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-4 w-64 rounded-2xl border border-white/10 bg-[#11110d]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
                  >
                    {link.dropdown?.map((item) => (
                      <a
                        key={item}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(item.toLowerCase());
                        }}
                        className="block px-6 py-4 text-sm text-brand-text-muted hover:text-brand-primary hover:bg-white/5 transition-all"
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:block text-brand-primary"
            >
              <Search size={22} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:block text-brand-primary"
            >
              <Heart size={22} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:block text-brand-primary"
            >
              <User size={22} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCartClick}
              className="hidden md:block relative text-brand-primary"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-brand-primary"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col bg-[#0c0c0a]/98 backdrop-blur-2xl px-8 pt-24 pb-12"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-brand-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Mobile Menu Links */}
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href="#"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.name.toLowerCase());
                  }}
                  className="font-display text-4xl text-white py-4 border-b border-white/5 hover:text-brand-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Menu Secondary Items */}
              <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                {[
                  "Search",
                  "Wishlist",
                  "My Account",
                  "Track Order",
                  "Contact Us",
                ].map((item) => (
                  <button
                    key={item}
                    className="block text-left text-brand-text-muted hover:text-brand-primary transition-colors text-label-caps tracking-widest text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
