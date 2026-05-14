/**
 * Coffee Page Component
 * Showcasing premium coffee offerings
 */

import { motion } from "motion/react";
import { Star, ArrowRight, Leaf } from "lucide-react";
import { CartItem } from "@/components/Cart";

const COFFEE_PRODUCTS = [
  {
    id: "coffee-1",
    name: "Chikmagalur Monsooned AA",
    description:
      "Earthy, mellow and exceptionally smooth coffee processed by the monsoon winds of the Arabian Sea.",
    price: "₹650.00",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyqg6CUmB4WMSH-f9K4dsiJ-LEs0yHWbOAdIcERtNQOv93s1rms7Vtu6ID_4m5mRCeErxkdFEKo56xi4FvCYvAEfs_Cx3iqJ51FCBADFIRHsT3hn0lBoZbWJ-SfZG82YPY0YPcNkwPwVa7phmX3daNvovkSTADU_cB1pbrnsaJNZ8--MHO6-1ze71C-sdXRH7NDCpYsG-LRRViuGboHSKninOG6CCtrGpEz5S54uPgW8iRT8Ih3CbX-oOvm8jjFBXK6pItxZRt_EJi",
  },
  {
    id: "coffee-2",
    name: "Filter Kaapi Blend",
    description:
      "Rich, smooth, and the aroma fills the whole room. Perfect for south Indian filter coffee.",
    price: "₹350.00",
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcNTj1FYqQQlrt-Ffu0UqyjC2WwN5LPFbipORAbbQGIRdgKiVtdWbn1WIIDwxh8CvKp3FmxwXx9nYq8P4s2BQ80e8uVHTKoUr9v7TOPdIhUphl4gR9-w5eMo1X68Jo5NIS4aiZYZEqB3fWBalGbC26v815WgELJW97b9mpcdvm8DW3HFV_G6eN2xfK31G8oBNjLj_lop914OX_wCPsRP_vpTAHmmEXrbNahmaIPYGm4cPeJPjk5ROt692BWOCvB_ub_f3KZuThODzz",
  },
  {
    id: "coffee-3",
    name: "Arabica Single Origin",
    description:
      "Premium single-origin arabica beans with distinct floral and fruity notes.",
    price: "₹750.00",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5e_JlZGaIjJ4moHKGPS-hC7KDOz0OYL4qYxasLBMw0hLgZz2EWGqDhHFPUVIZSI_Ou3KfiDIXSqZflUFaXiZDCpjxgVmRoQJcvLnrGtkHs3Sj1--wMkS8ZIla4t94el8rbWef2CB3XCISeC_AbAyy1whMd9BJQvt3bwx6szDHtwlgXyOQqTVP75HBZbGY-WyMfsSFlekJxJHPad9rs5Bztl1HK_q7beUIcivYO95hoDtJO7ULwTLVOxzVzYr3BwphpBjR6Y53Vmin",
  },
  {
    id: "coffee-4",
    name: "Espresso Blend",
    description:
      "Bold, intense, and perfectly balanced for espresso shots and milk-based drinks.",
    price: "₹600.00",
    rating: 4.7,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
  },
];

export interface CoffeePageProps {
  onAddToCart?: (item: CartItem) => void;
}

export function CoffeePage({ onAddToCart }: CoffeePageProps) {
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
              Premium Coffee Selection
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
              Crafted from the finest estates across Kerala, our coffee
              collection brings the rich heritage of Indian coffee to your cup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Coffee Grid */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COFFEE_PRODUCTS.map((product, idx) => (
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
                    className="w-full px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full font-semibold hover:bg-brand-primary/30 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 md:px-20 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-display text-4xl mb-16 text-center">
            Why Choose Our Coffee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Direct from Estates",
                description:
                  "Sourced directly from premium coffee estates in Wayanad and surrounding regions",
              },
              {
                title: "Freshly Roasted",
                description:
                  "Small-batch roasting ensures maximum freshness and optimal flavor profile",
              },
              {
                title: "Sustainable Farming",
                description:
                  "Supporting ethical and sustainable farming practices for a better future",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <Leaf className="text-brand-primary mb-4" size={32} />
                <h3 className="font-display text-2xl mb-3">{benefit.title}</h3>
                <p className="text-brand-text-muted">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
