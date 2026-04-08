'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, CheckCircle2, Upload, ArrowRight, AlertTriangle, Lock, Shield } from 'lucide-react'

const LOGIN_URL = 'https://invoiceagent.fr/auth/login'

type Mode = 'facture' | 'contrat'
type Step = 'idle' | 'uploading' | 'reading' | 'extracting' | 'analyzing' | 'done' | 'error' | 'limit'

const AI_STEPS = [
  { id: 'uploading',  label: 'Reception du document...',            pct: 10 },
  { id: 'reading',   label: 'Lecture et analyse du fichier...',     pct: 35 },
  { id: 'extracting',label: 'Extraction des donnees par OCR IA...', pct: 65 },
  { id: 'analyzing', label: 'Verification et structuration...',     pct: 90 },
]

function TypewriterText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const iv = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++ }
      else { setDone(true); clearInterval(iv) }
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed])
  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-4 bg-violet-500 ml-0.5 animate-pulse align-text-bottom" />}
    </span>
  )
}

function FieldRow({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start justify-between py-2.5 border-b border-slate-100 last:border-0 gap-4"
    >
      <span className="text-xs text-slate-400 uppercase tracking-wide font-medium flex-shrink-0 mt-0.5">{label}</span>
      <span className="text-sm font-semibold text-slate-800 text-right">
        <TypewriterText text={value} speed={20} />
      </span>
    </motion.div>
  )
}

