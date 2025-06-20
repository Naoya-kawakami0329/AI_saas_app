import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from '../ui/button'

export const AuthButton = () => {
  return (
    <div className="flex items-center gap-4">

      <SignInButton mode="modal">
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
