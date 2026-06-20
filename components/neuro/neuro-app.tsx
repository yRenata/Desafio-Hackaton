"use client";

import { useState } from "react";
import { BottomNav } from "./bottom-nav";
import { PatientsScreen } from "./screens/patients-screen";
import { ProfileScreen } from "./screens/profile-screen";
import { TriageScreen } from "./screens/triage-screen";
import { AttendanceScreen } from "./screens/attendance-screen";
import { ProceduresScreen } from "./screens/procedures-screen";
import { CareScreen } from "./screens/care-screen";
import { HistoryScreen } from "./screens/history-screen";
import {
  pacientesMock,
  novoPaciente,
  type Paciente,
  type Procedure,
  type RegistroHistorico,
  type TabId,
  type View,
} from "./data";

const viewToTab: Record<View, TabId> = {
  lista: "pacientes",
  perfil: "pacientes",
  triagem: "triagem",
  atendimento: "atendimento",
  procedimento: "atendimento",
  orientacoes: "atendimento",
  historico: "atendimento",
};

export function NeuroApp() {
  const [view, setView] = useState<View>("triagem");
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesMock);
  const [draft, setDraft] = useState<Paciente | null>(null);
  const [isNovo, setIsNovo] = useState(false);
  const [perfilOrigem, setPerfilOrigem] = useState<"triagem" | "pacientes">("pacientes");
  const [ativo, setAtivo] = useState<Paciente | null>(null);
  const [procedimento, setProcedimento] = useState<Procedure | null>(null);
  const [historico, setHistorico] = useState<RegistroHistorico[]>([]);

  const updateDraft = (patch: Partial<Paciente>) => {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const handleTab = (tab: TabId) => {
    if (tab === "pacientes") {
      setView("lista");
      return;
    }

    if (tab === "triagem") {
      setView("triagem");
      return;
    }

    if (tab === "atendimento") {
      if (ativo && procedimento) {
        setView("orientacoes");
      } else if (ativo) {
        setView("atendimento");
      } else {
        setView("lista");
      }
    }
  };

  const handleNovaTriagem = () => {
    setDraft(novoPaciente());
    setIsNovo(true);
    setPerfilOrigem("triagem");
    setView("perfil");
  };

  const handleEditar = (p: Paciente) => {
    setDraft({ ...p });
    setIsNovo(false);
    setPerfilOrigem("pacientes");
    setView("perfil");
  };

  const handleSalvarPaciente = () => {
    if (!draft) return;

    setPacientes((prev) => {
      const existe = prev.some((p) => p.id === draft.id);

      if (existe) {
        return prev.map((p) => (p.id === draft.id ? draft : p));
      }

      return [...prev, draft];
    });

    setView("lista");
  };

  const handleIniciarAtendimento = (p: Paciente) => {
    setAtivo(p);
    setProcedimento(null);
    setView("atendimento");
  };

  const handleDefinirProcedimento = () => {
    if (!ativo) return;
    setView("procedimento");
  };

  const handleGerarOrientacoes = () => {
    if (!ativo || !procedimento) return;
    setView("orientacoes");
  };

  const handleSalvarOrientacao = () => {
    if (!ativo || !procedimento) return;

    const registro: RegistroHistorico = {
      id: `h-${Date.now()}`,
      pacienteNome: ativo.nome,
      pacienteResumo: `${ativo.idade} · ${ativo.condicao}`,
      procedimentoNome: procedimento.nome,
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
    };

    setHistorico((prev) => [registro, ...prev]);
    setView("historico");
  };

  const handleNovoAtendimento = () => {
    setProcedimento(null);

    if (ativo) {
      setView("atendimento");
    } else {
      setView("lista");
    }
  };

  return (
    <main className="mx-auto flex min-h-svh w-full flex-col bg-background">
      <div className="flex-1">
        {view === "lista" && (
          <PatientsScreen
            pacientes={pacientes}
            onNovo={() => setView("triagem")}
            onEditar={handleEditar}
            onIniciar={handleIniciarAtendimento}
          />
        )}

        {view === "perfil" && draft && (
          <ProfileScreen
            paciente={draft}
            novo={isNovo}
            onChange={updateDraft}
            onBack={() => setView(perfilOrigem === "triagem" ? "triagem" : "lista")}
            onSalvar={handleSalvarPaciente}
          />
        )}

        {view === "triagem" && <TriageScreen onCadastrar={handleNovaTriagem} />}

        {view === "atendimento" && ativo && (
          <AttendanceScreen
            paciente={ativo}
            onBack={() => setView("lista")}
            onProcedimento={handleDefinirProcedimento}
          />
        )}

        {view === "procedimento" && ativo && (
          <ProceduresScreen
            paciente={ativo}
            selecionado={procedimento}
            onSelect={setProcedimento}
            onBack={() => setView("atendimento")}
            onGerar={handleGerarOrientacoes}
          />
        )}

        {view === "orientacoes" && ativo && procedimento && (
          <CareScreen
            paciente={ativo}
            procedimento={procedimento}
            onBack={() => setView("procedimento")}
            onSalvar={handleSalvarOrientacao}
            onNovoAtendimento={handleNovoAtendimento}
            onVoltarPacientes={() => setView("lista")}
          />
        )}

        {view === "historico" && <HistoryScreen registros={historico} />}
      </div>

      <BottomNav
        active={view === "perfil" && perfilOrigem === "triagem" ? "triagem" : viewToTab[view]}
        onChange={handleTab}
      />
    </main>
  );
}
