"use client"

import { useState } from "react"
import { BottomNav } from "./bottom-nav"
import { HomeScreen } from "./screens/home-screen"
import { PatientsScreen } from "./screens/patients-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { ProceduresScreen } from "./screens/procedures-screen"
import { CareScreen } from "./screens/care-screen"
import { HistoryScreen } from "./screens/history-screen"
import {
  pacientesMock,
  novoPaciente,
  type Paciente,
  type Procedure,
  type RegistroHistorico,
  type TabId,
  type View,
} from "./data"

const viewToTab: Record<View, TabId> = {
  inicio: "inicio",
  lista: "pacientes",
  perfil: "pacientes",
  procedimento: "atendimento",
  orientacoes: "atendimento",
  historico: "historico",
}

export function NeuroApp() {
  const [view, setView] = useState<View>("inicio")
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesMock)
  const [draft, setDraft] = useState<Paciente | null>(null)
  const [isNovo, setIsNovo] = useState(false)
  const [ativo, setAtivo] = useState<Paciente | null>(null)
  const [procedimento, setProcedimento] = useState<Procedure | null>(null)
  const [historico, setHistorico] = useState<RegistroHistorico[]>([])

  const updateDraft = (patch: Partial<Paciente>) =>
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev))

  const handleTab = (tab: TabId) => {
    if (tab === "inicio") setView("inicio")
    else if (tab === "pacientes") setView("lista")
    else if (tab === "historico") setView("historico")
    else if (tab === "atendimento") {
      // Volta ao atendimento em andamento, se houver
      if (ativo && procedimento) setView("orientacoes")
      else if (ativo) setView("procedimento")
      else setView("lista")
    }
  }

  const handleNovo = () => {
    setDraft(novoPaciente())
    setIsNovo(true)
    setView("perfil")
  }

  const handleEditar = (p: Paciente) => {
    setDraft({ ...p })
    setIsNovo(false)
    setView("perfil")
  }

  const handleSalvarPaciente = () => {
    if (!draft) return
    setPacientes((prev) => {
      const existe = prev.some((p) => p.id === draft.id)
      return existe ? prev.map((p) => (p.id === draft.id ? draft : p)) : [...prev, draft]
    })
    setView("lista")
  }

  const handleIniciar = (p: Paciente) => {
    setAtivo(p)
    setProcedimento(null)
    setView("procedimento")
  }

  const handleSalvarOrientacao = () => {
    if (!ativo || !procedimento) return
    const registro: RegistroHistorico = {
      id: `h-${Date.now()}`,
      pacienteNome: ativo.nome,
      pacienteResumo: `${ativo.idade} · ${ativo.condicao}`,
      procedimentoNome: procedimento.nome,
      data: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
    }
    setHistorico((prev) => [registro, ...prev])
    setView("historico")
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col bg-background">
      <div className="flex-1">
        {view === "inicio" && <HomeScreen onStart={() => setView("lista")} />}

        {view === "lista" && (
          <PatientsScreen
            pacientes={pacientes}
            onNovo={handleNovo}
            onEditar={handleEditar}
            onIniciar={handleIniciar}
          />
        )}

        {view === "perfil" && draft && (
          <ProfileScreen
            paciente={draft}
            novo={isNovo}
            onChange={updateDraft}
            onBack={() => setView("lista")}
            onSalvar={handleSalvarPaciente}
          />
        )}

        {view === "procedimento" && ativo && (
          <ProceduresScreen
            paciente={ativo}
            selecionado={procedimento}
            onSelect={setProcedimento}
            onBack={() => setView("lista")}
            onGerar={() => setView("orientacoes")}
          />
        )}

        {view === "orientacoes" && (
          <CareScreen
            paciente={ativo}
            procedimento={procedimento}
            onBack={() => setView("procedimento")}
            onSalvar={handleSalvarOrientacao}
            onNovoAtendimento={() => {
              setProcedimento(null)
              setView("procedimento")
            }}
            onVoltarPacientes={() => setView("lista")}
          />
        )}

        {view === "historico" && <HistoryScreen registros={historico} />}
      </div>
      <BottomNav active={viewToTab[view]} onChange={handleTab} />
    </main>
  )
}
