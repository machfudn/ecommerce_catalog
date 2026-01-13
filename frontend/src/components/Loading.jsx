import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl mb-2" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </>
  );
}

export default Loading;
