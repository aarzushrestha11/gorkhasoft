import { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Mail, Phone, User, MessageSquare,
  CheckCircle, XCircle, X, Loader2, Earth, ChevronDown,
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+977", label: "🇳🇵 Nepal (+977)" },
  { code: "+1",   label: "🇺🇸 USA / Canada (+1)" },
  { code: "+44",  label: "🇬🇧 UK (+44)" },
  { code: "+91",  label: "🇮🇳 India (+91)" },
  { code: "+61",  label: "🇦🇺 Australia (+61)" },
  { code: "+49",  label: "🇩🇪 Germany (+49)" },
  { code: "+33",  label: "🇫🇷 France (+33)" },
  { code: "+81",  label: "🇯🇵 Japan (+81)" },
  { code: "+86",  label: "🇨🇳 China (+86)" },
  { code: "+971", label: "🇦🇪 UAE (+971)" },
  { code: "+65",  label: "🇸🇬 Singapore (+65)" },
  { code: "+82",  label: "🇰🇷 South Korea (+82)" },
  { code: "+55",  label: "🇧🇷 Brazil (+55)" },
  { code: "+27",  label: "🇿🇦 South Africa (+27)" },
  { code: "+20",  label: "🇪🇬 Egypt (+20)" },
  { code: "+234", label: "🇳🇬 Nigeria (+234)" },
  { code: "+7",   label: "🇷🇺 Russia (+7)" },
  { code: "+34",  label: "🇪🇸 Spain (+34)" },
  { code: "+39",  label: "🇮🇹 Italy (+39)" },
  { code: "+31",  label: "🇳🇱 Netherlands (+31)" },
];

export default function ContactForm() {
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country_code: "+977",
    contact_number: "",
    message: "",
  });

  const [modalState, setModalState]     = useState(null);
  const [loading, setLoading]           = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errors, setErrors]             = useState({});
  const [touched, setTouched]           = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateField(name, formData[name]);
    if (fieldErrors) setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s\-']+$/.test(value.trim())) return "Name can only contain letters, spaces, hyphens, and apostrophes.";
        return null;
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[\w.+\\-]+@[\w\\-]+\.[a-zA-Z]{2,}$/.test(value.trim())) return "Enter a valid email address.";
        return null;
      case "contact_number":
        { if (!value) return null;
        const digits = value.replace(/\D/g, "");
        if (digits.length < 6 || digits.length > 15) return "Phone number must be 6–15 digits.";
        return null; }
      case "message":
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        if (value.trim().length > 2000) return "Message cannot exceed 2000 characters.";
        return null;
      default:
        return null;
    }
  };

  const validate = () => {
    const fields = ["name", "email", "contact_number", "message"];
    const newErrors = {};
    fields.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });
    return newErrors;
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", country_code: "+977", contact_number: "", message: "" });
    setCaptchaToken(null);
    setErrors({});
    setTouched({});
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields touched on submit
    setTouched({ name: true, email: true, contact_number: true, message: true });

    if (!captchaToken) {
      setErrors((prev) => ({ ...prev, captcha: "Please complete the reCAPTCHA." }));
      return;
    }
    if (loading) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setModalState("sending");

    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", {
        ...formData,
        captcha: captchaToken,
      });
      setModalState("success");
      resetForm();
    } catch (error) {
      console.error(error);
      setModalState("error");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModalState(null);

  const inputClass = (field) =>
    `flex items-center bg-green-50 rounded-xl px-3 py-3 transition-all
     ${touched[field] && errors[field] ? "ring-1 ring-red-400" : ""}`;

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-16 overflow-hidden">

        <div className="absolute w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]" />
        <div className="absolute w-80 h-80 bg-emerald-300 rounded-full blur-3xl opacity-30 bottom-[-60px] right-[-40px]" />

        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-800">
              Let's Talk 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Got an idea, project, or just want to connect? We're always excited to hear from you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-green-600" /> support@gorkhasoft.com
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-green-600" /> +977 98XXXXXXXX
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
              Send a message 💬
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Name */}
              <div className="space-y-1">
                <div className={inputClass("name")}>
                  <User className="text-green-500 mr-2 shrink-0" size={18} />
                  <input
                    type="text" name="name" placeholder="Your Name"
                    value={formData.name} onChange={handleChange} onBlur={handleBlur}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs pl-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className={inputClass("email")}>
                  <Mail className="text-green-500 mr-2 shrink-0" size={18} />
                  <input
                    type="email" name="email" placeholder="Your Email"
                    value={formData.email} onChange={handleChange} onBlur={handleBlur}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs pl-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <div className="flex gap-2">

                  {/* Country code dropdown */}
                  <div className="relative flex items-center bg-green-50 rounded-xl px-3 py-3 gap-1 w-2/5">
                    <Earth className="text-green-500 shrink-0" size={16} />
                    <select
                      name="country_code"
                      value={formData.country_code}
                      onChange={handleChange}
                      className="w-full outline-none bg-transparent text-sm appearance-none cursor-pointer pr-5"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="text-green-500 absolute right-2 pointer-events-none shrink-0" size={14} />
                  </div>

                  {/* Number input */}
                  <div className={`flex items-center bg-green-50 rounded-xl px-3 py-3 flex-1
                    ${touched.contact_number && errors.contact_number ? "ring-1 ring-red-400" : ""}`}>
                    <Phone className="text-green-500 mr-2 shrink-0" size={18} />
                    <input
                      type="text" name="contact_number" placeholder="Phone Number"
                      value={formData.contact_number} onChange={handleChange} onBlur={handleBlur}
                      maxLength={15}
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                </div>
                {touched.contact_number && errors.contact_number && (
                  <p className="text-red-500 text-xs pl-1">{errors.contact_number}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <div className={`flex items-start bg-green-50 rounded-xl px-3 py-3
                  ${touched.message && errors.message ? "ring-1 ring-red-400" : ""}`}>
                  <MessageSquare className="text-green-500 mr-2 mt-1 shrink-0" size={18} />
                  <textarea
                    name="message" rows="4" placeholder="Your Message..."
                    value={formData.message} onChange={handleChange} onBlur={handleBlur}
                    className="w-full outline-none bg-transparent resize-none"
                  />
                </div>
                <div className="flex justify-between">
                  {touched.message && errors.message
                    ? <p className="text-red-500 text-xs pl-1">{errors.message}</p>
                    : <span />
                  }
                  <p className={`text-xs ${formData.message.length > 2000 ? "text-red-500" : "text-gray-400"}`}>
                    {formData.message.length}/2000
                  </p>
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="flex flex-col items-center gap-1">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdYB7osAAAAAO3IkLs_iWHtjBaw48NBy4G61mNe"
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setErrors((prev) => ({ ...prev, captcha: "" }));
                  }}
                />
                {errors.captcha && (
                  <p className="text-red-500 text-xs">{errors.captcha}</p>
                )}
              </div>

              <button
                type="submit" disabled={loading || !captchaToken}
                className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50">
                {loading ? "Sending..." : "Send Message 🌿"}
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* SENDING MODAL */}
      {modalState === "sending" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Loader2 className="h-9 w-9 text-green-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sending your message...</h3>
            <p className="text-gray-500 text-sm">Please wait a moment.</p>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {modalState === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent! 🎉</h3>
              <p className="text-gray-600 mb-6">Thank you for reaching out! We'll get back to you soon.</p>
              <button onClick={closeModal} className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600">
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      {modalState === "error" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <XCircle className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
              <p className="text-gray-600 mb-6">Failed to send your message. Please check your connection and try again.</p>
              <button onClick={closeModal} className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600">
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}