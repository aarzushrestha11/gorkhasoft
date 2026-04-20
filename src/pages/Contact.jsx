/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import {
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";

export default function ContactForm() {
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country_code: "+977",
    contact_number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 🔍 VALIDATION
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return newErrors;
  };

  // ✏️ CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // 👆 BLUR
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      country_code: "+977",
      contact_number: "",
      message: "",
    });

    setErrors({});
    setTouched({});
    setCaptchaToken(null);

    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }

    const validationErrors = validateAll();

    const hasErrors = Object.values(validationErrors).some((err) => err);

    if (hasErrors) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      await toast.promise(
        axios.post("http://127.0.0.1:8000/api/contact/", {
          ...formData,
          captcha: captchaToken,
        }),
        {
          loading: "Sending message...",
          success: "Message sent successfully 🎉",
          error: (err) => {
            if (err.response?.data?.errors) {
              return Object.values(err.response.data.errors)[0];
            }
            return err.response?.data?.message || "Something went wrong";
          },
        }
      );

      resetForm();

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-16"
      >
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl font-bold text-green-800">
              Let’s Talk 👋
            </h1>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>
                <div className={`flex items-center bg-green-50 rounded-xl px-3 py-3 ${
                  touched.name && errors.name ? "border border-red-500" : ""
                }`}>
                  <User className="text-green-500 mr-2" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <div className={`flex items-center bg-green-50 rounded-xl px-3 py-3 ${
                  touched.email && errors.email ? "border border-red-500" : ""
                }`}>
                  <Mail className="text-green-500 mr-2" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* PHONE */}
              <div className="flex gap-2">
                <input
                  type="text"
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleChange}
                  className="w-1/4 bg-green-50 rounded-xl px-3 py-3 outline-none"
                />
                <div className="flex items-center bg-green-50 rounded-xl px-3 py-3 w-3/4">
                  <Phone className="text-green-500 mr-2" size={18} />
                  <input
                    type="text"
                    name="contact_number"
                    placeholder="Phone Number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <div className={`flex items-start bg-green-50 rounded-xl px-3 py-3 ${
                  touched.message && errors.message ? "border border-red-500" : ""
                }`}>
                  <MessageSquare className="text-green-500 mr-2 mt-1" size={18} />
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full outline-none bg-transparent resize-none"
                  />
                </div>
                {touched.message && errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* CAPTCHA */}
              <div className="flex justify-start">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdYB7osAAAAAO3IkLs_iWHtjBaw48NBy4G61mNe"
                  onChange={handleCaptchaChange}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading || !captchaToken}
                className="w-full py-3 rounded-xl font-semibold text-white 
                bg-gradient-to-r from-green-500 to-emerald-600 
                hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message 🌿"}
              </button>

            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}