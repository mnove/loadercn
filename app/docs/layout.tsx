import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getLoaderSummaries } from "@/lib/loader-items"

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const items = getLoaderSummaries()
  return (
    <SidebarProvider
      className="flex-col [--header-height:calc(--spacing(14)+1px)]"
      style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
    >
      <SiteHeader items={items} sidebarTrigger />
      <div className="flex flex-1">
        <DocsSidebar
          items={items}
          className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
        />
        <SidebarInset>
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
