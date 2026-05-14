/**
 * Our Estate Page Component
 * Telling the story of the estate and farming practices
 */

import { motion } from "motion/react";
import { Leaf, Droplets, Wind, Mountain } from "lucide-react";

export function OurEstatePage() {
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
              Our Estate Heritage
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
              Nestled in the misty highlands of Kerala, our estate spans
              generations of coffee and spice cultivation, maintaining the
              highest standards of quality and sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-3xl overflow-hidden border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2000&auto=format&fit=crop"
              alt="Estate Overview"
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Estate Details */}
      <section className="py-20 px-6 md:px-20 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl mb-8">The Story Begins</h2>
              <div className="space-y-6 text-brand-text-muted">
                <p>
                  For over five generations, our family has cultivated the
                  finest coffee and spices on these hallowed grounds. What began
                  as a small plot of land has blossomed into a thriving estate
                  that honors both tradition and innovation.
                </p>
                <p>
                  Our commitment to excellence has never wavered. Every plant is
                  nurtured with care, every harvest is done by hand at the peak
                  of ripeness, and every batch is processed with meticulous
                  attention to detail.
                </p>
                <p>
                  The unique geography of our estate—with its elevation,
                  rainfall, and mineral-rich soil—creates the perfect terroir
                  for growing exceptional coffee and spices that rival the
                  world's best.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: "Elevation", value: "1800m+" },
                { label: "Rainfall", value: "250cm/year" },
                { label: "Area", value: "500+ acres" },
                { label: "Experience", value: "150+ years" },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <p className="text-brand-primary font-display text-3xl mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-brand-text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farming Practices */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-display text-4xl mb-16 text-center">
            Sustainable Farming Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Organic Methods",
                description:
                  "We practice 100% organic farming without synthetic fertilizers or pesticides.",
              },
              {
                icon: Droplets,
                title: "Water Conservation",
                description:
                  "Smart irrigation systems and rainwater harvesting preserve every drop.",
              },
              {
                icon: Wind,
                title: "Carbon Neutral",
                description:
                  "Our operations are carbon neutral through renewable energy and reforestation.",
              },
              {
                icon: Mountain,
                title: "Biodiversity",
                description:
                  "We maintain forest corridors and support local wildlife habitats.",
              },
            ].map((practice, idx) => {
              const IconComponent = practice.icon;
              return (
                <motion.div
                  key={practice.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
                >
                  <IconComponent
                    className="text-brand-primary mx-auto mb-4"
                    size={40}
                  />
                  <h3 className="font-display text-xl mb-3">
                    {practice.title}
                  </h3>
                  <p className="text-sm text-brand-text-muted">
                    {practice.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-20 bg-white/[0.02]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-4xl mb-8">Meet Our Team</h2>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto mb-16">
              Our dedicated team of agronomists, processors, and quality experts
              work tirelessly to bring you the finest products.
            </p>
            <button className="px-8 py-4 bg-brand-primary text-brand-on-primary rounded-full font-semibold hover:bg-brand-primary/90 transition-all">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
