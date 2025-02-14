"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Reveal } from "react-awesome-reveal";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { fadeIn, cn } from "../utils";
import { SlLocationPin } from "react-icons/sl";
import { BsEnvelopeOpen } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import ScrollToTop from "../components/ScrollToTop";
import { FaInfoCircle } from "react-icons/fa";

const ContactForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
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
      monthlyPrice: "1000",
      annualPrice: "4200",
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
      price: "1500",
      promoPrice: "1000",
      monthlyPrice: "1500",
      annualPrice: "8400",
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
      price: "2000",
      promoPrice: "1500",
      monthlyPrice: "2000",
      annualPrice: "12600",
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

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    billingPeriod: 'monthly',
    planTitle: plans[0].title,
    price: plans[0].promoPrice || plans[0].price || "Free",
    userRange: plans[0].userRange || "N/A"
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else {
      const wordCount = formData.message.trim().split(/\s+/).length;
      const charCount = formData.message.trim().length;
      if (wordCount < 4 || charCount < 12) {
        newErrors.message = 'Message must be at least 4 words and 12 characters long';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };

      if (name === 'planTitle') {
        const selectedPlan = plans.find(plan => plan.title === value);
        if (selectedPlan) {
          newData.price = selectedPlan.promoPrice || selectedPlan.price || "Free";
          newData.userRange = selectedPlan.userRange || "N/A";
        }
      }

      return newData;
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlanChange = (e) => {
    const selectedPlan = plans.find(plan => plan.title === e.target.value);
    const price = formData.billingPeriod === 'monthly'
      ? (selectedPlan.promoPrice || selectedPlan.price || "Free")
      : (selectedPlan.annualPrice || "Free");

    setFormData({
      ...formData,
      planTitle: selectedPlan.title,
      price: price,
      userRange: selectedPlan.userRange || "N/A"
    });
  };

  const handleBillingPeriodChange = (e) => {
    const period = e.target.value;
    const selectedPlan = plans.find(plan => plan.title === formData.planTitle);
    const price = period === 'monthly'
      ? (selectedPlan.promoPrice || selectedPlan.price || "Free")
      : (selectedPlan.annualPrice || "Free");

    setFormData({
      ...formData,
      billingPeriod: period,
      price: price
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.planTitle === "Personal Plan") return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSubmitError('');

    try {
      const finalPrice = formData.billingPeriod === 'yearly'
        ? (formData.price * 12 * 0.8).toFixed(2)
        : formData.price;

      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        planTitle: formData.planTitle,
        billingPeriod: formData.billingPeriod,
        price: finalPrice
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSuccess(true);

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        billingPeriod: 'monthly',
        planTitle: plans[0].title,
        price: plans[0].promoPrice || plans[0].price || "Free",
        userRange: plans[0].userRange || "N/A"
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="section mt-12 md:mt-20 xl:0 lg:mt-28">
        <div className="container flex flex-col lg:flex-row items-center justify-between gap-0 xl:gap-24">
          <div className="w-full lg:w-1/2 py-10 lg:py-15 lg:pr-20 xl:pr-0 space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight text-left">
              {t("contact-form.heading")}
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed text-left">
              {t("contact-form.text")}
            </p>
          </div>
          <div className="relative w-full lg:w-1/2 h-full">
            <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
              <div className="bg-[#cdecf6] rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-75"></div>
                    <IoCheckmarkCircle className="relative text-green-500 w-20 h-20" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-gray-900">{t("contact-form.success-heading", "Thank you for contacting us!")}</h3>
                    <p className="text-xl text-gray-600">{t("contact-form.success-message", "We will get back to you as soon as possible.")}</p>
                  </div>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 bg-primary hover:bg-primary/90"
                  >
                    {t("contact-form.send-another", "Send Another Message")}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section mt-12 md:mt-40 xl:0 lg:mt-44">
      <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
        <div className="pb-12 lg:pb-0 bg-[#cdecf6]">
          <div className="container flex flex-col lg:flex-row items-center justify-between gap-0 xl:gap-24">
            <div className="w-full lg:w-1/2 py-10 lg:py-15 lg:pr-20 xl:pr-0 space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight text-left">
                {t("contact-form.heading")}
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed text-left">
                {t("contact-form.text")}
              </p>
            </div>
            <div className="relative w-full lg:w-1/2 h-full">
              <Reveal
                keyframes={fadeIn}
                delay={400}
                duration={600}
                triggerOnce>
                <div
                  className={cn(
                    "lg:absolute right-4 xl:right-0 lg:w-[28rem] lg:-translate-y-1/2 bg-white p-8 sm:p-20 lg:py-[2rem] lg:px-0 rounded-xl shadow-lg",
                    isSuccess ? "lg:pt-20 lg:pb-10" : ""
                  )}
                >
                  <div className="lg:w-[24rem] lg:mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center text-muted-foreground">
                      {t("contact-form.form-heading")}{" IST Legal"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Full Name - Full Width */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="Enter your email"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Package
                          </label>
                          <select
                            name="planTitle"
                            value={formData.planTitle}
                            onChange={handlePlanChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-[#3981a2] focus:border-transparent"
                          >
                            {plans.map((plan) => (
                              <option
                                key={plan.title}
                                value={plan.title}
                                disabled={plan.title === "Personal Plan"}
                                className={plan.title === "Personal Plan" ? "text-gray-400" : ""}
                              >
                                {plan.title} {plan.price ? `($${plan.promoPrice || plan.price}/month)` : "(Coming Soon)"}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <select
                            name="billingPeriod"
                            value={formData.billingPeriod}
                            onChange={handleBillingPeriodChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-[#3981a2] focus:border-transparent"
                          >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly (Save 20%)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          maxLength={100}
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`resize-none w-full h-20 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${errors.message ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="Enter your message (minimum 4 words and 12 characters)"
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                          {`${formData.message.length}/200 characters | ${formData.message.trim().split(/\s+/).filter(word => word.length > 0).length} words`}
                        </p>
                      </div>

                      <div className="bg-gray-200 px-4 py-2 rounded-lg mt-2">
                        <p className="text-[14px] text-gray-600 mb-1">
                          Selected Plan: <span className="font-medium">{formData.planTitle}</span>
                        </p>
                        <div className="text-[14px] text-gray-600 flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>Regular Price:</span>
                            {formData.price ? (
                              <span className="font-medium line-through text-gray-500">
                                {formData.billingPeriod === 'monthly'
                                  ? `$${plans.find(p => p.title === formData.planTitle)?.price || 0}/month`
                                  : `$${Math.floor(Number(plans.find(p => p.title === formData.planTitle)?.price || 0) * 12)}/year`}
                              </span>
                            ) : (
                              <span className="flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded-md">
                                <FaInfoCircle className="text-gray-500" size={14} /> Contact for pricing
                              </span>
                            )}
                          </div>
                          {formData.price && (
                            <div className="flex items-center gap-1">
                              <span>Promo Price:</span>
                              <span className="font-medium text-green-600">
                                {formData.billingPeriod === 'monthly'
                                  ? `$${formData.price}/month`
                                  : `$${formData.price}/year`}
                              </span>
                              <span className="ml-1 text-[8px] md:text-xs text-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                {formData.billingPeriod === 'monthly' ? 'Special Offer' : '20% off yearly'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-[14px] text-gray-600 flex items-center gap-1 mt-1">
                          <span>User Range:</span>
                          <span className="font-medium">{formData.userRange}</span>
                        </div>
                      </div>

                      {submitError && (
                        <div className="flex items-center text-red-600">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>{submitError}</span>
                        </div>
                      )}

                      <div className="text-center flex flex-row justify-end">
                        <Button
                          type="submit"
                          disabled={isSubmitting || formData.planTitle === "Personal Plan"}
                          className={`w-full primary-btn py-4 h-10 rounded-lg flex items-center justify-center ${formData.planTitle === "Personal Plan" ? 'bg-gray-300 cursor-not-allowed text-gray-600' : ''
                            }`}
                        >
                          {formData.planTitle === "Personal Plan" ? (
                            "Coming Soon"
                          ) : isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Reveal>
      <ScrollToTop />
    </section>
  );
};

export default ContactForm;
