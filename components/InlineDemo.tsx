'use client'

import { useState, useRef } from 'react'

const LOGIN_URL = 'https://invoiceagent.fr/auth/login'

type Mode = 'facture' | 'contrat'
type State = 'idle' | 'loading' | 'result' | 'error' | 'limit'

export default function InlineDemo() {
  const [mode, setMode] = useState<Mode>('facture')
  const [state, setState] = useState<State>('idle')
  const [result, setResult] = useState<any>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function getUsageCount(): number {
    try { return parseInt(localStorage.getItem('demo_usage') || '0') } catch { return 0 }
  }

  function incrementUsage() {
    try { localStorage.setItem('demo_usage', String(getUsageCount() + 1)) } catch {}
  }

  async function handleFile(file: File) {
    if (getUsageCount() >= 2) { setState('limit'); return }
    setState('loading')
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const endpoint = mode === 'facture' ? `/api/invoices/extract` : `/api/contracts`
      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Erreur')
      incrementUsage()
      setResult(json.data)
      setState('result')
    } catch { setState('error') }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const remaining = Math.max(0, 2 - getUsageCount())

  return (
    <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: 20, padding: 40, maxWidth: 680, margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
          Testez maintenant — sans inscription
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>
          {remaining > 0 ? `${remaining} analyse${remaining > 1 ? 's' : ''} gratuite${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}` : 'Limite atteinte'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: '#f1f5f9', borderRadius: 12, padding: 4 }}>
        {(['facture', 'contrat'] as Mode[]).map((m) => (
          <button key={m} onClick={() => { setMode(m); setState('idle'); setResult(null) }} style={{ flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: mode === m ? '#2563eb' : 'transparent', color: mode === m ? 'white' : '#64748b', transition: 'all 0.2s' }}>
            {m === 'facture' ? 'Facture' : 'Contrat'}
          </button>
        ))}
      </div>

      {state !== 'limit' && (
        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} onClick={() => fileRef.current?.click()} style={{ border: `2px dashed ${dragOver ? '#2563eb' : '#cbd5e1'}`, borderRadius: 14, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', background: dragOver ? '#eff6ff' : '#f8fafc', transition: 'all 0.2s', marginBottom: 20 }}>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleInput} style={{ display: 'none' }} />
          {state === 'loading' ? (
            <div>
              <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <div style={{ fontSize: 14, color: '#2563eb', fontWeight: 600 }}>{"L'IA analyse votre document..."}</div>
            </div>
          ) : (
            <div>
              <div style={{ width: 48, height: 48, background: '#dbeafe', borderRadius: 12, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div style={{ fontSize: 15, color: '#475569', marginBottom: 6, fontWeight: 500 }}>
                Glissez votre {mode === 'facture' ? 'facture' : 'contrat'} ici
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 20 }}>PDF, JPG, PNG — max 10 Mo</div>
              <div style={{ display: 'inline-block', background: '#2563eb', color: 'white', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
                Choisir un fichier
              </div>
            </div>
          )}
        </div>
      )}

      {state === 'error' && (
        <div style={{ background: '#fff1f2', border: '1px solid #fecaca', borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
          {"Une erreur s'est produite. Verifiez votre fichier et reessayez."}
        </div>
      )}

      {state === 'limit' && (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ width: 48, height: 48, background: '#f1f5f9', borderRadius: 12, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div style={{ fontSize: 16, color: '#1e293b', fontWeight: 700, marginBottom: 8 }}>Limite de la demo atteinte</div>
          <div style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Creez un compte gratuit pour analyser jusqu'a 5 factures par mois.</div>
          <a href={LOGIN_URL} style={{ display: 'inline-block', background: '#2563eb', color: 'white', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Creer un compte gratuit
          </a>
        </div>
      )}

      {state === 'result' && result && mode === 'facture' && (
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 12, color: '#059669', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div style={{ width: 8, height: 8, background: '#059669', borderRadius: '50%' }} /> Extraction reussie
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Fournisseur', value: result.vendor_name },
              { label: 'N Facture', value: result.invoice_number },
              { label: 'Date', value: result.invoice_date },
              { label: 'Echeance', value: result.due_date },
              { label: 'HT', value: result.subtotal ? `${result.subtotal} EUR` : null },
              { label: 'TVA', value: result.tax_amount ? `${result.tax_amount} EUR` : null },
              { label: 'TTC', value: result.total_amount ? `${result.total_amount} EUR` : null },
              { label: 'SIRET', value: result.siret },
              { label: 'Categorie', value: result.category },
              { label: 'Devise', value: result.currency },
            ].filter(f => f.value).map((f) => (
              <div key={f.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
          {result.missing_fields?.length > 0 && (
            <div style={{ marginTop: 12, fontSize: 12, color: '#d97706', fontWeight: 500 }}>Champs manquants : {result.missing_fields.join(', ')}</div>
          )}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href={LOGIN_URL} style={{ display: 'inline-block', background: '#2563eb', color: 'white', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Sauvegarder et continuer
            </a>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
              {remaining > 0 ? `${remaining} analyse${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}` : 'Limite atteinte — creez un compte pour continuer'}
            </div>
          </div>
        </div>
      )}

      {state === 'result' && result && mode === 'contrat' && (
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 12, color: '#059669', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div style={{ width: 8, height: 8, background: '#059669', borderRadius: '50%' }} /> Analyse reussie
          </div>
          {result.summary && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              {result.summary}
            </div>
          )}
          {result.risk_clauses?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, fontWeight: 600 }}>Clauses a risque</div>
              {result.risk_clauses.slice(0, 3).map((c: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, flexShrink: 0, marginTop: 2, textTransform: 'uppercase', background: c.severity === 'high' ? '#fff1f2' : c.severity === 'medium' ? '#fffbeb' : '#f0fdf4', color: c.severity === 'high' ? '#dc2626' : c.severity === 'medium' ? '#d97706' : '#059669', border: `1px solid ${c.severity === 'high' ? '#fecaca' : c.severity === 'medium' ? '#fde68a' : '#bbf7d0'}` }}>
                    {c.severity === 'high' ? 'Eleve' : c.severity === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                  <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{c.clause}</span>
                </div>
              ))}
            </div>
          )}
          {result.payment_terms && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, fontWeight: 600 }}>Conditions de paiement</div>
              <div style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{result.payment_terms}</div>
            </div>
          )}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href={LOGIN_URL} style={{ display: 'inline-block', background: '#2563eb', color: 'white', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Voir l'analyse complete
            </a>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
              {remaining > 0 ? `${remaining} analyse${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}` : 'Limite atteinte — creez un compte pour continuer'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}