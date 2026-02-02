"use client";

import { memo } from "react";
import Image from "next/image";
import clsx from "clsx";

import howItWorksSlide1 from "./(assets)/how-it-works-slide-1.png";
import howItWorksSlide2 from "./(assets)/how-it-works-slide-2.png";
import howItWorksSlide3 from "./(assets)/how-it-works-slide-3.png";
import howItWorksSlide4 from "./(assets)/how-it-works-slide-4.png";

import {
  SliderRoot,
  SliderContainer,
  SliderDots,
  SliderContent,
  SliderSlideStack,
  useSliderContext,
} from "./Slider";

const SLIDES = [
  {
    title: "Create Invoices",
    description:
      "Index the currency and amount for the product and provide the payment link to your client.",
    image: howItWorksSlide1,
  },
  {
    title: "Auto conversion is set up automatically",
    description: "Invoice in crypto and get paid in Euro.",
    image: howItWorksSlide2,
  },
  {
    title: "Scan QR code to provide payment in selected cryptocurrency",
    description:
      "Get full access to all the features inside your merchant account.",
    image: howItWorksSlide3,
  },
  {
    title: "Complete your payment",
    description: "Start your journey with GRX Pay by registering your account.",
    image: howItWorksSlide4,
  },
];

export const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <section className="flex flex-col items-center px-4 lg:px-8 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded font-bold text-[28px] lg:text-4xl leading-[32px]">
            How it works?
          </h3>
          <h4 className="font-medium text-neutral-700 lg:text-[20px] text-base lg:leading-[26px]">
            Start your journey with GRX Pay by registering your account
          </h4>
        </div>

        <SliderRoot totalSlides={SLIDES.length}>
          <SliderContainer
            className="relative flex lg:flex-row flex-col justify-between lg:gap-0 bg-neutral-100 rounded-3xl min-h-[300px] md:min-h-[700px] lg:min-h-[400px] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: "pan-y" }}
          >
            {/* Mobile: dots first, then text, then image. Desktop: text + dots left, image right */}
            <div className="flex flex-col lg:flex-1 p-6 lg:p-8 lg:min-w-0">
              <SliderDots
                className="lg:hidden relative flex items-center pt-0 pb-4 w-full min-h-[40px]"
                styles={{
                  root: {
                    left: "calc(50% - 32px)",
                  },
                }}
              />

              <SliderContent className="flex flex-col lg:flex-1 lg:justify-center gap-4">
                <HowItWorksSlideContent />
              </SliderContent>

              <SliderDots className="hidden relative lg:flex items-center lg:mt-auto lg:pt-4 lg:pb-0 lg:w-auto" />
            </div>

            <SliderSlideStack className="relative flex-shrink-0 w-full lg:w-[50%] min-h-[250px] sm:min-h-[400px] md:min-h-[488px] lg:min-h-[400px]">
              {SLIDES.map((s, idx) => (
                <div key={s.title} className="relative w-full h-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    className={clsx(
                      "w-full object-bottom object-contain",
                      idx === 0 ? "lg:pt-5" : ""
                    )}
                    fill
                    priority={idx === 0}
                    draggable={false}
                  />
                </div>
              ))}
            </SliderSlideStack>
          </SliderContainer>
        </SliderRoot>
      </div>
    </section>
  );
});
HowItWorksSection.displayName = "HowItWorksSection";

function HowItWorksSlideContent() {
  const { currentIndex } = useSliderContext();
  const slide = SLIDES[currentIndex];
  if (!slide) return null;
  return (
    <>
      <h5 className="font-unbounded font-bold text-neutral-1000 text-xl lg:text-2xl">
        {slide.title}
      </h5>
      <p className="text-neutral-700 text-base lg:text-lg leading-relaxed">
        {slide.description}
      </p>
    </>
  );
}
