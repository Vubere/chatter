import {NextResponse} from 'next/server'
import BlogPostModel from '../../schema'




export async function GET(req:Request,{params}:{params:{user:string}}) {
  if(!params){
    return NextResponse.json({
      status: 403,
      message: 'Bad request, missing user id path',
      error: true
    })
  }
  const {searchParams} = new URL(req.url)
  const limit = Number(searchParams.get('limit'))||20
  const offset = searchParams.get('offset')
  const {user} = params

  const blogs = await BlogPostModel.find({state:'published'}).limit(limit)

  return NextResponse.json({
    status: 200,
    message: ''
  })
}
