import Layout from "@/components/Layouts/Layout";
import { Suspense } from "react";

function LoadingPage() {
  return (
    <>
      <Layout>
        <p className="loading"> Fetching Meals</p>
      </Layout>
    </>
  );
}

export default LoadingPage;
