import { NextResponse } from "next/server";
import { query } from "@/app/lib/db"; // Database connection
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // ID for the file

  // No ID provided, return all models
  if (!id) {
    try {
      const result = await query("SELECT * FROM models");
      return NextResponse.json(result.rows); // Return an array of models (ID and name)
    } catch (error) {
      console.error("Database query failed:", error);
      return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
    }
  }

  // ID provided, fetch the specific file
  try {

    const result = await query("SELECT path FROM models WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    const filePath = result.rows[0].path;

    try {
      await fs.promises.access(filePath);
    } catch (err) {
      return NextResponse.json({ error: "File does not exist" }, { status: 404 });
    }

    // Read and return the file
    const file = await fs.promises.readFile(filePath);
    const fileName = path.basename(filePath);
    const headers = new Headers({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      //"Access-Control-Allow-Origin": "*",
    });

    return new Response(file, { headers });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
