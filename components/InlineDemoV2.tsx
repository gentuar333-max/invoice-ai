'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Zap, CheckCircle2, Upload, ArrowRight, AlertTriangle, Lock } from 'lucide-react'

const LOGIN_URL = 'https://invoiceagent.fr/auth/login'

type Mode = 'facture' | 'contrat'
type Step = 'idle' | 'uploading' | 'reading' | 'extracting' | 'analyzing' | 'done' | 'limit'

// Mock results for instant response
const MOCK_FACTURE = {
  vendor_name: 'METRO Cash & Carry France',
  siret: '30814377700478',
  invoice_number: 'FAC-2026-084521',
  invoice_date: '2026-03-28',
  due_date: '2026-04-27',
  subtotal: 1248.50,
  tax_amount: 249.70,
  total_amount: 1498.20,
  currency: 'EUR',
  category: 'Fournitures',
  line_items: [
    { description: 'Consommables bureau — lot 50 unités', quantity: 2, unit_price: 289.00, total: 578.00 },
    { description: 'Matériel informatique — accessoires', quantity: 1, unit_price: 420.50, total: 420.50 },
    { description: 'Fournitures diverses', quantity: 5, unit_price: 50.00, total: 250.00 },
  ],
}

const MOCK_CONTRAT = {
  vendor_name: 'Orange Business Services',
  payment_terms: '30 jours fin de mois',
  summary: "Contrat de prestation télécom pour 24 mois avec engagement ferme. Renouvellement automatique si non résiliation 3 mois avant échéance.",
  risk_clauses: [
    { clause: "Pénalité de résiliation anticipée : 3 mois d'honoraires restants", severity: 'high' },
    { clause: "Révision tarifaire automatique +3% par an indexée sur l'IPC", severity: 'medium' },
  ],
  hidden_fees: [
    { description: 'Frais de mise en service', amount: '€299 HT' },
    { description: 'Frais de portabilité numéro', amount: '€49 HT' },
  ],
  key_dates: [
    { date: '2028-03-01', description: 'Date limite résiliation sans pénalité' },
    { date: '2028-06-01', description: 'Fin de contrat' },
  ],
}

const AI_STEPS = [
  { id: 'uploading', label: 'Réception du document...', duration: 600 },
  { id: 'reading', label: 'Lecture et analyse du fichier...', duration: 800 },
  { id: 'extracting', label: "Extraction des données par OCR IA...", duration: 900 },
  { id: 'analyzing', label: 'Vérification et structuration...', duration: 700 },
]

function TypewriterText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
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

