"use client";

import { RoadmapStep } from "@/data/roadmap";
import { Course, PdfLesson } from "@/data/courses";
import RoadmapStageCard from "./RoadmapStageCard";

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
  completedStageIds: (number | string)[];
  currentStageId: number | string;
  onToggleStage: (stageId: number | string) => void;
  onOpenPdf: (course: Course, lesson: PdfLesson) => void;
}

export default function RoadmapTimeline({
  steps,
  completedStageIds,
  currentStageId,
  onToggleStage,
  onOpenPdf,
}: RoadmapTimelineProps) {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
      {steps.map((step, idx) => {
        const stageNum = idx + 1;
        const isCompleted = completedStageIds.some((id) => String(id) === String(step.id));
        const isCurrent = String(currentStageId) === String(step.id);

        return (
          <div key={step.id} className="relative">
            {/* Timeline Node Indicator on the vertical line */}
            <div
              className={`absolute -left-6 sm:-left-8 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all z-10 ${
                isCompleted
                  ? "bg-emerald-500 border-white ring-4 ring-emerald-100"
                  : isCurrent
                  ? "bg-[#173B70] border-white ring-4 ring-blue-100"
                  : "bg-white border-slate-300"
              }`}
            />

            <RoadmapStageCard
              step={step}
              stageNumber={stageNum}
              totalStages={steps.length}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              onToggleComplete={() => onToggleStage(step.id)}
              onOpenPdf={onOpenPdf}
              defaultExpanded={idx < 3}
            />
          </div>
        );
      })}
    </div>
  );
}
