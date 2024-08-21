import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React from "react";

const Profile = () => {
  return (
    <div>
      <Navigation />

      <main className="container py-6 mx-auto">
        <p>hello, this is profile</p>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
