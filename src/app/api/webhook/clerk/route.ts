import { createUser } from '@/lib/user'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    if (evt.type === 'user.created') {
        console.log('userId:', evt.data.id)
        const user=await createUser(evt.data.email_addresses[0].email_address,evt.data.id)
        console.log(user)
        return NextResponse.json({message:"User created successfully"},{status:201})
    }
    return NextResponse.json({message:"Webhook received"},{status:200})
}