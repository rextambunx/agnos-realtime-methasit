"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import TopNav from "../patient/TopNav";

export default function StaffPage() {
  const [data, setData] = useState<PatientData | null>(null);
  const [status, setStatus] = useState("Waiting");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    type PatientData = {
        firstName: string
        middlename: string
        lastName: string
        birthDate: string
        gender: string
        phone: string
        email: string
        address: string
        language: string
        nationality: string
        emergencyContact: string
        religion: string
    }
  useEffect(() => {
    socket.on("patient-data", (patientData) => {
      setData(patientData);
    });

    socket.on("status", (s) => {
      setStatus(s);
    });

    return () => {
      socket.off("patient-data");
      socket.off("status");
    };
  }, []);

  socket.on("patient-data", (patientData) => {
  setData(patientData);
  setLastUpdated(new Date().toLocaleTimeString());
});

  return (
    <>
    <TopNav/>
    <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
        backgroundImage: "url('/bg_main.png')",
        filter: "blur(5px)",
        opacity: 0.9,
        }}
    />
    <div className="min-h-screen p-10">
        
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-[#1E4FA8]">
          Staff Dashboard
        </h1>

        <div className="flex items-center gap-2 mb-6">
        <div className={`w-3 h-3 rounded-full ${
            status === "Typing..."
            ? "bg-blue-500 animate-pulse"
            : status === "Submitted"
            ? "bg-green-500"
            : "bg-gray-400"
        }`} />
        <span className={`text-sm font-medium ${
            status === "Typing..."
            ? "text-blue-500"
            : status === "Submitted"
            ? "text-green-500"
            : "text-gray-500"
        }`}>
            {status}
        </span>
        </div>

        {!data && <p className="text-gray-500">Waiting for patient...</p>}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 break-words">
            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">First Name</p>
            <p className="text-base  text-black">
                {data.firstName || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Middle Name</p>
            <p className="text-base  text-black">
                {data.middlename || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Last Name</p>
            <p className="text-base  text-black">
                {data.lastName || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Birth Date</p>
            <p className="text-base  text-black">
                {data.birthDate || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Gender</p>
            <p className="text-base  text-black">
                {data.gender || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-base  text-black">
                {data.phone || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-60">
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-base  text-black">
                {data.email || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 md:col-span-2">
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-base  text-black">
                {data.address || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Language</p>
            <p className="text-base  text-black">
                {data.language || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Nationality</p>
            <p className="text-base  text-black">
                {data.nationality || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Emergency Contact</p>
            <p className="text-base  text-black">
                {data.emergencyContact || "-"}
            </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-xs text-gray-500">Religion</p>
            <p className="text-base  text-black">
                {data.religion || "-"}
            </p>
            </div>

            {lastUpdated && (
               <p className="text-xs text-gray-400 mb-4">Last updated: {lastUpdated}</p>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}