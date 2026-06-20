import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lightbulb, Pencil, Sparkles } from "lucide-react";

interface Patient {
  id: string;
  nome: string;
  idade: string;
  condicao: string;
  sensibilidades: string[];
  estrategia: string;
}

interface CardPatientsScreenProps {
  p: Patient;
  onEditar: (p: Patient) => void;
  onIniciar: (p: Patient) => void;
}

export function CardPatientsScreen({
  p,
  onEditar,
  onIniciar,
}: CardPatientsScreenProps) {
  return (
    <Card className="flex h-64 flex-col bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
          {p.nome.charAt(0)}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {p.nome}
          </p>

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
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

            <div className="line-clamp-2 flex flex-wrap gap-1.5 overflow-hidden">
              {p.sensibilidades.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground"
                >
                  {s}
                </span>
              ))}

              {p.sensibilidades.length > 4 && (
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  +{p.sensibilidades.length - 4}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Abordagem:</span>{" "}
              {p.estrategia}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onIniciar(p)}
          className="mt-auto w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Iniciar atendimento
        </button>
      </CardContent>
    </Card>
  );
}
