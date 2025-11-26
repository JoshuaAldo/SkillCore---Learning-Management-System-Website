import React from "react";
import { Link } from "react-router-dom";

export default function CardCourse(props) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/8">
      <div className="aspect-video overflow-hidden">
        <img
          src={props.imageUrl}
          className="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>

      <div className="px-6 py-6">
        <Link
          to={`/student/detail-course/${props.id}`}
          className="text-lg font-semibold text-foreground mb-3"
        >
          {props.title}
        </Link>
        <div className="flex items-center gap-[6px] mt-[6px]">
          <img src="/assets/images/icons/crown-purple.svg" alt="icon" />
          <p className="text-[#838C9D]">{props.category}</p>
        </div>
      </div>
    </div>
  );
}
