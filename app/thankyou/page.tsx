export default function ThankYouPage() {
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
    <div className="min-h-screen flex items-center justify-center  from-blue-50 to-white p-6">
      <div className="bg-white max-w-md w-full p-10 rounded-2xl shadow-xl text-center animate-fade-in">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thank you for your submission.
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Your information has been successfully received. Our team will follow up and take care of you closely.
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-block w-full bg-[#2F6FD6] hover:bg-[#1E4FA8] text-white py-3 rounded-lg font-semibold transition"
        >
          Go home
        </a>
      </div>
    </div>
    </>
  );
}