import React, { useEffect, useState } from "react";
import {
  ref,
  query,
  limitToLast,
  onValue,
  getDatabase,
} from "firebase/database";

const RecentChanges = () => {
  const [changes, setChanges] = useState(null);

  useEffect(() => {
    const dbRef = ref(getDatabase(), "history"); // Reference to the database path
    const recentChangesQuery = query(dbRef, limitToLast(5)); // Query to get the last 3 changes

    // Listen for real-time updates
    const unsubscribe = onValue(
      recentChangesQuery,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setChanges(Object.values(data)); // Update the state with the recent 3 changes
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-12">
      <p className="mb-2 text-base font-semibold">Recent Changes</p>
      <hr className="mb-4" />
      {!changes ? (
        <p className="text-sm">No existing record.</p>
      ) : (
        changes.map((item, index) => {
          return (
            <p
              key={index}
              className="mb-1 text-xs italic text-gray-500 truncate"
              dangerouslySetInnerHTML={{ __html: item.message }}
            ></p>
          );
        })
      )}
    </div>
  );
};

export default RecentChanges;
