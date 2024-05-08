import Layout from "@/components/Layouts/Layout";
import Image from "next/image";
import mealIcon from "@/public/icons/meal.png";
import communityIcon from "@/public/icons/community.png";
import eventIcon from "@/public/icons/events.png";

function CommunityPage() {
  return (
    <>
      <Layout>
        <div className="container text-center mt-lg-5 community-header">
          {" "}
          {/* Container ko text-center ke sath rakhte hain */}
          <div className="row justify-content-center">
            {" "}
            {/* Center-align row */}
            <div className="col-12">
              {" "}
              {/* Full-width column */}
              <h1>
                One shared passion: <span className="highlight">Food</span>
              </h1>{" "}
              <p>Join our community and share your favorite recipes!</p>{" "}
            </div>
          </div>
          <div className="row justify-content-center">
            {" "}
            {/* Center-align row */}
            <div className="col-12 main">
              <h2>Community Perks</h2> {/* Full-width column */}
              <ul className="perks list-unstyled text-decoration-none">
                <li>
                  <Image src={mealIcon} alt="A delicious meal" />
                  <p>Share & discover recipes</p>
                </li>
                <li>
                  <Image src={communityIcon} alt="A crowd of people, cooking" />
                  <p>Find new friends & like-minded people</p>
                </li>
                <li>
                  <Image
                    src={eventIcon}
                    alt="A crowd of people at a cooking event"
                  />
                  <p>Participate in exclusive events</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CommunityPage;
