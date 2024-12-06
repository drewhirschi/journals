"use client"

import * as React from "react"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ScrollText,
  Settings2,
  SquareTerminal
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { UserResponse } from "@supabase/supabase-js"

// This is sample data.


export function AppSidebar({ acctId, user, ...props }: React.ComponentProps<typeof Sidebar> & { user: Promise<UserResponse>, acctId: string }) {

  const data = {

    navMain: [
      {
        title: "Journal",
        url: "#",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "Today",
            url: `/protected/${acctId}/entry/` + new Date().toLocaleDateString('en-CA'),
          },
          {
            title: "Entries",
            url: `/protected/${acctId}`,
          },
          {
            title: "Search",
            url: `/protected/${acctId}/search`,
          },


        ],
      },
      // {
      //   title: "Transcription",
      //   url: "#",
      //   icon: ScrollText,
      //   isActive: true,
      //   items: [

      //     {
      //       title: "Upload",
      //       url: "/protected/upload",
      //     },
      //     {
      //       title: "In progress",
      //       url: "/protected/upload/progress",
      //     },
      //     {
      //       title: "Need review",
      //       url: "/protected/upload/review",
      //     },

      //   ],
      // },

      // {
      //   title: "Settings",
      //   url: "#",
      //   icon: Settings2,
      //   items: [
      //     {
      //       title: "General",
      //       url: "#",
      //     },
      //     {
      //       title: "Team",
      //       url: "#",
      //     },
      //     {
      //       title: "Billing",
      //       url: "#",
      //     },
      //     {
      //       title: "Limits",
      //       url: "#",
      //     },
      //   ],
      // },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
