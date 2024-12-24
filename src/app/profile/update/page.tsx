"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import user from "../../../../public/user.png";
import { useSession } from "next-auth/react";
import Loading from "@/component/Loading";
import { useRouter } from "next/navigation";
import UpdatePassword from "@/component/profile/UpdatePassword";
import UpdateProfile from "@/component/profile/UpdateProfile";
import { updateUser } from "@/lib/request";

const Page: React.FC = () => {
  const errorNotify = (val: string) =>
    toast.error(val, {
      className: "mt-16",
    });

  const { data: session } = useSession();
  const router = useRouter();

  const [about, setAbout] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const [prevueImage, setPrevueImage] = useState<string>(user.src);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setImage("");
      setId(session.user?.id ? session.user.id.toString() : ""); // Convert ObjectId to string
      setName(session.user?.name ?? "");
      setPrevueImage(session.user?.image ?? user.src);
      setAbout(session.user?.about ?? "Please Tell Us About Yourself");
    }
  }, [session]);
  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setPrevueImage(reader.result as string);
      }
    };

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Add functionality for password submission if required
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser(id ?? "", name, about, image);

      if (!res.ok) {
        setLoading(false);
        console.log(res);
        errorNotify("Some Error Occurred");
        return;
      }

      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      errorNotify("Some Error Occurred");
    }
  };

  return (
    <div className="fixed top-0 w-full h-full flex items-center justify-center bg-gradient-to-r">
      {loading && (
        <div className="fixed top-0 w-full h-full flex items-center justify-center text-black z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {session ? (
        <div className="max-w-md lg:w-full md:w-full bg-white rounded-lg shadow-lg p-6">
          {updatePassword ? (
            <UpdatePassword
              loading={loading}
              password={password}
              setPassword={setPassword}
              handleSubmitPassword={handleSubmitPassword}
              setUpdatePassword={setUpdatePassword}
            />
          ) : (
            <div>
              <UpdateProfile
                name={name}
                about={about}
                prevueImage={prevueImage}
                loading={loading}
                handleSubmit={handleSubmit}
                setName={setName}
                setAbout={setAbout}
                handleImageSelected={handleImageSelected}
                setUpdatePassword={setUpdatePassword}
              />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <Toaster />
    </div>
  );
};

export default Page;
