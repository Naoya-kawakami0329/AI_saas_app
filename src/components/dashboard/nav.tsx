'use client'

import { usePathname } from 'next/navigation'
import { navItems } from '@/config/nav'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AuthButton } from '../auth/auth-button'
const DashboardNav = () => {
  const pathname = usePathname()
  return (
    <nav className="grid gap-2 items-start">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          className={cn(
            'justify-start',
            pathname === item.href && 'bg-amber-200 text-primary'
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.title}
          </Link>
        </Button>
      ))}
      <div className="my-4 px-4 md:hidden">
        <AuthButton />
      </div>
    </nav>
  )
}

export default DashboardNav
