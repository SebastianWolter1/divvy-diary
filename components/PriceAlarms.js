"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Cta from '@/components/Cta';

const PriceAlarm = ({user}) => {
  console.log("PriceAlarm", user)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const onSubmit = async (data) => {

    console.log("onSubmit", data)

    try {
      await fetch("/api/auth/userValues", {
        method: "POST",
        body: JSON.stringify({ ...data, userId: user.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAlert({ status: "success", message: "User value added successfully" });
      setTimeout(() => {
        router.refresh();
      }, 500);
      
    } catch (error) {
      setAlert({ status: "error", message: "Something went wrong" });
    }
  };

  return (
    <>
      {alert.message && (
        <div
          className={clsx(
            "font-bold bg-gray-800 p-2",
            alert.status === "success" ? "text-green-500" : "text-red-500"
          )}
        >
          {alert.status === "success" ? "✅" : "❌"} {alert.message}
        </div>
      )}
      <div className="bg-gray-800 h-screen p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="isin"
            >
              ISIN
            </label>
            <input
              {...register("isin", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="isin"
              name="isin"
            />
            {errors.isin && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              {...register("price", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="price"
              name="price"
            />
            {errors.price && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>

          <Cta type="submitForm" />
        </form>
      </div>
    </>
  );
};

export default PriceAlarm;