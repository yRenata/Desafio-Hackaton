"use client"

import { useState } from "react"
import { ChevronRight, UserRound, MessageCircle, Sparkles, Heart, Lightbulb, Save } from "lucide-react"
import { AppHeader } from "../app-header"
import { SelectModal } from "../select-modal"
import { condicoes, comunicacaoOpcoes, sensibilidades as sensOpcoes, type Paciente } from "../data"
import { cn } from "@/lib/utils"

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{children}</span>
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string
  value: string
  placeholder: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </label>
  )
}

function SelectField({
  label,
  value,
  placeholder,
  onClick,
}: {
  label: string
  value: string
  placeholder: string
  onClick: () => void
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
      >
        <span className={cn(value ? "text-foreground" : "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
    </div>
  )
}

type ModalType = "condicao" | "comunicacao" | "sensibilidades" | null

export function ProfileScreen({
  paciente,
  novo,
  onChange,
  onBack,
  onSalvar,
}: {
  paciente: Paciente
  novo: boolean
  onChange: (patch: Partial<Paciente>) => void
  onBack: () => void
  onSalvar: () => void
}) {
  const [modal, setModal] = useState<ModalType>(null)

  const toggleSensibilidade = (s: string) => {
    const atual = paciente.sensibilidades
    onChange({
      sensibilidades: atual.includes(s) ? atual.filter((x) => x !== s) : [...atual, s],
    })
  }

  return (
    <div>
      <AppHeader
        title="Perfil do paciente"
        subtitle={novo ? "Cadastre o paciente para personalizar o atendimento." : "Edite os dados que orientam o cuidado."}
        onBack={onBack}
      />

      <div className="space-y-4 px-5 py-5">
        {/* Identificação */}
        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
              <UserRound className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Identificação</h2>
          </div>
          <div className="space-y-3">
            <TextField
              label="Nome completo"
              value={paciente.nome}
              placeholder="Nome do paciente"
              onChange={(v) => onChange({ nome: v })}
            />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Idade"
                value={paciente.idade}
                placeholder="Ex: 7 anos"
                onChange={(v) => onChange({ idade: v })}
              />
              <TextField
                label="Acompanhante"
                value={paciente.responsavel}
                placeholder="Responsável"
                onChange={(v) => onChange({ responsavel: v })}
              />
            </div>
          </div>
        </section>

        {/* Perfil neurodivergente */}
        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Perfil neurodivergente</h2>
          </div>
          <div className="space-y-3">
            <SelectField
              label="Neurodivergência / condição"
              value={paciente.condicao}
              placeholder="Selecionar condição"
              onClick={() => setModal("condicao")}
            />
            <SelectField
              label="Forma de comunicação"
              value={paciente.comunicacao}
              placeholder="Selecionar comunicação"
              onClick={() => setModal("comunicacao")}
            />
          </div>
        </section>

        {/* Sensibilidades */}
        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
              <Heart className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Sensibilidades</h2>
          </div>
          <button
            type="button"
            onClick={() => setModal("sensibilidades")}
            className="mb-3 flex w-full items-center justify-between gap-2 text-xs font-medium text-primary"
          >
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" /> Editar sensibilidades
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
          {paciente.sensibilidades.length ? (
            <div className="flex flex-wrap gap-2">
              {paciente.sensibilidades.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Nenhuma sensibilidade registrada.</p>
          )}
        </section>

        {/* Estratégia de abordagem */}
        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
              <Lightbulb className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Abordagem</h2>
          </div>
          <TextField
            label="Principal estratégia de abordagem"
            value={paciente.estrategia}
            placeholder="Ex: presença da mãe, apoio visual..."
            onChange={(v) => onChange({ estrategia: v })}
          />
        </section>

        {/* Ações */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={onSalvar}
            className="flex flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            <Save className="h-4 w-4" /> Salvar paciente
          </button>
        </div>
      </div>

      <SelectModal
        open={modal === "condicao"}
        title="Neurodivergência / condição"
        description="Selecione a condição que melhor descreve o paciente."
        options={condicoes}
        selected={paciente.condicao}
        onClose={() => setModal(null)}
        onSelect={(v) => onChange({ condicao: v })}
      />
      <SelectModal
        open={modal === "comunicacao"}
        title="Forma de comunicação"
        description="Como o paciente se comunica melhor?"
        options={comunicacaoOpcoes}
        selected={paciente.comunicacao}
        onClose={() => setModal(null)}
        onSelect={(v) => onChange({ comunicacao: v })}
      />
      <SelectModal
        open={modal === "sensibilidades"}
        title="Sensibilidades"
        description="Selecione tudo que pode causar desconforto."
        options={sensOpcoes}
        multi
        selected={paciente.sensibilidades}
        onClose={() => setModal(null)}
        onSelect={toggleSensibilidade}
      />
    </div>
  )
}
