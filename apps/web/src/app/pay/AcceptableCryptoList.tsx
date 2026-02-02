import { memo } from "react";

import { BCHIcon } from "./(icons)/BCHIcon";
import { BTCIcon } from "./(icons)/BTCIcon";
import { DASHIcon } from "./(icons)/DASHIcon";
import { DOGEIcon } from "./(icons)/DOGEIcon";
import { EOSIcon } from "./(icons)/EOSIcon";
import { ETHIcon } from "./(icons)/ETHIcon";
import { ETHWIcon } from "./(icons)/ETHWIcon";
import { EURIcon } from "./(icons)/EURIcon";
import { EVERIcon } from "./(icons)/EVERIcon";
import { LINKIcon } from "./(icons)/LINKIcon";
import { LTCIcon } from "./(icons)/LTCIcon";
import { SHIBIcon } from "./(icons)/SHIBIcon";
import { TRXIcon } from "./(icons)/TRXIcon";
import { UNIIcon } from "./(icons)/UNIIcon";
import { USDCIcon } from "./(icons)/USDCIcon";
import { USDTIcon } from "./(icons)/USDTIcon";
import { WAVESIcon } from "./(icons)/WAVESIcon";
import { XLMIcon } from "./(icons)/XLMIcon";
import { XRPIcon } from "./(icons)/XRPIcon";
import { ZECIcon } from "./(icons)/ZECIcon";

const iconProps = {
  className: "rounded-full flex-shrink-0",
  style: {
    boxShadow: "3.333px 6.667px 26.667px 0 rgba(0, 10, 62, 0.10)",
  },
};

export const AcceptableCryptoList = memo(function AcceptableCryptoList() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            How many currencies do you accept?
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            A lot. Break payment barriers with multi-currency support.
          </h4>
        </div>

        <div className="hidden xl:flex flex-col gap-8">
          <div className="flex justify-center items-center gap-12">
            <EOSIcon {...iconProps} width={40} height={40} />
            <ETHWIcon {...iconProps} width={40} height={40} />
            <BTCIcon {...iconProps} width={40} height={40} />
            <USDTIcon {...iconProps} width={40} height={40} />
            <ETHIcon {...iconProps} width={40} height={40} />

            <EURIcon {...iconProps} width={96} height={96} />

            <LTCIcon {...iconProps} width={40} height={40} />
            <USDCIcon {...iconProps} width={40} height={40} />
            <DOGEIcon {...iconProps} width={40} height={40} />
            <ZECIcon {...iconProps} width={40} height={40} />
            <BCHIcon {...iconProps} width={40} height={40} />
          </div>

          <div className="flex justify-center items-center gap-12">
            <WAVESIcon {...iconProps} width={40} height={40} />
            <SHIBIcon {...iconProps} width={40} height={40} />
            <LINKIcon {...iconProps} width={40} height={40} />
            <TRXIcon {...iconProps} width={40} height={40} />
            <XLMIcon {...iconProps} width={40} height={40} />
            <UNIIcon {...iconProps} width={40} height={40} />
            <EVERIcon {...iconProps} width={40} height={40} />
            <DASHIcon {...iconProps} width={40} height={40} />
            <XRPIcon {...iconProps} width={40} height={40} />
          </div>
        </div>

        <div className="hidden xl:hidden md:flex flex-col">
          <div className="flex justify-center items-center gap-12 mb-8">
            <BTCIcon {...iconProps} width={40} height={40} />
            <USDTIcon {...iconProps} width={40} height={40} />
            <ETHIcon {...iconProps} width={40} height={40} />

            <EURIcon {...iconProps} width={96} height={96} />

            <LTCIcon {...iconProps} width={40} height={40} />
            <USDCIcon {...iconProps} width={40} height={40} />
            <DOGEIcon {...iconProps} width={40} height={40} />
          </div>

          <div className="flex justify-center items-center gap-12 mb-10">
            <EOSIcon {...iconProps} width={40} height={40} />
            <ETHWIcon {...iconProps} width={40} height={40} />
            <ZECIcon {...iconProps} width={40} height={40} />
            <BCHIcon {...iconProps} width={40} height={40} />
            <WAVESIcon {...iconProps} width={40} height={40} />
            <SHIBIcon {...iconProps} width={40} height={40} />
            <LINKIcon {...iconProps} width={40} height={40} />
          </div>

          <div className="flex justify-center items-center gap-12">
            <TRXIcon {...iconProps} width={40} height={40} />
            <XLMIcon {...iconProps} width={40} height={40} />
            <UNIIcon {...iconProps} width={40} height={40} />
            <EVERIcon {...iconProps} width={40} height={40} />
            <DASHIcon {...iconProps} width={40} height={40} />
            <XRPIcon {...iconProps} width={40} height={40} />
          </div>
        </div>

        <div className="md:hidden flex flex-col w-full">
          <div className="flex justify-center items-center gap-6 min-[400px]:gap-12 mb-8">
            <EURIcon {...iconProps} width={96} height={96} />
          </div>
          <div className="flex justify-center items-center gap-6 min-[400px]:gap-12 mb-10">
            <BTCIcon {...iconProps} width={40} height={40} />
            <USDTIcon {...iconProps} width={40} height={40} />
            <ETHIcon {...iconProps} width={40} height={40} />
            <LTCIcon {...iconProps} width={40} height={40} />
          </div>
          <div className="flex justify-center items-center gap-6 min-[400px]:gap-12 mb-10">
            <USDCIcon {...iconProps} width={40} height={40} />
            <DOGEIcon {...iconProps} width={40} height={40} />
            <EOSIcon {...iconProps} width={40} height={40} />
            <ETHWIcon {...iconProps} width={40} height={40} />
          </div>
          <div className="flex justify-center items-center gap-6 min-[400px]:gap-12 mb-10">
            <ZECIcon {...iconProps} width={40} height={40} />
            <BCHIcon {...iconProps} width={40} height={40} />
            <WAVESIcon {...iconProps} width={40} height={40} />
            <SHIBIcon {...iconProps} width={40} height={40} />
          </div>
          <div className="flex justify-center items-center gap-6 min-[400px]:gap-12 mb-10">
            <LINKIcon {...iconProps} width={40} height={40} />
            <TRXIcon {...iconProps} width={40} height={40} />
            <XLMIcon {...iconProps} width={40} height={40} />
            <UNIIcon {...iconProps} width={40} height={40} />
          </div>
          <div className="flex justify-center items-center gap-6 min-[400px]:gap-12">
            <EVERIcon {...iconProps} width={40} height={40} />
            <DASHIcon {...iconProps} width={40} height={40} />
            <XRPIcon {...iconProps} width={40} height={40} />
          </div>
        </div>
      </div>
    </section>
  );
});
AcceptableCryptoList.displayName = "AcceptableCryptoList";
