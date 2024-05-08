import Meta from "@/components/common/Meta";
import HeroPage from "@/components/Hero";
import Layout from "@/components/Layouts/Layout";
import Link from "next/link";

function HomePage({ children }) {
  return (
    <>
      <Meta title={"Home"} />

      <Layout>
        {/* <h1 style={{ color: "white", textAlign: "center" }}>
          Time to get started!
        </h1>
        <nav>
          <ul>
            <li>
              <Link href="/Meals">Meals</Link>
            </li>
            <li>
              <Link href="/Meals/Share">WShare Meals</Link>
            </li>
            <li>
              <Link href="/Community">Community</Link>
            </li>
          </ul>
        </nav> */}
        <HeroPage />
      </Layout>
    </>
  );
}

export default HomePage;
