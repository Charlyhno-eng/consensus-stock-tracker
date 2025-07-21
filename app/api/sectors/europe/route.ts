import { NextResponse } from 'next/server';
import { stockCodesEurope } from '@/utils/stockCodesEurope';

export async function GET() {
  const sectors = Object.keys(stockCodesEurope);
  return NextResponse.json(sectors);
}
