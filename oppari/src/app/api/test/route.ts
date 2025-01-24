import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db'; // db connection
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // id  for the file

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // define result outside of the loop
    let result;

    // get path to the file from db
    try {
      result = await query('SELECT path FROM models WHERE id = $1', [id]);
    } catch (dbError) {
      console.error('Database query failed:', dbError);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const filePath = result.rows[0].path;

    // check that file exist
    try {
      await fs.promises.access(filePath);
    } catch (err) {
      return NextResponse.json({ error: 'File does not exist' }, { status: 404 });
    }

    // return file
    const file = await fs.promises.readFile(filePath);
    const fileName = path.basename(filePath);
    const headers = new Headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Access-Control-Allow-Origin': '*',
    });

    return new Response(file, { headers });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
