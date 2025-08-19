import React from "react";
import { Link } from "react-router-dom";

export default function CardCourse(props) {
  return (
    <>
      <div className="card flex items-center gap-5">
        <div className="flex shrink-0 w-[100px] h-20 rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img
            src={props.imageUrl}
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
        <div className="w-full">
          <Link
            to={`/student/detail-course/${props.id}`}
            className="font-bold text-xl leading-[30px] line-clamp-1"
          >
            {props.title}
          </Link>
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img src="/assets/images/icons/crown-purple.svg" alt="icon" />
            <p className="text-[#838C9D]">{props.category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
