"use client";
import { useState } from "react";

export default function ReportPage() {
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        setMessage("❌ Only images are allowed!");
        return;
      }
      
      // التحقق من حجم الملف (5MB كحد أقصى)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ Image size must be less than 5MB!");
        return;
      }
      
      // تحويل الصورة إلى Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageBase64(event.target.result); // حفظ الصورة كـ Base64
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setMessage("⚠️ Please log in first");
        setIsSubmitting(false);
        return;
      }

      // إرسال البيانات كـ JSON (بما في ذلك الصورة كـ Base64)
      const res = await fetch("http://localhost:5000/reports/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          location: { lat, lng },
          image: imageBase64, // الصورة كنص Base64
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Report submitted successfully!");
        setDescription("");
        setLat("");
        setLng("");
        setImageBase64("");

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage(data.error || data.message || "❌ Failed to submit report");
      }
    } catch (error) {
      console.error(error);
      setMessage("🚨 Server error, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-danger">Submit a New Report</h1>

      <form className="w-75 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Write your report details here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Latitude</label>
            <input
              type="text"
              className="form-control"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Longitude</label>
            <input
              type="text"
              className="form-control"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Report Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="form-text">Only images are allowed (Max size: 5MB)</div>
        </div>

        {imageBase64 && (
          <div className="mb-3">
            <label className="form-label">Image Preview:</label>
            <div>
              <img 
                src={imageBase64} 
                alt="Preview" 
                className="img-thumbnail mt-2"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-danger w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}