import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'

export const AuthButton = () => {
  return (
    <div className="flex items-center gap-4">

      <SignInButton>
        ログイン
      </SignInButton>
      <SignUpButton>
        新規登録
      </SignUpButton>
    </div>
  )
}
