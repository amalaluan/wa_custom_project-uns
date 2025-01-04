import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProfileHook from "@/hooks/useProfileHook";
import React from "react";
import cameraIcon from "@/assets/icons/camera.svg";
import ModalInstance from "@/components/common/ModalInstance";

const Profile = () => {
  const {
    state,
    handleFileChange,
    handleUpdateProfile,
    infoFields,
    handleChange,
    passFields,
    handleUpdateInfo,
    handleUpdatePass,
    isOpen,
    setIsOpen,
    details,
  } = useProfileHook();

  return (
    <div>
      <Navigation />

      <main className="max-w-[1140px] px-4 py-8 mx-auto">
        <div className="grid items-start grid-cols-3 gap-4">
          <section className="sticky p-4 text-center border rounded top-4">
            <p className="font-semibold text-[#00413d]">
              {state.name || "Loading ..."}
            </p>
            <p className="mb-4 text-sm text-gray-600">
              {`${state.username}` || "Not set"}
            </p>

            <div className="relative">
              <input
                id="updtProf"
                type="file"
                className=""
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
              <img
                className="h-[150px] mb-4 aspect-square mx-auto object-cover object-center rounded-full"
                src={state?.profileUrl}
                alt="profile picture"
              />
              <label
                htmlFor="updtProf"
                className="absolute ml-10 rounded-full ring-4 ring-white bottom-3"
              >
                <img
                  className="w-6 h-6 p-1 bg-gray-200 rounded-full"
                  src={cameraIcon}
                  alt=""
                />
              </label>
            </div>

            <Button
              disabled={!state?.profile}
              className="px-4 py-2 mb-4 bg-[#00413d] text-white text-sm rounded-sm"
              onClick={handleUpdateProfile}
            >
              Update Photo
            </Button>
            <div className="p-4 text-xs text-gray-400 bg-[#00413d06] rounded-sm mb-8">
              <p>
                Upload a new profile by clicking "Update Profile" button. Take
                note that large image will automatically be resized.
              </p>
              <p>Maximum file size is 1 mb.</p>
              <p>Acceptable files are only limited to jpeg and png.</p>
            </div>
            <p className="text-xs font-semibold text-[#00413d]">
              Admin since 2024
            </p>
          </section>

          <section className="col-span-2 border rounded">
            <div className="p-4 bg-gray-50">
              <p className="text-2xl font-semibold text-[#00413d]">
                Edit Profile
              </p>
            </div>

            <form
              action="
            "
            >
              <p className="px-4 pb-2 mt-4 text-sm text-gray-400">
                User Information
              </p>
              <div className="grid grid-cols-2 gap-3 px-4">
                {infoFields.map((item, index) => {
                  return (
                    <div key={index}>
                      <Label htmlFor="email">{item.label}</Label>
                      <Input
                        className={`${
                          item.disabled && "bg-gray-200"
                        } focus-visible:ring-transparent`}
                        placeholder={item.placeholder}
                        id={item.id}
                        type={item.type}
                        value={item.value || ""}
                        disabled={item.disabled}
                        autoComplete={item.autoComplete}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                    </div>
                  );
                })}
              </div>
            </form>

            <section className="px-4 mt-6">
              <button
                className="px-4 py-2 bg-[#00413d] text-white text-sm rounded-sm"
                onClick={handleUpdateInfo}
              >
                Update Information
              </button>
            </section>

            <form action="">
              <p className="px-4 pb-2 mt-8 text-sm text-gray-400">
                Update Password
              </p>
              <div className="flex flex-col gap-3 px-4 ">
                {passFields.map((item, index) => {
                  return (
                    <div key={index}>
                      <Label htmlFor="email">{item.label}</Label>
                      <Input
                        className={`${
                          item.disabled && "bg-gray-200"
                        } focus-visible:ring-transparent`}
                        placeholder={item.placeholder}
                        id={item.id}
                        type={item.type}
                        value={item.value || ""}
                        disabled={item.disabled}
                        autoComplete={item.autoComplete}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                    </div>
                  );
                })}
              </div>
            </form>

            <section className="px-4 pb-4 mt-6">
              <button
                className="px-4 py-2 bg-[#00413d] text-white text-sm rounded-sm"
                onClick={handleUpdatePass}
              >
                Update Password
              </button>
            </section>
          </section>
        </div>
      </main>

      <Footer />

      <ModalInstance isOpen={isOpen} details={details} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Profile;
