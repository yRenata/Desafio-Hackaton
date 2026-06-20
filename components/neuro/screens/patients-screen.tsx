"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Brain, ChevronRight } from "lucide-react";
import type { Paciente } from "../data";
import { CardPatientsScreen } from "./card-patients";

interface PatientsScreenProps {
  pacientes: Paciente[];
  onNovo: () => void;
  // accept either Paciente or other Patient shape from parent components
  onEditar: (p: any) => void;
  onIniciar: (p: any) => void;
}

export function PatientsScreen({
  pacientes,
  onNovo,
  onEditar,
  onIniciar,
}: PatientsScreenProps) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();

    if (!q) return pacientes;

    return pacientes.filter((paciente) => {
      return (
        paciente.nome.toLowerCase().includes(q) ||
        paciente.condicao.toLowerCase().includes(q)
      );
    });
  }, [busca, pacientes]);

  return (
    <div>
      <header className="bg-primary px-5 pb-6 pt-6 text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
            <Brain className="h-5 w-5" strokeWidth={2} />
          </span>

          <span className="text-sm font-semibold tracking-tight">
            NeuroAcolhe
          </span>
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/85">
          Pacientes cadastrados na triagem e prontos para atendimento.
        </p>

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
        <h2 className="px-1 text-sm font-semibold text-foreground">
          Pacientes cadastrados
        </h2>

        <button
          type="button"
          onClick={onNovo}
          className="flex w-full items-center gap-3 rounded-3xl border border-dashed border-primary/40 bg-card p-4 text-left transition-colors hover:bg-accent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
            <Plus className="h-5 w-5" strokeWidth={2} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-foreground">
              Nova triagem
            </span>

            <span className="block text-xs text-muted-foreground">
              Cadastrar um paciente pela triagem
            </span>
          </span>

          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </button>

        {filtrados.length > 0 ? (
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch">
            {filtrados.map((pacient) => (
              <li key={pacient.id} className="w-full sm:w-[320px]">
                <CardPatientsScreen
                  p={pacient as any}
                  onEditar={onEditar}
                  onIniciar={onIniciar}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-1 text-sm text-muted-foreground">
            Nenhum paciente encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
