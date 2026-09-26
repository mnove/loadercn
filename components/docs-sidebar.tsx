"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal } from "lucide-react"
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
import { CATEGORIES, CATEGORY_ICONS, loaderComponents } from "@/lib/loaders"

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
                      const Loader =
                        loaderComponents[
                          item.name as keyof typeof loaderComponents
                        ]
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            size="sm"
                            isActive={pathname === href}
                            render={link(href)}
                          >
                            <span
                              aria-hidden="true"
                              className="flex size-5 shrink-0 items-center justify-center [content-visibility:auto]"
                            >
                              <Loader
                                size={
                                  item.name === "classic-progress" ? 20 : 16
                                }
                              />
                            </span>
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
