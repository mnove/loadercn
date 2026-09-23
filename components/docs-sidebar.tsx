"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Grid2X2, LoaderCircle, Orbit, Terminal } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { LoaderSummary } from "@/lib/loader-items"
import { CATEGORIES } from "@/lib/loaders"

const CATEGORY_ICONS = {
  grid: Grid2X2,
  orbital: Orbit,
  classic: LoaderCircle,
}

export function DocsSidebar({
  items,
  ...props
}: { items: LoaderSummary[] } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const link = (href: string) => (
    <Link href={href} onClick={() => setOpenMobile(false)} />
  )

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/docs"}
                  render={link("/docs")}
                >
                  <Terminal />
                  <span>Installation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.id]
          return (
            <SidebarGroup key={category.id}>
              <SidebarGroupLabel>
                <Icon />
                <span className="ml-2">{category.label}</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items
                    .filter((item) => item.category === category.id)
                    .map((item) => {
                      const href = `/docs/${item.name}`
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            size="sm"
                            isActive={pathname === href}
                            render={link(href)}
                          >
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}
