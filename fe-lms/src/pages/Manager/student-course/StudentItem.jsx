import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { useParams, useRevalidator } from "react-router-dom";
import { deleteStudentsCourse } from "../../../services/courseService";
import { Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentItem(props) {
  const revalidator = useRevalidator();

  const { id } = useParams();
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteStudentsCourse({ studentId: props.id }, id),
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={props.id}
      className="glass-card rounded-xl p-5 hover:bg-white/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <img src={props.imageUrl} alt="photo" />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-1">{props.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {props.email}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => handleDelete(props.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  totalCourse: PropTypes.number,
  id: PropTypes.number,
};
