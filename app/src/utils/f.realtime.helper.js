import {
  getDatabase,
  ref,
  set,
  query,
  orderByChild,
  equalTo,
  get,
  update,
} from "firebase/database";

export const deleteData = async (dataPath) => {
  const db = getDatabase();

  try {
    const dataRef = ref(db, dataPath);
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const currentData = snapshot.val();
      await set(dataRef, { ...currentData, status: "deleted" }); // Preserve existing data and add status
      console.log("Data updated successfully, status set to 'deleted'");
    } else {
      console.log("No data found at the specified path.");
    }
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const handleSearchToPush = async (searchTerm, filePath) => {
  const db = getDatabase();

  if (!searchTerm) return;

  const recordsRef = ref(db, "buildings/info/"); // Replace with your database path
  const q = query(recordsRef, orderByChild("name"), equalTo(searchTerm));

  try {
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Extract the keys from the data object
      const keys = Object.keys(data);
      const firstKey = keys[0]; // Get the first key

      const infoRef = ref(db, `buildings/info/${firstKey}`);
      await update(infoRef, { photo: filePath });
    } else {
      console.log([]); // No records found
    }
  } catch (error) {
    console.error("Error searching records:", error);
  }
};
