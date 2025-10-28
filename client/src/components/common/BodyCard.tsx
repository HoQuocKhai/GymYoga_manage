import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import { getCourses } from "../../apis/user.api";
import { useSortedCourses } from "../../hooks/useSortedCourses";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function BodyCard() {
  const { courses } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();

  const sortedCourses = useSortedCourses(courses);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Kiểm tra kích thước màn hình
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    dispatch(getCourses());

    handleResize();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
  };

  return (
    <div className="pb-[64px] flex flex-col items-center">
      <p className="text-center pt-[64px] pb-[48px] text-[35.3px] font-[700]">
        Các lớp học phổ biến
      </p>

      <div className="w-3/4">
        <Slider {...settings}>
          {sortedCourses &&
            sortedCourses.length > 0 &&
            sortedCourses.map((course) => (
              <Card
                key={course.id}
                className="xl:w-[395px] md:w-[224px] sm:[343px] shadow-[0px_4px_6px_-2px_#0000000d] !border-none md:!h-[404px] flex flex-col gap-10 hover:-translate-y-2 duration-200"
              >
                <Card.Img variant="top" src={course.imageUrl} />
                <Card.Body>
                  <Card.Title className="font-inter font-[700] text-[23.9px] leading-[28px] tracking-[0px] align-middle">
                    {course.type}
                  </Card.Title>
                  <Card.Text className="text-[18.6px] text-[#4B5563] font-[400]">
                    {course.description}
                  </Card.Text>
                  <button className="bg-[#2563EB] text-white !w-[109px] !text-left pl-3 pr-1 py-2 !rounded-[8px] hover:px-6 hover:!rounded-[3px] transition-all duration-200 ease-in-out hover:animate-pulse">
                    Đặt lịch
                  </button>
                </Card.Body>
              </Card>
            ))}
        </Slider>
      </div>
    </div>
  );
}
