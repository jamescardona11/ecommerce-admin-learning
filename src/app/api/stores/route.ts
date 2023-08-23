
import {NextResponse} from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    
    const { userId } = auth();
    const body = await req.json()
    const { name }: {name: string | null } = body
    console.log('[STORES_POST', name)

    if(userId == null){
      return new NextResponse('Unauthorized', {status: 401})
    }

    if(name == null){
      return new NextResponse('Missing name', {status: 400})
    }

    const store = await prismadb.store.create({
      data: {
        userId,
        name
      }
    })

    return NextResponse.json(store)

  }catch(error){
    console.log('[STORES_POST', error)
  }
}