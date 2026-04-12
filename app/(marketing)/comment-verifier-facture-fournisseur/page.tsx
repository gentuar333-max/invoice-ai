"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Clock, Zap, FileText, Search, ShieldCheck, Eye, Calculator, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/comment-verifier-facture-fournisseur`;

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
  name: 'InvoiceAgent — Verifier Facture Fournisseur',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment verifier une facture fournisseur avant de la payer ?",
      acceptedAnswer: { '@type': 'Answer', text: "Verifiez 5 points essentiels : 1) Les mentions obligatoires sont completes (SIRET, TVA, echeance), 2) Le taux de TVA correspond a la prestation, 3) Les montants HT + TVA = TTC sont coherents, 4) La facture ne correspond pas a un doublon deja paye, 5) Le RIB fournisseur est identique a celui enregistre. InvoiceAgent automatise ces 5 verifications en 30 secondes." }
    },
    {
      '@type': 'Question',
      name: "Quels sont les risques de payer une facture fournisseur sans la verifier ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les risques sont : paiement d'un doublon (facture deja reglee), deduction de TVA refusee en cas de controle fiscal si la facture est non conforme, fraude au faux fournisseur (RIB modifie), surcouf de facturation non detecte, et engagement de depenses non validees." }
    },
    {
      '@type': 'Question',
      name: "Comment detecter une fraude au faux fournisseur sur une facture ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les signaux d'alerte : RIB different du fournisseur habituel, email d'expediteur avec domaine legerement different, demande urgente de paiement, montant inhabituel. Toujours verifier le RIB par telephone directement avec le fournisseur avant tout virement modifie." }
    },
    {
      '@type': 'Question',
      name: "InvoiceAgent verifie-t-il automatiquement les factures fournisseurs ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse les factures fournisseurs PDF en moins de 30 secondes : mentions obligatoires, coherence des montants, taux TVA, detection de doublons, et alertes sur les anomalies. Vous validez ou rejetez chaque facture avec un rapport complet." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Verifier Facture Fournisseur', item: PAGE_URL }
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
            {[['5 points a verifier', '#points'], ['Etapes', '#etapes'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-3xl opacity-50" />
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
                <Eye className="w-4 h-4" />
                Verification facture fournisseur automatique
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Comment verifier
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">une facture</span>
              <span className="block text-4xl sm:text-5xl font-bold text-slate-600 mt-1">fournisseur avant de payer</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Doublon non detecte, TVA non deductible, fraude au faux fournisseur — chaque facture fournisseur payee sans verification est un risque financier. InvoiceAgent analyse et valide en 30 secondes.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '5', label: 'Points verifies', sub: 'avant paiement' },
                { value: '< 30s', label: 'Par facture PDF', sub: 'analyse complete' },
                { value: '0€', label: 'Pour commencer', sub: '2 analyses offertes' },
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
                <a href="#demo">Verifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-base px-8 h-13 rounded-xl hover:border-violet-300" asChild>
                <a href="#etapes">Voir les etapes</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500">
              {['Doublons detectes automatiquement', 'TVA deductible verifiee', 'Alertes anomalies en temps reel'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />{item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow">
                    <ClipboardCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Facture Fournisseur — SARL Dupont</p>
                    <p className="text-xs text-slate-400">Verification avant paiement — 19 secondes</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-600">2 alertes</span>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Mentions obligatoires', detail: 'SIRET, TVA, echeance — toutes presentes', ok: true },
                  { label: 'Taux TVA', detail: '20% sur prestation de conseil — correct', ok: true },
                  { label: 'Coherence HT + TVA = TTC', detail: '3 200 + 640 = 3 840€ — correct', ok: true },
                  { label: 'Detection doublon', detail: 'Reference PRE-2024-0441 — deja reglee le 12/09', ok: false },
                  { label: 'RIB fournisseur', detail: 'IBAN different du precedent virement — alerte', ok: false },
                  { label: 'Montant vs bon de commande', detail: 'BC-2024-089 : 3 200€ HT — correspond', ok: true },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${!row.ok ? 'bg-red-50 border border-red-100' : 'bg-slate-50 border border-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{row.label}</p>
                      <p className={`text-xs mt-0.5 ${!row.ok ? 'text-red-500' : 'text-slate-400'}`}>{row.detail}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${!row.ok ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {row.ok ? 'OK' : 'Alerte'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100">
                <p className="text-xs font-bold text-red-700 mb-1">⚠️ Ne pas payer — 2 alertes critiques</p>
                <p className="text-xs text-red-600 leading-relaxed">Cette facture semble etre un doublon de PRE-2024-0441 deja regle. Le RIB a change — contactez le fournisseur par telephone avant tout virement.</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg border border-red-100 px-4 py-3 items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Doublon detecte</p>
                <p className="text-xs text-red-500 font-semibold">Paiement bloque</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800">RIB</span>
              <span className="text-xs text-red-500 font-semibold">modifie — alerte fraude</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function PointsSection() {
  const points = [
    {
      num: '01',
      icon: FileText,
      title: 'Verifier les mentions obligatoires',
      description: "Avant tout paiement, controllez que la facture comporte les mentions legalement requises : SIRET emetteur et client, numero de TVA intracommunautaire, numero de facture sequentiel, date d'echeance, conditions de paiement et taux de penalites de retard. Une facture incomplete peut etre rejetee en controle fiscal.",
      action: 'InvoiceAgent verifie les 17 mentions en 30 secondes',
      color: 'from-violet-500 to-indigo-600',
      tag: 'Etape 1',
    },
    {
      num: '02',
      icon: Calculator,
      title: 'Controler la coherence des montants',
      description: "Verifiez que HT + TVA = TTC exact. Verifiez que le taux de TVA applique correspond bien a la nature de la prestation — 20% pour les services standards, 10% pour les travaux, 5,5% pour l'alimentaire. Une incoherence, meme de quelques centimes, bloque la deduction de TVA.",
      action: 'InvoiceAgent recalcule et detecte chaque ecart',
      color: 'from-blue-500 to-violet-600',
      tag: 'Etape 2',
    },
    {
      num: '03',
      icon: Search,
      title: 'Detecter les doublons',
      description: "Comparez la reference, le montant et la date avec vos factures deja reglees. Un doublon non detecte — meme montant, meme fournisseur, reference differente — est une perte seche. Les erreurs de doublon representent en moyenne 0,5% du volume d'achats en PME, soit des milliers d'euros annuels.",
      action: 'InvoiceAgent compare avec l\'historique automatiquement',
      color: 'from-emerald-500 to-teal-600',
      tag: 'Etape 3',
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'Verifier le RIB fournisseur',
      description: "La fraude au faux fournisseur consiste a intercepter une facture et modifier le RIB. Tout changement de RIB doit etre verifie par telephone avec le fournisseur — jamais par email. Comparez systematiquement le nouveau RIB avec celui enregistre dans votre systeme comptable avant tout virement.",
      action: 'Alerte automatique si RIB different du precedent',
      color: 'from-red-500 to-rose-600',
      tag: 'Etape 4',
    },
    {
      num: '05',
      icon: ClipboardCheck,
      title: 'Rapprocher avec le bon de commande',
      description: "Toute facture fournisseur doit correspondre a un bon de commande ou un contrat signe. Verifiez que la prestation facturee a bien ete commandee, livree ou realisee, et que le montant correspond au devis accepte. Une facture sans bon de commande associe est un risque de paiement non justifie.",
      action: 'Rapprochement automatique BC / facture',
      color: 'from-amber-500 to-orange-600',
      tag: 'Etape 5',
    },
  ];

  return (
    <section id="points" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Checklist verification fournisseur
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            5 points a verifier sur
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> chaque facture fournisseur</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">InvoiceAgent automatise ces 5 verifications sur chaque facture PDF en moins de 30 secondes — avant que vous autorisiez le paiement.</p>
        </AnimatedSection>

        <div className="space-y-5 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <AnimatedSection key={i}>
              <Card className="bg-white border-slate-100 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <p.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{p.tag}</span>
                        <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{p.description}</p>
                      <div className="flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-lg px-3 py-2 w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                        <p className="text-xs font-semibold text-violet-600">{p.action}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function EtapesSection() {
  const etapes = [
    {
      num: '01',
      title: 'Uploadez la facture PDF',
      description: "Glissez-deposez la facture fournisseur recue dans InvoiceAgent. L'IA extrait automatiquement toutes les donnees — montants, references, coordonnees, RIB — sans ressaisie manuelle.",
    },
    {
      num: '02',
      title: 'L\'IA analyse en 30 secondes',
      description: "InvoiceAgent verifie les 5 points critiques : mentions obligatoires, coherence des montants, taux TVA, detection de doublon dans l'historique, et alerte si le RIB est different du precedent.",
    },
    {
      num: '03',
      title: 'Vous recevez le rapport de verification',
      description: "Chaque point est statut OK ou Alerte avec une explication claire. Les alertes critiques (doublon, RIB modifie) declenchent une notification immediate avant tout paiement.",
    },
    {
      num: '04',
      title: 'Vous validez ou bloquez le paiement',
      description: "Sur la base du rapport, vous autorisez le paiement ou bloquez la facture pour investigation. InvoiceAgent conserve l'historique de toutes les verifications pour vos audits internes.",
    },
  ];

  return (
    <section id="etapes" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-semibold">
            Comment ca marche
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Verification en
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> 4 etapes simples</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">De la reception de la facture a la validation du paiement — automatise en moins de 30 secondes.</p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 to-indigo-100 hidden md:block" />
          <div className="space-y-6">
            {etapes.map((e, i) => (
              <AnimatedSection key={i}>
                <div className="flex items-start gap-6">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-black text-base">{e.num}</span>
                  </div>
                  <Card className="flex-1 bg-slate-50 border-slate-100">
                    <CardContent className="p-5">
                      <h3 className="font-bold text-slate-900 mb-2">{e.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{e.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
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
      features: ['2 verifications gratuites', '5 points de controle', 'Detection doublons', 'Rapport PDF structure'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Verifications illimitees', 'Detection doublons historique', 'Alerte RIB modifie', 'Rapport detaille', 'Recommandations IA', 'Export analyses'],
      cta: 'Choisir Pro',
      popular: true,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Volume et equipes',
      features: ['Tout Pro inclus', 'Multi-utilisateurs', 'Workflow validation', 'API integration ERP', 'Accompagnement dedie'],
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
          <p className="text-lg text-slate-500 max-w-xl mx-auto">2 verifications offertes. Un doublon detecte rembourse des annees d'abonnement.</p>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Verifiez une facture fournisseur maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA verifie les 5 points critiques et detecte chaque anomalie avant paiement.</p>
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
            { value: '5', label: 'Points verifies', icon: ClipboardCheck },
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
      q: "Comment verifier une facture fournisseur avant de la payer ?",
      a: "La verification complete comporte 5 etapes : 1) Controle des mentions obligatoires (SIRET, TVA, echeance), 2) Verification de la coherence HT + TVA = TTC et du taux TVA applicable, 3) Comparaison avec l'historique pour detecter les doublons, 4) Verification que le RIB est identique au precedent virement, 5) Rapprochement avec le bon de commande ou contrat. InvoiceAgent automatise ces 5 points en 30 secondes."
    },
    {
      q: "Comment detecter une fraude au faux fournisseur ?",
      a: "Les signaux d'alerte d'une fraude au faux fournisseur : RIB different du precedent, email expediteur avec domaine legerement modifie (ex : fournisseur-sarl.com vs fournisseur-sarl.fr), demande urgente de paiement, montant inhabituel. Procedure : ne jamais modifier un RIB sans appel telephonique au numero habituel du fournisseur. InvoiceAgent alerte automatiquement en cas de RIB different du precedent."
    },
    {
      q: "Combien coute un doublon de facturation non detecte ?",
      a: "En moyenne, les doublons de facturation representent 0,3% a 0,8% du volume d'achats annuel en PME. Pour une entreprise avec 500 000€ d'achats, cela represente entre 1 500€ et 4 000€ de paiements en double par an. La recuperation est souvent complexe — le fournisseur peut refuser le remboursement ou la procedure prend plusieurs mois."
    },
    {
      q: "Puis-je refuser de payer une facture fournisseur non conforme ?",
      a: "Oui. Vous pouvez contester une facture non conforme et en demander une rectification avant paiement. Les motifs valides : mentions obligatoires manquantes, montants errones, doublon identifie, prestation non conforme au bon de commande. Notifiez le fournisseur par ecrit en precisant les points a corriger et en demandant une facture rectificative."
    },
    {
      q: "InvoiceAgent peut-il integrer mon ERP pour la verification automatique ?",
      a: "Oui, InvoiceAgent dispose d'une API qui permet l'integration avec votre ERP ou logiciel comptable. Les factures fournisseurs sont automatiquement analysees a la reception, comparees avec l'historique, et le rapport de verification est transmis a votre workflow de validation. Plan Business requis pour l'acces API."
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
            Verifiez chaque facture fournisseur avant de payer
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">2 verifications gratuites — sans carte bancaire. Analyse complete en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-bold underline">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-base px-8 h-14 font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Verifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
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
    { label: 'Doublon facture que faire', href: `${BASE_URL}/doublon-facture-que-faire` },
    { label: 'Controle facture automatise', href: `${BASE_URL}/controle-facture-automatise` },
    { label: 'Erreur TVA facture corriger', href: `${BASE_URL}/erreur-tva-facture-comment-corriger` },
    { label: 'Extraction donnees facture', href: `${BASE_URL}/extraction-donnees-facture` },
    { label: 'Facturation Freelance', href: `${BASE_URL}/facturation-freelance` },
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

export default function CommentVerifierFactureFournisseur() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <PointsSection />
        <EtapesSection />
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