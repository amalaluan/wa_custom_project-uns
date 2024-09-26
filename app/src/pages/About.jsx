import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React from "react";

const About = () => {
  return (
    <div>
      <Navigation />

      <main className="mx-auto px-4 max-w-[1140px]">
        <div className="font-sans">
          <section className="grid grid-cols-2 mt-8 mb-4">
            <div>
              <p className="mb-8 text-8xl">about us</p>

              <p className="mb-1 text-sm font-medium">
                GUIDED BY 7 CORE VALUES
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  stewardship
                </span>
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  competence
                </span>
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  resilience
                </span>
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  integrity
                </span>
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  balance
                </span>
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  excellence
                </span>
                <span className="p-1 text-xs bg-gray-200 rounded-lg">
                  service
                </span>
              </div>
            </div>
            <div>
              <p className="mb-2 font-semibold">ROMBLON STATE UNIVERSITY</p>
              <p className="mb-8 text-sm text-justify">
                The Romblon State University commits to provide higher education
                through quality instruction, research, and community extension
                services that meet or exceed the requirements and expectations
                of the University's stakeholders. It will comply with
                international standards, applicable statutory and regulatory
                requirements and continually improve the Quality Management
                System's effectiveness through periodic monitoring and
                evaluation toward sustained remarkable outcomes.
              </p>

              <p className="mb-2 font-semibold">PROJECT SCHOOLGO</p>
              <p className="mb-8 text-sm text-justify">
                SchoolGo is your essential guide to navigating the campus of
                Romblon State University (RSU). Designed with convenience and
                efficiency in mind, SchoolGo aims to help students, faculty, and
                visitors easily find their way around our beautiful campus.
                Whether you're a new student trying to locate your lecture hall
                or a visitor looking for the nearest parking spot, SchoolGo is
                here to assist you.
              </p>

              <p className="mb-2 font-semibold">MISSION</p>
              <p className="mb-8 text-sm text-justify">
                RSU shall nurture an academic environment that provides advanced
                education, higher technological and professional instruction,
                and technical expertise in agriculture and fishery, forestry,
                engineering and technology, education, arts and sciences, and
                other relevant fields of study and collaborate with other
                institutions and communities through responsive, relevant, and
                research-based extension services.
              </p>

              <p className="mb-2 font-semibold">VISION</p>
              <p className="mb-8 text-sm text-justify">
                A research-based academic institution committed to excellence
                and service nurturing globally competitive workforce towards
                sustainable development.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
