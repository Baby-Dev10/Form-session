import { useForm } from "react-hook-form";
import { CreditCard, Building2, AlertCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface FormData {
  name: string;
  age: number;
  sessions: number;
  paymentMethod: "card" | "bank";
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      sessions: 1,
      paymentMethod: "card",
    },
  });

  const recieptGen = async (id: any) => {
    const response = await axios.get(
      `https://form-session-back.vercel.app/api/receipt/${id}`,
      {
        responseType: "blob", // Ensure response is treated as a file
      }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Reciept.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Call the backend API instead of simulating with a timeout
      const response = await fetch(
        "https://form-session-back.vercel.app/api/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Form submitted:", result);

      // You can store result.id if needed to later fetch the receipt
      const notify = () => toast("Booking successful!");
      notify();

      recieptGen(result.id);

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1500));
  //     console.log("Form submitted:", data);
  //     reset();
  //     alert("Booking successful!");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Session</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ToastContainer />
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
              placeholder="John Doe"
            />
            {errors.name && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Must be at least 18 years old" },
                max: { value: 120, message: "Invalid age" },
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
              placeholder="25"
            />
            {errors.age && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.age.message}
              </div>
            )}
          </div>

          {/* Number of Sessions Field */}
          <div>
            <label
              htmlFor="sessions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Sessions
            </label>
            <input
              type="number"
              id="sessions"
              {...register("sessions", {
                required: "Number of sessions is required",
                min: { value: 1, message: "Minimum 1 session required" },
                max: { value: 10, message: "Maximum 10 sessions allowed" },
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.sessions ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
              placeholder="1"
            />
            {errors.sessions && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.sessions.message}
              </div>
            )}
          </div>

          {/* Payment Method Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative">
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod")}
                  className="peer sr-only"
                />
                <div
                  className="p-4 border rounded-lg cursor-pointer flex items-center gap-2
                  peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50 transition"
                >
                  <CreditCard className="text-gray-600" size={20} />
                  <span className="font-medium text-gray-700">
                    Card Payment
                  </span>
                </div>
              </label>

              <label className="relative">
                <input
                  type="radio"
                  value="bank"
                  {...register("paymentMethod")}
                  className="peer sr-only"
                />
                <div
                  className="p-4 border rounded-lg cursor-pointer flex items-center gap-2
                  peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50 transition"
                >
                  <Building2 className="text-gray-600" size={20} />
                  <span className="font-medium text-gray-700">
                    Bank Transfer
                  </span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition
              ${
                isSubmitting
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Book Sessions"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
