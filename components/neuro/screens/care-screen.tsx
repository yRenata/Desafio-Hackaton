"use client"

import {
  ClipboardList,
  Save,
  PlusCircle,
  Users,
  ClipboardCheck,
  Ban,
  HeartHandshake,
  NotebookPen,
} from "lucide-react"
import { AppHeader } from "../app-header"
import {
  gerarOrientacoes,
  type CategoriaOrientacao,
  type Paciente,
  type Procedure,
} from "../data"

const categoriaIcon: Record<CategoriaOrientacao, typeof Users> = {
  "Antes do atendimento": ClipboardCheck,
  "Durante o procedimento": HeartHandshake,
  "O que evitar": Ban,
  "Se houver resistência ou desregulação": Users,
  "Registrar para a próxima vez": NotebookPen,
}

export function CareScreen({
  paciente,
  procedimento,
  onBack,
  onSalvar,
  onNovoAtendimento,
  onVoltarPacientes,
}: {
  paciente: Paciente | null
  procedimento: Procedure | null
  onBack: () => void
  onSalvar: () => void
  onNovoAtendimento: () => void
  onVoltarPacientes: () => void
}) {
  if (!paciente || !procedimento) {
    return (
      <div>
        <AppHeader
          title="Como conduzir o atendimento"
          subtitle="Orientações personalizadas com base no perfil do paciente e no procedimento selecionado."
        />
        <div className="px-5 py-10">
          <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <ClipboardList className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-foreground">Nenhum atendimento em andamento</p>
            <p className="mt-1 text-xs text-muted-foreground text-pretty">
              Escolha um paciente em Pacientes e selecione um procedimento para gerar as orientações.
            </p>
            <button
              type="button"
              onClick={onVoltarPacientes}
              className="mt-4 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Ver pacientes
            </button>
          </div>
        </div>
      </div>
    )
  }

  const orientacoes = gerarOrientacoes(paciente, procedimento.nome)

  return (
    <div>
      <AppHeader
        title="Como conduzir o atendimento"
        subtitle="Orientações personalizadas com base no perfil do paciente e no procedimento selecionado."
        onBack={onBack}
      />

      <div className="space-y-4 px-5 py-5">
        {/* Resumo do atendimento */}
        <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
              {paciente.nome.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {paciente.nome}, {paciente.idade}
              </p>
              <p className="text-xs text-muted-foreground">{paciente.condicao}</p>
            </div>
          </div>
          <dl className="mt-3 space-y-2 border-t border-border pt-3 text-xs">
            <div className="flex gap-2">
              <dt className="font-medium text-foreground">Procedimento:</dt>
              <dd className="text-muted-foreground">{procedimento.nome}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-medium text-foreground">Sensibilidades:</dt>
              <dd className="flex flex-wrap gap-1.5">
                {paciente.sensibilidades.length ? (
                  paciente.sensibilidades.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">Não informadas</span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        {/* Orientações */}
        <section>
          <h2 className="mb-3 px-1 text-sm font-semibold text-foreground">Orientações para a equipe</h2>
          <ul className="space-y-3">
            {orientacoes.map((o, i) => {
              const Icon = categoriaIcon[o.categoria]
              return (
                <li key={i} className="rounded-3xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground text-pretty">{o.categoria}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                        {o.descricao}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Ações */}
        <div className="grid gap-3 pt-1">
          <button
            type="button"
            onClick={onSalvar}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            <Save className="h-4 w-4" /> Salvar orientação
          </button>
          <button
            type="button"
            onClick={onNovoAtendimento}
            className="flex items-center justify-center gap-2 rounded-2xl border border-primary bg-card py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
          >
            <PlusCircle className="h-4 w-4" /> Novo atendimento
          </button>
          <button
            type="button"
            onClick={onVoltarPacientes}
            className="rounded-2xl py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Voltar para pacientes
          </button>
        </div>
      </div>
    </div>
  )
}
