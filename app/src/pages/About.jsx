import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React, { useEffect, useState } from "react";

const About = () => {
  const [value, setValue] = useState(null);
  const [active, setActive] = useState([0]);

  const updateValue = (index) => {
    const template = [
      "Everything that we have today is borrowed. Our influence, our power, our environment, and our lives. Let us make use of them responsibly and conscientiously because we will never pass this world again.",
      "An academic institution run by competent people will never go astray. Competence is knowing our job and doing it beyond what is expected of us.",
      "We must be strong in trying times, never surrender nor believe in defeat. Let failure be our defining moments.",
      "To be persuasive, we must be believable. To be believable, we must be credible; and to be credible, we must be truthful. This is integrity",
      "Life is best lived in harmony. Balance then is crucial to a good life. RSU embraces the concept of understanding life and how to keep it best in balance. When there is balance, there is order. This is our holistic approach to the total development of man.",
      "There is still no substitute for excellence. It is hard to achieve, but it can start as a habit.",
      "Community service and development is what makes a University, otherwise, we become an academic institution for nothing",
    ];

    setValue(template[index]);
    setActive(index);
  };

  useEffect(() => {
    if (!value) {
      setValue(
        "Everything that we have today is borrowed. Our influence, our power, our environment, and our lives. Let us make use of them responsibly and conscientiously because we will never pass this world again."
      );
    }
  }, []);

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
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 0 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(0)}
                >
                  stewardship
                </span>
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 1 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(1)}
                >
                  competence
                </span>
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 2 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(2)}
                >
                  resilience
                </span>
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 3 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(3)}
                >
                  integrity
                </span>
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 4 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(4)}
                >
                  balance
                </span>
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 5 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(5)}
                >
                  excellence
                </span>
                <span
                  className={`p-1 text-xs  rounded-lg cursor-pointer ${
                    active == 6 ? "bg-[#00413d] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => updateValue(6)}
                >
                  service
                </span>
              </div>
              <div className="p-4 mt-4 mr-8 border border-black rounded">
                <p className="text-xl text-justify">{value}</p>
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

              <p className="mb-2 font-semibold">VISION</p>
              <p className="mb-8 text-sm text-justify">
                A research-based academic institution committed to excellence
                and service nurturing globally competitive workforce towards
                sustainable development.
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
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
