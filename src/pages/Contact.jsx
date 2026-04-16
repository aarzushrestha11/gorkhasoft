import { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle,
  X,
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

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    setCaptchaToken(null);

    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    if (loading) return;

    setLoading(true);
    setSubmitted(false);

    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", {
        ...formData,
        captcha: captchaToken,
      });

      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSubmitted(false);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-16 overflow-hidden">

        {/* Background blobs */}
        <div className="absolute w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]" />
        <div className="absolute w-80 h-80 bg-emerald-300 rounded-full blur-3xl opacity-30 bottom-[-60px] right-[-40px]" />

        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-800">
              Let’s Talk 👋
            </h1>

            <p className="text-gray-600 text-lg">
              Got an idea, project, or just want to connect? We’re always excited to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-green-600" />
                support@gorkhasoft.com
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-green-600" />
                +977 98XXXXXXXX
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
              Send a message 💬
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-3">
                <User className="text-green-500 mr-2" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>

              {/* EMAIL */}
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-3">
                <Mail className="text-green-500 mr-2" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
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
              <div className="flex items-start bg-green-50 rounded-xl px-3 py-3">
                <MessageSquare className="text-green-500 mr-2 mt-1" size={18} />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent resize-none"
                />
              </div>

              {/* RECAPTCHA (FINAL FIXED KEY) */}
              <div className="flex justify-center">
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
      </div>

      {/* SUCCESS MODAL */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold mb-2">
                Message Sent! 🎉
              </h3>

              <p className="text-gray-600 mb-6">
                Thank you for reaching out! We'll get back to you soon.
              </p>

              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl font-semibold text-white 
                bg-gradient-to-r from-green-500 to-emerald-600"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}