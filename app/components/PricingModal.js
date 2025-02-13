'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { FaCheck, FaCreditCard, FaMobileAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";

const PaymentMethod = ({ title, icon: Icon, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
      selected ? 'bg-[#3981a2] text-white' : 'bg-gray-100 hover:bg-gray-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{title}</span>
  </div>
);

const PricingModal = ({ isOpen, onClose, plan, period, onPeriodChange }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen || !plan) return null;

  const yearlyPrice = Math.floor(plan.price * 12 * 0.8);
  const currentPrice = period === 'monthly' ? plan.price : yearlyPrice;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const validateCard = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiry < new Date()) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = async () => {
    if (paymentMethod === 'card' && !validateCard()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      //API Call
      
      alert('Payment successful!');
      onClose();
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{plan.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex p-1 bg-gray-200 rounded-full">
              <Button 
                onClick={() => onPeriodChange('monthly')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  period === 'monthly' 
                    ? 'primary-btn-round rounded-full text-white shadow-sm scale-105' 
                    : 'bg-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </Button>
              <Button 
                onClick={() => onPeriodChange('yearly')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  period === 'yearly' 
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

          {/* Price Display */}
          <div className="text-center mb-8">
            <motion.div
              key={currentPrice}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-baseline justify-center gap-2"
            >
              <span className="text-4xl font-bold">${currentPrice}</span>
              <span className="text-gray-600">/{period === 'monthly' ? 'month' : 'year'}</span>
            </motion.div>
          </div> 

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Features included:</h3>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheck className="text-[#3981a2] flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div> 
          
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Select payment method:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PaymentMethod
                title="Credit Card"
                icon={FaCreditCard}
                selected={paymentMethod === 'card'}
                onClick={() => setPaymentMethod('card')}
              />
              <PaymentMethod
                title="Mobile Money"
                icon={FaMobileAlt}
                selected={paymentMethod === 'mobile'}
                onClick={() => setPaymentMethod('mobile')}
              />
            </div>
          </div>

          {/* Payment Form - Card */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                    errors.cardNumber ? 'border-red-500' : ''
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                      errors.expiryDate ? 'border-red-500' : ''
                    }`}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                      errors.cvv ? 'border-red-500' : ''
                    }`}
                    placeholder="123"
                    maxLength="3"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment Form - Mobile Money */}
          {paymentMethod === 'mobile' && (
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none1 focus:border-transparent"
                  placeholder="+250 78X XXX XXX"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full primary-btn py-6 relative ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2 inline-block" />
                Processing...
              </>
            ) : (
              `Pay $${currentPrice} ${period === 'monthly' ? '/month' : '/year'}`
            )}
          </Button>
          {errors.submit && (
            <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PricingModal;
