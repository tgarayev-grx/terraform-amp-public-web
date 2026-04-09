import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import {
  getNavGroupTitleForArticle,
  getProductBySlug,
  getVersion,
  isArticleInNav,
  type DocsProduct,
} from "@/config/docs-navigation";
import { readArticleSource } from "@/lib/read-article-source";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const BG = "#faf8f5";
const TEXT_STRONG = "#0a0a0a";
const TEXT_SOFT = "#525252";
const ACCENT = "#c48a0f";

function productDisplayLabel(product: DocsProduct): string {
  const stripped = product.label.replace(/^GRX\s+/i, "").trim();
  return stripped || product.slug;
}

function truncate(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

/** Icon-only paths from `HeaderLogo` (GRX mark). */
function OgGrxMark() {
  return (
    <svg
      width={56}
      height={42}
      viewBox="0 0 53 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#og_clip_mark)">
        <path
          d="M33.7734 12.2802C32.8117 12.0465 31.8053 11.9223 30.769 11.9223H18.4613C11.6641 11.9223 6.15379 17.2603 6.15377 23.8451C6.15377 28.941 9.4542 33.2902 14.0973 34.9962L9.7634 39.9996C3.98001 37.2428 0 31.4776 0 24.8118L8.724e-08 22.8783C8.63876e-06 13.5351 7.81865 5.96094 17.4634 5.96094H31.7669C34.0446 5.96094 36.2205 6.38343 38.2155 7.15186L33.7734 12.2802Z"
          fill={TEXT_STRONG}
        />
        <path
          d="M50.3942 39.9553H42.4108L34.5107 30.7715L38.5025 26.1797L50.3942 39.9553Z"
          fill={TEXT_STRONG}
        />
        <path
          d="M52.2235 10.3115L49.7419 8.29772L22.2861 39.9572H14.2197L44.9991 4.44947L42.4939 2.41676L52.8888 0L52.2235 10.3115Z"
          fill={TEXT_STRONG}
        />
        <path
          d="M21.6216 26.2642L26.029 21.2695H17.1309L12.8066 26.2642H21.6216Z"
          fill={TEXT_STRONG}
        />
      </g>
      <defs>
        <clipPath id="og_clip_mark">
          <rect width="53" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export async function getDocsArticleOgImageResponse(params: {
  product: string;
  version: string;
  slug: string;
}): Promise<ImageResponse> {
  const product = getProductBySlug(params.product);
  const version = getVersion(params.product, params.version);
  const article =
    product && version ? isArticleInNav(version.nav, params.slug) : undefined;
  const source =
    product && version
      ? await readArticleSource(product.id, params.version, params.slug)
      : null;

  const title =
    source?.title ?? article?.title ?? params.slug.replace(/-/g, " ");
  const description =
    source?.description ??
    `${product ? productDisplayLabel(product) : "Docs"} documentation.`;
  const category =
    product && version
      ? getNavGroupTitleForArticle(version.nav, params.slug)
      : undefined;

  const boundedData = await readFile(
    join(process.cwd(), "public/fonts/Bounded-Variable.woff2")
  );

  let nunitoData: Buffer | null = null;
  try {
    const res = await fetch(
      "https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4XOGMasc.woff2"
    );
    if (res.ok) {
      nunitoData = Buffer.from(await res.arrayBuffer());
    }
  } catch {
    nunitoData = null;
  }

  const bodyFont = nunitoData ? "Nunito Sans" : "Bounded";

  const productLine = product ? productDisplayLabel(product) : "Docs";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        backgroundImage: `radial-gradient(circle at 88% 92%, rgba(255, 170, 90, 0.42) 0%, rgba(255, 210, 160, 0.18) 38%, transparent 58%)`,
        padding: 56,
        borderRadius: 28,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <OgGrxMark />
        <div
          style={{
            width: 1,
            height: 36,
            backgroundColor: "rgba(10, 10, 10, 0.18)",
          }}
        />
        <div
          style={{
            fontFamily: "Bounded",
            fontSize: 32,
            fontWeight: 700,
            color: TEXT_STRONG,
            letterSpacing: -0.5,
          }}
        >
          {productLine}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 920,
        }}
      >
        {category ? (
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 18,
              fontWeight: 700,
              color: ACCENT,
              textTransform: "none",
              letterSpacing: 0.2,
            }}
          >
            {category}
          </div>
        ) : null}
        <div
          style={{
            fontFamily: "Bounded",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            color: TEXT_STRONG,
            letterSpacing: -1.2,
          }}
        >
          {truncate(title, 72)}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 26,
            fontWeight: 400,
            lineHeight: 1.35,
            color: TEXT_SOFT,
          }}
        >
          {truncate(description, 160)}
        </div>
      </div>
    </div>,
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: "Bounded",
          data: boundedData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Bounded",
          data: boundedData,
          style: "normal",
          weight: 700,
        },
        ...(nunitoData
          ? ([
              {
                name: "Nunito Sans",
                data: nunitoData,
                style: "normal" as const,
                weight: 400,
              },
              {
                name: "Nunito Sans",
                data: nunitoData,
                style: "normal" as const,
                weight: 700,
              },
            ] as const)
          : []),
      ],
    }
  );
}
