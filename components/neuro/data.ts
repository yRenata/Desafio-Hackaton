import {
  Syringe,
  Droplet,
  Stethoscope,
  ClipboardCheck,
  Bandage,
  Waves,
  type LucideIcon,
} from "lucide-react"

export type TabId = "triagem" | "pacientes" | "atendimento"

export type View =
  | "lista"
  | "perfil"
  | "triagem"
  | "atendimento"
  | "procedimento"
  | "orientacoes"
  | "historico"

export type Procedure = {
  id: string
  nome: string
  descricao: string
  duracao: string
  icon: LucideIcon
}

export const procedimentos: Procedure[] = [
  {
    id: "medicacao",
    nome: "Aplicação de medicação",
    descricao: "Administração de medicamento via injeção ou oral",
    duracao: "~10 min",
    icon: Syringe,
  },
  {
    id: "coleta",
    nome: "Coleta de sangue",
    descricao: "Exame laboratorial com punção venosa",
    duracao: "~10 min",
    icon: Droplet,
  },
  {
    id: "exame",
    nome: "Exame físico",
    descricao: "Avaliação clínica com toque e ausculta",
    duracao: "~20 min",
    icon: Stethoscope,
  },
  {
    id: "curativo",
    nome: "Curativo",
    descricao: "Limpeza e cuidado de feridas",
    duracao: "~10 min",
    icon: Bandage,
  },
  {
    id: "vacina",
    nome: "Administração de vacina",
    descricao: "Imunização com preparo sensorial e comunicação antecipada",
    duracao: "~10 min",
    icon: Syringe,
  },
  {
    id: "avaliacao",
    nome: "Avaliação clínica",
    descricao: "Escuta, observação e decisão de conduta pelo profissional",
    duracao: "~20 min",
    icon: ClipboardCheck,
  },
  {
    id: "desregulacao",
    nome: "Situação de desregulação",
    descricao: "Manejo de crise sensorial ou emocional",
    duracao: "Variável",
    icon: Waves,
  },
]

export const condicoes: string[] = [
  "Transtorno do Espectro Autista (TEA)",
  "TDAH",
  "Deficiência intelectual",
  "Síndrome de Down",
  "Dislexia",
  "Transtorno de ansiedade",
  "Deficiência auditiva",
  "Outro / não informado",
]

export const sensibilidades: string[] = [
  "Toque",
  "Ruído",
  "Luz intensa",
  "Espera longa",
  "Excesso de estímulos",
  "Mudança de rotina",
  "Ambientes cheios",
]

export const comunicacaoOpcoes: string[] = [
  "Verbal",
  "Verbal com apoio",
  "Não verbal (CAA)",
  "Gestos e imagens",
]

export type Paciente = {
  id: string
  nome: string
  idade: string
  responsavel: string
  condicao: string
  comunicacao: string
  sensibilidades: string[]
  estrategia: string
}

export const pacientesMock: Paciente[] = [
  {
    id: "joao",
    nome: "João Silva",
    idade: "7 anos",
    responsavel: "Maria Silva (mãe)",
    condicao: "Transtorno do Espectro Autista (TEA)",
    comunicacao: "Verbal com apoio",
    sensibilidades: ["Toque", "Ruído"],
    estrategia: "Presença da mãe",
  },
  {
    id: "lara",
    nome: "Lara Mendes",
    idade: "9 anos",
    responsavel: "Carlos Mendes (pai)",
    condicao: "TDAH",
    comunicacao: "Verbal",
    sensibilidades: ["Espera longa", "Excesso de estímulos"],
    estrategia: "Instruções curtas e objetivas",
  },
  {
    id: "pedro",
    nome: "Pedro Alves",
    idade: "6 anos",
    responsavel: "Ana Alves (mãe)",
    condicao: "Síndrome de Down",
    comunicacao: "Verbal com apoio",
    sensibilidades: ["Mudança de rotina"],
    estrategia: "Explicação antecipada e apoio visual",
  },
]

export function novoPaciente(): Paciente {
  return {
    id: `p-${Date.now()}`,
    nome: "",
    idade: "",
    responsavel: "",
    condicao: "",
    comunicacao: "",
    sensibilidades: [],
    estrategia: "",
  }
}

export type CategoriaOrientacao =
  | "Antes do atendimento"
  | "Durante o procedimento"
  | "O que evitar"
  | "Se houver resistência ou desregulação"
  | "Registrar para a próxima vez"

export type Orientacao = {
  categoria: CategoriaOrientacao
  descricao: string
}

export type RegistroHistorico = {
  id: string
  pacienteNome: string
  pacienteResumo: string
  procedimentoNome: string
  data: string
}

export function gerarOrientacoes(paciente: Paciente, procedimentoNome: string): Orientacao[] {
  const sens = paciente.sensibilidades
  const listaSens = sens.length ? sens.join(", ").toLowerCase() : "sensibilidades não informadas"
  const proc = procedimentoNome.toLowerCase()

  return [
    {
      categoria: "Antes do atendimento",
      descricao: `Apresente-se com calma e explique o que será feito em ${proc}. Mostre os materiais antes de usar e confirme o entendimento, já que a comunicação é "${paciente.comunicacao.toLowerCase() || "não informada"}". Garanta a estratégia que funciona: ${paciente.estrategia.toLowerCase() || "acolhimento individualizado"}.`,
    },
    {
      categoria: "Durante o procedimento",
      descricao: `Avise antes de cada toque ou som. Faça pausas curtas se houver sinais de desconforto e use frases objetivas. Mantenha ${paciente.responsavel || "o acompanhante"} por perto para transmitir segurança.`,
    },
    {
      categoria: "O que evitar",
      descricao: `Evite estímulos ligados às sensibilidades do paciente: ${listaSens}. ${
        sens.includes("Espera longa") || sens.includes("Excesso de estímulos")
          ? "Priorize o atendimento e reduza o tempo em ambientes cheios."
          : "Não force o contato físico nem mude a rotina sem avisar."
      }`,
    },
    {
      categoria: "Se houver resistência ou desregulação",
      descricao:
        "Interrompa o procedimento, leve a um espaço tranquilo e reduza luz e ruído. Dê tempo para regulação, valide o sentimento e retome apenas quando houver sinais de calma.",
    },
    {
      categoria: "Registrar para a próxima vez",
      descricao:
        "Anote o que funcionou e o que gerou desconforto no prontuário. Esse registro ajuda toda a equipe a oferecer um atendimento mais previsível no próximo encontro.",
    },
  ]
}
