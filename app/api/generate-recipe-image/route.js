import { NextResponse } from "next/server";

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export async function POST(req) {
  const { prompt } = await req.json();

  const randomSeed = generateRandomNumber();
  const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

  await fetch(imageURL);

  return NextResponse.json({ url: imageURL });
}
