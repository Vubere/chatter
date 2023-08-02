import { NextResponse } from "next/server";




export async function POST (req:Request) {
  const body = req.body


  return NextResponse.json({
    status: 200,
    message: 'Updated successfully',
    error: false
  })
}