function AIAnalyzing({ step, progress }: { step: string; progress: number }) {
  const messages: Record<string, string[]> = {
    uploading: ['Réception du fichier...', 'Vérification du format...'],
    reading: ['Lecture du document...', 'Analyse de la structure...', 'Identification du type de document...'],
    extracting: ["Extraction du nom du fournisseur...", "Lecture des montants HT/TTC...", "Détection de la TVA...", "Extraction du numéro de facture..."],
    analyzing: ['Vérification des données...', 'Détection des doublons...', 'Structuration finale...'],
  }

  const [msgIndex, setMsgIndex] = useState(0)
  const msgs = messages[step] || []

  useEffect(() => {
    setMsgIndex(0)
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % msgs.length)
    }, 600)
    return () => clearInterval(interval)
  }, [step])

  return (
    <div className="py-8 px-4">
      {/* Robot icon */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30"
      >
        <Zap className="w-8 h-8 text-white" />
      </motion.div>

      {/* Steps */}
      <div className="flex justify-center gap-2 mb-6">
        {AI_STEPS.map((s, i) => {
          const currentIdx = AI_STEPS.findIndex(x => x.id === step)
          const isDone = i < currentIdx
          const isCurrent = s.id === step
          return (
            <div key={s.id} className="flex items-center gap-2">
              <motion.div
                animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={`w-2.5 h-2.5 rounded-full ${isDone ? 'bg-emerald-500' : isCurrent ? 'bg-violet-500' : 'bg-slate-200'}`}
              />
              {i < AI_STEPS.length - 1 && (
                <div className={`w-6 h-0.5 ${isDone ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Current message */}
      <p className="text-center text-sm font-medium text-violet-600 min-h-5">
        {msgs[msgIndex] || ''}
      </p>
    </div>
  )
}

function FactureResult({ data }: { data: typeof MOCK_FACTURE }) {
  const fmt = (v: number) => v.toFixed(2).replace('.', ',') + ' €'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">Extraction réussie — 98% de précision</p>
          <p className="text-xs text-emerald-600">Toutes les données ont été extraites automatiquement</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-emerald-600">Temps</p>
          <p className="text-sm font-bold text-emerald-800">3.1s</p>
        </div>
      </motion.div>

      {/* Vendor + Total */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-violet-50 rounded-xl p-4 border border-violet-100">
          <p className="text-xs text-violet-500 uppercase tracking-wide mb-1">Fournisseur</p>
          <p className="text-sm font-bold text-slate-900 leading-tight">
            <TypewriterText text={data.vendor_name} speed={25} />
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            <TypewriterText text={data.siret} speed={30} />
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-xs text-indigo-500 uppercase tracking-wide mb-1">Total TTC</p>
          <p className="text-2xl font-bold text-slate-900">
            <TypewriterText text={fmt(data.total_amount)} speed={30} />
          </p>
          <p className="text-xs text-slate-400 mt-1">TVA: <TypewriterText text={fmt(data.tax_amount)} speed={30} /></p>
        </motion.div>
      </div>

      {/* Fields */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-slate-50 rounded-xl p-4 mb-4">
        <FieldRow label="N° Facture" value={data.invoice_number} delay={0.4} />
        <FieldRow label="Date facture" value={data.invoice_date} delay={0.5} />
        <FieldRow label="Échéance" value={data.due_date} delay={0.6} />
        <FieldRow label="Montant HT" value={fmt(data.subtotal)} delay={0.7} />
        <FieldRow label="Catégorie" value={data.category} delay={0.8} />
      </motion.div>

      {/* Line items */}
      {data.line_items.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{data.line_items.length} lignes détectées</p>
          <div className="space-y-2">
            {data.line_items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.15 }} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 text-xs">
                <span className="text-slate-600 flex-1 pr-4 truncate">{item.description}</span>
                <span className="font-semibold text-slate-900 flex-shrink-0">{fmt(item.total)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

function ContratResult({ data }: { data: typeof MOCK_CONTRAT }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5 p-4 bg-amber-50 rounded-xl border border-amber-100">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-amber-800">{data.risk_clauses.length} clauses à risque détectées</p>
          <p className="text-xs text-amber-600">{data.hidden_fees.length} frais cachés identifiés</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-slate-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Résumé IA</p>
        <p className="text-sm text-slate-700 leading-relaxed">
          <TypewriterText text={data.summary} speed={12} />
        </p>
      </motion.div>

      <div className="space-y-3 mb-4">
        {data.risk_clauses.map((clause, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.2 }} className={`p-3 rounded-xl border text-xs ${clause.severity === 'high' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold uppercase tracking-wide ${clause.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`}>{clause.severity === 'high' ? 'RISQUE ÉLEVÉ' : 'ATTENTION'}</span>
            </div>
            <p className={clause.severity === 'high' ? 'text-red-800' : 'text-amber-800'}>{clause.clause}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-slate-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Frais cachés détectés</p>
        {data.hidden_fees.map((fee, i) => (
          <div key={i} className="flex justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
            <span className="text-slate-600">{fee.description}</span>
            <span className="font-bold text-red-600">{fee.amount}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function InlineDemoV2() {
  const [mode, setMode] = useState<Mode>('facture')
  const [step, setStep] = useState<Step>('idle')
  const [progress, setProgress] = useState(0)
  const [currentStepId, setCurrentStepId] = useState('uploading')
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function getUsageCount(): number {
    try { return parseInt(localStorage.getItem('demo_v2_usage') || '0') } catch { return 0 }
  }

  function incrementUsage() {
    try { localStorage.setItem('demo_v2_usage', String(getUsageCount() + 1)) } catch {}
  }

  async function runDemo() {
    if (getUsageCount() >= 2) { setStep('limit'); return }
    setStep('uploading')
    setProgress(0)

    let totalProgress = 0
    for (const aiStep of AI_STEPS) {
      setCurrentStepId(aiStep.id)
      const targetProgress = totalProgress + (100 / AI_STEPS.length)
      const startProgress = totalProgress

      await new Promise<void>((resolve) => {
        const start = Date.now()
        const interval = setInterval(() => {
          const elapsed = Date.now() - start
          const p = Math.min(elapsed / aiStep.duration, 1)
          setProgress(startProgress + (targetProgress - startProgress) * p)
          setStep(aiStep.id as Step)
          if (p >= 1) { clearInterval(interval); resolve() }
        }, 16)
      })

      totalProgress = targetProgress
    }

    setProgress(100)
    incrementUsage()
    await new Promise(r => setTimeout(r, 300))
    setStep('done')
  }

  function handleFile() { runDemo() }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    runDemo()
  }

  const isAnalyzing = ['uploading', 'reading', 'extracting', 'analyzing'].includes(step)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mode tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1">
        {(['facture', 'contrat'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { if (step === 'idle' || step === 'done' || step === 'limit') { setMode(m); setStep('idle'); setProgress(0) } }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === m ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {m === 'facture' ? '📄 Facture fournisseur' : '📋 Contrat'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Detection badges */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`rounded-xl p-3 border transition-all ${mode === 'facture' ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-100'}`}>
          <p className="text-xs font-bold text-violet-700 mb-2 uppercase tracking-wide">📄 Facture — IA détecte</p>
          <ul className="space-y-1">
            {['Nom & SIRET fournisseur', 'Montants HT / TVA / TTC', 'N° facture & dates', 'Lignes de facturation', 'Catégorie dépense', 'Doublons potentiels'].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-xl p-3 border transition-all ${mode === 'contrat' ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-100'}`}>
          <p className="text-xs font-bold text-violet-700 mb-2 uppercase tracking-wide">📋 Contrat — IA détecte</p>
          <ul className="space-y-1">
            {['Clauses à risque élevé', 'Frais cachés & pénalités', 'Conditions de résiliation', 'Révisions tarifaires auto', 'Dates clés & échéances', 'Résumé intelligent'].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragging ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'}`}
            >
              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile} />
              <motion.div animate={isDragging ? { scale: 1.1 } : { scale: 1 }} className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-violet-600" />
              </motion.div>
              <p className="text-base font-semibold text-slate-700 mb-1">Glissez votre {mode === 'facture' ? 'facture' : 'contrat'} ici</p>
              <p className="text-sm text-slate-400 mb-4">PDF, JPG, PNG — max 10 Mo</p>
              <button onClick={(e) => { e.stopPropagation(); runDemo() }} className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all">
                <Zap className="w-4 h-4" />
                Tester avec un exemple
              </button>
              <p className="text-xs text-slate-400 mt-3">2 analyses gratuites · Sans inscription</p>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-violet-600/5">
            <AIAnalyzing step={currentStepId} progress={progress} />
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-violet-600/5 p-5">
            {mode === 'facture' ? <FactureResult data={MOCK_FACTURE} /> : <ContratResult data={MOCK_CONTRAT} />}

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-5 p-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-center">
              <p className="text-white font-semibold text-sm mb-1">Enregistrez et gérez toutes vos factures</p>
              <p className="text-violet-200 text-xs mb-3">Gratuit jusqu'à 5 factures · Sans carte bancaire</p>
              <a href={LOGIN_URL} className="inline-flex items-center gap-2 bg-white text-violet-700 px-5 py-2 rounded-lg text-sm font-bold hover:bg-violet-50 transition-colors">
                Créer mon compte gratuit <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {getUsageCount() < 2 && (
              <button onClick={() => { setStep('idle'); setProgress(0) }} className="w-full mt-3 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                Tester une autre analyse
              </button>
            )}
          </motion.div>
        )}

        {step === 'limit' && (
          <motion.div key="limit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Lock className="w-7 h-7 text-violet-600" />
            </div>
            <p className="text-lg font-bold text-slate-900 mb-2">2 analyses utilisées</p>
            <p className="text-sm text-slate-500 mb-6">Créez un compte gratuit pour continuer avec 5 factures par mois.</p>
            <a href={LOGIN_URL} className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all">
              Créer mon compte gratuit <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}