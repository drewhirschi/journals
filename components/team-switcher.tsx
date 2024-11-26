"use client"

import * as React from "react"

import { ChevronsUpDown, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

import { BasejumpAccount } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "./ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { browswerClient } from "@/utils/supabase/client"

export function TeamSwitcher({
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const supabase = browswerClient()
  const [activeTeam, setActiveTeam] = React.useState<BasejumpAccount | null>(null)
  const [accounts, setTeams] = useState<BasejumpAccount[]>([])

  const [newJournalIsOpen, setIsOpen] = useState(false)
  const [newJournalName, setAccountName] = useState('')
  const [newJournalIsShared, setIsShared] = useState(false)

  useEffect(() => {


    supabase.rpc('get_accounts').returns<BasejumpAccount[]>().then(({ error, data }) => {
      if (error) {
        console.error(error)
        return
      }
      setTeams(data)

      setActiveTeam(data[0])
    })

  }, [])

  const handleCreateNewJournal = async () => {
    if (newJournalName.trim() === '') {
      alert('Please enter an account name')
      return
    }

    // Here you would typically send the data to your backend
    console.log('Creating account:', { name: newJournalName, shared: newJournalIsShared })

    const { data, error } = await supabase.rpc('create_account', {
      name: newJournalName,
      slug: newJournalName.replaceAll(" ", "-")
    });

    // Reset form and close modal
    setAccountName('')
    setIsShared(false)
    setIsOpen(false)
  }

  if (activeTeam === null) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={newJournalIsOpen} onOpenChange={setIsOpen}>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div> */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.personal_account ? "Personal" : "Shared"}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Personal Journals
              </DropdownMenuLabel>
              {accounts.filter((team) => team.personal_account).map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div> */}
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Shared Journals
              </DropdownMenuLabel>
              {accounts.filter((team) => !team.personal_account).map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div> */}
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />

              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Add journal</div>
                </DropdownMenuItem>
              </DialogTrigger>

            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
              <DialogDescription>
                Enter the details for your new account. Click create when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newJournalName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shared" className="text-right">
                  Shared
                </Label>
                <Switch
                  id="shared"
                  checked={newJournalIsShared}
                  onCheckedChange={setIsShared}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateNewJournal}>Create Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
