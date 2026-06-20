"use client"

import { ClipboardList, HeartHandshake, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TabId } from "./data"

const tabs: { id: TabId; label: string; icon: typeof ClipboardList }[] = [
  { id: "triagem", label: "Triagem", icon: ClipboardList },
  { id: "pacientes", label: "Pacientes", icon: Users },
  { id: "atendimento", label: "Atendimento", icon: HeartHandshake },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <nav
      aria-label="Navegação principal"
      className="sticky bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          const Icon = tab.icon
          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "bg-transparent",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.8} />
                </span>
                <span>{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
