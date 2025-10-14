"use client";

import { SignInEmailStep } from "@/features/auth/components/SignInEmailStep";
import { SignInOtpStep } from "@/features/auth/components/SignInOtpStep";
import { goToStep } from "@/features/auth/store/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const swiperRef = useRef<SwiperType | null>(null);
  const currentStep = useAppSelector((state) => state.auth.currentStep);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentStep);
    }
  }, [currentStep]);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      allowTouchMove={false}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => dispatch(goToStep(swiper.activeIndex))}
      className="register-slider max-w-[440px] !px-5"
      focusableElements={`[data-slot="form-control"]`}
      modules={[Navigation, Pagination]}
    >
      <SwiperSlide key="email">
        <SignInEmailStep />
      </SwiperSlide>
      <SwiperSlide key="otp">
        <SignInOtpStep />
      </SwiperSlide>
    </Swiper>
  );
};
