/* eslint-disable react/no-unescaped-entities */
"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Cta from '@/components/Cta';

const LoginForm = () => {
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const result = await signIn("credentials", { ...data, redirect: false });
    console.log(result);

    if (result.ok) {
      console.log("helloo");
      setAlert({ status: "success", message: "Login successfully" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
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
            type="password"
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
          Login
        </button>
       
      </form>
        <Cta type="register" />
    </>
  );
};

export default LoginForm;
