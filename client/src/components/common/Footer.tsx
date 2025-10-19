export default function Footer() {
  return (
    <div className="flex flex-col bg-[#1F2937] text-white px-[72.5px] py-12 items-center">
      {/* --- 3 Columns --- */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Về chúng tôi */}
        <div className="flex-1 lg:w-[395px]">
          <p className="font-semibold text-lg mb-2">Về chúng tôi</p>
          <p className="text-[#9CA3AF] leading-relaxed">
            Gym Management - Nơi bạn bắt đầu hành trình fitness của mình với các
            trang thiết bị hiện đại và đội ngũ huấn luyện viên chuyên nghiệp.
          </p>
        </div>

        {/* Liên hệ */}
        <div className="flex-1 ">
          <p className="font-semibold text-lg mb-2">Liên hệ</p>
          <div className="flex flex-col text-[#9CA3AF] space-y-1">
            <p className="m-0">Email: contact@gym.com</p>
            <p className="m-0">Phone: (123) 456-7890</p>
            <p className="m-0">Địa chỉ: 123 Đường ABC, Quận XYZ</p>
          </div>
        </div>

        {/* Theo dõi */}
        <div className="flex-1 ">
          <p className="font-semibold text-lg mb-2">Theo dõi chúng tôi</p>
          <div className="flex text-[#9CA3AF] gap-4">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
      </div>

      {/* --- Copyright --- */}
      <div className="text-center text-[#9CA3AF] w-full md:max-w-[1248px]">
        <hr className="border-gray-600 my-4" />
        <p>© 2024 Gym Management. All rights reserved.</p>
      </div>
    </div>
  );
}
