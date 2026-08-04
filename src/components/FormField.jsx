export default function FormField({ label, value, onChange, type = 'text', hint, ...rest }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-rock-cream">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-rock-border bg-white/5 px-4 py-2.5 text-sm text-rock-cream outline-none placeholder:text-rock-muted/50 focus:border-rock-gold"
        {...rest}
      />
      {hint && <span className="mt-1 block text-xs text-rock-muted/70">{hint}</span>}
    </label>
  )
}
