"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Clock, Zap, FileText, Search, ShieldCheck, BarChart3, Settings, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/controle-facture-automatise`;

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL };
const schemaSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Controle Facture Automatise',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '102' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce que le controle de facture automatise ?",
      acceptedAnswer: { '@type': 'Answer', text: "Le controle de facture automatise est un processus qui utilise l'IA pour verifier automatiquement chaque facture recue ou emise : mentions obligatoires, coherence des montants, taux TVA, detection de doublons, et conformite fiscale. InvoiceAgent effectue ce controle en moins de 30 secondes par facture PDF." }
    },
    {
      '@type': 'Question',
      name: "Combien de temps fait gagner le controle automatise de factures ?",
      acceptedAnswer: { '@type': 'Answer', text: "Le controle manuel d'une facture prend en moyenne 8 a 12 minutes par document. InvoiceAgent le realise en 30 secondes. Pour une PME qui traite 100 factures par mois, cela represente entre 13 et 20 heures economisees — soit l'equivalent de 2 a 3 jours de travail comptable." }
    },
    {
      '@type': 'Question',
      name: "Le controle automatise de factures est-il fiable ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent combine extraction OCR et analyse IA pour verifier 12 points de controle sur chaque facture. Le taux de detection des erreurs est superieur au controle manuel car l'IA ne se fatigue pas et compare systematiquement chaque facture avec l'historique complet." }
    },
    {
      '@type': 'Question',
      name: "InvoiceAgent s'integre-t-il avec mon logiciel comptable ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent dispose d'une API REST qui permet l'integration avec les principaux logiciels comptables (Sage, Cegid, QuickBooks, Pennylane). Les factures sont analysees automatiquement a reception et les rapports transmis dans votre workflow existant. Plan Business requis." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Controle Facture Automatise', item: PAGE_URL }
  ]
};

