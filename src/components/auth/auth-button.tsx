'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { useAuth } from '@clerk/nextjs'

export const AuthButton = () => {
    const {userId} = useAuth()
    
    if(userId){
        return (
            <div className="flex items-center gap-4" >
                <UserButton appearance={{
                    elements:{
                        avatarBox: 'h-10 w-10'
                    }
                }} />
            </div>
        )
    }
    
  return (
    <div className="flex items-center gap-4">
      <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
        <Button variant="outline">
        ログイン
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button variant="default">
          新規登録
        </Button>
      </SignUpButton>
    </div>
  )
}
