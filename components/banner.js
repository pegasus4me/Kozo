"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const Banner = () => {
  return (
    <Marquee className="flex h-4  w-full bg-green-500 p-4 ">
      <p className="text-md font-medium text-stone-900 m-4">
        kuzo is still in beta, if you find any bug please report it
      </p>

      <p className="text-md font-medium text-stone-900 m-4">
        kuzo는 아직 베타 버전이므로 버그를 발견하면 신고해 주세요.
      </p>
      <p className="text-md font-medium text-stone-900 m-4">
        kuzo est encore en beta, si vous trouvez un bug, merci de le signaler
      </p>
    </Marquee>
  );
};

export default Banner;
