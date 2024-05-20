"use client";

const { default: Layout } = require("@/components/Layouts/Layout");

function Error() {
  return (
    <>
      <Layout>
        <main className="error">
          <h1>Meals Not Found</h1>
          <p>unfortunately we colud not find the requested page or resource.</p>
        </main>
      </Layout>
    </>
  );
}

export default Error;
