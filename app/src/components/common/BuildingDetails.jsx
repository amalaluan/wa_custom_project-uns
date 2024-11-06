import React, { useEffect, useState } from "react";
import BD_Header from "./sub_components/BD_Header";
import { useLocation } from "react-router-dom";
import BD_BuildingInfo from "./sub_components/BD_BuildingInfo";
import BD_TravelInformation from "./sub_components/BD_TravelInformation";
import BD_ServicesAccordion from "./sub_components/BD_ServicesAccordion";
import BD_DangerZone from "./sub_components/BD_DangerZone";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/utils/firebase.config";
import { handleSearchToPush } from "@/utils/f.realtime.helper";
import { TrashIcon } from "@radix-ui/react-icons";
import ToggleButton from "./ToggleButton";

const BuildingDetails = ({
  state,
  handleGoBack,
  setBuildingJson,
  udf,
  travelMode,
  handleTravelModeChange,
}) => {
  const { pathname } = useLocation();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const path = state?.selectedData?.id;

  const handleAddImage = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagePreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    // Update previews and images state
    setPreviews((prev) => [...prev, ...imagePreviews]);
    setImages((prev) => [...prev, ...selectedFiles]);

    const uploadPromises = selectedFiles.map(async (file, index) => {
      const timestamp = new Date().valueOf();
      const fileRef = ref(
        storage,
        `building_images/${path}/${timestamp}_${file.name}`
      );

      try {
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        if (selectedFiles.length - 1 == index) {
          handleSearchToPush(state?.selectedData?.name, photoURL);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    });

    // Wait for all uploads to finish
    try {
      await Promise.all(uploadPromises);
      console.log("All files uploaded successfully");
    } catch (error) {
      console.error("Error uploading some files:", error);
    }
  };

  useEffect(() => {
    setPreviews([]);
    setIsLoading(true);

    const fetchFilesFromBucket = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, `building_images/${path}`); // Path in your Firebase Storage bucket

      try {
        // List all files in the specified path
        const result = await listAll(storageRef);

        // Fetch download URLs for all the files
        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );

        setPreviews(urls); // Store the URLs in state
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching files from bucket:", error);
      }
    };

    fetchFilesFromBucket();
  }, [path]);

  const handleDeleteImage = async (imageURL) => {
    try {
      // Get reference from imageURL
      const storage = getStorage();
      const fileRef = ref(storage, imageURL);

      // Delete the file
      await deleteObject(fileRef);

      // Update the previews state and handle updates after state changes
      setPreviews((prevPreviews) => {
        const newPrev = prevPreviews.filter((url) => url !== imageURL);
        const newValu =
          newPrev.length > 0 ? newPrev[newPrev.length - 1] : "null";

        // Call handleSearchToPush with the updated previews
        handleSearchToPush(state?.selectedData?.name, newValu);

        return newPrev;
      });

      console.log("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <>
      <BD_Header
        handleGoBack={handleGoBack}
        selectedData={state?.selectedData}
        setBuildingJson={setBuildingJson}
        udf={udf}
      />

      <div className="mt-4 mb-12">
        <p className="mb-2 text-base font-semibold">Travel Mode</p>
        <hr className="mb-4" />
        <div className="flex flex-col gap-2">
          <ToggleButton
            name="Travel by walking"
            id="walk"
            defaultValue={!travelMode}
            handleChange={handleTravelModeChange}
          />
          <ToggleButton
            name="Travel by driving"
            id="vehicle"
            defaultValue={travelMode}
            handleChange={handleTravelModeChange}
          />
        </div>
      </div>

      <BD_BuildingInfo d_classes={"mt-4"} name={state?.selectedData?.name} />
      <BD_TravelInformation distances={state?.distances} mode={travelMode} />
      <BD_ServicesAccordion selectedData={state?.selectedData} />

      <div className="my-12">
        <div className="flex items-center justify-between">
          <BD_BuildingInfo name={"Gallery"} />
          <label
            htmlFor="fileInput"
            className="px-4 py-2 text-xs font-medium border rounded-sm bg-[#EBF7E3] hover:bg-[#9BD770] cursor-pointer"
          >
            Add Image
          </label>
          <input
            type="file"
            name=""
            className="mt-2 text-sm"
            id="fileInput"
            accept="image/png, image/jpg"
            onChange={handleAddImage}
            hidden
            multiple
          />
        </div>
        <hr className="my-4" />

        {isLoading && <p className="mt-2 text-sm">Fetching Records</p>}

        {!isLoading && previews.length == 0 && (
          <p className="text-sm">No images found</p>
        )}
        <div className="grid grid-cols-3 mt-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative p-2 hover:bg-gray-200 group">
              <img
                src={preview}
                className="object-cover w-auto h-full"
                alt="Image Preview"
              />
              <button
                onClick={() => handleDeleteImage(preview)}
                className="absolute hidden px-2 py-2 text-sm text-white bg-red-500 rounded top-2 right-2 group-hover:block"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      </div>

      {pathname.includes("manage-building") && (
        <BD_DangerZone
          id={state?.selectedData?.id}
          name={state?.selectedData?.name}
        />
      )}
    </>
  );
};

export default BuildingDetails;
