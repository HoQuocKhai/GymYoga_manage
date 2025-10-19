export default function WelcomeImg() {
  return (
    <div className="relative w-full">
      <img
        src="https://res.cloudinary.com/daqjoat73/image/upload/v1760576465/a816367e548d6aab61dcb73cfa8854af38fcac5b_zz52uf.png"
        alt=""
        className="w-full h-auto object-cover z-0"
      />

      <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome to Our Gym</h1>
        <p className="text-lg mb-4">Transform Your Body, Transform Your Life</p>
        <button
          className="bg-blue-600 text-white px-8 py-1.5 !rounded-[8px] 
             hover:px-10 hover:!rounded-[5px] 
             transition-all duration-200 ease-in-out hover:animate-pulse"
        >
          Bắt đầu ngay
        </button>
      </div>
    </div>
  );
}
