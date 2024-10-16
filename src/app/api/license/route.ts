// src/app/api/licenses/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/utils/db";

// Función que permite CORS
function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Cambia "*" por tu dominio en producción
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function OPTIONS() {
  // Devuelve una respuesta vacía para las solicitudes OPTIONS (preflight)
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

export async function POST(request: Request) {
  const { licenseCode } = await request.json();

  // Llama al procedimiento almacenado
  const { rows } = await pool.query(
    "SELECT validate_and_use_license($1) AS valid",
    [licenseCode]
  );

  const valid = rows[0].valid;

  const response = NextResponse.json({ valid });
  
  // Configuramos los encabezados de CORS
  return setCorsHeaders(response);
}