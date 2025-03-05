'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import ContactModal from "../components/ContactModal";
import { useTranslation } from "react-i18next";
import Link from 'next/link';
import Reveal from 'react-awesome-reveal';
import { fadeIn } from "../utils"
import PageWrapper from '../components/PageWrapper';

const PriceCard = ({ title, price, promoPrice, monthlyPrice, annualPrice, userRange, features, isPopular, period, onGetStarted }) => {
  const yearlyPrice = price ? Math.floor(price * 12 * 0.7) : null; // 30% discount for yearly
  const priceToShow = period === 'yearly' ? yearlyPrice : price;
  const isPersonalPlan = title === "Personal Plan";

  return (
    <div className={`relative rounded-2xl p-8 ${
      isPopular ? 'bg-blue-50 border-2 border-[#3981a2]' : 'bg-white border border-gray-200'
    }`}>
      {isPopular && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#3981a2] text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3> 
        
        {price === "" ? (
          <div className="text-sm text-gray-600 mb-4">
            Free
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-4">
            €{monthlyPrice}/month
            <br />
            <span className="text-xs">({userRange} users)</span>
          </div>
        )}
        
        {price !== "" && (
          <div className="mb-4"> 
            <div className="mb-2">
              <span className="text-sm text-gray-500">Promo Price: </span>
              <span className="line-through text-gray-400 mr-2">€{price}</span>
              <span className="text-2xl font-bold text-gray-900">€{promoPrice}/month</span>
            </div> 
            <div>
              <span className="text-sm text-gray-500">Annual Price: </span>
              <span className="text-lg font-semibold text-gray-700">€{annualPrice}</span>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-500 mb-6">
          {period === 'yearly' && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Save 20% with yearly billing
            </span>
          )}
        </div>
      </div> 

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FaCheck className="text-[#3981a2] mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onGetStarted}
        disabled={isPersonalPlan}
        className={`w-full py-2 rounded-lg transition-all duration-200 ${
          isPersonalPlan
            ? 'bg-gray-300 cursor-not-allowed text-gray-600'
            : isPopular 
              ? 'bg-[#3981a2] hover:bg-[#2d6681] text-white'
              : 'bg-[#3981a2] hover:bg-[#2d6681] text-white'
        }`}
      >
        {isPersonalPlan ? "Coming Soon" : "Get Started"}
      </Button>
    </div>
);
};

export default function PricingPage() {
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const plans = [
    {
      title: "Personal Plan",
      price: "",
      features: [
        "Basic AI Legal Assistant",
        "100 queries per month", 
        "Email Support",
        "Basic Templates"
      ],
      isPopular: false,
    },
    {
      title: "Basic Plan",
      price: "1,000",
      promoPrice: "500",
      monthlyPrice: "1,000",
      annualPrice: "4,200",  // 500 * 12 * 0.7 (30% discount from promo price)
      userRange: "< 10",
      features: [
        "Access to all basic features",
        "Up to 10 users",
        "Basic analytics",
        "24/7 support",
      ],
      isPopular: false
    },
    {
      title: "Business Plan",
      price: "1,500",
      promoPrice: "1,000",
      monthlyPrice: "1,500",
      annualPrice: "8,400", // 1000 * 12 * 0.7
      userRange: "10 - 20",
      features: [
        "All Basic Plan features",
        "Up to 20 users",
        "Advanced analytics",
        "Priority support",
        "Custom integrations"
      ],
      isPopular: true
    },
    {
      title: "Enterprise Plan",
      price: "2,000",
      promoPrice: "1,500",
      monthlyPrice: "2,000",
      annualPrice: "12,600", // 1,500 * 12 * 0.7
      userRange: "20 - 50",
      features: [
        "All Business Plan features",
        "Up to 50 users",
        "Enterprise analytics",
        "Dedicated support",
        "Custom development",
        "SLA guarantees"
      ],
      isPopular: false
    }
  ];

  const handleGetStarted = (plan) => {
    if (plan.title === "Personal Plan") return;
    setSelectedPlan({ ...plan, period: billingPeriod });
    setIsContactModalOpen(true);
  };

  return (
    <PageWrapper> 
      <section className="pt-16 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Reveal keyframes={fadeIn} fraction={1} delay={200} duration={600} triggerOnce>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-1">{t('pricing.header')}</h2>
              <p className="text-gray-600 mb-4">{t('pricing.subheader')}</p>
              
              <div className="flex justify-center items-center gap-4 mb-16">
                <div className="flex p-1 bg-gray-200 rounded-full">
                  <Button 
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      billingPeriod === 'monthly' 
                        ? 'primary-btn-round rounded-full text-white shadow-sm scale-105' 
                        : 'bg-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </Button>
                  <Button 
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      billingPeriod === 'yearly' 
                        ? 'primary-btn-round rounded-full text-white shadow-sm scale-105' 
                        : 'bg-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly
                    <span className="ml-2 text-[10px] bg-green-100 text-green-800 px-2 rounded-full">
                      Save 20%
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <PriceCard 
                    title={plan.title} 
                    price={plan.price} 
                    promoPrice={plan.promoPrice} 
                    monthlyPrice={plan.monthlyPrice} 
                    annualPrice={plan.annualPrice} 
                    userRange={plan.userRange} 
                    features={plan.features} 
                    isPopular={plan.isPopular} 
                    period={billingPeriod}
                    onGetStarted={() => handleGetStarted(plan)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* FAQ Section */}
        <div className="container mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t("pricingFooter.title")}
          </h2>
          <p className="text-gray-600">
            {t('pricingFooter.description')}{' '}
            <Link 
              href="/#contact" 
              className="text-[#3981a2] hover:underline"
            >
              {t("pricingFooter.contactUs")}
            </Link>
          </p>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </PageWrapper>
  );
}
