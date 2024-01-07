/* eslint-disable react/no-unescaped-entities */
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Cta from "@/components/Cta";

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

    if (result.ok) {
      setAlert({ status: "success", message: "Login erfolgreich" });
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 500);
    } else {
      setAlert({
        status: "error",
        message: "Das hat leider nicht funktioniert",
      });
    }
  };

  return (
    <>
      <header className="bg-gray-500 dark:bg-gray-700">
        <div className="relative mx-auto max-w-screen-2xl px-6 py-4">
          <h1 className="text-lg leading-6 text-gray-300 dark:text-white">
            Anmelden
          </h1>
        </div>
      </header>
      {alert.message && (
        <div
          className={clsx(
            "font-bold bg-gray-600 dark:bg-gray-900 p-6",
            alert.status === "success" ? "text-green-500" : "text-orange-700"
          )}
        >
          {alert.status === "success" ? "✅" : "❌"} {alert.message}
        </div>
      )}

      <div className=" h-screen p-6">
        <div className="mx-auto my-12 w-full px-4">
          <div className="align-middle inline-block min-w-full rounded-lg bg-gray-500 dark:bg-gray-700 max-w-full">
            <div className="flex items-center justify-center px-4 py-12">
              <div className="w-full max-w-md">
                <div>
                  <h2 className="my-6 text-center text-3xl font-bold leading-9 text-gray-300 dark:text-white">
                    Login
                  </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-300 dark:text-white text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="shadow bg-gray-400 dark:bg-gray-600 rounded w-full py-2 px-3 text-gray-200 dark:text-white focus:outline-none"
                      type="email"
                      id="email"
                      name="email"
                    />
                    {errors.email && (
                      <span className="text-orange-700 text-xs italic">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-300 dark:text-white  text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      {...register("password", { required: true })}
                      className="shadow bg-gray-400 dark:bg-gray-600 rounded w-full py-2 px-3 text-gray-200 dark:text-white focus:outline-none"
                      type="password"
                      id="password"
                      name="password"
                    />
                    {errors.password && (
                      <span className="text-orange-700 text-xs italic">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between space-x-1">
                    <Cta type="loginForm" />
                    <Cta type="register" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
