"use client"

import { History, ClipboardList } from "lucide-react"
import { AppHeader } from "../app-header"
import type { RegistroHistorico } from "../data"

export function HistoryScreen({ registros }: { registros: RegistroHistorico[] }) {
  return (
    <div>
      <AppHeader
        title="Histórico"
        subtitle="Atendimentos com orientações salvas pela equipe."
      />

      <div className="space-y-3 px-5 py-5">
        {registros.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <History className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-foreground">Nenhum atendimento salvo</p>
            <p className="mt-1 text-xs text-muted-foreground text-pretty">
              As orientações salvas aparecerão aqui para consulta da equipe.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {registros.map((r) => (
              <li key={r.id} className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                    <ClipboardList className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{r.pacienteNome}</p>
                    <p className="text-xs text-muted-foreground">{r.pacienteResumo}</p>
                    <p className="mt-1 text-xs font-medium text-primary">{r.procedimentoNome}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{r.data}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
