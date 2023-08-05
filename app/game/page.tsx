"use client";

export default function Game() {
  try {
    throw new Error("error");
  } catch (e) {
    console.log(e);
  }
  return <div> this is Game Route</div>;
}
