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

export async function updateUser(email:string,clerkId:string) {
    try{
     const user=await prisma.user.update({
       where:{
        clerkId:clerkId
       },
       data:{
        email:email,
       }
     })
 
     return NextResponse.json({user},{status:200})
    }catch(error){
     console.log(error)
     return NextResponse.json({error:"Failed to update user"},{status:500})
    }
     
 }

 export async function deleteUser(clerkId:string) {
    try{
     const user=await prisma.user.delete({
       where:{
         clerkId:clerkId,
       }
     })
 
     return NextResponse.json({message:"User deleted successfully"},{status:200})
    }catch(error){
     console.log(error)
     return NextResponse.json({error:"Failed to delete user"},{status:500})
    }
     
 }