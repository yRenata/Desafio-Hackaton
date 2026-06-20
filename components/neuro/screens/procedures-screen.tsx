"use client"

import { Check, Clock } from "lucide-react"
import { AppHeader } from "../app-header"
import { procedimentos, type Paciente, type Procedure } from "../data"
import { cn } from "@/lib/utils"

export function ProceduresScreen({
  paciente,
  selecionado,
  onSelect,
  onBack,
  onGerar,
}: {
  paciente: Paciente
  selecionado: Procedure | null
  onSelect: (p: Procedure) => void
  onBack: () => void
  onGerar: () => void
}) {
  return (
    <div className="pb-2">
      <AppHeader
        title="Qual será o procedimento?"
        subtitle="Escolha o procedimento para gerar orientações de acolhimento."
        onBack={onBack}
      />

      <div className="space-y-3 px-5 py-5">
        {/* Resumo do paciente selecionado */}
        <section className="flex items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
            {paciente.nome.charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {paciente.nome}, {paciente.idade}
            </p>
            <p className="text-xs text-muted-foreground">{paciente.condicao}</p>
            {paciente.sensibilidades.length ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Sensibilidade: {paciente.sensibilidades.join(" e ").toLowerCase()}
              </p>
            ) : null}
          </div>
        </section>

        <ul className="space-y-3">
          {procedimentos.map((p) => {
            const Icon = p.icon
            const ativo = selecionado?.id === p.id
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelect(p)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition-colors",
                    ativo
                      ? "border-primary bg-accent ring-2 ring-ring/30"
                      : "border-border bg-card hover:bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                      ativo ? "bg-primary text-primary-foreground" : "bg-accent text-primary",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{p.nome}</span>
                    <span className="block text-xs leading-relaxed text-muted-foreground text-pretty">
                      {p.descricao}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Clock className="h-3 w-3" /> {p.duracao}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                      ativo ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    )}
                  >
                    {ativo ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="sticky bottom-0 flex gap-3 border-t border-border bg-card/95 px-5 py-3 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Voltar
        </button>
        <button
          type="button"
          disabled={!selecionado}
          onClick={onGerar}
          className="flex-[1.6] rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {selecionado ? "Gerar orientações" : "Selecione um procedimento"}
        </button>
      </div>
    </div>
  )
}
