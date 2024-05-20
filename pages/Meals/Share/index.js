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
    e.preventDefault(); // Prevent default form submission

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
      // Optionally handle successful response here (e.g., clear form)
    } catch (error) {
      console.error(error); // Log errors for debugging
    }
  };

  return (
    <>
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
                <input type="text" id="name" name="name" required />
              </p>
              <p>
                <label htmlFor="email">Your email</label>
                <input type="email" id="email" name="email" required />
              </p>
            </div>
            <p>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </p>
            <p>
              <label htmlFor="summary">Short Summary</label>
              <input type="text" id="summary" name="summary" required />
            </p>
            <p>
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                rows="10"
                required
              ></textarea>
            </p>
            {/* IMAGE PICKER */}

            <ImagePicker label="your image" name="image" id="image" />

            {/* IMAGE PICKER */}

            <p className="smactions mt-3">
              <button type="submit">Share Meal</button>
            </p>
          </form>
        </main>
      </Layout>
    </>
  );
}

export default SharePage;
