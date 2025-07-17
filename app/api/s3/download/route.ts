import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { filename } = await req.json();
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: filename,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return NextResponse.json({ url });
}