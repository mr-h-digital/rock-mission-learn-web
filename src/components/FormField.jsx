import { useState } from 'react'

export default function FormField({ label, value, onChange, type = 'text', hint, allowReveal = false, ...rest }) {
  const [revealed, setRevealed] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && allowReveal ? (revealed ? 'text' : 'password') : type

  return (
    <label className="block">
      <span className="text-sm font-semibold text-rock-cream">{label}</span>
      <div className="relative mt-1.5">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`armory-input ${isPassword && allowReveal ? 'pr-20' : ''}`}
          {...rest}
        />
        {isPassword && allowReveal && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide text-rock-muted hover:text-rock-gold"
          >
            {revealed ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {hint && <span className="mt-1 block text-xs text-rock-muted/70">{hint}</span>}
    </label>
  )
}
