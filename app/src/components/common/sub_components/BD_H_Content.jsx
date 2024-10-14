import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useReducer } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        services_title: [...state.services_title, ""],
        services: [...state.services, ""],
        head: [...state.head, ""],
        email: [...state.email, ""],
        contact: [...state.contact, ""],
      };
    }

    case "discard": {
      return {
        ...state,
        services_title: [...state.services_title].slice(0, -1),
        services: [...state.services].slice(0, -1),
        head: [...state.head].slice(0, -1),
        email: [...state.email].slice(0, -1),
        contact: [...state.contact].slice(0, -1),
      };
    }

    case "delete": {
      return {
        ...state,
        services_title: [
          ...state.services_title.slice(0, action.index),
          ...state.services_title.slice(action.index + 1),
        ],
        services: [
          ...state.services.slice(0, action.index),
          ...state.services.slice(action.index + 1),
        ],
        head: [
          ...state.head.slice(0, action.index),
          ...state.head.slice(action.index + 1),
        ],
        email: [
          ...state.email.slice(0, action.index),
          ...state.email.slice(action.index + 1),
        ],
        contact: [
          ...state.contact.slice(0, action.index),
          ...state.contact.slice(action.index + 1),
        ],
      };
    }

    case "update_value": {
      return {
        ...state,
        [action.key]: state[action.key].map((item, idx) =>
          idx === action.index ? action.value : item
        ),
      };
    }

    case "update_single": {
      return {
        ...state,
        [action.key]: action.value,
      };
    }

    case "reset": {
      return { ...action.payload };
    }

    default:
      return state;
  }
}

const BD_H_Content = ({ initstate, isOpen }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    dispatch({ type: "reset", payload: { ...initstate } });
  }, [initstate]);

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

  const handleSingleInputChange = (e) => {
    dispatch({
      type: "update_single",
      key: e.target.id,
      value: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let path_id = initstate.id;
      let fd_payload = { ...state };

      fd_payload.services = fd_payload.services.map((item) =>
        item.replace(/;\n/g, ";_")
      );

      // Save data to Firestore with custom ID
      await updateDoc(doc(db, "buildings_data", path_id), { ...fd_payload });
      isOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDiscard = () => {
    isOpen(false);
  };

  const addService = () => {
    dispatch({ type: "add" });
  };

  const deleteService = (index) => {
    dispatch({ type: "delete", index: index });
  };

  return (
    <DrawerContent>
      <VisuallyHidden>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
      </VisuallyHidden>

      <h3 className="mt-4 text-4xl font-semibold text-center">{state?.name}</h3>
      <div className="flex justify-center gap-2 pt-4 pb-4">
        <Button onClick={handleDiscard}>Discard Changes</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>
      <hr />
      <div className="px-8 pt-4 pb-8 h-[70dvh] overflow-y-scroll">
        <div className="w-1/3 m-auto">
          <div className="mb-4">
            <Label htmlFor="name">Building Name</Label>
            <Input
              placeholder="Building Name"
              id="name"
              type="text"
              value={state?.name}
              onChange={handleSingleInputChange}
              disabled={false}
              autoComplete="off"
            />
          </div>

          {state?.services_title?.map((item, index) => {
            const services_off = state?.services[index].replace(/_/g, "\n");

            return (
              <div key={index}>
                <p className="mt-8 mb-2 font-medium text-center">{item}</p>
                <hr />

                <div className="mt-4 mb-2">
                  <div className="flex justify-between">
                    <Label htmlFor="services_title">Service Title</Label>
                    <button
                      className="text-xs text-red-500 underline"
                      onClick={(e) => deleteService(index)}
                    >
                      - delete this service
                    </button>
                  </div>
                  <Input
                    className="mt-1"
                    placeholder="Building Name"
                    id="services_title"
                    type="text"
                    value={state?.services_title[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={false}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="services">Offered Services</Label>
                  <Textarea
                    className="mt-1 resize-none"
                    placeholder="Building Name"
                    id="services"
                    type="text"
                    value={services_off}
                    onKeyPress={(e) => handleTextAreaChange(e, index)}
                    onChange={(e) => handleInputChange(e, index)}
                    rows="5"
                    disabled={false}
                    autoComplete="off"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    <strong>Note: </strong>Press enter to for separating each
                    services.
                  </p>
                </div>

                <div className="mb-2">
                  <Label htmlFor="head">Head</Label>
                  <Input
                    className="mt-1"
                    placeholder="Building Name"
                    id="head"
                    type="text"
                    value={state?.head[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={false}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="mt-1"
                    placeholder="Building Name"
                    id="email"
                    type="text"
                    value={state?.email[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={false}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    className="mt-1"
                    placeholder="Building Name"
                    id="contact"
                    type="text"
                    value={state?.contact[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            );
          })}

          <button
            className="mt-4 text-xs text-blue-500 underline"
            onClick={addService}
          >
            + add new service
          </button>
        </div>
      </div>
    </DrawerContent>
  );
};

export default BD_H_Content;
