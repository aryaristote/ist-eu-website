import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaSpinner, FaCheck } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';

const ContactModal = ({ isOpen, onClose, selectedPlan }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    billingPeriod: 'monthly',
    message: '',
    plan: selectedPlan?.title || '',
    price: selectedPlan?.price || 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSubmitError('');

    try {
      // Calculate the final price based on billing period
      const finalPrice = formData.billingPeriod === 'yearly' 
        ? (selectedPlan?.price * 12 * 0.8).toFixed(2)
        : selectedPlan?.price;

      // Prepare data for submission
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        planTitle: selectedPlan?.title,
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

      // Only set success if the submission was successful
      setIsSuccess(true);
      
      // Clear form data
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        billingPeriod: 'monthly',
        message: '',
        plan: selectedPlan?.title || '',
        price: selectedPlan?.price || 0,
      });

      // Close modal after success message
      setTimeout(() => {
        onClose();
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
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative mx-auto max-w-md w-full bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center">
              <div className="relative mx-auto w-16 h-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-75"></div>
                <IoCheckmarkCircle className="relative text-green-500 w-16 h-16" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Thank you for your interest!
              </h3>
              <p className="mt-3 text-gray-600">
                We've received your message and will contact you soon about the {selectedPlan?.title} plan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center sm:items-end justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative mx-auto max-w-3xl w-full bg-white rounded-2xl shadow-lg p-4 px-8 max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <IoClose className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">
            Contact Us About:<span className='text-gray-600'> {selectedPlan?.title}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Second Row - Phone and Billing Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Period
                </label>
                <select
                  name="billingPeriod"
                  value={formData.billingPeriod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-[#3981a2] focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly (Save 20%)</option>
                </select>
              </div>
            </div>

            {/* Third Row - Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                maxLength={200}
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`resize-none w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3981a2] outline-none focus:border-transparent ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
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

            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-600 font-medium mb-3">
                {selectedPlan?.title}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Regular Price:</span>
                    <span className="line-through text-gray-500">
                      ${formData.billingPeriod === 'yearly'
                        ? `${(selectedPlan?.price * 12).toFixed(2)}/year`
                        : `${selectedPlan?.price}/month`
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Promo Price:</span>
                    <span className="font-medium text-green-600">
                      ${formData.billingPeriod === 'yearly'
                        ? `${(selectedPlan?.promoPrice * 12 * 0.7).toFixed(2)}/year`
                        : `${selectedPlan?.promoPrice}/month`
                      }
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full w-fit">
                    {formData.billingPeriod === 'yearly' ? '20% off yearly' : 'Special Offer'}
                  </span>
                  <p className="text-sm text-gray-500">
                    {formData.billingPeriod === 'yearly' 
                      ? 'Yearly billing with 30% discount'
                      : 'Monthly billing'
                    }
                  </p>
                </div>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full primary-btn py-4 h-10 rounded-lg flex items-center justify-center"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : null}
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactModal;
