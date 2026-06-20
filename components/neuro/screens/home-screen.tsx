"use client"

import { Users, ClipboardList, HeartHandshake, ChevronRight, ShieldCheck } from "lucide-react"
import { AppHeader } from "../app-header"

const passos: {
  numero: string
  titulo: string
  descricao: string
  icon: typeof Users
}[] = [
  {
    numero: "1",
    titulo: "Escolha o paciente",
    descricao: "Selecione ou cadastre o paciente neurodivergente.",
    icon: Users,
  },
  {
    numero: "2",
    titulo: "Procedimento",
    descricao: "Defina o que será realizado no atendimento.",
    icon: ClipboardList,
  },
  {
    numero: "3",
    titulo: "Orientações",
    descricao: "Receba o passo a passo personalizado de acolhimento.",
    icon: HeartHandshake,
  },
]

export function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <AppHeader
        title="Acolhimento que respeita cada pessoa"
        subtitle="Orientações práticas para conduzir o atendimento de pacientes neurodivergentes."
      />

      <div className="space-y-5 px-5 py-5">
        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Atendimento mais seguro</p>
              <p className="text-xs text-muted-foreground">Baseado no perfil e no procedimento</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 px-1 text-sm font-semibold text-foreground">Como funciona</h2>
          <ul className="space-y-3">
            {passos.map((p) => {
              const Icon = p.icon
              return (
                <li key={p.numero}>
                  <div className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-4 text-left">
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                        {p.numero}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{p.titulo}</span>
                      <span className="block text-xs leading-relaxed text-muted-foreground text-pretty">
                        {p.descricao}
                      </span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Ver pacientes
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
