"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function GameError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(456);
  }, [error]);

  return (
    <div>
      <h2>Shit!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
