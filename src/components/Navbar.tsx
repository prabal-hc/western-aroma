/**
 * Navbar Component — Updated
 * Added: working Search overlay, Wishlist panel, Profile dropdown
 */

import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search,
  Heart,
  LogIn,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────
interface NavbarProps {
  cartCount?: number;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  onCartClick?: () => void;
  onAddToCart?: (item: WishlistItem) => void;
}

interface WishlistItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

// ─── Static data ──────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Home" },
  { name: "Coffee" },
  { name: "Spices" },
  { name: "Our Estate" },
  { name: "Stories" },
];

const SEARCH_SUGGESTIONS = [
  "Chikmagalur Monsooned AA",
  "Wild Cardamom",
  "Filter Kaapi Blend",
  "Estate Pepper",
  "Gift Hampers",
  "Cold Brew Collection",
];

const DEFAULT_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    name: "Chikmagalur Monsooned AA",
    price: "₹650.00",
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyqg6CUmB4WMSH-f9K4dsiJ-LEs0yHWbOAdIcERtNQOv93s1rms7Vtu6ID_4m5mRCeErxkdFEKo56xi4FvCYvAEfs_Cx3iqJ51FCBADFIRHsT3hn0lBoZbWJ-SfZG82YPY0YPcNkwPwVa7phmX3daNvovkSTADU_cB1pbrnsaJNZ8--MHO6-1ze71C-sdXRH7NDCpYsG-LRRViuGboHSKninOG6CCtrGpEz5S54uPgW8iRT8Ih3CbX-oOvm8jjFBXK6pItxZRt_EJi",
  },
  {
    id: "w2",
    name: "Wild Cardamom",
    price: "₹890.00",
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsQ0tkDkENx3MmpX1pvHis_sBtWONDfa78D0WKQrIFGDJSr6Ay8_Xw_x8TPWMhyvsT6sSTHxmjygOWez_OK4hYpEav2MBIhmgbkGDKU9heabdBTRYR7VRXZuDnDBDHtaMw-jVHBXDWDbxlJ6rRokhemMANauC168sZwHxkbydaUyLLzFK4RvfEIHjbFUSTlrKI5Aa2R0ObrwiRLGaEHSLglT0yE7TJTbiGfCwIM8NexNq2CWKscHOnH4P9ZiT6nQrDLLt9Wq8biC",
  },
];

const PROFILE_MENU = [
  { icon: LogIn, label: "Sign In / Register", action: "signin" },
  { icon: Package, label: "My Orders", action: "orders" },
  { icon: Heart, label: "Wishlist", action: "wishlist" },
  { icon: Settings, label: "Account Settings", action: "settings" },
  { icon: HelpCircle, label: "Help & Support", action: "help" },
];

