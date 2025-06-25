import { NextResponse } from "next/server";
import { prisma } from "./prisma";


export async function createUser(email:string,clerkId:string) {
   try{
    const user=await prisma.user.create({
      data:{
        email:email,
        clerkId:clerkId,
        credits:5,
        subscriptionStatus:"FREE",
      }
    })

    return NextResponse.json({user},{status:201})
   }catch(error){
    console.log(error)
    return NextResponse.json({error:"Failed to create user"},{status:500})
   }
    
}