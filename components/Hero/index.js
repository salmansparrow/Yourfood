"use client";
import Link from "next/link";
import HeroSlide from "./HeroSlide";

function HeroPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          <HeroSlide />
          <div className="col-12 col-lg-6 hero">
            {" "}
            {/* Larger column on large screens */}
            <h1>NEXTLEVEL FOOD FOR NEXTLEVEL FOODIES</h1>
            <p>Taste & share food from all over the world.</p>
            <div className="hero-cat">
              <Link href="/Community">Join The Community</Link>
              <Link href="/Meals">Explore Meals</Link>
            </div>
          </div>

          <div className="container text-center faq-section">
            <div className="row">
              {/* How It Works Section */}
              <div className="col-12 mb-4">
                {" "}
                {/* Full-width column with margin-bottom */}
                <h2>How it works</h2>
                <p>
                  NextLevel Food is a platform for foodies to share their
                  favorite recipes with the world. It's a place to discover new
                  dishes, and to connect with other food lovers.
                </p>
                <p>
                  NextLevel Food is a place to discover new dishes, and to
                  connect with other food lovers.
                </p>
              </div>

              {/* Why NextLevel Food Section */}
              <div className="col-12 mb-4">
                {" "}
                {/* Full-width column with margin-bottom */}
                <h2>Why NextLevel Food?</h2>
                <p>
                  NextLevel Food is a platform for foodies to share their
                  favorite recipes with the world. It's a place to discover new
                  dishes, and to connect with other food lovers.
                </p>
                <p>
                  NextLevel Food is a place to discover new dishes, and to
                  connect with other food lovers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroPage;
