import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    // mail to sent to the recipeshr@gmail (dummy account , not real email )
    const mailtoLink = `mailto:recipeshr@gmail.com?subject=Feedback from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name} (${email})`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center">Have feedback or suggestions? Drop us a message below!</p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
