// TODO: read remainingCount from useTodo()
const remainingCount = 2 // placeholder

const date = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
}).format(new Date())

export default function Header() {
  return (
    <header>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-3 focus-visible:py-1.5 focus-visible:text-sm focus-visible:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl leading-none tracking-tight">
            My tasks
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {remainingCount === 0
              ? 'All done — great work!'
              : `${remainingCount} task${remainingCount !== 1 ? 's' : ''} left`}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>

      <div className="mt-6 h-px bg-border" role="separator" aria-hidden="true" />
    </header>
  )
}
