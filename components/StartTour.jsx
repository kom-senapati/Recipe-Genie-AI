"use client";

import { TourSteps } from "@/lib/constants";
import { useShepherd } from "react-shepherd";

export default function StartTour() {
  const shepherd = useShepherd();
  const TourOptions = {
    useModalOverlay: true,
    defaultStepOptions: {
      cancelIcon: true,
      scrollTo: false,
      classes:
        "bg-base-100 shadow-xl p-5 w-96 rounded-lg border-2 border-indigo-500",
    },
  };
  const tour = new shepherd.Tour(TourOptions);
  tour.addSteps(TourSteps);

  return (
    <button className="btn btn-sm btn-secondary text-lg" onClick={tour.start}>
      Start Tour {"->"}
    </button>
  );
}
