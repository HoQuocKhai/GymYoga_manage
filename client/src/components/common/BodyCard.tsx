import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores/store";
import { useEffect } from "react";
import { getCourses } from "../../apis/user.api";
import { useSortedCourses } from "../../hooks/useSortedCourses";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BodyCard() {
  const { courses } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();

  const sortedCourses = useSortedCourses(courses);

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  return (
    <div className="pb-[64px] flex flex-col items-center">
      <p className="text-center pt-[64px] pb-[48px] text-[35.3px] font-[700]">
        Các lớp học phổ biến
      </p>
      <div className="md:flex gap-[2rem] justify-center items-center grid">
        {sortedCourses &&
          sortedCourses.length > 0 &&
          sortedCourses.map((course) => (
            <Card
              key={course.id}
              className="xl:w-[395px] md:w-[224px] sm:[343px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] !border-none md:!h-[404px] flex flex-col gap-10 hover:-translate-y-2 duration-200"
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
      </div>
    </div>
  );
}
