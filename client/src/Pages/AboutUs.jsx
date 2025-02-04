import React from "react";
import AdminLayout from "../Layouts/AdminLayout";

const AboutUs = () => {
  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Who Are We</h1>
        <p className="mb-4">
          We are a handicrafts manufacturing company based in Jaipur, Rajasthan.
          Our brand,
          <strong> Saumic Craft</strong>, is a best-seller brand on Amazon with
          a turnover of
          <strong> ₹10 crore</strong>. We have over{" "}
          <strong>85,000+ SKUs</strong>. We are bulk exporters of our handicraft
          products and also provide products to our enrolled sellers with
          <strong> no MOQ (Minimum Order Quantity)</strong> policies. Saumic
          Craft is a trademark-registered company under the Government of India
          Trademark Act, 1999.
        </p>{" "}
        <p className="mb-4">
          <strong>CROWN MART / Saumic Craft</strong>
          <br />
          Plot No.-18, Shankar Vihar-E, Sanganer, Sawai Getor, Jagatpura,
          Jaipur, Jaipur, Rajasthan, 302017
        </p>
      </div>
    </AdminLayout>
  );
};

export default AboutUs;
