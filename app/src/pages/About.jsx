import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React from "react";

const About = () => {
  return (
    <div>
      <Navigation />

      <main>
        <div className="container py-6 mx-auto font-sans">
          <h1 className="mb-4 text-4xl font-bold">About RSU Nav</h1>

          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold">Welcome to RSU Nav</h2>
            <p className="text-lg">
              RSU Nav is your essential guide to navigating the campus of
              Riverside State University (RSU). Designed with convenience and
              efficiency in mind, RSU Nav aims to help students, faculty, and
              visitors easily find their way around our beautiful campus.
              Whether you're a new student trying to locate your lecture hall or
              a visitor looking for the nearest parking spot, RSU Nav is here to
              assist you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold">
              Riverside State University (RSU)
            </h2>
            <p className="text-lg">
              Founded in 1965, Riverside State University has grown into a
              prestigious institution known for its academic excellence, diverse
              community, and state-of-the-art facilities. With over 15,000
              students and a wide range of undergraduate and postgraduate
              programs, RSU is committed to providing an enriching educational
              experience that prepares students for success in their chosen
              fields.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold">Our Mission</h2>
            <ul className="pl-5 text-lg list-disc">
              <li className="mb-2">
                Foster a learning environment that promotes intellectual growth
                and critical thinking.
              </li>
              <li className="mb-2">
                Support the personal and professional development of our
                students.
              </li>
              <li className="mb-2">
                Engage with the community through research, service, and
                partnerships.
              </li>
              <li className="mb-2">
                Embrace diversity and inclusivity in all aspects of university
                life.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold">Our Campus</h2>
            <p className="text-lg">
              The RSU campus is a vibrant and dynamic place, offering a wide
              array of facilities and services to support our students'
              educational journey. From modern classrooms and laboratories to
              comfortable dormitories and recreational areas, we ensure that our
              students have everything they need to thrive academically and
              personally.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
