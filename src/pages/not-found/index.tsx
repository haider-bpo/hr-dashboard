import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-gray-800 to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="my-2 text-2xl font-bold">
        Something&apos;s missing
      </h2>
      <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-lg font-medium text-white bg-gray-700 rounded hover:bg-gray-600"
        >
          Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