function AIAnalyzing({ stepId, progress }: { stepId: string; progress: number }) {
  const messages: Record<string, string[]> = {
    uploading:  ['Reception du fichier...', 'Verification du format...'],
    reading:    ['Lecture du document...', 'Analyse de la structure...', 'Identification du type...'],
    extracting: ['Extraction du fournisseur...', 'Lecture des montants HT/TTC...', 'Detection de la TVA...'],
    analyzing:  ['Verification des donnees...', 'Detection des doublons...', 'Structuration finale...'],
  }
  const msgs = messages[stepId] || ['Analyse en cours...']
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    setMsgIdx(0)
    const iv = setInterval(() => setMsgIdx(p => (p + 1) % msgs.length), 700)
    return () => clearInterval(iv)
  }, [stepId])

  const currentStepIdx = AI_STEPS.findIndex(s => s.id === stepId)

  return (
    <div className="py-8 px-4">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30"
      >
        <Zap className="w-8 h-8 text-white" />
      </motion.div>
      <div className="flex justify-center gap-2 mb-6">
        {AI_STEPS.map((s, i) => {
          const isDone = i < currentStepIdx
          const isCurrent = s.id === stepId
          return (
            <div key={s.id} className="flex items-center gap-2">
              <motion.div
                animate={isCurrent ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${isDone ? 'bg-emerald-500' : isCurrent ? 'bg-violet-500' : 'bg-slate-200'}`}
              />
              {i < AI_STEPS.length - 1 && (
                <div className={`w-8 h-0.5 transition-colors ${isDone ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </div>
          )
        })}
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <p className="text-center text-sm font-medium text-violet-600 min-h-5">{msgs[msgIdx]}</p>
    </div>
  )
}

function FactureResult({ data }: { data: any }) {
  const fmt = (v: number | null) => v != null ? v.toFixed(2).replace('.', ',') + ' €' : '—'
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-emerald-800">Extraction reussie par IA</p>
          <p className="text-xs text-emerald-600">Toutes les donnees ont ete extraites automatiquement</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-emerald-600">Precision</p>
          <p className="text-sm font-bold text-emerald-800">98%</p>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-violet-50 rounded-xl p-4 border border-violet-100">
          <p className="text-xs text-violet-500 uppercase tracking-wide mb-1">Fournisseur</p>
          <p className="text-sm font-bold text-slate-900 leading-tight"><TypewriterText text={data.vendor_name || '—'} speed={25} /></p>
          {data.siret && <p className="text-xs text-slate-400 mt-1 font-mono"><TypewriterText text={data.siret} speed={30} /></p>}
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-xs text-indigo-500 uppercase tracking-wide mb-1">Total TTC</p>
          <p className="text-2xl font-bold text-slate-900"><TypewriterText text={fmt(data.total_amount)} speed={30} /></p>
          {data.tax_amount != null && <p className="text-xs text-slate-400 mt-1">TVA: <TypewriterText text={fmt(data.tax_amount)} speed={30} /></p>}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-slate-50 rounded-xl p-4 mb-4">
        {data.invoice_number && <FieldRow label="N Facture" value={data.invoice_number} delay={0.4} />}
        {data.invoice_date && <FieldRow label="Date facture" value={data.invoice_date} delay={0.5} />}
        {data.due_date && <FieldRow label="Echeance" value={data.due_date} delay={0.6} />}
        {data.subtotal != null && <FieldRow label="Montant HT" value={fmt(data.subtotal)} delay={0.7} />}
        {data.category && <FieldRow label="Categorie" value={data.category} delay={0.8} />}
        {data.missing_fields?.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-amber-500 font-medium">Champs non detectes: {data.missing_fields.join(', ')}</p>
          </motion.div>
        )}
      </motion.div>

      {data.tax_amount != null && data.total_amount != null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">TVA a declarer</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-800 font-medium">Montant TVA detecte</span>
            <span className="text-sm font-bold text-blue-900">{fmt(data.tax_amount)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-800 font-medium">Taux TVA effectif</span>
            <span className="text-sm font-bold text-blue-900">
              {data.subtotal && data.subtotal > 0
                ? `${((data.tax_amount / data.subtotal) * 100).toFixed(2)}%`
                : data.total_amount > 0
                ? `${((data.tax_amount / (data.total_amount - data.tax_amount)) * 100).toFixed(2)}%`
                : '—'}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 text-xs mt-0.5">💡</span>
              <p className="text-xs text-blue-600 leading-relaxed">
                {data.tax_amount != null && data.total_amount != null && (data.tax_amount / (data.total_amount - data.tax_amount) * 100) < 15
                  ? 'TVA mixte detectee — taux reduit sur certains produits (alimentation, livres). Reportez ce montant sur votre declaration CA3.'
                  : data.tax_amount != null && data.total_amount != null && (data.tax_amount / (data.total_amount - data.tax_amount) * 100) >= 19
                  ? 'TVA a taux normal 20%. Reportez ce montant en case 0800 de votre declaration CA3.'
                  : 'TVA intermediaire 10%. Reportez ce montant en case 0700 de votre declaration CA3.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
      {data.line_items?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{data.line_items.length} ligne{data.line_items.length > 1 ? 's' : ''} detectee{data.line_items.length > 1 ? 's' : ''}</p>
          <div className="space-y-2">
            {data.line_items.map((item: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.12 }} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 text-xs gap-3">
                <span className="text-slate-600 flex-1 truncate">{item.description}</span>
                {item.total != null && <span className="font-semibold text-slate-900 flex-shrink-0">{fmt(item.total)}</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

function ContratResult({ data }: { data: any }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5 p-4 bg-amber-50 rounded-xl border border-amber-100">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-amber-800">
            {data.risk_clauses?.length || 0} clause{(data.risk_clauses?.length || 0) > 1 ? 's' : ''} a risque detectee{(data.risk_clauses?.length || 0) > 1 ? 's' : ''}
          </p>
          <p className="text-xs text-amber-600">{data.hidden_fees?.length || 0} frais cache{(data.hidden_fees?.length || 0) > 1 ? 's' : ''} identifie{(data.hidden_fees?.length || 0) > 1 ? 's' : ''}</p>
        </div>
      </motion.div>
      {data.vendor_name && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Fournisseur</p>
          <p className="text-sm font-bold text-slate-900"><TypewriterText text={data.vendor_name} /></p>
          {data.payment_terms && <p className="text-xs text-slate-500 mt-1">Paiement: <TypewriterText text={data.payment_terms} speed={20} /></p>}
        </motion.div>
      )}
      {data.summary && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Resume IA</p>
          <p className="text-sm text-slate-700 leading-relaxed"><TypewriterText text={data.summary} speed={12} /></p>
        </motion.div>
      )}
      {data.risk_clauses?.length > 0 && (
        <div className="space-y-3 mb-4">
          {data.risk_clauses.map((clause: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
              className={`p-3 rounded-xl border text-xs ${clause.severity === 'high' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
              <span className={`font-bold uppercase tracking-wide block mb-1 ${clause.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                {clause.severity === 'high' ? 'RISQUE ELEVE' : 'ATTENTION'}
              </span>
              <p className={clause.severity === 'high' ? 'text-red-800' : 'text-amber-800'}>{clause.clause}</p>
            </motion.div>
          ))}
        </div>
      )}
      {data.hidden_fees?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Frais caches detectes</p>
          {data.hidden_fees.map((fee: any, i: number) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-600">{fee.description}</span>
              {fee.amount && <span className="font-bold text-red-600">{fee.amount}</span>}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function InlineDemoV2() {
  const [mode, setMode] = useState<Mode>('facture')
  const [step, setStep] = useState<Step>('idle')
  const [stepId, setStepId] = useState('uploading')
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [usageLeft, setUsageLeft] = useState(5)
  const [mounted, setMounted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Fix SSR hydration - read localStorage only on client side
  useEffect(() => {
    setMounted(true)
    const count = getUsageCount()
    setUsageLeft(Math.max(0, 5 - count))
  }, [])

  function getUsageCount(): number {
    if (typeof window === 'undefined') return 0
    try { return parseInt(localStorage.getItem('demo_v2_usage') || '0') } catch { return 0 }
  }

  function incrementUsage() {
    if (typeof window === 'undefined') return
    try {
      const newCount = getUsageCount() + 1
      localStorage.setItem('demo_v2_usage', String(newCount))
      setUsageLeft(Math.max(0, 5 - newCount))
    } catch {}
  }

  function resetUsage() {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('demo_v2_usage', '0')
      setUsageLeft(5)
      setStep('idle')
      setProgress(0)
      setResult(null)
    } catch {}
  }

  async function handleFile(file: File) {
    if (getUsageCount() >= 5) { setStep('limit'); return }
    setResult(null)
    setErrorMsg('')

    const apiPromise = callAPI(file)
    let animDone = false

    const runAnimation = async () => {
      for (let i = 0; i < AI_STEPS.length; i++) {
        const s = AI_STEPS[i]
        setStepId(s.id)
        setStep(s.id as Step)
        const targetPct = s.pct
        const startPct = i === 0 ? 0 : AI_STEPS[i - 1].pct
        await new Promise<void>(resolve => {
          const start = Date.now()
          const duration = 800 + i * 200
          const iv = setInterval(() => {
            const elapsed = Date.now() - start
            const t = Math.min(elapsed / duration, 1)
            setProgress(startPct + (targetPct - startPct) * t)
            if (t >= 1) { clearInterval(iv); resolve() }
          }, 16)
        })
        if (animDone) break
      }
      setProgress(90)
    }

    runAnimation()

    try {
      const data = await apiPromise
      animDone = true
      setProgress(100)
      await new Promise(r => setTimeout(r, 300))
      incrementUsage()
      setResult(data)
      setStep('done')
    } catch (err: any) {
      animDone = true
      setErrorMsg(err.message || "Erreur lors de l'analyse")
      setStep('error')
    }
  }

  async function callAPI(file: File): Promise<any> {
    const formData = new FormData()
    formData.append('file', file)
    const endpoint = mode === 'facture' ? '/api/invoices/extract' : '/api/contracts'
    const res = await fetch(endpoint, { method: 'POST', body: formData })
    const json = await res.json()
    console.log('API Response:', JSON.stringify(json))
    if (!json.success) throw new Error(json.error || 'Erreur IA')
    return json.data
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const isAnalyzing = ['uploading', 'reading', 'extracting', 'analyzing'].includes(step)

  if (!mounted) return null

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-1 mb-5 bg-slate-100 rounded-xl p-1">
        {(['facture', 'contrat'] as Mode[]).map((m) => (
          <button key={m}
            onClick={() => { if (!isAnalyzing) { setMode(m); setStep('idle'); setProgress(0); setResult(null) } }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === m ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {m === 'facture' ? 'Facture fournisseur' : 'Contrat'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className={`rounded-xl p-3 border transition-all ${mode === 'facture' ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-100'}`}>
          <p className="text-xs font-bold text-violet-700 mb-2 uppercase tracking-wide">Facture — IA detecte</p>
          <ul className="space-y-1">
            {['Nom & SIRET fournisseur', 'Montants HT / TVA / TTC', 'N facture & dates', 'Lignes de facturation', 'Categorie depense', 'Doublons potentiels'].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-xl p-3 border transition-all ${mode === 'contrat' ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-100'}`}>
          <p className="text-xs font-bold text-violet-700 mb-2 uppercase tracking-wide">Contrat — IA detecte</p>
          <ul className="space-y-1">
            {['Clauses a risque eleve', 'Frais caches & penalites', 'Conditions de resiliation', 'Revisions tarifaires auto', 'Dates cles & echeances', 'Resume intelligent'].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragging ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'}`}
            >
              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleInput} />
              <motion.div animate={isDragging ? { scale: 1.1 } : { scale: 1 }} className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-violet-600" />
              </motion.div>
              <p className="text-base font-semibold text-slate-700 mb-1">Glissez votre {mode === 'facture' ? 'facture' : 'contrat'} ici</p>
              <p className="text-sm text-slate-400 mb-4">PDF, JPG, PNG — max 10 Mo</p>
              <button
                onClick={(e) => { e.stopPropagation(); fileRef.current?.click() }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg"
              >
                <Zap className="w-4 h-4" />Choisir un fichier
              </button>
              <p className="text-xs text-slate-400 mt-3">{usageLeft} analyse{usageLeft > 1 ? 's' : ''} gratuite{usageLeft > 1 ? 's' : ''} restante{usageLeft > 1 ? 's' : ''} · Sans inscription</p>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl">
            <AIAnalyzing stepId={stepId} progress={progress} />
          </motion.div>
        )}

        {step === 'done' && result && (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl p-5">
            {mode === 'facture' ? <FactureResult data={result} /> : <ContratResult data={result} />}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-5 p-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-center">
              <p className="text-white font-semibold text-sm mb-1">Enregistrez et gerez toutes vos factures</p>
              <p className="text-violet-200 text-xs mb-3">Gratuit jusqu'a 5 factures · Sans carte bancaire</p>
              <a href={LOGIN_URL} className="inline-flex items-center gap-2 bg-white text-violet-700 px-5 py-2 rounded-lg text-sm font-bold hover:bg-violet-50 transition-colors">
                Creer mon compte gratuit <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            {usageLeft > 0 && (
              <button onClick={() => { setStep('idle'); setProgress(0); setResult(null) }} className="w-full mt-3 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                Tester une autre analyse ({usageLeft} restante{usageLeft > 1 ? 's' : ''})
              </button>
            )}
          </motion.div>
        )}

        {step === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-red-100 shadow-xl p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <p className="text-base font-bold text-slate-900 mb-2">Erreur lors de l'analyse</p>
            <p className="text-sm text-slate-500 mb-6">{errorMsg || 'Verifiez que le fichier est lisible et reessayez.'}</p>
            <button onClick={() => { setStep('idle'); setProgress(0) }} className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
              Reessayer
            </button>
          </motion.div>
        )}

        {step === 'limit' && (
          <motion.div key="limit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Lock className="w-7 h-7 text-violet-600" />
            </div>
            <p className="text-lg font-bold text-slate-900 mb-2">5 analyses utilisees</p>
            <p className="text-sm text-slate-500 mb-6">Creez un compte gratuit pour continuer avec 5 factures par mois.</p>
            <a href={LOGIN_URL} className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg">
              Creer mon compte gratuit <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={resetUsage} className="block w-full mt-4 py-2 text-xs text-slate-300 hover:text-slate-500 transition-colors">
              Reinitialiser (test)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {(step === 'idle' || step === 'done') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Donnees traitees en Europe · Hebergement Frankfurt · RGPD conforme</span>
        </motion.div>
      )}
    </div>
  )
}