function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href={BASE_URL} className="flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text>
              <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text>
              <circle cx="28" cy="5" r="3" fill="#818cf8" />
            </svg>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">InvoiceAgent</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[['12 controles', '#controles'], ['Comment ca marche', '#workflow'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex text-slate-600 hover:text-violet-600" asChild>
              <a href={`${BASE_URL}/auth/login`}>Connexion</a>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" asChild>
              <a href={`${BASE_URL}/auth/login`}>Essai gratuit</a>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden pb-16">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-50 rounded-full blur-3xl opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold">
                <Settings className="w-4 h-4" />
                Controle facture automatise par IA
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Controle facture
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">automatise</span>
              <span className="block text-4xl sm:text-5xl font-bold text-slate-600 mt-1">12 points en 30 secondes</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Fini le controle manuel facture par facture. InvoiceAgent verifie automatiquement les 12 points critiques de chaque facture PDF — conformite fiscale, montants, doublons, mentions — en moins de 30 secondes.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '12', label: 'Points de controle', sub: 'par facture' },
                { value: '< 30s', label: 'Par facture PDF', sub: 'vs 10 min manuels' },
                { value: '20h', label: 'Economisees/mois', sub: 'pour 100 factures' },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                  <p className="text-2xl font-black text-violet-600">{s.value}</p>
                  <p className="text-xs font-bold text-slate-700 mt-1">{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-base px-8 h-13 rounded-xl" asChild>
                <a href="#demo">Automatiser mes controles <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-base px-8 h-13 rounded-xl hover:border-violet-300" asChild>
                <a href="#controles">Voir les 12 controles</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500">
              {['Conformite fiscale verifiee', 'Doublons detectes avant paiement', 'Integration logiciel comptable'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />{item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero card — tableau de bord controle */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Rapport controle — Octobre 2024</p>
                    <p className="text-xs text-slate-400">47 factures analysees automatiquement</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-600">43 conformes</span>
              </div>

              {/* Stats rapides */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { val: '43', label: 'Conformes', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                  { val: '3', label: 'Erreurs TVA', color: 'bg-orange-50 text-orange-700 border-orange-100' },
                  { val: '1', label: 'Doublon', color: 'bg-red-50 text-red-700 border-red-100' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`rounded-xl p-3 border text-center ${s.color}`}
                  >
                    <p className="text-xl font-black">{s.val}</p>
                    <p className="text-xs font-semibold mt-0.5">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Mentions obligatoires', ok: 46, total: 47, pct: 98 },
                  { label: 'Coherence HT/TVA/TTC', ok: 44, total: 47, pct: 94 },
                  { label: 'Taux TVA correct', ok: 44, total: 47, pct: 94 },
                  { label: 'Detection doublons', ok: 46, total: 47, pct: 98 },
                  { label: 'Numerotation chronologique', ok: 47, total: 47, pct: 100 },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.06 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50"
                  >
                    <p className="text-xs font-semibold text-slate-700 w-44 flex-shrink-0">{row.label}</p>
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${row.pct === 100 ? 'bg-emerald-500' : row.pct >= 95 ? 'bg-blue-500' : 'bg-orange-500'}`}
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-8 text-right ${row.pct === 100 ? 'text-emerald-600' : row.pct >= 95 ? 'text-blue-600' : 'text-orange-600'}`}>{row.pct}%</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4 border border-violet-100">
                <p className="text-xs font-bold text-violet-700 mb-1">Resume IA — Octobre 2024</p>
                <p className="text-xs text-violet-600 leading-relaxed">3 factures avec taux TVA a corriger (travaux 20% → 10%). 1 doublon bloque avant paiement : economie de 1 840€. Temps de controle total : 23 minutes (vs 8h en manuel).</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">8h → 23 min</p>
                <p className="text-xs text-emerald-500 font-semibold">controle automatise</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-violet-500" />
              <span className="text-xs font-bold text-slate-800">1 840€</span>
              <span className="text-xs text-violet-500 font-semibold">economies ce mois</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ControlesSection() {
  const controles = [
    { num: '01', icon: FileText, title: 'Mentions obligatoires (17 points)', description: "Verification complete des 17 mentions legalement requises : SIRET emetteur et client, TVA intracommunautaire, numero sequentiel, date echeance, conditions paiement, penalites retard, indemnite 40€ — chaque mention absente est signalee avec la correction.", color: 'from-violet-500 to-indigo-600' },
    { num: '02', icon: BarChart3, title: 'Taux TVA selon l\'activite', description: "L'IA identifie la nature de la prestation facturee et verifie que le taux applique est correct — 20% pour services standards, 10% pour travaux, 5,5% pour alimentaire. Chaque ecart est signale avec le taux applicable et le montant de TVA a corriger.", color: 'from-blue-500 to-violet-600' },
    { num: '03', icon: Search, title: 'Coherence HT + TVA = TTC', description: "Recalcul systematique : base HT × taux TVA = TVA, puis HT + TVA = TTC. Meme un ecart de 0,01€ est detecte. L'IA identifie egalement si une remise commerciale a ete oubliee dans la base de calcul TVA.", color: 'from-emerald-500 to-teal-600' },
    { num: '04', icon: RefreshCw, title: 'Detection doublons', description: "Comparaison avec l'historique complet sur 4 criteres : fournisseur, montant, periode, contenu. Un doublon est detecte meme si la reference a change — avant tout paiement, avec identification de la facture originale deja reglee.", color: 'from-red-500 to-rose-600' },
    { num: '05', icon: ShieldCheck, title: 'Numerotation chronologique', description: "Verification que la sequence de numerotation est continue et sans rupture. Tout saut de numero ou reference non chronologique est signale — une rupture de sequence peut etre interpretee comme une tentative de dissimulation de chiffre d'affaires.", color: 'from-amber-500 to-orange-600' },
    { num: '06', icon: AlertTriangle, title: 'Validite SIRET et TVA', description: "Verification du format du SIRET (14 chiffres, algorithme de Luhn) et du numero de TVA intracommunautaire (format FR + clef de 2 chiffres + SIREN). Un SIRET invalide rend la facture contestable et la deduction de TVA refusable.", color: 'from-orange-500 to-red-500' },
    { num: '07', icon: Clock, title: 'Respect delais de paiement', description: "Verification que le delai de paiement ne depasse pas 60 jours date de facture ou 45 jours fin de mois (loi LME). Pour les grandes entreprises, le depassement expose a des penalites DGCCRF et un signalement dans les rapports annuels.", color: 'from-teal-500 to-emerald-600' },
    { num: '08', icon: TrendingUp, title: 'Conformite facture rectificative', description: "Verification que les avoirs et factures rectificatives referencent correctement la facture originale, que les montants sont en negatif (avoir) ou corrigeant l'ecart, et que la mention 'Facture rectificative' est presente.", color: 'from-pink-500 to-rose-600' },
    { num: '09', icon: Settings, title: 'Auto-liquidation intracommunautaire', description: "Detection des prestations B2B vers des clients UE : la TVA ne doit pas etre facturee et la mention 'Auto-liquidation — article 196 directive 2006/112/CE' doit etre presente. Une TVA facturee par erreur doit etre reversee sans pouvoir la recuperer.", color: 'from-indigo-500 to-violet-600' },
    { num: '10', icon: FileText, title: 'Description de prestation', description: "Evaluation de la precision de la description : 'Prestation de services' seul est insuffisant. La description doit identifier la nature, la quantite et le prix unitaire de chaque ligne. Une description vague expose au refus de deduction en controle.", color: 'from-slate-500 to-slate-700' },
    { num: '11', icon: BarChart3, title: 'Franchise de TVA verifiee', description: "Pour les auto-entrepreneurs et petites structures, verification que la mention 'TVA non applicable — art. 293 B du CGI' est presente si le CA est sous le seuil, et absente si le seuil a ete depasse. Une TVA facturee par un non-assujetti doit etre reversee.", color: 'from-cyan-500 to-blue-600' },
    { num: '12', icon: ShieldCheck, title: 'Coherence avec bon de commande', description: "Rapprochement automatique entre la facture et le bon de commande ou devis associe : verification du montant, de la prestation, et de la date de realisation. Tout ecart entre facture et BC est signale avant paiement.", color: 'from-violet-600 to-purple-700' },
  ];

  return (
    <section id="controles" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Controles automatises sur chaque facture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Les 12 points de controle
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> verifies automatiquement</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">InvoiceAgent execute ces 12 controles sur chaque facture PDF en moins de 30 secondes — ce qu'un comptable ferait en 8 a 12 minutes par document.</p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {controles.map((c, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="group h-full bg-white border-slate-100 hover:shadow-md transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <c.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-black text-slate-300">#{c.num}</span>
                        <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const etapes = [
    {
      num: '01',
      title: 'Reception automatique des factures',
      description: "InvoiceAgent recoit vos factures fournisseurs par email, upload manuel ou via API depuis votre ERP. Chaque facture PDF est mise en file de traitement des sa reception.",
      temps: 'Immediat',
    },
    {
      num: '02',
      title: 'Extraction et analyse IA en 30 secondes',
      description: "L'IA extrait toutes les donnees de la facture (OCR avance) et execute les 12 points de controle : mentions, montants, TVA, doublons, SIRET, delais. Le rapport est genere en moins de 30 secondes.",
      temps: '< 30 secondes',
    },
    {
      num: '03',
      title: 'Rapport de controle structure',
      description: "Chaque facture recoit un statut : Conforme (pret au paiement), A verifier (anomalie mineure), ou Bloque (erreur critique ou doublon). Le rapport detail chaque point avec la correction recommandee.",
      temps: 'Instantane',
    },
    {
      num: '04',
      title: 'Workflow de validation configure',
      description: "Les factures conformes passent directement en validation comptable. Les factures avec anomalies sont soumises a un responsable avec le rapport complet. Les doublons et erreurs critiques sont bloques automatiquement.",
      temps: 'Selon votre process',
    },
  ];

  return (
    <section id="workflow" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-semibold">
            Workflow automatise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Comment fonctionne le
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> controle automatise</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">De la reception de la facture a la validation du paiement — entierement automatise en moins de 30 secondes.</p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-300 to-indigo-100 hidden md:block" />
          <div className="space-y-6">
            {etapes.map((e, i) => (
              <AnimatedSection key={i}>
                <div className="flex items-start gap-6">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-black text-base">{e.num}</span>
                  </div>
                  <Card className="flex-1 bg-slate-50 border-slate-100">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-slate-900 mb-2">{e.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{e.description}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-100 text-violet-600 whitespace-nowrap flex-shrink-0">{e.temps}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection className="mt-10 bg-violet-50 rounded-2xl p-6 border border-violet-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-violet-900 mb-2">Integration avec votre logiciel comptable</h3>
              <p className="text-violet-700 text-sm leading-relaxed mb-4">InvoiceAgent s'integre via API avec Sage, Cegid, QuickBooks, Pennylane et les principaux ERP. Les rapports de controle sont transmis automatiquement dans votre workflow existant — zero double saisie.</p>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm" asChild>
                <a href={`${BASE_URL}/auth/login`}>Automatiser mes controles <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'Gratuit',
      price: '0',
      description: 'Pour tester',
      features: ['2 controles gratuits', '12 points de controle', 'Rapport structure', 'Export PDF'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Controles illimites', '12 points automatises', 'Detection doublons historique', 'Rapport detaille', 'Recommandations IA', 'Export analyses'],
      cta: 'Choisir Pro',
      popular: true,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Volume et equipes',
      features: ['Tout Pro inclus', 'Multi-utilisateurs', 'Workflow validation', 'API integration ERP/comptable', 'Accompagnement dedie'],
      cta: 'Choisir Business',
      popular: false,
      href: `${BASE_URL}/checkout?plan=business`
    },
  ];

  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold">Tarifs</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5">
            Simple et <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">transparent</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">2 controles offerts. 20 heures economisees par mois valent largement l'abonnement.</p>
        </AnimatedSection>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className={`relative h-full bg-white ${plan.popular ? 'border-2 border-violet-500 shadow-xl shadow-violet-100' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow whitespace-nowrap">Plus populaire</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-slate-900">{plan.price}€</span>
                      {plan.price !== '0' && <span className="text-slate-400 text-sm">/mois</span>}
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-violet-500' : 'text-emerald-500'}`} />
                        <span className="text-slate-600 text-xs">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full text-sm font-semibold ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`} asChild>
                    <a href={plan.href}>{plan.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-slate-400 text-xs mt-6">Sans engagement · Annulez a tout moment · Donnees hebergees en Europe</p>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
            <Sparkles className="w-4 h-4" />Demo gratuite — sans inscription
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Testez le controle automatise maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA execute les 12 points de controle et genere le rapport en moins de 30 secondes.</p>
        </AnimatedSection>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8"
        >
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[
            { value: '12', label: 'Points de controle', icon: ShieldCheck },
            { value: '< 30s', label: 'Par facture', icon: Clock },
            { value: '0€', label: 'Pour commencer', icon: Zap }
          ].map((s) => (
            <AnimatedSection key={s.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                <s.icon className="w-6 h-6 text-violet-300" />
              </div>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-sm text-violet-300 mt-1">{s.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Qu'est-ce que le controle de facture automatise et pourquoi l'utiliser ?",
      a: "Le controle de facture automatise utilise l'IA pour verifier en 30 secondes ce qu'un comptable ferait en 8 a 12 minutes : mentions obligatoires, coherence des montants, taux TVA, doublons, validite SIRET. Pour une PME de 100 factures par mois, cela represente 13 a 20 heures economisees et un taux de detection des erreurs superieur au controle manuel."
    },
    {
      q: "Le controle automatise remplace-t-il le comptable ?",
      a: "Non — il augmente sa capacite. InvoiceAgent gere les verifications repetitives et les anomalies evidentes, permettant au comptable de se concentrer sur les decisions a valeur ajoutee : negociation fournisseur, optimisation fiscale, reporting. C'est un outil d'assistance, pas de remplacement."
    },
    {
      q: "Comment InvoiceAgent s'integre-t-il avec mon logiciel comptable ?",
      a: "InvoiceAgent propose une API REST documentee compatible avec Sage, Cegid, QuickBooks, Pennylane et les principaux ERP. Les factures sont analysees automatiquement a reception et les rapports transmis dans votre workflow. Pour les PME sans ERP, l'upload manuel ou par email est disponible des le plan Gratuit."
    },
    {
      q: "InvoiceAgent peut-il controler les factures emises et recues ?",
      a: "Oui. InvoiceAgent controle les deux flux : les factures fournisseurs recues (avant paiement) et les factures clients emises (avant envoi ou apres pour audit). Pour les factures emises, l'IA verifie la conformite fiscale et la coherence avant que votre client ne les receve."
    },
    {
      q: "Combien de factures InvoiceAgent peut-il controler par mois ?",
      a: "Plan Gratuit : 2 controles d'essai. Plan Pro (29€/mois) : controles illimites — adapte aux PME de 10 a 500 factures/mois. Plan Business (49€/mois) : volume illimite avec API, multi-utilisateurs et workflow de validation configure — adapte aux PME de 500+ factures/mois."
    },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">FAQ</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Questions <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">frequentes</span>
          </h2>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="border-slate-200 overflow-hidden bg-white">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800 pr-4 text-sm leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Automatisez le controle de toutes vos factures
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">2 controles gratuits — sans carte bancaire. 12 points verifies en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-bold underline">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-base px-8 h-14 font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Automatiser mes controles <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-base px-8 h-14" asChild>
              <a href="#demo">Tester la demo</a>
            </Button>
          </div>
          <p className="mt-6 text-violet-200 text-xs">Sans engagement · RGPD conforme · Donnees hebergees en Europe</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Erreurs facture frequentes PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
    { label: 'Comment verifier facture fournisseur', href: `${BASE_URL}/comment-verifier-facture-fournisseur` },
    { label: 'Doublon facture que faire', href: `${BASE_URL}/doublon-facture-que-faire` },
    { label: 'Outil analyse facture automatique', href: `${BASE_URL}/outil-analyse-facture-automatique` },
    { label: 'Extraction donnees facture', href: `${BASE_URL}/extraction-donnees-facture` },
    { label: 'OCR factures PDF', href: `${BASE_URL}/ocr-factures-pdf` },
  ];
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Decouvrez toutes les fonctionnalites InvoiceAgent</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-violet-600 font-medium hover:border-violet-300 hover:shadow-sm transition-all">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ControleFactureAutomatise() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <ControlesSection />
        <WorkflowSection />
        <Pricing />
        <Demo />
        <FAQ />
        <CTA />
        <InternalLinks />
        <SharedFooter />
      </div>
    </>
  );
}