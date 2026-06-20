"use client";

import { Check, Clock, UserRound } from "lucide-react";
import { AppHeader } from "../app-header";
import { procedimentos, type Paciente, type Procedure } from "../data";
import { cn } from "@/lib/utils";

export function ProceduresScreen({
  paciente,
  selecionado,
  onSelect,
  onBack,
  onGerar,
}: {
  paciente: Paciente;
  selecionado: Procedure | null;
  onSelect: (p: Procedure) => void;
  onBack: () => void;
  onGerar: () => void;
}) {
  return (
    <div className="pb-24">
      <AppHeader
        title="Qual atendimento será realizado?"
        subtitle="Selecione o procedimento para gerar orientações adaptadas ao perfil do paciente."
        onBack={onBack}
      />

      <div className="space-y-5 px-5 py-5">
        {/* Card do paciente selecionado */}
        <section className="rounded-3xl border border-primary/20 bg-primary/10 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UserRound className="h-4 w-4" strokeWidth={2} />
            </span>

            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              Paciente em atendimento
            </span>
          </div>

          <div className="flex items-start gap-3">

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-foreground">
                {paciente.nome}
              </p>

              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                {paciente.idade} anos · {paciente.condicao}
              </p>

              {paciente.sensibilidades.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {paciente.sensibilidades.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-primary shadow-sm"
                    >
                      {item}
                    </span>
                  ))}

                  {paciente.sensibilidades.length > 3 && (
                    <span className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
                      +{paciente.sensibilidades.length - 3}
                    </span>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Título da seção dos cards */}
        <div className="space-y-1 px-1">
          <h2 className="text-sm font-semibold text-foreground">
            Procedimentos disponíveis
          </h2>
          <p className="text-xs text-muted-foreground">
            Escolha o atendimento que será realizado agora.
          </p>
        </div>

        {/* Cards de procedimentos */}
        <div className="grid grid-cols-1 gap-3">
          {procedimentos.map((p) => {
            const Icon = p.icon;
            const ativo = selecionado?.id === p.id;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p)}
                className={cn(
                  "relative flex min-h-33 w-full flex-col rounded-3xl border p-4 text-left transition-all",
                  ativo
                    ? "border-primary bg-accent shadow-md ring-2 ring-primary/20"
                    : "border-border bg-card shadow-sm hover:bg-muted hover:shadow-md"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                      ativo
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>

                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      ativo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    )}
                  >
                    {ativo ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : null}
                  </span>
                </div>

                <div className="mt-3 flex-1">
                  <p className="text-sm font-bold text-foreground">
                    {p.nome}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {p.descricao}
                  </p>
                </div>

                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {p.duracao}
                </div>
              </button>
            );
          })}
        </div>
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
  );
}