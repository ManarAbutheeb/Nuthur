"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

// Import map dynamically without SSR
const ReportMap = dynamic(() => import("../../../components/MapComponent"), {
  ssr: false,
});
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export default function ReportPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [position, setPosition] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState([24.7136, 46.6753]);
  const [isLocating, setIsLocating] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [locationMethod, setLocationMethod] = useState("auto");
  
  useEffect(() => {
    locateUser(true);
  }, []);

  const locateUser = (isInitial = false) => {
    if (navigator.geolocation) {
      setIsLocating(true);
      setMessage(t(" Detecting your location with high accuracy..."));
      setLocationMethod("auto");

      const options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          const accuracy = pos.coords.accuracy;

          setUserLocation(newPos);
          setPosition(newPos);
          setLocationAccuracy(accuracy);

        },
        (err) => {
          navigator.geolocation.clearWatch(watchId);
          console.error("Error getting location: ", err);
          let errorMessage = t(" Could not get your current location");

          if (err.code === err.PERMISSION_DENIED) {
            errorMessage = t(" Location access denied. Please allow location access in your browser settings.");
          } else if (err.code === err.TIMEOUT) {
            errorMessage = t(" Location request timed out. Please try again.");
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMessage = t(" Location information unavailable. Please enable GPS and check your internet connection.");
          }


          setMessage(errorMessage);
          setIsLocating(false);

          if (!position && !isInitial) {
            setPosition([24.7136, 46.6753]);
          }
        },
        options
      );


      setTimeout(() => {
        navigator.geolocation.clearWatch(watchId);
        if (isLocating) {
          setIsLocating(false);
          setMessage(t(" Location detection taking longer than expected. You can manually select your location on the map."));
        }
      }, 25000);
    } else {
      setMessage(t(" Browser does not support geolocation"));
      setIsLocating(false);
    }
  };

  const handleMapPositionChange = (newPosition) => {
    setPosition(newPosition);
    setLocationMethod("manual");
    setLocationAccuracy(5);
    setMessage(t(" Location selected manually on map"));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage(t(" Only images are allowed!"));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage(t(" Image size must be less than 5MB!"));
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };
  const handleSetAlsoudah = () => {
    setPosition([18.2677778, 42.3702778]);
    setMessage(" Default location (Alsoudah) selected");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position) {
      setMessage(t(" Please select a location on the map"));
      return;
    }


    if (locationAccuracy > 100 && locationMethod === "auto") {
      if (!confirm(`Your location accuracy is ${Math.round(locationAccuracy)} meters. This might not be precise. Do you want to continue?`)) {
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        if (confirm(t("Please log in to submit a report. Do you want to go to the login page now?"))) {
          router.push("/log-in");
        } else {
          setMessage(t(" Please log in first"));
        }
        setIsSubmitting(false);
        return;
      }


      const formData = new FormData();
      formData.append("description", description);
      formData.append("location[lat]", position[0].toString());
      formData.append("location[lng]", position[1].toString());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${BACKEND_URL}/api/reports/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(t(" Report submitted successfully!"));
        setDescription("");
        setPosition(null);
        setImageFile(null);
        setImagePreview("");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage(data.error || data.message || t(" Failed to submit report"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage(t(" Server error, please try again later"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-danger">{t("Submit a New Report")}</h1>

      <form className="w-75 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="mb-3">
          <label className="form-label">{t("Description")}</label>
          <textarea
            className="form-control"
            placeholder={t("Write your report details here...")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
          />
        </div>


        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label mb-0">{t("Select Location on Map")}</label>
            <div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSetAlsoudah}
              >
                Use Alsoudah Default Location
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setPosition(null);
                  setMessage(t("Location selection cleared"));
                }}
                disabled={!position}
              >
                {t("Clear Selection")}
              </button>
            </div>
          </div>

          <div className="alert alert-info mb-2">
            <small>{t("For best accuracy, enable GPS and use Wi-Fi. If automatic detection is not precise, click directly on the map to select your exact location.")}</small>
          </div>


          <ReportMap
            userLocation={userLocation}
            position={position}
            setPosition={handleMapPositionChange}
            setMessage={setMessage}
          />

          {position && (
            <div className="form-text mt-2">
              <strong>{t("Selected Location:")}</strong> {position[0].toFixed(6)}, {position[1].toFixed(6)}
              {locationAccuracy && (
                <span className="ms-2 text-muted">
                  ({t(locationMethod === "auto" ? "Auto-detected" : "Manual selection")}, {Math.round(locationAccuracy)}m)
                </span>
              )}
            </div>
          )}
        </div>


        <div className="mb-3">
          <label className="form-label">{t("Report Image")}</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            name="image"
          />
          <div className="form-text">{t("Only images are allowed (Max size: 5MB)")}</div>
        </div>


        {imagePreview && (
          <div className="mb-3">
            <label className="form-label">{t("Image Preview:")}</label>
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          </div>
        )}


        <button
          type="submit"
          className="btn btn-danger w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("Submitting...") : t("Submit Report")}
        </button>



      </form>
    </div>
  );
}
