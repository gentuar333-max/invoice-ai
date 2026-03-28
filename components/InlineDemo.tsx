'use client'

import { useState, useRef } from 'react'

const BASE_URL = 'https://invoiceagent.fr'

type Mode = 'facture' | 'contrat'
type State = 'idle' | 'loading' | 'result' | 'error' | 'limit'

export default function InlineDemo() {
  const [mode, setMode] = useState<Mode>('facture')
  const [state, setState] = useState<State>('idle')
  const [result, setResult] = useState<any>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function getUsageCount(): number {
    try {
      return parseInt(localStorage.getItem('demo_usage') || '0')
    } catch { return 0 }
  }

  function incrementUsage() {
    try {
      localStorage.setItem('demo_usage', String(getUsageCount() + 1))
    } catch {}
  }

  async function handleFile(file: File) {
    if (getUsageCount() >= 2) {
      setState('limit')
      return
    }

    setState('loading')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const endpoint = mode === 'facture'
        ? `${BASE_URL}/api/invoices/extract`
        : `${BASE_URL}/api/contracts`

      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const json = await res.json()

      if (!json.success) throw new Error(json.error || 'Erreur')

      incrementUsage()
      setResult(json.data)
      setState('result')
    } catch (e: any) {
      setState('error')
    }
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
    <div style={{
      background: 'rgba(99,102,241,0.06)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: 20,
      padding: 40,
      maxWidth: 680,
      margin: '0 auto',
    }}>

      {/* Titre */}
      <div style={{textAlign:'center',marginBottom:28}}>
        <div style={{fontFamily:"'Instrument Serif',serif",fontSize:28,color:'#fafafa',marginBottom:8}}>
          Testez maintenant — sans inscription
        </div>
        <div style={{fontSize:13,color:'#52525b',fontFamily:"'DM Mono',monospace"}}>
          {remaining > 0 ? `${remaining} analyse${remaining > 1 ? 's' : ''} gratuite${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}` : 'Limite atteinte'}
        </div>
      </div>

      {/* Toggle mode */}
      <div style={{display:'flex',gap:8,marginBottom:24,background:'rgba(255,255,255,0.04)',borderRadius:12,padding:4}}>
        {(['facture','contrat'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setState('idle'); setResult(null) }}
            style={{
              flex:1, padding:'10px 0', borderRadius:9, border:'none', cursor:'pointer',
              fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600,
              background: mode === m ? '#6366f1' : 'transparent',
              color: mode === m ? 'white' : '#52525b',
              transition:'all 0.2s',
            }}
          >
            {m === 'facture' ? '📄 Facture' : '📋 Contrat'}
          </button>
        ))}
      </div>

      {/* Zone upload */}
      {state !== 'limit' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? '#6366f1' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 14,
            padding: '36px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
            transition: 'all 0.2s',
            marginBottom: 20,
          }}
        >
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleInput} style={{display:'none'}} />
          {state === 'loading' ? (
            <div>
              <div style={{fontSize:32,marginBottom:12}}>⏳</div>
              <div style={{fontSize:14,color:'#818cf8',fontFamily:"'DM Mono',monospace"}}>
                {"L'IA analyse votre document..."}
              </div>
            </div>
          ) : (
            <div>
              <div style={{fontSize:36,marginBottom:12}}>
                {mode === 'facture' ? '📄' : '📋'}
              </div>
              <div style={{fontSize:15,color:'#a1a1aa',marginBottom:6}}>
                Glissez votre {mode === 'facture' ? 'facture' : 'contrat'} ici
              </div>
              <div style={{fontSize:12,color:'#3f3f46',fontFamily:"'DM Mono',monospace"}}>
                PDF, JPG, PNG — max 10 Mo
              </div>
              <div style={{
                display:'inline-block',marginTop:16,
                background:'#6366f1',color:'white',
                padding:'8px 20px',borderRadius:8,fontSize:13,fontWeight:600
              }}>
                Choisir un fichier
              </div>
            </div>
          )}
        </div>
      )}

      {/* Erreur */}
      {state === 'error' && (
        <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:10,padding:16,marginBottom:16,fontSize:13,color:'#f87171',textAlign:'center'}}>
          {"Une erreur s'est produite. Vérifiez votre fichier et réessayez."}
        </div>
      )}

      {/* Limite atteinte */}
      {state === 'limit' && (
        <div style={{textAlign:'center',padding:'24px 0'}}>
          <div style={{fontSize:32,marginBottom:12}}>🔒</div>
          <div style={{fontSize:16,color:'#fafafa',fontWeight:600,marginBottom:8}}>
            Limite de la démo atteinte
          </div>
          <div style={{fontSize:13,color:'#71717a',marginBottom:24}}>
            Créez un compte gratuit pour analyser jusqu'à 5 factures par mois.
          </div>
          <a href={`${BASE_URL}/auth/login`} style={{
            display:'inline-block',background:'#6366f1',color:'white',
            padding:'12px 28px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none'
          }}>
            Créer un compte gratuit →
          </a>
        </div>
      )}

      {/* RÉSULTAT FACTURE */}
      {state === 'result' && result && mode === 'facture' && (
        <div style={{marginTop:4}}>
          <div style={{fontSize:12,color:'#34d399',fontFamily:"'DM Mono',monospace",marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
            <span>●</span> Extraction réussie
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[
              { label: 'Fournisseur', value: result.vendor_name },
              { label: 'N° Facture', value: result.invoice_number },
              { label: 'Date', value: result.invoice_date },
              { label: 'Échéance', value: result.due_date },
              { label: 'HT', value: result.subtotal ? `${result.subtotal} €` : null },
              { label: 'TVA', value: result.tax_amount ? `${result.tax_amount} €` : null },
              { label: 'TTC', value: result.total_amount ? `${result.total_amount} €` : null },
              { label: 'SIRET', value: result.siret },
              { label: 'Catégorie', value: result.category },
              { label: 'Devise', value: result.currency },
            ].filter(f => f.value).map((f) => (
              <div key={f.label} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'10px 14px'}}>
                <div style={{fontSize:11,color:'#52525b',fontFamily:"'DM Mono',monospace",marginBottom:4}}>{f.label}</div>
                <div style={{fontSize:14,color:'#fafafa',fontWeight:500}}>{f.value}</div>
              </div>
            ))}
          </div>
          {result.missing_fields?.length > 0 && (
            <div style={{marginTop:12,fontSize:12,color:'#fbbf24',fontFamily:"'DM Mono',monospace"}}>
              Champs manquants : {result.missing_fields.join(', ')}
            </div>
          )}
          <div style={{marginTop:20,textAlign:'center'}}>
            <a href={`${BASE_URL}/auth/login`} style={{
              display:'inline-block',background:'#6366f1',color:'white',
              padding:'11px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none'
            }}>
              Sauvegarder et continuer →
            </a>
            <div style={{fontSize:11,color:'#3f3f46',marginTop:8,fontFamily:"'DM Mono',monospace"}}>
              {remaining > 0 ? `${remaining} analyse${remaining>1?'s':''} restante${remaining>1?'s':''}` : 'Limite atteinte — créez un compte pour continuer'}
            </div>
          </div>
        </div>
      )}

      {/* RÉSULTAT CONTRAT */}
      {state === 'result' && result && mode === 'contrat' && (
        <div style={{marginTop:4}}>
          <div style={{fontSize:12,color:'#34d399',fontFamily:"'DM Mono',monospace",marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
            <span>●</span> Analyse réussie
          </div>

          {result.summary && (
            <div style={{background:'rgba(99,102,241,0.08)',border:'1px solid rgba(99,102,241,0.2)',borderRadius:10,padding:16,marginBottom:16,fontSize:14,color:'#a1a1aa',lineHeight:1.6}}>
              {result.summary}
            </div>
          )}

          {result.risk_clauses?.length > 0 && (
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:'#52525b',fontFamily:"'DM Mono',monospace",marginBottom:8}}>CLAUSES À RISQUE</div>
              {result.risk_clauses.slice(0,3).map((c: any, i: number) => (
                <div key={i} style={{
                  display:'flex',gap:10,alignItems:'flex-start',
                  background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:8,padding:'10px 12px',marginBottom:8
                }}>
                  <span style={{
                    fontSize:10,fontWeight:700,padding:'2px 6px',borderRadius:4,flexShrink:0,marginTop:2,
                    background: c.severity==='high' ? 'rgba(239,68,68,0.15)' : c.severity==='medium' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
                    color: c.severity==='high' ? '#f87171' : c.severity==='medium' ? '#fbbf24' : '#818cf8',
                  }}>{c.severity?.toUpperCase()}</span>
                  <span style={{fontSize:13,color:'#a1a1aa'}}>{c.clause}</span>
                </div>
              ))}
            </div>
          )}

          {result.payment_terms && (
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:8,padding:'10px 14px',marginBottom:10}}>
              <div style={{fontSize:11,color:'#52525b',fontFamily:"'DM Mono',monospace",marginBottom:4}}>CONDITIONS DE PAIEMENT</div>
              <div style={{fontSize:13,color:'#fafafa'}}>{result.payment_terms}</div>
            </div>
          )}

          <div style={{marginTop:20,textAlign:'center'}}>
            <a href={`${BASE_URL}/auth/login`} style={{
              display:'inline-block',background:'#6366f1',color:'white',
              padding:'11px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none'
            }}>
              Voir l'analyse complète →
            </a>
            <div style={{fontSize:11,color:'#3f3f46',marginTop:8,fontFamily:"'DM Mono',monospace"}}>
              {remaining > 0 ? `${remaining} analyse${remaining>1?'s':''} restante${remaining>1?'s':''}` : 'Limite atteinte — créez un compte pour continuer'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}