import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export default function Courses() {
  const data = useLoaderData();
  return (
    <section id="LatestCourse" className="lg:col-span-1">
      <div className="stat-card h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Latest Courses</h3>
          <TrendingUp size={20} className="text-primary" />
        </div>
        <div className="space-y-4">
          {data?.overviews?.courses.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-24 h-14 bg-gradient-primary rounded-lg flex items-center justify-center">
                <img
                  src={item.thumbnail_url}
                  className="w-full h-full object-cover rounded-lg"
                  alt="thumbnail"
                />
              </div>
              <div className="w-full">
                <Link
                  to={`/manager/courses/${item._id}`}
                  className="font-semibold text-md line-clamp-1"
                >
                  {item.name}
                </Link>
                <div className="flex items-center gap-[6px] mt-[6px] text-sm">
                  <img src="/assets/images/icons/crown-purple.svg" alt="icon" />
                  <p className="text-[#838C9D] ">{item?.category?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
