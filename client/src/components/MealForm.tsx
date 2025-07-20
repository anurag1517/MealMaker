import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../lib/api";
import LocationSelect from "../components/LocationSelect";

const issuesArr = ["Diabetes", "Hypertension", "High Cholesterol", "Thyroid"] as const;
const meals = ["breakfast", "lunch", "snacks", "dinner"] as const;

const schema = z.object({
  pref: z.enum(["veg", "nonveg"]),
  issues: z.string().array(),
  location: z.string().min(1, "Location is required"),
  mealType: z.enum(meals),
});

const foodQuotes = [
  "Good food is the foundation of genuine happiness. — Auguste Escoffier",
  "Let food be thy medicine and medicine be thy food. — Hippocrates",
  "You don’t need a silver fork to eat good food. — Paul Prudhomme",
  "One cannot think well, love well, sleep well, if one has not dined well. — Virginia Woolf",
  "To eat is a necessity, but to eat intelligently is an art. — François de La Rochefoucauld",
];

type FormData = z.infer<typeof schema>;

export default function MealForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      pref: "veg",
      issues: [],
      location: "",
      mealType: "breakfast",
    },
    resolver: zodResolver(schema),
  });

  const [recommended, setRecommended] = useState<any[]>([]);

  const quote = foodQuotes[Math.floor(Math.random() * foodQuotes.length)];

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/recommend", data);
      setRecommended(res.data.foods);
    } catch (e: any) {
      alert(e.response?.data?.error || "server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 transition-all">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          🥗 Personalized Meal Recommendations
        </h1>

        <p className="text-center text-gray-600 italic mb-4">{quote}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">⚖️ Dietary Preference</label>
            <select
              {...register("pref")}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="veg">🥦 Vegetarian</option>
              <option value="nonveg">🍗 Non‑Vegetarian</option>
            </select>
          </div>

          {/* Medical Issues */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">🩺 Health Conditions</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {issuesArr.map((iss) => (
                <label key={iss} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={iss}
                    {...register("issues")}
                    className="text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span>{iss}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📍 State / UT</label>
            <LocationSelect onLocationChange={(loc) => setValue("location", loc)} />
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">🍽️ Meal Time</label>
            <select
              {...register("mealType")}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              {meals.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Spinner */}
          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="w-6 h-6 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-green-600 font-medium">Finding nutritious options for you...</span>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
          >
            {isSubmitting ? "Loading..." : "Get Recommendations"}
          </button>
        </form>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">🌟 Recommended Foods</h2>
            <ul className="space-y-3">
              {recommended.map((food, i) => {
                const isLLM = typeof food === "string";
                const name = isLLM ? food : food.name;
                const cal = !isLLM && food.macros?.cal;

                return (
                  <li
                    key={isLLM ? name : food._id || i}
                    className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-md p-3 shadow-sm"
                  >
                    <span className="font-medium text-gray-800">{name}</span>
                    {cal && <span className="text-sm text-gray-500">{cal} kcal</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
