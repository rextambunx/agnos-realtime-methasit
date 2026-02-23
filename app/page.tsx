"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
    <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
        backgroundImage: "url('/bg_main.png')",
        filter: "blur(5px)",
        opacity: 0.9,
        }}
    />
    <div className="min-h-screen 
     flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-[450px] text-center transition hover:shadow-2xl">
        
        <h1 className="text-3xl font-bold text-[#1E4FA8] mb-3">
          Realtime Patient System
        </h1>

        <p
         className="text-gray-500 mb-8">
          Live form monitoring for hospital staff
        </p>

        <div className="space-y-4">

          <button
            onClick={() => router.push("/patient")}
            className="w-full bg-[#2F6FD6] hover:bg-[#1E4FA8] text-white p-3 rounded-lg font-semibold transition"
          >
            Enter as Patient
          </button>

          <button
            onClick={() => router.push("/staff")}
            className="w-full border border-[#2F6FD6] text-[#2F6FD6] hover:bg-blue-50 p-3 rounded-lg font-semibold transition"
          >
            Enter as Staff
          </button>
          <p
            className="text-gray-400 text-sm">
            Presented By Methasit Tambun
          </p>

        </div>
      </div>
    </div></>
  );
}