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
  getMetadata,
} from "firebase/storage";
import { storage } from "@/utils/firebase.config";
import { handleSearchToPush } from "@/utils/f.realtime.helper";
import { TrashIcon } from "@radix-ui/react-icons";
import ToggleButton from "./ToggleButton";
import useToastHook from "@/hooks/useToastHook";

const BuildingDetails = ({
  state,
  handleGoBack,
  setBuildingJson,
  udf,
  travelMode,
  handleTravelModeChange,
}) => {
  const { pathname } = useLocation();
  const { showToast } = useToastHook();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [prevUpdated, setPrevUpdated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const path = state?.selectedData?.id;

  const handleAddImage = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagePreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    if (imagePreviews.length > 5) {
      showToast(
        "destructive",
        "Upload failed.",
        `Message: Too many images, upload cannot exceed 5.`,
        3000
      );
    } else {
      console.log("going here");
      // Update previews and images state

      let arrayOfImages = [...prevUpdated];
      let tempHolder = [];

      const uploadPromises = selectedFiles.map(async (file, index) => {
        const timestamp = new Date().valueOf();
        const fileRef = ref(
          storage,
          `building_images/${path}/${timestamp}_${file.name}`
        );

        try {
          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);
          arrayOfImages.push(photoURL);
          tempHolder.push(photoURL);
        } catch (error) {
          console.error("Upload error:", error);
        }
      });

      // Wait for all uploads to finish
      try {
        await Promise.all(uploadPromises);
        console.log("All files uploaded successfully", arrayOfImages);
        e.target.value = "";
        setPreviews((prev) => [...tempHolder, ...prev]);
        setImages((prev) => [...arrayOfImages, ...prev]);
        handleSearchToPush(state?.selectedData?.id, [
          ...tempHolder,
          ...previews,
        ]);
        showToast(
          "success",
          "Upload successfully.",
          `Message: Image is successfully uploaded.`,
          3000
        );
      } catch (error) {
        console.error("Error uploading some files:", error);
        e.target.value = "";
      }
    }
  };

  useEffect(() => {
    setPreviews([]);
    setIsLoading(true);

    const fetchFilesFromBucket = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, `building_images/${path}`);

      try {
        const result = await listAll(storageRef);

        // Get metadata for each item and store it with reference
        const itemsWithMetadata = await Promise.all(
          result.items.map(async (itemRef) => {
            const metadata = await getMetadata(itemRef);
            return {
              itemRef,
              uploadedAt: metadata.customMetadata?.uploadedAt || 0,
            };
          })
        );

        // Sort by 'uploadedAt' metadata in descending order and take the latest 5
        const latestItems = itemsWithMetadata
          .sort((a, b) => b.uploadedAt - a.uploadedAt)
          .slice(0, 5);

        // Fetch download URLs for these latest items
        const urls = await Promise.all(
          latestItems.map(({ itemRef }) => getDownloadURL(itemRef))
        );

        setPreviews(urls);
        setPrevUpdated(urls);
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
          newPrev.length > 0
            ? newPrev[newPrev.length - 1]
            : [
                "https://firebasestorage.googleapis.com/v0/b/schoolgo-9e730.appspot.com/o/building_images%2F19%2F1730990675238_rsu_logo.png?alt=media&token=44b5ce54-d881-4d97-b857-9229032498b9",
              ];

        // Call handleSearchToPush with the updated previews
        newPrev.length > 0 &&
          handleSearchToPush(state?.selectedData?.id, newValu);

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
              {!preview.includes("localhost") && (
                <button
                  onClick={() => handleDeleteImage(preview)}
                  className="absolute hidden px-2 py-2 text-sm text-white bg-red-500 rounded top-2 right-2 group-hover:block"
                >
                  <TrashIcon />
                </button>
              )}
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
