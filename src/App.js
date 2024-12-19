import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function App() {
  const [formData, setFormData] = useState({
    spaName: "",
    city: "",
    area: "",
    price: "",
    timing: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("spa_name", formData.spaName);
    formPayload.append("city", formData.city);
    formPayload.append("area", formData.area);
    formPayload.append("price", formData.price);
    formPayload.append("timing", formData.timing);
    for (let i = 0; i < formData.images.length; i++) {
      formPayload.append("images", formData.images[i]);
    }

    try {
      const response = await fetch(
        "http://20.193.149.47:2242/spas/vendor-spa-update-test/1/",
        {
          method: "PUT", // Change to PUT if the backend expects PUT method
          body: formPayload,
        }
      );
      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert(`Error submitting form: ${responseData?.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form. Check the console for more details.");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Spa Information Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Spa Name:</label>
          <input
            type="text"
            name="spaName"
            value={formData.spaName}
            onChange={handleInputChange}
            placeholder="Enter Spa Name"
            required
          />
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter City"
            required
          />
          <label>Area:</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="Enter Area"
            required
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter Price"
            required
          />
          <label>Timing:</label>
          <input
            type="time"
            name="timing"
            value={formData.timing}
            onChange={handleInputChange}
            required
          />
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            required
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>

      <div className="preview-container">
        <h2>Live Preview</h2>

        {formData.images && formData.images.length > 0 && (
          <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {Array.from(formData.images).map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    className="d-block w-100"
                    alt={`image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}

        <div className="preview-box">
          <h3>{formData.spaName}</h3>
          <p>
            <strong>Location: </strong>{formData.city}, {formData.area}
          </p>
          <p><strong>Price: </strong><span>${formData.price}</span></p>
          <p><strong>Timing: </strong>{formData.timing}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
