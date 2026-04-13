import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { Mail, Phone, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country_code: "+977",
    contact_number: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", formData);

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        country_code: "+977",
        contact_number: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-16 overflow-hidden">

        {/* 🌿 Soft Blobs */}
        <div className="absolute w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]"></div>
        <div className="absolute w-80 h-80 bg-emerald-300 rounded-full blur-3xl opacity-30 bottom-[-60px] right-[-40px]"></div>

        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">
              Let’s Talk 👋
            </h1>

            <p className="text-gray-600 text-lg">
              Got an idea, project, or just want to connect?  
              We’re always excited to hear from you.
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

            {submitted && (
              <p className="text-green-600 text-center mb-4 font-medium">
                ✅ Message sent successfully!
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-3 focus-within:shadow-md">
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
              <div className="flex items-center bg-green-50 rounded-xl px-3 py-3 focus-within:shadow-md">
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

                <div className="flex items-center bg-green-50 rounded-xl px-3 py-3 w-3/4 focus-within:shadow-md">
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
              <div className="flex items-start bg-green-50 rounded-xl px-3 py-3 focus-within:shadow-md">
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

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white 
                bg-gradient-to-r from-green-500 to-emerald-600 
                hover:scale-105 transition-all duration-300 shadow-md"
              >
                {loading ? "Sending..." : "Send Message 🌿"}
              </button>

            </form>
          </div>
        </div>
      </div>

    </>
  );
}