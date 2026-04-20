import { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country_code: "+977",
    contact_number: "",
    message: "",
  });

  const [modalState, setModalState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [countryOpen, setCountryOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s\-']+$/.test(value.trim()))
          return "Name can only contain letters, spaces, hyphens, and apostrophes.";
        return null;

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[\w.+\-]+@[\w\-]+\.[a-zA-Z]{2,}$/.test(value.trim()))
          return "Enter a valid email address.";
        return null;

      case "contact_number":
        if (!value) return null;
        const digits = value.replace(/\D/g, "");
        if (digits.length < 6 || digits.length > 15)
          return "Phone number must be 6–15 digits.";
        return null;

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
    setFormData({
      name: "",
      email: "",
      country_code: "+977",
      contact_number: "",
      message: "",
    });
    setCaptchaToken(null);
    setErrors({});
    setTouched({});
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      contact_number: true,
      message: true,
    });

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

  const selectedCountry = COUNTRY_CODES.find(
    (c) => c.code === formData.country_code
  );

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-3">
                <User className="text-green-500 mr-2" size={18} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Name"
                  className="w-full outline-none bg-transparent"
                />
              </div>

              {/* EMAIL */}
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-3">
                <Mail className="text-green-500 mr-2" size={18} />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Email"
                  className="w-full outline-none bg-transparent"
                />
              </div>

              {/* PHONE + DROPDOWN */}
              <div className="flex gap-2">

                <div className="relative w-2/5" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCountryOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between bg-green-50 rounded-xl px-3 py-3 text-sm shadow-sm"
                  >
                    <span className="truncate">{selectedCountry?.label}</span>
                    <ChevronDown size={16} className="text-green-500" />
                  </button>

                  {countryOpen && (
                    <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto bg-white rounded-xl shadow-xl">
                      {COUNTRY_CODES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              country_code: c.code,
                            }));
                            setCountryOpen(false);
                          }}
                          className="px-3 py-2 text-sm hover:bg-green-50 cursor-pointer"
                        >
                          {c.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center bg-green-50 rounded-xl px-3 py-3 flex-1">
                  <Phone className="text-green-500 mr-2" size={18} />
                  <input
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Phone Number"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="flex items-start bg-green-50 rounded-xl px-3 py-3">
                <MessageSquare className="text-green-500 mr-2 mt-1" size={18} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  placeholder="Your Message..."
                  className="w-full outline-none bg-transparent resize-none"
                />
              </div>

              <div className="flex justify-start">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdYB7osAAAAAO3IkLs_iWHtjBaw48NBy4G61mNe"
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setErrors((prev) => ({ ...prev, captcha: "" }));
                  }}
                />
              </div>

              {errors.captcha && (
                <p className="text-red-500 text-xs">{errors.captcha}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600"
              >
                Send Message 🌿
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}