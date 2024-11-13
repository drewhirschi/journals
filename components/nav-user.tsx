"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Laptop,
  LogOut,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "./ui/skeleton"
import { Suspense, use } from "react"
import { browswerClient } from "@/utils/supabase/client"
import { UserResponse } from "@supabase/supabase-js"
import { useTheme } from "next-themes"


function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="animate-pulse">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


export function NavUser({ user }: { user: Promise<UserResponse> }) {
  const supabase = browswerClient();
  const { theme, setTheme } = useTheme();

  const { isMobile } = useSidebar()
  const userRes = use(user)

  const ICON_SIZE = 16;


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Suspense fallback={<NavUserSkeleton />}>

                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userRes.data?.user?.app_metadata.avatar} alt={userRes.data?.user?.app_metadata.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userRes.data?.user?.app_metadata.name}</span>
                  <span className="truncate text-xs">{userRes.data?.user?.email}</span>
                </div>
              </Suspense>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userRes.data?.user?.app_metadata.avatar} alt={userRes.data?.user?.app_metadata.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userRes.data?.user?.app_metadata.name}</span>
                  <span className="truncate text-xs">{userRes.data?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(e) => setTheme(e)}
            >
              <DropdownMenuRadioItem className="flex gap-2" value="light">
                <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
                <span>Light</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="flex gap-2" value="dark">
                <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
                <span>Dark</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="flex gap-2" value="system">
                <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
                <span>System</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await supabase.auth.signOut()
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
