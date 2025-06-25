import { createUser } from '@/lib/user'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('Webhook received:', new Date().toISOString())
  
  const evt = await verifyWebhook(req)
  console.log('Webhook event type:', evt.type)
  console.log('Webhook event data:', JSON.stringify(evt.data, null, 2))

  // Do something with payload
  // For this guide, log payload to console
  if (evt.type === 'user.created') {
      const {id,email_addresses}=evt.data
      const email=email_addresses[0].email_address
        try{
        const user=await createUser(email,id)
        console.log(user)
        return NextResponse.json({message:"User created successfully"},{status:201})
        }catch(error){
            console.log(error)
            return NextResponse.json({error:"Failed to create user"},{status:500})
        }
    }
    return NextResponse.json({message:"Webhook received"},{status:200})
}