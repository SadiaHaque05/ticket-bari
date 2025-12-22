import { useForm } from "react-hook-form";
import { imageUpload } from "../../src/utils";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorPage from "../../Pages/ErrorPage";

const AddTicketForm = () => {
  const { user } = useAuth();

  // React Query mutation for adding ticket
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/tickets`, payload),
    onSuccess: () => {
      toast.success("Ticket added successfully");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add ticket");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      title,
      from,
      to,
      transportType,
      price,
      quantity,
      departureDate,
      departureTime,
      perks,
      image,
    } = data;

    try {
      const imageUrl = await imageUpload(image[0]);

      const ticketData = {
        title,
        from,
        to,
        transportType,
        price: Number(price),
        quantity: Number(quantity),
        departureDate,
        departureTime,
        perks: perks || [],
        image: imageUrl,
        vendor: {
          name: user?.displayName,
          email: user?.email,
        },
        verificationStatus: "pending",
      };

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL / tickets}`,
          ticketData
        );
      } catch (error) {
        console.log(error);
      }

      await mutateAsync(ticketData);
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add ticket");
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Ticket Title */}
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Ticket Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter ticket title"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* From */}
            <div className="space-y-1 text-sm">
              <label htmlFor="from" className="block text-gray-600">
                From
              </label>
              <input
                type="text"
                id="from"
                placeholder="Departure location"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("from", { required: "From location is required" })}
              />
              {errors.from && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.from.message}
                </p>
              )}
            </div>

            {/* To */}
            <div className="space-y-1 text-sm">
              <label htmlFor="to" className="block text-gray-600">
                To
              </label>
              <input
                type="text"
                id="to"
                placeholder="Destination location"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("to", { required: "To location is required" })}
              />
              {errors.to && (
                <p className="text-xs text-red-500 mt-1">{errors.to.message}</p>
              )}
            </div>

            {/* Transport Type */}
            <div className="space-y-1 text-sm">
              <label htmlFor="transportType" className="block text-gray-600">
                Transport Type
              </label>
              <select
                id="transportType"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("transportType", {
                  required: "Transport type is required",
                })}
              >
                <option value="">Select transport</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
              </select>
              {errors.transportType && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.transportType.message}
                </p>
              )}
            </div>

            {/* Perks */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Perks</label>
              <div className="flex gap-2">
                <label>
                  <input type="checkbox" value="AC" {...register("perks")} />
                  <span className="ml-1">AC</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Breakfast"
                    {...register("perks")}
                  />
                  <span className="ml-1">Breakfast</span>
                </label>
                <label>
                  <input type="checkbox" value="WiFi" {...register("perks")} />
                  <span className="ml-1">WiFi</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Price */}
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Price (per unit)
              </label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-1 text-sm">
              <label htmlFor="quantity" className="block text-gray-600">
                Ticket Quantity
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Quantity"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: 1,
                })}
              />
              {errors.quantity && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Departure Date & Time */}
            <div className="space-y-1 text-sm">
              <label htmlFor="departureDate" className="block text-gray-600">
                Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("departureDate", { required: "Date is required" })}
              />
              {errors.departureDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.departureDate.message}
                </p>
              )}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="departureTime" className="block text-gray-600">
                Departure Time
              </label>
              <input
                type="time"
                id="departureTime"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white text-gray-900"
                {...register("departureTime", { required: "Time is required" })}
              />
              {errors.departureTime && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.departureTime.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Image Upload</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Vendor Info */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Vendor Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-gray-200 text-gray-900"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Vendor Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-gray-200 text-gray-900"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-4 bg-lime-500 text-white rounded-md font-semibold"
        >
          {isPending ? (
            <TbFidgetSpinner className="animate-spin m-auto" />
          ) : (
            "Add Ticket"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
