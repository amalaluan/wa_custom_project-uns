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

export const handleSearchToPush = async (path_id, filePath) => {
  try {
    const histodb = getDatabase();
    let data = [...filePath];

    if (data.length > 5) {
      data.slice(0, 5);
    } else {
      if (data.length < 2) {
        data.push("https://www.testo.com/images/not-available.jpg");
      }
    }

    const d_dbref = ref(histodb, `buildings/info/${path_id - 1}`);
    const drecord = {
      photo: data,
    };
    await update(d_dbref, drecord);
  } catch (error) {
    console.log(error);
  }
};
