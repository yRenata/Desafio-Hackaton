"use client"

import { useEffect } from "react"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function SelectModal({
  open,
  title,
  description,
  options,
  selected,
  multi = false,
  onClose,
  onSelect,
}: {
  open: boolean
  title: string
  description?: string
  options: string[]
  selected: string | string[]
  multi?: boolean
  onClose: () => void
  onSelect: (value: string) => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const isChosen = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : selected === opt

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-4 rounded-t-3xl border border-border bg-card p-5 pb-7 shadow-2xl">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground text-balance">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </button>
        </div>

        <ul className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto">
          {options.map((opt) => {
            const chosen = isChosen(opt)
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(opt)
                    if (!multi) onClose()
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                    chosen
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-foreground hover:bg-muted",
                  )}
                >
                  <span className="text-pretty">{opt}</span>
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      chosen ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    )}
                  >
                    {chosen ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {multi ? (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            Confirmar seleção
          </button>
        ) : null}
      </div>
    </div>
  )
}
