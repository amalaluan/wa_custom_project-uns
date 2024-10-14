import React, { useReducer } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import ModalInstance from "./ModalInstance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import MapContentPicker from "./MapContentPicker";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { getDatabase, ref, push, set } from "firebase/database";
import { db } from "@/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        details: {
          services_title: [...state.details.services_title, ""],
          services: [...state.details.services, ""],
          head: [...state.details.head, ""],
          email: [...state.details.email, ""],
          contact: [...state.details.contact, ""],
        },
      };
    }
    case "delete": {
      const newDetails = Object.keys(state.details).reduce((acc, key) => {
        acc[key] = [...state.details[key]];
        acc[key].splice(action.index, 1);
        return acc;
      }, {});

      return {
        ...state,
        details: newDetails,
      };
    }
    case "update_value": {
      return {
        ...state,
        details: {
          ...state.details,
          [action.key]: state.details[action.key].map((item, idx) =>
            idx === action.index ? action.value : item
          ),
        },
      };
    }
    case "update_single": {
      return {
        ...state,
        building_coords: {
          ...action.value,
        },
      };
    }
    case "update_coords": {
      return {
        ...state,
        building_coords: {
          ...state.building_coords,
          geometry: {
            ...state.building_coords.geometry,
            ...action.value,
          },
        },
      };
    }

    default:
      return state;
  }
}

