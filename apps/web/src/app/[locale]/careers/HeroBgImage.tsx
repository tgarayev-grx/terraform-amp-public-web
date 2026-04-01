import Image from "next/image";
import heroBg from "@/app/[locale]/careers/(assets)/business-executives-interacting.webp";

export function HeroBgImage() {
  return (
    <div className="relative h-[280px] w-full overflow-hidden bg-surface-canvas sm:h-[360px] md:h-[440px] lg:h-[600px]">
      <div className="absolute inset-x-0 top-0 h-full">
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "25% 50%" }}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-y-0 left-0 z-10 w-[80px] bg-gradient-to-r from-surface-canvas to-transparent sm:w-[119px] md:w-[206px] lg:w-[386px]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[100px] bg-gradient-to-t from-surface-base to-transparent sm:h-[124px] md:h-[182px] lg:h-[329px]" />
    </div>
  );
}
