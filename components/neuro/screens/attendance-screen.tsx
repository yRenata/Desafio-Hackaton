"use client"

import { ChevronRight, Lightbulb, Sparkles, Stethoscope } from "lucide-react"
import { AppHeader } from "../app-header"
import type { Paciente } from "../data"

export function AttendanceScreen({
  paciente,
  onBack,
  onProcedimento,
}: {
  paciente: Paciente
  onBack: () => void
  onProcedimento: () => void
}) {
  return (
    <div>
      <AppHeader
        title="Atendimento"
        subtitle="Revise o perfil do paciente antes de definir o procedimento."
        onBack={onBack}
      />

      <div className="space-y-4 px-5 py-5">
        <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
              {paciente.nome.charAt(0)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {paciente.nome}, {paciente.idade}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                {paciente.condicao || "Condição não informada"}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3 border-t border-border pt-4">
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <div className="flex flex-wrap gap-1.5">
                {paciente.sensibilidades.length ? (
                  paciente.sensibilidades.map((sensibilidade) => (
                    <span
                      key={sensibilidade}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground"
                    >
                      {sensibilidade}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">Sensibilidades não informadas</span>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                <span className="font-medium text-foreground">Abordagem:</span>{" "}
                {paciente.estrategia || "Acolhimento individualizado"}
              </p>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={onProcedimento}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          <Stethoscope className="h-4 w-4" />
          Definir procedimento
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
