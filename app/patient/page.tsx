"use client";

import { useState } from "react";
import Link from "next/link"
import { socket } from "../lib/socket";
import { usePathname,useRouter } from "next/navigation"
import TopNav from "./TopNav";

export default function PatientPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middlename:"",
    birthDate: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    emergencyContact: "",
    religion: "",
  });

const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isTyping, setIsTyping] = useState(false);
const [errors, setErrors] = useState<Record<string, string>>({});
const filledFields = Object.values(form).filter(Boolean).length;
const progress = Math.floor((filledFields / 12) * 100);
  const requiredFields = [
    "firstName",
    "lastName",
    "birthDate",
    "gender",
    "phone",
    "email",
    "address",
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const updated = {
      ...form,
      [name]: value,
    };

    setForm(updated);

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    setIsTyping(true);
    socket.emit("typing", updated);
  };

    const handleSubmit = () => {
    let newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
        if (!form[field as keyof typeof form]) {
        newErrors[field] = "This field is required";
        }
    });

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Email should look like example@email.com";
    }

    if (form.phone && !/^[0-9]{9,10}$/.test(form.phone)) {
        newErrors.phone = "Phone number looks incorrect";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    socket.emit("submit", form);

    console.log("Submit:", form);

    router.push("/thankyou");
    };

  const formatDate = (date: string) => {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB");
};
  const inputStyle =
    "border p-2 w-full rounded text-black focus:ring-2 focus:ring-[#2F6FD6]";

    const progressColor =
    progress < 40
        ? "bg-red-500"
        : progress < 70
        ? "bg-yellow-400"
        : "bg-green-500";
  return (
    <>
    <TopNav/>
    <div className="min-h-screen p-10 relative">
    <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
        backgroundImage: "url('/bg_main.png')",
        filter: "blur(5px)",
        opacity: 0.9,
        }}
    />
        
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-500">
                Realtime connection active
            </p>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-[#1E4FA8]">
          Patient Form
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
        <div>
        <label className="text-sm font-medium text-gray-700">
            First Name *
        </label>
        <input
            name="firstName"
            placeholder="First Name"
            className={`${inputStyle} ${
            errors.firstName ? "border-red-500" : "border-blue-200"
            }`}
            onChange={handleChange}
        />
        {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
        </div>

        <div>
            <label className="text-sm font-medium text-gray-700">
                Middle Name  (optional)
            </label>
            <input
                name="middlename"
                placeholder="Middle Name (optional)"
                className={`${inputStyle} border-blue-200`}
                onChange={handleChange}
            />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700">
                Last Name *
            </label>
            <input
              name="lastName"
              placeholder="Last Name"
              className={`${inputStyle} ${
                errors.lastName ? "border-red-500" : "border-blue-200"
              }`}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
        </div>

          {/* Birth Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">
                Date of Birth *
            </label>
            <input
              type="date"
              name="birthDate"
              className={`${inputStyle} ${
                errors.birthDate ? "border-red-500" : "border-blue-200"
              }`}
              onChange={handleChange}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700">
                Gender *
            </label>
            <select
              name="gender"
              className={`${inputStyle} ${
                errors.gender ? "border-red-500" : "border-blue-200"
              }`}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
                Phone Number *
            </label>
            <input
              name="phone"
              placeholder="Phone Number"
              className={`${inputStyle} ${
                errors.phone ? "border-red-500" : "border-blue-200"
              }`}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
                Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email "
              className={`${inputStyle} ${
                errors.email ? "border-red-500" : "border-blue-200"
              }`}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Language */}
            <div>
            <label className="text-sm font-medium text-gray-700">
                Preferred Language  (optional)
            </label>
                <input
                    name="language"
                    placeholder="Language (optional)"
                    className={`${inputStyle} border-blue-200`}
                    onChange={handleChange}
                />
            </div>

          {/* Nationality */}
          <div>
            <label className="text-sm font-medium text-gray-700">
                Nationality  (optional)
            </label>
          <input
            name="nationality"
            placeholder="Nationality (optional)"
            className={`${inputStyle} border-blue-200`}
            onChange={handleChange}
          />
          </div>

          {/* Emergency Contact */}
            <div>
            <label className="text-sm font-medium text-gray-700">
                Emergency Contact (optional: name and relationship)
            </label>
                <input
                    name="emergencyContact"
                    placeholder="Emergency Contact (optional)"
                    className={`${inputStyle} border-blue-200`}
                    onChange={handleChange}
                />
            </div>
          {/* Religion */}
          <div>
            <label className="text-sm font-medium text-gray-700">
                Religion (optional)
            </label>
          <input
            name="religion"
            placeholder="Religion (optional)"
            className={`${inputStyle} border-blue-200`}
            onChange={handleChange}
          />
          </div>
        </div>

        {/* Address */}
        <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
                Address *
            </label>
          <textarea
            name="address"
            placeholder="Address"
            rows={3}
            className={`${inputStyle} ${
              errors.address ? "border-red-500" : "border-blue-200"
            }`}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div className="mb-6">
        <div className="flex justify-between text-sm mb-1 text-gray-800">
            <span>Form progress</span>
            <span>{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-5">
            <div
            className={`${progressColor} h-5 rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
            />
        </div>
        </div>

        {isSuccess ? (
        <div className="mt-6 w-full bg-green-50 border border-green-300 text-green-600 p-4 rounded-lg text-center font-semibold">
            Your form has been submitted successfully!
        </div>
        ) : (
        <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-6 w-full bg-[#2F6FD6] hover:bg-[#1E4FA8] text-white p-3 rounded-lg font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
        >
            {isLoading ? (
            <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Submitting...
            </>
            ) : (
            "Submit"
            )}
        </button>
        )}
      </div>
    </div>
    </>
  );

}