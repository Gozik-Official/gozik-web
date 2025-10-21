import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 Route POST — création d'un artiste
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const artist = await prisma.artist.create({
      data: {
        stage_name: body.stage_name,
        slug: body.slug,
        country_code: body.country_code ?? null,
        genres: body.genres ?? [],
        short_bio: body.short_bio ?? null,
      },
    });
    return NextResponse.json(artist);
  } catch (e: any) {
    console.error("POST /api/artists error:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}

// 🔹 Route GET — récupération des artistes
export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: { created_at: "desc" }, // ✅ snake_case selon ton schéma
      select: {
        id: true,
        stage_name: true,
        slug: true,
        country_code: true,
        genres: true,
        short_bio: true,
        releases: {
          select: {
            id: true,
            title: true,
            release_date: true, // ✅ existe bien dans ton schéma
            cover_url: true,
          },
          take: 3,
          orderBy: { release_date: "desc" },
        },
      },
    });

    return NextResponse.json(artists);
  } catch (e: any) {
    console.error("GET /api/artists error:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
