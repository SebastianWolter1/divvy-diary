"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Cta from '@/components/Cta';


const RegisterForm = () => {
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
    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAlert({ status: "success", message: "Signup successfully" });

      setTimeout(() => {
        router.push("/auth/login");
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
      <form
        className="bg-gray-800 h-screen p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
          />
          {errors.name && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="password"
            name="password"
          />
          {errors.password && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>

        <button
          className="bg-orange-500 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
       

      </form>
        <Cta type="login" />
    </>
  );
};

export default RegisterForm;
