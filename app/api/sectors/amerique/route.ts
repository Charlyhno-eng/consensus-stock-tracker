import { NextResponse } from 'next/server';
import { stockCodesAmerique } from '@/utils/stockCodesAmerique';

export async function GET() {
  const sectors = Object.keys(stockCodesAmerique);
  return NextResponse.json(sectors);
}
