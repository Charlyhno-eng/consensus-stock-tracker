import { NextResponse } from 'next/server';
import { stockCodes } from '@/utils/stockCodes';

export async function GET() {
  const sectors = Object.keys(stockCodes);
  return NextResponse.json(sectors);
}
