import { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, dob, phone } = formData;

    if (email && !email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (phone && (phone.length !== 10 || isNaN(phone))) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (dob) {
      const today = new Date();
      const enteredDate = new Date(dob);
      if (enteredDate > today) {
        alert("Invalid date of birth");
        return;
      }
    }

    if (!username || !email || !dob || !phone) {
      alert("Please fill out all the fields.");
      return;
    }

    setShowModal(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
  };

  return (
    <div className="container">
      <h1>User Details Modal</h1>

      {!showModal && (
        <button className="open-btn" onClick={openModal}>Open Form</button>
      )}

      {showModal && (
        <div className="modal" onClick={handleBackgroundClick}>
          <div className="modal-content">

            <h2 className="form-title">Fill Details</h2>

            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" type="text"
                value={formData.username} onChange={handleChange} />

              <label>Email Address:</label>
              <input id="email" type="text"
                value={formData.email} onChange={handleChange} />

              <label>Phone Number:</label>
              <input id="phone" type="text"
                value={formData.phone} onChange={handleChange} />

              <label>Date of Birth:</label>
              <input id="dob" type="date"
                value={formData.dob} onChange={handleChange} />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
