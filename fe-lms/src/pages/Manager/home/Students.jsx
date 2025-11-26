import React from "react";
import { useLoaderData } from "react-router-dom";
import { Users, BookOpen } from "lucide-react";

export default function Students() {
  const data = useLoaderData();
  return (
    <section id="LatestStudents" className="lg:col-span-1">
      <div className="stat-card h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Latest Students</h2>
          <Users size={20} className="text-primary" />
        </div>
        <div className="space-y-4">
          {data?.overviews?.students.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-24 h-14 bg-gradient-secondary rounded-full flex items-center justify-center">
                <img
                  src={item?.photo_url}
                  className="w-full h-full object-cover rounded-lg"
                  alt="thumbnail"
                />
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-md line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-[6px] mt-[6px] text-sm">
                  <BookOpen size={16} color="#420ecf" />
                  <p className="text-[#838C9D]">
                    {item?.courses?.length} Course Joined
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
