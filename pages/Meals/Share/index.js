import Layout from "@/components/Layouts/Layout";
import ImagePicker from "@/components/Meals/ImagePicker";
import { useState } from "react";

function SharePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    summary: "",
    instructions: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
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
                required
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
              required
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              value={formData.instructions}
              onChange={handleChange}
              required
            ></textarea>
          </p>
          <ImagePicker
            label="your image"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
          />
          <p className="smactions mt-3">
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </Layout>
  );
}

export default SharePage;
