import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

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
      await axios.post(
        "http://127.0.0.1:8000/api/contact/",
        formData
      );

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

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>

          {submitted && (
            <p className="text-green-600 text-center mb-4">
              Message sent successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />

            {/* PHONE SECTION */}
            <div className="flex gap-2">
              <input
                type="text"
                name="country_code"
                placeholder="+977"
                value={formData.country_code}
                onChange={handleChange}
                className="w-1/4 px-3 py-2 border rounded-lg"
              />

              <input
                type="text"
                name="contact_number"
                placeholder="Enter phone number"
                value={formData.contact_number}
                onChange={handleChange}
                className="w-3/4 px-4 py-2 border rounded-lg"
              />
            </div>

            {/* MESSAGE */}
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}