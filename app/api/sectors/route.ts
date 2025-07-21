import { NextResponse } from 'next/server';
import { stockCodesPEA } from '@/utils/stockCodes';

export async function GET() {
  const sectors = Object.keys(stockCodesPEA);
  return NextResponse.json(sectors);
}
