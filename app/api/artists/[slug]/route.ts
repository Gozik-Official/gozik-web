import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { slug: string };

export async function GET(_req: Request, { params }: { params: Params }) {
  try {
    const artist = await prisma.artist.findUnique({
      where: { slug: params.slug },
      include: { releases: true },
    });

    if (!artist) {
      return NextResponse.json({ ok: false, error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(artist);
  } catch (e: any) {
    console.error("GET /api/artists/[slug] error:", e);
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
