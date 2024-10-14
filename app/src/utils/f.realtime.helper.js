import { ref, remove, getDatabase } from "firebase/database";

export const deleteData = async (dataPath) => {
  const db = getDatabase();

  try {
    const dataRef = ref(db, dataPath); // Replace dataPath with your node path
    await remove(dataRef);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data: ", error);
  }
};
