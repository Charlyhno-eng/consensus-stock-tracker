import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { stockCodes } from '@/utils/stockCodes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get('sector');

  if (!sector || !stockCodes[sector]) {
    return NextResponse.json({ error: 'Invalid or missing sector' }, { status: 400 });
  }

  try {
    const results: Record<string, { name: string; consensus: string }[]> = {};

    const stocks = stockCodes[sector];

    for (const [code, stockName] of Object.entries(stocks)) {
      const url = `https://www.boursorama.com/cours/consensus/${code}/`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });

      if (!response.ok) {
        console.error(`Failed to fetch for ${stockName} (${code})`);
        continue;
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const container = $('.u-relative');
      const table = container.find('table.c-table').first();

      if (!table.length) {
        console.error(`Table not found for ${stockName} (${code})`);
        continue;
      }

      const data: { name: string; consensus: string }[] = [];
      table.find('tbody tr').each((i, tr) => {
        const cells: string[] = [];
        $(tr).find('th, td').each((j, cell) => {
          cells[j] = $(cell).text().trim().replace(/\s+/g, ' ');
        });

        if (cells[0] && cells[5]) {
          data.push({ name: cells[0], consensus: cells[5] });
        }
      });

      results[stockName] = data;
    }

    return NextResponse.json(results);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message ?? 'Unknown error' }, { status: 500 });
  }
}
