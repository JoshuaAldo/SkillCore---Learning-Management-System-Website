import React from "react";
import PropTypes from "prop-types";
import { FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContentText({ content, handleNext }) {
  return (
    <div className="p-8">
      <div className="max-w-screen mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            {content?.title}
          </h1>
        </div>
        <div
          className="glass-card rounded-2xl p-8 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content?.text }}
        />
        <div className="mt-8 flex justify-end">
          <Button
            variant="gradient"
            size="lg"
            className="w-full sm:w-auto bg-[#420ecf] hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm sm:text-base rounded-lg flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 transition-all duration-300"
            onClick={() => handleNext(content)}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Go to Next Content
          </Button>
        </div>
      </div>
    </div>
  );
}

ContentText.propTypes = {
  content: PropTypes.object,
  handleNext: PropTypes.func,
};
