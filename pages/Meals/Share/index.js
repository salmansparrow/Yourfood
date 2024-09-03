import Layout from "@/components/Layouts/Layout";
import ImagePicker from "@/components/Meals/ImagePicker";
import Meta from "@/components/common/Meta";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const isValidText = (text) =>
  typeof text === "string" && text.trim().length > 0;
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function SharePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    summary: "",
    instructions: "",
    image: "",
  });

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!isValidText(data.name)) newErrors.name = "Name is required";
    if (!isValidEmail(data.email)) newErrors.email = "Valid email is required";
    if (!isValidText(data.title)) newErrors.title = "Title is required";
    if (!isValidText(data.summary)) newErrors.summary = "Summary is required";
    if (!isValidText(data.instructions))
      newErrors.instructions = "Instructions are required";
    if (!data.image) newErrors.image = "Valid image is required"; // No base64 validation

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setisSubmitting(true);
    try {
      const response = await fetch("/api/sharemeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to share meal data");
      }

      const data = await response.json();

      if (data.success) {
        router.push("/Meals");
      } else {
        console.error("Failed to share meal data");
      }

      console.log("Meal shared successfully!");

      setFormData({
        name: "",
        email: "",
        title: "",
        summary: "",
        instructions: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <>
      <Meta title={"Share Meals"} />

      <Layout>
        <header className="smheader">
          <h1>
            Share your <span className="smhighlight">favorite meal</span>
          </h1>
          <p>Or any other meal you feel needs sharing!</p>
        </header>
        <main className="smmain">
          <form className="smform" onSubmit={handleSubmit}>
            <div className="smrow">
              <p>
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  // required
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </p>
              <p>
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </p>
            </div>
            <p>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                // required
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </p>
            <p>
              <label htmlFor="summary">Short Summary</label>
              <input
                type="text"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                // required
              />
              {errors.summary && (
                <span className="error">{errors.summary}</span>
              )}
            </p>
            <p>
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                rows="10"
                value={formData.instructions}
                onChange={handleChange}
                // required
              ></textarea>
              {errors.instructions && (
                <span className="error">{errors.instructions}</span>
              )}
            </p>
            <ImagePicker
              label="your image"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              filename={formData.title.replace(/\s+/g, "-") + ".jpg"} // Use meal title as filename
            />
            {errors.image && <span className="error">{errors.image}</span>}
            <p className="smactions mt-3">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Share Meal"}
              </button>
            </p>
          </form>
        </main>
      </Layout>
    </>
  );
}

export default SharePage;
