import { NextResponse } from "next/server";

import { getVersion } from "@/config/docs-navigation";
import { readSpecJson } from "@/lib/spec";

type RouteParams = Promise<{ product: string; version: string }>;

export async function GET(_request: Request, context: { params: RouteParams }) {
  const { product, version } = await context.params;
  if (!getVersion(product, version)) {
    return new NextResponse(null, { status: 404 });
  }
  const json = await readSpecJson(product, version);
  if (!json) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(json, {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
