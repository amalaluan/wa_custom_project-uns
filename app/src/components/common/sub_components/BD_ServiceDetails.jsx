import React from "react";

const BD_ServiceDetails = ({ services, selectedData, index }) => (
  <>
    <ul>
      {services.map(
        (service, si) =>
          service && (
            <li className="text-xs" key={si}>
              - {service}
            </li>
          )
      )}
    </ul>
    <div className="ml-2">
      <p className="pt-4 text-xs">
        <strong>Head/Director:</strong> {selectedData.head[index] ?? "No data"}
      </p>
      <p className="text-xs">
        <strong>Contact Number:</strong>{" "}
        {selectedData.contact[index] ?? "No data"}
      </p>
      <p className="text-xs">
        <strong>Email:</strong> {selectedData.email[index] ?? "No data"}
      </p>
    </div>
  </>
);

export default BD_ServiceDetails;
