"use client";

import { useEffect, useState } from "react";
import { getRelativeTime } from "@/lib/getRelativeTime";

type Props = {
  date: Date;
};

export default function RelativeTime({ date }: Props) {
  const [relative, setRelative] = useState(getRelativeTime(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setRelative(getRelativeTime(date));
    }, 60000); // toutes les 60 secondes

    return () => clearInterval(interval);
  }, [date]);

  return <span>{relative}</span>;
}
