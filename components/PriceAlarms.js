"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Cta from "@/components/Cta";
import { isin } from "@form-validation/validator-isin";

const PriceAlarmForm = ({ user }) => {
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
    if (errors.isin) {
      setAlert({ status: "error", message: "Invalid ISIN" });
      return;
    }
    try {
      await fetch("/api/addAlarm", {
        method: "POST",
        body: JSON.stringify({ ...data, userId: user.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAlert({ status: "success", message: "Preisalarm hinzugefügt" });
      setTimeout(() => {
        setAlert({ status: "", message: "" });
        router.refresh();
      }, 500);
    } catch (error) {
      setAlert({
        status: "error",
        message: "Das hat leider nicht funktioniert",
      });
    }
  };

  return (
    <>
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

      <div className="p-6">
        <div className="mx-auto my-12 w-full px-4">
          <div className="align-middle inline-block min-w-full rounded-lg  bg-gray-500 dark:bg-gray-700 max-w-full">
            <div className="flex items-center justify-center px-4 py-12">
              <div className="w-full max-w-md">
                <div>
                  <h2 className="my-6 text-center text-3xl font-bold leading-9 text-gray-300 dark:text-white">
                    Erstelle einen Preisalarm
                  </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-300 dark:text-white text-sm font-bold mb-2"
                      htmlFor="isin"
                    >
                      ISIN
                    </label>
                    <input
                      {...register("isin", {
                        required: "Dieses Feld ist erforderlich",
                        validate: (value) =>
                          isin().validate({ value }).valid ||
                          "Bitte gib einen gültige ISIN ein",
                      })}
                      className="shadow bg-gray-400 dark:bg-gray-600 rounded w-full py-2 px-3 text-gray-200 dark:text-white focus:outline-none"
                      type="text"
                      id="isin"
                      name="isin"
                    />
                    {errors.isin && (
                      <span className="text-orange-700 text-xs italic">
                        {errors.isin.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-300 dark:text-white text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Preis in USD
                    </label>
                    <input
                      {...register("price", {
                        required: "Dieses Feld ist erforderlich",
                        pattern: {
                          value: /^\d+,\d{2}$/,
                          message:
                            "Bitte geben Sie einen gültigen Wert ein, z.B. (123,45)",
                        },
                      })}
                      className="shadow bg-gray-400 dark:bg-gray-600 rounded w-full py-2 px-3 text-gray-200 dark:text-white focus:outline-none"
                      type="text"
                      id="price"
                      name="price"
                    />
                    {errors.price && (
                      <span className="text-orange-700 text-xs italic">
                        {errors.price.message}
                      </span>
                    )}
                  </div>

                  <Cta type="submitForm" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceAlarmForm;
