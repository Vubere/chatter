import {NextResponse} from "next/server";


export async function GET(req:Request){
  return NextResponse.json({
    error: true,
    message: 'This route requires a user id',
    status: 404
  })
}