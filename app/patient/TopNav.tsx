"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TopNav() {
  const pathname = usePathname()

  const menu = [
    { name: "Dashboard", path: "/staff" },
    { name: "Patient Form", path: "/patient" },
  ]

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-[#1E4FA8] leading-none">
            Agnos Candidate Assignment
          </h1>

          {menu.map((item) => {
            const active = pathname === item.path

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative pb transition ${
                  active
                    ? "text-[#2F6FD6]"
                    : "text-gray-600 hover:text-[#2F6FD6]"
                }`}
              >
                {item.name}

                {active && (
                  <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#2F6FD6] rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => window.open("/staff", "_blank")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm"
          >
            Staff Dashboard
          </button> */}

          <img
            src="/agnosimg.png"
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
            />
        </div>

      </div>
    </div>
  )
}