import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db'; // Tämä on tietokantayhteyden tiedosto

export async function GET() {
  try {
    // Tee SQL-kysely tietokantaan ja valitse kaksi string-saraketta
    const result = await query('SELECT name, lastname FROM test'); // Vaihda taulun ja sarakkeiden nimet

    // Palauta JSON-muotoinen vastaus
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching data:', error);

    // Palauta virheviesti JSON-muodossa
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}