const Operations = ({ len_id }) => {
  const [state, dispatch] = useReducer(reducer, {
    details: {
      services_title: [""],
      services: [""],
      head: [""],
      email: [""],
      contact: [""],
    },
    building_coords: {
      type: "Feature",
      properties: { id: "", name: "" },
      geometry: {
        type: "Point",
        coordinates: null,
      },
    },
  });

  const handleTextAreaChange = (e, index) => {
    if (e.key == "Enter") {
      const text = e.target.value;
      const textarea = e.target;
      const cursorPosition = textarea.selectionStart;

      // Insert ";" at the cursor position
      const newText =
        text.slice(0, cursorPosition) + ";\n" + text.slice(cursorPosition);

      // Update the textarea value
      e.target.value = newText;

      // Move the cursor to the correct position after ";"
      textarea.selectionEnd = cursorPosition + 2;

      // Prevent default Enter key action since we handled it manually
      e.preventDefault();

      dispatch({
        type: "update_value",
        key: e.target.id,
        index: index,
        value: newText,
      });
    }
  };

  const handleInputChange = (e, index) => {
    dispatch({
      type: "update_value",
      key: e.target.id,
      index: index,
      value: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let inc_id = (parseInt(len_id) + 1).toString();
      let rd_payload = { ...state.building_coords };
      let fd_payload = { ...state.details };

      // Update payloads
      fd_payload["name"] = state.building_coords.properties.name;
      rd_payload["properties"]["id"] = inc_id;
      delete rd_payload.geometry.temporary_url;

      fd_payload.services = fd_payload.services.map((item) =>
        item.replace(/;\n/g, ";_")
      );

      console.log(fd_payload);

      const rd_db = getDatabase();

      // Reference to the location in the database where you want to save the data
      const dataRef = ref(
        rd_db,
        `json_files/building/features/${len_id.toString()}`
      );

      // Save data to Firebase Realtime Database
      await set(dataRef, { ...rd_payload });

      // Save data to Firestore with custom ID
      await setDoc(doc(db, "buildings_data", inc_id), { ...fd_payload });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const updateSingle = (e) => {
    let data = { ...state.building_coords };
    data["properties"] = {
      ...data.properties,
      [e.target.id]: e.target.value,
    };
    dispatch({ type: "update_single", value: data });
  };

  return (
    <div className="mb-12 text-sm">
      <p className="mb-2 text-base font-semibold">Operations</p>
      <hr className="mb-4" />
      <div className="flex gap-2">
        <ModalInstance>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-xs font-normal"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add building</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="h-[70vh] overflow-hidden">
            <div className="relative h-full overflow-y-scroll no-scrollbar">
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-1">
                  How to add new building?
                </AlertDialogTitle>
                <AlertDialogDescription className="mb-4">
                  Follow the steps to add/create new record.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <p className="mb-2 text-sm font-semibold">
                Step 1: Set the location.
              </p>
              {state?.building_coords?.geometry?.coordinates && (
                <>
                  <img
                    src={state?.building_coords?.geometry?.temporary_url}
                    alt="not found"
                  />
                  <p className="mt-1 mb-2 text-xs">
                    Selected Location:{" "}
                    <b>
                      {state?.building_coords?.geometry?.coordinates.join(", ")}
                    </b>
                  </p>
                </>
              )}
              <div className="w-full mb-4">
                <ModalInstance>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" className="text-xs">
                      {state?.building_coords?.geometry?.coordinates
                        ? "Update Location"
                        : "Set Location"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[700px] max-w-full">
                    <div className="relative h-full overflow-y-scroll no-scrollbar">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="mb-1">
                          Set the location of the building
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mb-4 text-xs">
                          Click the location where you want to add a building
                          coordinate then click "Save Location" button.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="h-[400px]" id="leaftlet-to-capture">
                        <MapContentPicker
                          dispatch={dispatch}
                          defCoords={
                            state?.building_coords?.geometry?.coordinates
                          }
                        />
                      </div>
                    </div>
                    <AlertDialogFooter className="">
                      <AlertDialogCancel>Close and save</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </ModalInstance>
              </div>

              <p className="mb-2 text-sm font-semibold">
                Step 2: Fill out the following.
              </p>
              <hr />

              <div className="m-2">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Building name
                </Label>
                <Input
                  className="mt-1"
                  placeholder="Building Name"
                  id="name"
                  type="text"
                  value={state?.building_coords?.properties?.name}
                  autoComplete="off"
                  onChange={updateSingle}
                />
              </div>

              {state?.details?.services_title?.map((item, index) => {
                return (
                  <div key={index} className="relative">
                    <div className="absolute w-[5px] h-[calc(100%-32px)] border-l border-y top-2.5"></div>
                    <div className="ml-[10px]">
                      <div className="mt-4 mb-2">
                        <div className="flex justify-between">
                          <Label
                            className="text-xs font-semibold"
                            htmlFor="services_title"
                          >
                            Service Title
                          </Label>
                          {index != 0 && (
                            <button
                              className="text-xs italic text-red-500 underline"
                              onClick={() => {
                                dispatch({ type: "delete", index: index });
                              }}
                            >
                              delete this group
                            </button>
                          )}
                        </div>
                        <Input
                          className="mt-1"
                          placeholder="Building Name"
                          id="services_title"
                          type="text"
                          value={state?.details?.services_title[index]}
                          autoComplete="off"
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>

                      <div className="mb-2">
                        <Label
                          className="text-xs font-semibold"
                          htmlFor="services"
                        >
                          Offered Services
                        </Label>
                        <Textarea
                          className="mt-1 resize-none"
                          placeholder="Building Name"
                          id="services"
                          type="text"
                          value={state?.details?.services[index]}
                          rows="5"
                          onKeyPress={(e) => handleTextAreaChange(e, index)}
                          onChange={(e) => handleInputChange(e, index)}
                          autoComplete="off"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          <strong>Note: </strong>Press enter to for separating
                          each services.
                        </p>
                      </div>

                      <div className="mb-2">
                        <Label className="text-xs font-semibold" htmlFor="head">
                          Head
                        </Label>
                        <Input
                          className="mt-1"
                          placeholder="Building Name"
                          id="head"
                          type="text"
                          value={state?.details?.head[index]}
                          onChange={(e) => handleInputChange(e, index)}
                          autoComplete="off"
                        />
                      </div>

                      <div className="mb-2">
                        <Label
                          className="text-xs font-semibold"
                          htmlFor="email"
                        >
                          Email
                        </Label>
                        <Input
                          className="mt-1"
                          placeholder="Building Name"
                          id="email"
                          type="text"
                          value={state?.details?.email[index]}
                          onChange={(e) => handleInputChange(e, index)}
                          autoComplete="off"
                        />
                      </div>

                      <div className="mb-2">
                        <Label
                          className="text-xs font-semibold"
                          htmlFor="contact"
                        >
                          Contact Number
                        </Label>
                        <Input
                          className="mt-1"
                          placeholder="Building Name"
                          id="contact"
                          type="text"
                          value={state?.details?.contact[index]}
                          onChange={(e) => handleInputChange(e, index)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                className="mt-2 text-xs text-blue-500"
                onClick={() => {
                  dispatch({ type: "add" });
                }}
              >
                add new service +
              </button>
            </div>
            <AlertDialogFooter className="sticky bottom-0 w-full pt-2 bg-white border-t">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleSubmit}>Create Record</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </ModalInstance>
      </div>
    </div>
  );
};

export default Operations;
