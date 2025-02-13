'use client';

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Image from "next/image";

const FeatureCard = ({ image, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative rounded-xl bg-white shadow-lg will-change-transform isolate w-full"
    >
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover md:group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="relative p-6">

        <h3 className="text-xl font-bold mb-3 mt-2 text-gray-900 md:group-hover:text-[#3981a2] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-1 bg-[#3981a2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
};

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      image: "/images/doc-analyse.avif",
      title: t("features.heading-one"),
      description: t("features.desc-one"),
    },
    {
      image: "/images/predict-analyse.jpg",
      title: t("features.heading-two"),
      description: t("features.desc-two"),
    },
    {
      image: "/images/advance-search.jpg",
      title: t("features.heading-three"),
      description: t("features.desc-three"),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-4">
            {t("features.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;