/**
 * Stories Page Component
 * Sharing customer stories and brand narratives
 */

import { motion } from "motion/react";
import { Heart, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const STORIES = [
  {
    title: "From Bean to Cup: The Journey of Chikmagalur Monsooned",
    excerpt:
      "Discover how the unique monsoon winds of Karnataka transform ordinary coffee beans into the legendary Chikmagalur Monsooned...",
    category: "Process",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1514432324607-2e467f4af445?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Customer Story: Arjun's Coffee Ritual",
    excerpt:
      "Meet Arjun, who transformed his mornings by switching to our Chikmagalur Monsooned. His journey of discovery and appreciation.",
    category: "Customer",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "The History of Indian Spices in Trade",
    excerpt:
      "Explore the fascinating history of Indian spices and their role in shaping world trade and culture.",
    category: "History",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac4dd87282?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Sustainability Matters: Our Green Initiative",
    excerpt:
      "Learn about our commitment to sustainability and how we're making a difference in coffee and spice farming.",
    category: "Sustainability",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1518611505868-48d0f0a0a0b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "The Art of Roasting: Behind the Scenes",
    excerpt:
      "Step into our roastery and learn the intricate art of coffee roasting from our master roasters.",
    category: "Process",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1559057748-3ff42f0d4e5d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Priya's Kitchen: Creating Magic with Spices",
    excerpt:
      "A celebrated chef shares her favorite recipes and techniques using our premium spice collection.",
    category: "Customer",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  "All Stories",
  "Process",
  "Customer",
  "History",
  "Sustainability",
];

export function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState(0);

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
              Our Stories
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
              Behind every cup and spice blend are stories of passion, heritage,
              and dedication. Explore the narratives that shape who we are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto flex justify-center gap-4 flex-wrap">
          {CATEGORIES.map((category, idx) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              onClick={() => setActiveCategory(idx)}
              className="px-6 py-3 rounded-full font-semibold transition-all border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story, idx) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group rounded-2xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-300 bg-white/[0.03] backdrop-blur hover:bg-white/[0.05] cursor-pointer"
              >
                {/* Featured Image */}
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-brand-primary/10 to-transparent">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0a] via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-brand-primary/20 backdrop-blur text-brand-primary rounded-full text-xs font-semibold">
                    {story.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-brand-text-muted mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-brand-text-muted">
                      {story.readTime}
                    </span>
                    <div className="flex items-center gap-2 text-brand-primary group-hover:gap-3 transition-all">
                      <span className="text-xs font-semibold">Read</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 md:px-20 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-brand-primary/10 to-transparent p-12 text-center"
          >
            <h2 className="font-display text-4xl mb-4">
              Subscribe for Stories
            </h2>
            <p className="text-brand-text-muted mb-8 max-w-lg mx-auto">
              Get curated stories, recipes, and exclusive insights delivered to
              your inbox weekly.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-brand-text-muted focus:outline-none focus:border-brand-primary"
              />
              <button className="px-8 py-3 bg-brand-primary text-brand-on-primary rounded-full font-semibold hover:bg-brand-primary/90 transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center"
          >
            <Heart className="text-brand-primary mx-auto mb-6" size={40} />
            <blockquote className="font-display text-3xl mb-6 italic">
              "Western Aroma isn't just about coffee and spices. It's about
              connecting with a legacy, supporting sustainability, and
              experiencing flavors that genuinely matter."
            </blockquote>
            {/* <p className="text-brand-text-muted mb-2">Prabal Holla</p>
            <p className="text-sm text-brand-text-muted">
              Food Blogger & Coffee Enthusiast
            </p> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
