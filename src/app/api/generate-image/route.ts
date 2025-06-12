import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
    const { prompt } = await req.json();

    const response = await fetch(`https://api.openai.com/v1/images/generations`, {
        method: "POST",
    });
   } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
   }
}