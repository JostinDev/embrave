import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  const requestBody = request.body;

  if (requestBody === null) {
    return NextResponse.json('Empty request body');
  }

  if (filename === null) return NextResponse.json('Empty filename');

  const blob = await put(filename, requestBody, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
