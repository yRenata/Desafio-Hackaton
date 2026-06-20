import { Brain, ChevronLeft } from "lucide-react"

export function AppHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
}) {
  return (
    <header className="bg-primary px-5 pb-6 pt-6 text-primary-foreground">
      <div className="flex items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 transition-colors hover:bg-primary-foreground/25"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
            <Brain className="h-5 w-5" strokeWidth={2} />
          </span>
        )}
        <span className="text-sm font-semibold tracking-tight">Brilhantes</span>
      </div>
      <h1 className="mt-4 text-2xl font-semibold leading-tight text-balance">{title}</h1>
      {subtitle ? (
        <p className="mt-1.5 max-w-[36ch] text-sm leading-relaxed text-primary-foreground/85 text-pretty">
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
