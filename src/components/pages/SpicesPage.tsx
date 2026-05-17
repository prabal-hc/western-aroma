/**
 * Spices Page Component
 * Showcasing premium spice offerings
 */

import { motion } from "motion/react";
import { Star, Zap, Sparkles } from "lucide-react";
import { CartItem } from "@/components/Cart";

const SPICES_PRODUCTS = [
  {
    id: "spice-1",
    name: "Estate Tellicherry Pepper",
    description:
      "King of Spices · Handpicked premium whole black peppercorns with bold, fragrant notes.",
    price: "₹420.00",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
  },
  {
    id: "spice-2",
    name: "Wild Cardamom",
    description:
      "Premium green cardamom with intense aromatic and cooling properties.",
    price: "₹890.00",
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsQ0tkDkENx3MmpX1pvHis_sBtWONDfa78D0WKQrIFGDJSr6Ay8_Xw_x8TPWMhyvsT6sSTHxmjygOWez_OK4hYpEav2MBIhmgbkGDKU9heabdBTRYR7VRXZuDnDBDHtaMw-jVHBXDWDbxlJ6rRokhemMANauC168sZwHxkbydaUyLLzFK4RvfEIHjbFUSTlrKI5Aa2R0ObrwiRLGaEHSLglT0yE7TJTbiGfCwIM8NexNq2CWKscHOnH4P9ZiT6nQrDLLt9Wq8biC",
  },
  {
    id: "spice-3",
    name: "Organic Turmeric",
    description:
      "Fresh turmeric root powder with vibrant color and warm, earthy flavor.",
    price: "₹280.00",
    rating: 4.7,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsQ0tkDkENx3MmpX1pvHis_sBtWONDfa78D0WKQrIFGDJSr6Ay8_Xw_x8TPWMhyvsT6sSTHxmjygOWez_OK4hYpEav2MBIhmgbkGDKU9heabdBTRYR7VRXZuDnDBDHtaMw-jVHBXDWDbxlJ6rRokhemMANauC168sZwHxkbydaUyLLzFK4RvfEIHjbFUSTlrKI5Aa2R0ObrwiRLGaEHSLglT0yE7TJTbiGfCwIM8NexNq2CWKscHOnH4P9ZiT6nQrDLLt9Wq8biC",
  },
  {
    id: "spice-4",
    name: "Cinnamon Bark",
    description:
      "Premium Ceylon cinnamon with sweet, warm aromatics perfect for any dish.",
    price: "₹320.00",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5e_JlZGaIjJ4moHKGPS-hC7KDOz0OYL4qYxasLBMw0hLgZz2EWGqDhHFPUVIZSI_Ou3KfiDIXSqZflUFaXiZDCpjxgVmRoQJcvLnrGtkHs3Sj1--wMkS8ZIla4t94el8rbWef2CB3XCISeC_AbAyy1whMd9BJQvt3bwx6szDHtwlgXyOQqTVP75HBZbGY-WyMfsSFlekJxJHPad9rs5Bztl1HK_q7beUIcivYO95hoDtJO7ULwTLVOxzVzYr3BwphpBjR6Y53Vmin",
  },
  {
    id: "spice-5",
    name: "Fenugreek Seeds",
    description:
      "Aromatic methi seeds with slightly bitter and maple-like notes.",
    price: "₹150.00",
    rating: 4.6,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
  },
  {
    id: "spice-6",
    name: "Star Anise",
    description:
      "Premium star anise with strong licorice notes, essential for Asian cooking.",
    price: "₹220.00",
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcNTj1FYqQQlrt-Ffu0UqyjC2WwN5LPFbipORAbbQGIRdgKiVtdWbn1WIIDwxh8CvKp3FmxwXx9nYq8P4s2BQ80e8uVHTKoUr9v7TOPdIhUphl4gR9-w5eMo1X68Jo5NIS4aiZYZEqB3fWBalGbC26v815WgELJW97b9mpcdvm8DW3HFV_G6eN2xfK31G8oBNjLj_lop914OX_wCPsRP_vpTAHmmEXrbNahmaIPYGm4cPeJPjk5ROt692BWOCvB_ub_f3KZuThODzz",
  },
];

export interface SpicesPageProps {
  onAddToCart?: (item: CartItem) => void;
  cartItems?: CartItem[];
}

export function SpicesPage({ onAddToCart, cartItems = [] }: SpicesPageProps) {
  // Helper function to get quantity of a product in cart
  const getCartQuantity = (productId: string) => {
    return cartItems.find((item) => item.id === productId)?.quantity || 0;
  };
  return (
    <div className="min-h-screen bg-[#0c0c0a] text-white overflow-x-hidden pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl md:text-7xl mb-6 text-brand-primary">
              King of Spices
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
              Discover the finest whole spices sourced from the heartland of
              Indian spice cultivation. Each spice carries centuries of flavor
              heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Spices Grid */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPICES_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group rounded-2xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-300 bg-white/[0.03] backdrop-blur"
              >
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-brand-primary/10 to-transparent">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0a]/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl mb-2 group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-brand-text-muted mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-brand-primary">
                      {product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="fill-brand-primary text-brand-primary"
                      />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onAddToCart?.({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    }
                    className="w-full px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full font-semibold hover:bg-brand-primary/30 transition-all relative"
                  >
                    Add to Cart
                    {getCartQuantity(product.id) > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-brand-primary text-brand-on-primary rounded-full">
                        {getCartQuantity(product.id)}
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 px-6 md:px-20 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-display text-4xl mb-16 text-center">
            Our Quality Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "100% Pure & Natural",
                description:
                  "No additives, preservatives, or artificial colors. Pure spice goodness.",
              },
              {
                icon: Sparkles,
                title: "Handpicked Selection",
                description:
                  "Each batch is carefully selected for superior quality and potency.",
              },
              {
                icon: Star,
                title: "Certified Organic",
                description:
                  "Sourced from certified organic farms following sustainable practices.",
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <IconComponent
                    className="text-brand-primary mb-4"
                    size={32}
                  />
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="text-brand-text-muted">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
