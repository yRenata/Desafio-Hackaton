"use client"

import { useMemo, useState } from "react"
import { Search, Plus, Brain, Pencil, ChevronRight, Sparkles, Lightbulb } from "lucide-react"
import type { Paciente } from "../data"

export function PatientsScreen({
  pacientes,
  onNovo,
  onEditar,
  onIniciar,
}: {
  pacientes: Paciente[]
  onNovo: () => void
  onEditar: (p: Paciente) => void
  onIniciar: (p: Paciente) => void
}) {
  const [busca, setBusca] = useState("")

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return pacientes
    return pacientes.filter(
      (p) => p.nome.toLowerCase().includes(q) || p.condicao.toLowerCase().includes(q),
    )
  }, [busca, pacientes])

  return (
    <div>
      <header className="bg-primary px-5 pb-6 pt-6 text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
            <Brain className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-sm font-semibold tracking-tight">NeuroAcolhe</span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold leading-tight">Olá, Jordy</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/85">
          Escolha um paciente para iniciar o atendimento.
        </p>

        {/* Busca */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-3">
          <Search className="h-4 w-4 text-primary-foreground/80" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar paciente"
            className="w-full bg-transparent text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/70"
          />
        </div>
      </header>

      <div className="space-y-4 px-5 py-5">
        <h2 className="px-1 text-sm font-semibold text-foreground">Pacientes cadastrados</h2>

        {/* Novo paciente */}
        <button
          type="button"
          onClick={onNovo}
          className="flex w-full items-center gap-3 rounded-3xl border border-dashed border-primary/40 bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
            <Plus className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-foreground">Novo paciente</span>
            <span className="block text-xs text-muted-foreground">Cadastrar perfil e sensibilidades</span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </button>

        {/* Lista */}
        <ul className="space-y-3">
          {filtrados.map((p) => (
            <li
              key={p.id}
              className="rounded-3xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
                  {p.nome.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{p.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.idade} · {p.condicao}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onEditar(p)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  aria-label={`Editar ${p.nome}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2 border-t border-border pt-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <div className="flex flex-wrap gap-1.5">
                    {p.sensibilidades.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                    <span className="font-medium text-foreground">Abordagem:</span> {p.estrategia}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onIniciar(p)}
                className="mt-3 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
              >
                Iniciar atendimento
              </button>
            </li>
          ))}
        </ul>

        {filtrados.length === 0 ? (
          <p className="px-1 text-sm text-muted-foreground">Nenhum paciente encontrado.</p>
        ) : null}
      </div>
    </div>
  )
}
