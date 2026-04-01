import { getTranslations } from "next-intl/server";

import { BCHIcon } from "@grx/ui/icons/BCHIcon";
import { BTCIcon } from "@grx/ui/icons/BTCIcon";
import { DASHIcon } from "@grx/ui/icons/DASHIcon";
import { DOGEIcon } from "@grx/ui/icons/DOGEIcon";
import { EOSIcon } from "@grx/ui/icons/EOSIcon";
import { ETHIcon } from "@grx/ui/icons/ETHIcon";
import { ETHWIcon } from "@grx/ui/icons/ETHWIcon";
import { EURIcon } from "@grx/ui/icons/EURIcon";
import { EVERIcon } from "@grx/ui/icons/EVERIcon";
import { LINKIcon } from "@grx/ui/icons/LINKIcon";
import { LTCIcon } from "@grx/ui/icons/LTCIcon";
import { SHIBIcon } from "@grx/ui/icons/SHIBIcon";
import { TRXIcon } from "@grx/ui/icons/TRXIcon";
import { UNIIcon } from "@grx/ui/icons/UNIIcon";
import { USDCIcon } from "@grx/ui/icons/USDCIcon";
import { USDTIcon } from "@grx/ui/icons/USDTIcon";
import { WAVESIcon } from "@grx/ui/icons/WAVESIcon";
import { XLMIcon } from "@grx/ui/icons/XLMIcon";
import { XRPIcon } from "@grx/ui/icons/XRPIcon";
import { ZECIcon } from "@grx/ui/icons/ZECIcon";

const iconProps = {
  className: "rounded-full flex-shrink-0",
  style: {
    boxShadow: "var(--shadow-crypto-icon)",
  },
};

export async function AcceptableCryptoList() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-bounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("Pay.Root.acceptableCrypto.title")}
          </h3>
          <h4 className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
            {t("Pay.Root.acceptableCrypto.subtitle")}
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
}
