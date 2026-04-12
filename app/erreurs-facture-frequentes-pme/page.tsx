"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Clock, Zap, FileText, XCircle, Search, ShieldCheck, BarChart3, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/erreurs-facture-frequentes-pme`;

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
  name: 'InvoiceAgent — Erreurs Facture Frequentes PME',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '93' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quelles sont les erreurs de facturation les plus frequentes en PME ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les 8 erreurs les plus frequentes : mentions obligatoires manquantes, taux TVA incorrect, numerotation non chronologique, date d'echeance absente, coordonnees client incorrectes, doublons de facturation, montants HT/TVA/TTC incoherents, et absence de numero de TVA intracommunautaire." }
    },
    {
      '@type': 'Question',
      name: "Quelles mentions sont obligatoires sur une facture en France ?",
      acceptedAnswer: { '@type': 'Answer', text: "Une facture doit obligatoirement mentionner : numero sequentiel unique, date d'emission, identite complete emetteur et client, description precise des prestations, prix unitaire HT, taux et montant TVA, total TTC, date d'echeance et conditions de paiement, penalites de retard et indemnite forfaitaire 40€." }
    },
    {
      '@type': 'Question',
      name: "Comment detecter automatiquement les erreurs sur mes factures PME ?",
      acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent analyse vos factures PDF en moins de 30 secondes et verifie automatiquement les 8 points critiques de conformite : mentions obligatoires, coherence des montants, taux TVA, numerotation, et doublons. Vous recevez un rapport avec chaque erreur et la correction a apporter." }
    },
    {
      '@type': 'Question',
      name: "Quelles sont les sanctions pour une facture non conforme ?",
      acceptedAnswer: { '@type': 'Answer', text: "Une facture non conforme expose l'entreprise a une amende fiscale de 15€ par mention manquante, plafonnee a 25% du montant de la facture. En cas de controle fiscal, les factures non conformes peuvent etre rejetees, entrainant la reintegration des charges deduites." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Erreurs Facture Frequentes PME', item: PAGE_URL }
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
            {[['8 erreurs', '#erreurs'], ['Mentions obligatoires', '#mentions'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-violet-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold">
                <Receipt className="w-4 h-4" />
                Erreurs factures PME — detection automatique
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Les 8 erreurs
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">de facturation</span>
              <span className="block text-4xl sm:text-5xl font-bold text-slate-600 mt-1">les plus couteuses en PME</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Mention manquante, TVA incorrecte, doublon non detecte — chaque erreur sur une facture peut couter jusqu'a 25% du montant en amende. InvoiceAgent les detecte toutes en 30 secondes.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '8', label: 'Erreurs verifiees', sub: 'automatiquement' },
                { value: '< 30s', label: 'Par facture PDF', sub: 'analyse complete' },
                { value: '25%', label: 'Amende max', sub: 'facture non conforme' },
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
                <a href="#erreurs">Voir les 8 erreurs</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500">
              {['Mentions obligatoires verifiees', 'Doublons detectes automatiquement', 'TVA et montants controls'].map((item) => (
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
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Facture FACT-2024-0219</p>
                    <p className="text-xs text-slate-400">Audit conformite — 26 secondes</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-600">4 erreurs</span>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Numero de facture', detail: 'FACT-219 — numerotation non chronologique', ok: false },
                  { label: 'Mentions penalites retard', detail: 'Clause penalites absente — mention obligatoire', ok: false },
                  { label: 'Indemnite forfaitaire 40€', detail: 'Non mentionnee — obligatoire depuis 2013', ok: false },
                  { label: 'Taux TVA applique', detail: '20% sur prestation — correct', ok: true },
                  { label: 'Coherence HT + TVA = TTC', detail: '4 500 + 900 = 5 400€ — correct', ok: true },
                  { label: 'Date echeance paiement', detail: 'Absence de date limite — mention obligatoire', ok: false },
                  { label: 'Coordonnees client', detail: 'SIRET client present et valide', ok: true },
                  { label: 'Description prestation', detail: 'Libelle suffisamment detaille', ok: true },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl ${!row.ok ? 'bg-orange-50 border border-orange-100' : 'bg-slate-50 border border-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{row.label}</p>
                      <p className={`text-xs mt-0.5 ${!row.ok ? 'text-orange-500' : 'text-slate-400'}`}>{row.detail}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${!row.ok ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {row.ok ? 'OK' : 'Manquant'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4 border border-violet-100">
                <p className="text-xs font-bold text-violet-700 mb-1">Recommandation IA</p>
                <p className="text-xs text-violet-600 leading-relaxed">Ajoutez la date d'echeance, la clause penalites de retard (taux BCE + 10%) et l'indemnite forfaitaire 40€. Corrigez la numerotation pour assurer la continuite chronologique.</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">4 mentions</p>
                <p className="text-xs text-orange-500 font-semibold">obligatoires absentes</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800">Conformite</span>
              <span className="text-xs text-violet-500 font-semibold">verifiee en 26s</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ErreursSection() {
  const erreurs = [
    {
      num: '01',
      icon: FileText,
      title: 'Mentions obligatoires manquantes',
      description: "Une facture conforme doit comporter au minimum 17 mentions obligatoires. Les plus souvent oubliees : numero SIRET du client, conditions de paiement, taux de penalites de retard, et l'indemnite forfaitaire de 40€ pour frais de recouvrement — obligatoire depuis 2013 pour les transactions B2B.",
      risque: 'Amende 15€ par mention manquante, max 25% de la facture',
      color: 'from-red-500 to-rose-600',
      bgLight: 'bg-red-50 border-red-100',
      textAlert: 'text-red-600',
    },
    {
      num: '02',
      icon: BarChart3,
      title: 'Taux de TVA incorrect',
      description: "Appliquer 20% sur des travaux de renovation (10%), des produits alimentaires (5,5%) ou des operations exonerees est une erreur frequente qui expose a un redressement fiscal. A l'inverse, oublier de facturer la TVA quand on y est assujetti est tout aussi sanctionne.",
      risque: 'Redressement fiscal + penalites 5% + interets 0,20%/mois',
      color: 'from-orange-500 to-red-500',
      bgLight: 'bg-orange-50 border-orange-100',
      textAlert: 'text-orange-600',
    },
    {
      num: '03',
      icon: Receipt,
      title: 'Numerotation non chronologique',
      description: "La numerotation des factures doit etre strictement sequentielle et sans rupture. Supprimer une facture, reutiliser un numero ou sauter une sequence est assimile a une fraude fiscale. La DGFiP peut requalifier toute rupture de sequence comme une tentative de dissimulation de chiffre d'affaires.",
      risque: 'Requalification fraude fiscale, redressement sur CA reconstitue',
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50 border-amber-100',
      textAlert: 'text-amber-700',
    },
    {
      num: '04',
      icon: XCircle,
      title: 'Doublons de facturation',
      description: "Facturer deux fois la meme prestation — par erreur de logiciel, copie de facture ou mauvais suivi — est un risque legal et commercial majeur. Le client peut contester le paiement, exiger un avoir, et la relation commerciale est durablement deterioree. InvoiceAgent detecte les doublons automatiquement.",
      risque: 'Litige client, avoir force, deterioration relation commerciale',
      color: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50 border-violet-100',
      textAlert: 'text-violet-600',
    },
    {
      num: '05',
      icon: AlertTriangle,
      title: 'Incoherence HT + TVA ≠ TTC',
      description: "Une modification manuelle de derniere minute, un arrondi mal gere ou une remise oubliee genere souvent un total TTC qui ne correspond pas a la somme HT + TVA. Cette incoherence bloque la deduction de TVA chez votre client et peut declencher un controle automatise de la DGFiP.",
      risque: 'Refus deduction TVA client, controle fiscal automatise',
      color: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50 border-blue-100',
      textAlert: 'text-blue-600',
    },
    {
      num: '06',
      icon: Clock,
      title: 'Date d\'echeance absente',
      description: "L'absence de date d'echeance sur une facture B2B est une erreur frequente. Sans date limite, le delai de paiement legal de 30 jours s'applique par defaut — mais surtout, vous ne pouvez pas appliquer de penalites de retard ni engager une procedure de recouvrement sans cette mention.",
      risque: 'Impossibilite d\'appliquer penalites, retards de paiement',
      color: 'from-teal-500 to-emerald-600',
      bgLight: 'bg-teal-50 border-teal-100',
      textAlert: 'text-teal-600',
    },
    {
      num: '07',
      icon: Search,
      title: 'Coordonnees client incorrectes',
      description: "Un SIRET errone, une adresse de facturation incorrecte ou un nom de societe mal orthographie rend la facture contestable. En cas de litige, une facture avec des coordonnees incorrectes peut etre rejetee par le tribunal comme preuve de creance — bloquant tout recouvrement judiciaire.",
      risque: 'Facture contestable, rejet comme preuve de creance en justice',
      color: 'from-pink-500 to-rose-600',
      bgLight: 'bg-pink-50 border-pink-100',
      textAlert: 'text-pink-600',
    },
    {
      num: '08',
      icon: ShieldCheck,
      title: 'Description de prestation insuffisante',
      description: "\"Prestation de services\" ou \"Honoraires\" sans detail est insuffisant. La facture doit identifier precisement la nature, la quantite et le prix unitaire de chaque prestation. Une description vague est refusee par certains clients, bloque la deduction en cas de controle et facilite les contestations.",
      risque: 'Refus paiement client, deduction refusee en controle fiscal',
      color: 'from-slate-500 to-slate-700',
      bgLight: 'bg-slate-50 border-slate-200',
      textAlert: 'text-slate-600',
    },
  ];

  return (
    <section id="erreurs" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Detection automatique sur chaque facture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Les 8 erreurs de facturation
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> qui coutent cher aux PME</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">InvoiceAgent verifie ces 8 points sur chaque facture PDF uploadee — en moins de 30 secondes, avec le risque chiffre pour chaque erreur detectee.</p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {erreurs.map((e, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="group h-full bg-white border-slate-100 hover:shadow-lg transition-all duration-400">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${e.color} flex items-center justify-center shadow flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <e.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black text-slate-400">#{e.num}</span>
                        <h3 className="text-base font-bold text-slate-900">{e.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{e.description}</p>
                      <div className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${e.bgLight}`}>
                        <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${e.textAlert}`} />
                        <p className={`text-xs font-semibold ${e.textAlert}`}>{e.risque}</p>
                      </div>
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

function MentionsSection() {
  const mentions = [
    'Numero de facture (sequentiel, unique)',
    'Date d\'emission de la facture',
    'Nom et adresse de l\'emetteur',
    'Numero SIRET de l\'emetteur',
    'Numero de TVA intracommunautaire',
    'Nom et adresse du client',
    'SIRET du client (B2B)',
    'Description precise de la prestation',
    'Quantite et prix unitaire HT',
    'Taux de TVA applicable',
    'Montant de TVA en euros',
    'Total HT et total TTC',
    'Date d\'echeance du paiement',
    'Conditions et modes de paiement',
    'Taux des penalites de retard',
    'Indemnite forfaitaire 40€ (B2B)',
    'Mention d\'exoneration si applicable',
  ];

  return (
    <section id="mentions" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-semibold">
            Conformite legale
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Les 17 mentions obligatoires
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> sur une facture</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Checklist complete des mentions legalement obligatoires en France pour toute facture B2B — verifiee automatiquement par InvoiceAgent.</p>
        </AnimatedSection>

        <AnimatedSection>
          <Card className="border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold">Checklist mentions obligatoires 2026</h3>
              <span className="text-white/80 text-sm font-semibold">17 points</span>
            </div>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {mentions.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{m}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection className="mt-8 bg-violet-50 rounded-2xl p-6 border border-violet-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-violet-900 mb-2">InvoiceAgent verifie ces 17 points automatiquement</h3>
              <p className="text-violet-700 text-sm leading-relaxed mb-4">Uploadez vos factures PDF — chaque mention est verifiee en moins de 30 secondes. Les manquants sont identifies avec la correction a apporter pour mettre la facture en conformite.</p>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm" asChild>
                <a href={`${BASE_URL}/auth/login`}>Verifier mes factures maintenant <ArrowRight className="ml-2 w-4 h-4" /></a>
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
      features: ['2 analyses factures gratuites', 'Verification 8 erreurs frequentes', '17 mentions obligatoires', 'Rapport PDF structure'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Analyses illimitees', 'Detection doublons automatique', 'Verification mentions B2B', 'Rapport detaille par erreur', 'Recommandations IA', 'Historique analyses'],
      cta: 'Choisir Pro',
      popular: true,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Volume et equipes',
      features: ['Tout Pro inclus', 'Multi-utilisateurs', 'Export Word + PDF', 'API integration', 'Accompagnement dedie'],
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
          <p className="text-lg text-slate-500 max-w-xl mx-auto">2 analyses offertes. Une amende evitee rembourse des annees d'abonnement.</p>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Auditez vos factures PME maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA verifie les 8 erreurs frequentes et les 17 mentions obligatoires en moins de 30 secondes.</p>
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
            { value: '8', label: 'Erreurs verifiees', icon: AlertTriangle },
            { value: '17', label: 'Mentions controlees', icon: CheckCircle2 },
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
      q: "Quelles sont les erreurs de facturation les plus frequentes en PME ?",
      a: "Les 8 erreurs les plus frequentes et couteuses : 1) Mentions obligatoires manquantes (penalites, echeance, indemnite 40€), 2) Taux TVA incorrect, 3) Numerotation non chronologique, 4) Doublons non detectes, 5) Incoherence HT/TVA/TTC, 6) Date d'echeance absente, 7) Coordonnees client incorrectes, 8) Description de prestation insuffisante. InvoiceAgent verifie ces 8 points automatiquement."
    },
    {
      q: "Quelles sont les sanctions pour une facture non conforme en France ?",
      a: "Les sanctions fiscales : amende de 15€ par mention obligatoire manquante, plafonnee a 25% du montant de la facture. En cas de controle fiscal, les factures non conformes peuvent etre rejetees comme justificatifs de charges, entrainant la reintegration dans le benefice imposable. Pour les doublons, le risque est un redressement sur chiffre d'affaires reconstitue."
    },
    {
      q: "L'indemnite forfaitaire de 40€ est-elle vraiment obligatoire ?",
      a: "Oui, depuis le 1er janvier 2013 (article L441-10 du Code de commerce), toute facture B2B doit mentionner l'indemnite forfaitaire de 40€ pour frais de recouvrement en cas de retard de paiement. Cette mention est obligatoire meme si vous ne l'appliquez jamais. Son absence expose a une amende de 15€ par facture non conforme."
    },
    {
      q: "Comment verifier rapidement la conformite de mes factures PME ?",
      a: "La methode manuelle consiste a verifier les 17 mentions obligatoires sur chaque facture — ce qui prend 5 a 10 minutes par document. InvoiceAgent automatise cette verification : uploadez votre facture PDF, l'IA verifie les 17 mentions et les 8 erreurs frequentes en moins de 30 secondes, avec un rapport liste des corrections a apporter."
    },
    {
      q: "Un doublon de facturation peut-il etre considere comme une fraude ?",
      a: "Un doublon involontaire n'est pas une fraude, mais il doit etre corrige immediatement par un avoir et une nouvelle facture. En revanche, une numerotation avec ruptures ou des doublons systematiques peuvent etre interpretes par la DGFiP comme une tentative de dissimulation de chiffre d'affaires — un risque de redressement majeur."
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
            Eliminons les erreurs de facturation de votre PME
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Audit complet en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-bold underline">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-base px-8 h-14 font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Auditer mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
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
    { label: 'Erreur TVA facture comment corriger', href: `${BASE_URL}/erreur-tva-facture-comment-corriger` },
    { label: 'Calcul TVA erreur entreprise', href: `${BASE_URL}/calcul-tva-erreur-entreprise` },
    { label: 'Doublon facture que faire', href: `${BASE_URL}/doublon-facture-que-faire` },
    { label: 'Comment verifier facture fournisseur', href: `${BASE_URL}/comment-verifier-facture-fournisseur` },
    { label: 'Controle facture automatise', href: `${BASE_URL}/controle-facture-automatise` },
    { label: 'Extraction donnees facture', href: `${BASE_URL}/extraction-donnees-facture` },
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

export default function ErreursFacatureFrequentesPme() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <ErreursSection />
        <MentionsSection />
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