// ═══════════════════════════════════════════════════════════════
// Search Overlay
// ═══════════════════════════════════════════════════════════════
function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 180);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered =
    query.length === 0
      ? SEARCH_SUGGESTIONS
      : SEARCH_SUGGESTIONS.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9990]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(6,6,4,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
          />

          {/* Panel slides down from top */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9991] border-b border-white/5"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            style={{
              background: "rgba(12,12,10,0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="max-w-[800px] mx-auto px-6 py-8">
              {/* Input row */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <Search
                  size={20}
                  className="text-brand-primary flex-shrink-0"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search coffees, spices, gifts…"
                  className="flex-1 bg-transparent text-white text-xl placeholder:text-white/25 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-brand-text-muted hover:text-white transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Suggestions */}
              <div className="pt-5">
                <p className="text-[10px] text-brand-text-muted tracking-[0.2em] mb-3">
                  {query ? "RESULTS" : "POPULAR SEARCHES"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {filtered.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setQuery(s)}
                      className="px-4 py-2 rounded-full text-sm border border-white/[0.08] bg-white/[0.03] text-brand-text-muted hover:border-brand-primary/40 hover:text-brand-primary transition-all"
                    >
                      {s}
                    </motion.button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-brand-text-muted text-sm">
                      No results for "{query}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════
// Wishlist Panel
// ═══════════════════════════════════════════════════════════════
function WishlistPanel({
  isOpen,
  onClose,
  onAddToCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: WishlistItem) => void;
}) {
  const [items, setItems] = useState<WishlistItem[]>(DEFAULT_WISHLIST);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const moveToCart = useCallback(
    (item: WishlistItem) => {
      onAddToCart?.(item);
      remove(item.id);
    },
    [onAddToCart, remove],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9980]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(6,6,4,0.6)",
              backdropFilter: "blur(6px)",
            }}
            onClick={onClose}
          />

          {/* Side panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[9981] w-full max-w-[420px] flex flex-col border-l border-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            style={{
              background: "rgba(10,10,8,0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Heart
                  size={18}
                  className="text-brand-primary"
                  fill="currentColor"
                />
                <span className="text-white font-medium tracking-wide">
                  Wishlist
                </span>
                <span className="text-xs text-brand-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-brand-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart size={48} className="text-brand-primary/30" />
                  </motion.div>
                  <p className="text-brand-text-muted text-sm">
                    Your wishlist is empty
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="text-brand-primary text-sm border-b border-brand-primary/40"
                  >
                    Continue Shopping →
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-brand-primary text-sm mt-1">
                          {item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => moveToCart(item)}
                            className="flex items-center gap-1.5 text-xs bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-3 py-1.5 rounded-full hover:bg-brand-primary/20 transition-colors"
                          >
                            <ShoppingCart size={12} />
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove */}
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => remove(item.id)}
                        className="text-white/20 hover:text-red-400 transition-colors self-start"
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════
// Profile Dropdown
// ═══════════════════════════════════════════════════════════════
function ProfileDropdown({
  isOpen,
  onClose,
  onWishlistClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onWishlistClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen, onClose]);

  const handleAction = (action: string) => {
    if (action === "wishlist") {
      onClose();
      onWishlistClick();
    }
    // Extend with router/modal logic for other actions as needed
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-full mt-3 w-[260px] rounded-2xl border border-white/[0.08] overflow-hidden z-[9970]"
          style={{
            background: "rgba(12,12,10,0.98)",
            backdropFilter: "blur(24px)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Greeting */}
          <div className="px-5 py-4 border-b border-white/5">
            <p className="text-white text-sm font-medium">Welcome back</p>
            <p className="text-brand-text-muted text-xs mt-0.5">
              Manage your account
            </p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            {PROFILE_MENU.map((item, idx) => (
              <motion.button
                key={item.action}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ x: 4 }}
                onClick={() => handleAction(item.action)}
                className="w-full flex items-center gap-3 px-5 py-3 text-brand-text-muted hover:text-white hover:bg-white/[0.03] transition-all text-sm text-left"
              >
                <item.icon
                  size={15}
                  className="text-brand-primary flex-shrink-0"
                />
                {item.label}
                <ChevronRight
                  size={12}
                  className="ml-auto opacity-30 group-hover:opacity-60"
                />
              </motion.button>
            ))}
          </div>

          {/* Sign out */}
          <div className="border-t border-white/5 py-2">
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-3 px-5 py-3 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all text-sm"
            >
              <LogOut size={15} className="flex-shrink-0" />
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Navbar
// ═══════════════════════════════════════════════════════════════
export function Navbar({
  cartCount = 0,
  onNavigate,
  currentPage = "home",
  onCartClick,
  onAddToCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  const wishlistCount = 2; // Replace with real wishlist state if needed

  return (
    <>
      {/* ── HEADER ───────────────────────────────────────── */}
      <header
        className="fixed top-0 w-full z-50 bg-brand-surface/10 backdrop-blur-2xl border-b border-brand-outline/10"
        role="banner"
      >
        <div className="flex justify-between items-center w-full px-6 md:px-20 py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => handleNavigate("home")}
            aria-label="Western Aroma - Go to home"
            className="font-display text-4xl md:text-5xl text-brand-primary tracking-tighter cursor-pointer select-none hover:opacity-80 transition-opacity"
          >
            Western Aroma
          </motion.button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex gap-8 items-center"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="relative"
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.name.toLowerCase());
                  }}
                  className={`flex items-center gap-2 text-label-caps transition-colors duration-300 text-xs tracking-widest ${
                    currentPage === link.name.toLowerCase() ||
                    (link.name === "Home" && currentPage === "home")
                      ? "text-brand-primary border-b border-brand-primary pb-1"
                      : "text-brand-text-muted hover:text-brand-primary"
                  }`}
                  aria-current={
                    currentPage === link.name.toLowerCase() ? "page" : undefined
                  }
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {/* <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-brand-primary hover:bg-brand-primary/10 transition-colors"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </motion.button> */}

            {/* Wishlist */}
            {/* <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-brand-primary hover:bg-brand-primary/10 transition-colors relative"
              aria-label="View wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-black text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </motion.button> */}

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCartClick}
              className="flex items-center justify-center w-9 h-9 rounded-full text-brand-primary hover:bg-brand-primary/10 transition-colors relative"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-black text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Profile — wrapped in relative div for dropdown */}
            {/* <div className="relative hidden md:block">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setProfileOpen((p) => !p)}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                  profileOpen
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "text-brand-primary hover:bg-brand-primary/10"
                }`}
                aria-label="View account"
                aria-expanded={profileOpen}
              >
                <User size={20} />
              </motion.button>

              <ProfileDropdown
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                onWishlistClick={() => setWishlistOpen(true)}
              />
            </div> */}

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-brand-primary"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col bg-[#0c0c0a]/98 backdrop-blur-2xl px-8 pt-24 pb-12"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <button
              className="absolute top-6 right-6 text-brand-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={28} />
            </button>

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
                  aria-current={
                    currentPage === link.name.toLowerCase() ? "page" : undefined
                  }
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                {[
                  // {
                  //   label: "Search",
                  //   action: () => {
                  //     setMobileMenuOpen(false);
                  //     setSearchOpen(true);
                  //   },
                  // },
                  // {
                  //   label: "Wishlist",
                  //   action: () => {
                  //     setMobileMenuOpen(false);
                  //     setWishlistOpen(true);
                  //   },
                  // },
                  // {
                  //   label: "My Account",
                  //   action: () => {
                  //     setMobileMenuOpen(false);
                  //     setProfileOpen(true);
                  //   },
                  // },
                  // { label: "Track Order", action: () => {} },
                  // { label: "Contact Us", action: () => {} },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="block text-left text-brand-text-muted hover:text-brand-primary transition-colors text-label-caps tracking-widest text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OVERLAYS ─────────────────────────────────────────── */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <WishlistPanel
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
