import { Card } from "react-bootstrap";

export default function BodyCard() {
  return (
    <div className="pb-[64px] flex flex-col items-center">
      <p className="text-center pt-[64px] pb-[48px] text-[35.3px] font-[700]">
        Các lớp học phổ biến
      </p>
      <div className="md:flex gap-[2rem] justify-center items-center grid">
        <Card className="xl:w-[395px] md:w-[224px] sm:[343px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] !border-none md:!h-[404px] flex flex-col gap-14 hover:-translate-y-2 duration-200">
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/daqjoat73/image/upload/v1760609733/imageCard1_li42pj.png"
          />
          <Card.Body>
            <Card.Title className="font-inter font-[700] text-[23.9px] leading-[28px] tracking-[0px] align-middle">
              Gym
            </Card.Title>
            <Card.Text className="text-[18.6px] text-[#4B5563] font-[400]">
              Tập luyện với các thiết bị hiện đại.
            </Card.Text>
            <button className="bg-[#2563EB] text-white !w-[109px] !text-left pl-3 pr-1 py-2 !rounded-[8px] hover:px-6 hover:!rounded-[3px] transition-all duration-200 ease-in-out hover:animate-pulse">
              Đặt lịch
            </button>
          </Card.Body>
        </Card>
        <Card className="xl:w-[395px] md:w-[224px] sm:[343px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] !border-none md:!h-[404px] flex flex-col gap-14 hover:-translate-y-2 duration-200 ">
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/daqjoat73/image/upload/v1760613019/ImageCard2_ekcfhy.png"
          />
          <Card.Body>
            <Card.Title className="font-inter font-[700] text-[23.9px] leading-[28px] tracking-[0px] align-middle">
              Yoga
            </Card.Title>
            <Card.Text className="text-[18.6px] text-[#4B5563] font-[400]">
              Thư giãn và cân bằng tâm trí.
            </Card.Text>
            <button className="bg-[#2563EB] text-white !w-[109px] !text-left pl-3 pr-1 py-2 !rounded-[8px] hover:px-6 hover:!rounded-[3px] transition-all duration-200 ease-in-out hover:animate-pulse">
              Đặt lịch
            </button>
          </Card.Body>
        </Card>
        <Card className="xl:w-[395px] md:w-[224px] sm:[343px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] !border-none md:!h-[404px] flex flex-col gap-7 hover:-translate-y-2 duration-200 ">
          <Card.Img
            variant="top"
            src="https://res.cloudinary.com/daqjoat73/image/upload/v1760613110/ImageCard3_eyocgx.png"
          />
          <Card.Body>
            <Card.Title className="font-inter font-[700] text-[23.9px] leading-[28px] tracking-[0px] align-middle">
              Zumba
            </Card.Title>
            <Card.Text className="text-[18.6px] text-[#4B5563] font-[400]">
              Đốt cháy calories với những điệu nhảy sôi động.
            </Card.Text>
            <button className="bg-[#2563EB] text-white !w-[109px] !text-left pl-3 pr-1 py-2 !rounded-[8px] hover:px-6 hover:!rounded-[3px] transition-all duration-200 ease-in-out hover:animate-pulse">
              Đặt lịch
            </button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
