"use client"

import { ClipboardPenLine, ChevronRight, ShieldCheck, Sparkles } from "lucide-react"
import { AppHeader } from "../app-header"

export function TriageScreen({ onCadastrar }: { onCadastrar: () => void }) {
  return (
    <div>
      <AppHeader
        title="Triagem"
        subtitle="Cadastro inicial do paciente neurodivergente antes da entrada na lista de atendimento."
      />

      <div className="space-y-4 px-5 py-5">
        <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
              <ClipboardPenLine className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Cadastrar paciente na triagem</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                Registre dados básicos, condição, sensibilidades e estratégia de abordagem. Depois da triagem,
                o paciente ficará disponível na lista de pacientes.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCadastrar}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            Iniciar cadastro
            <ChevronRight className="h-4 w-4" />
          </button>
        </section>

        <section className="grid gap-3">
          <div className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <Sparkles className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Perfil sensorial</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                A triagem coleta informações que orientam a equipe antes do atendimento.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Entrada organizada</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                Após salvar, o paciente segue para Pacientes e pode ser chamado para atendimento.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
