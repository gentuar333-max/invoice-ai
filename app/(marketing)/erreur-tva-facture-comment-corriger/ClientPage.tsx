"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, XCircle, FileSearch, Clock, Calculator, RefreshCw, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/erreur-tva-facture-comment-corriger`;

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
  name: 'InvoiceAgent — Corriger Erreur TVA Facture',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '74' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment corriger une erreur de TVA sur une facture ?",
      acceptedAnswer: { '@type': 'Answer', text: "Pour corriger une erreur de TVA sur une facture deja emise, vous devez emettre une facture rectificative (avoir) qui annule la facture initiale, puis remettre une nouvelle facture avec le montant de TVA correct. Ne modifiez jamais une facture originale deja transmise au client." }
    },
    {
      '@type': 'Question',
      name: "Quelles sont les erreurs de TVA les plus frequentes sur une facture ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les erreurs les plus frequentes sont : taux de TVA incorrect (20% au lieu de 10% ou 5,5%), oubli de mention de TVA intracommunautaire, auto-liquidation mal appliquee, TVA calculee sur mauvaise base HT, et absence de numero de TVA intracommunautaire valide." }
    },
    {
      '@type': 'Question',
      name: "Quelles sont les consequences d'une erreur de TVA non corrigee ?",
      acceptedAnswer: { '@type': 'Answer', text: "Une erreur de TVA non corrigee peut entrainer un redressement fiscal par la DGFiP, des penalites de 5% du montant de TVA due, des interets de retard, et dans les cas graves une majoration de 40% pour manquement delibere." }
    },
    {
      '@type': 'Question',
      name: "InvoiceAgent detecte-t-il automatiquement les erreurs de TVA ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse vos factures PDF et detecte automatiquement les erreurs de TVA : taux incorrect, base de calcul erronee, mentions obligatoires manquantes, et incoherences entre montant HT, TVA et TTC. L'analyse prend moins de 30 secondes." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Erreur TVA Facture', item: PAGE_URL }
  ]
};

function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
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
            {[['Erreurs TVA', '#erreurs'], ['Comment corriger', '#corriger'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex text-slate-600" asChild>
              <a href={`${BASE_URL}/auth/login`}>Connexion</a>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white" asChild>
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
    <section className="relative lg:min-h-screen flex items-center pt-20 overflow-hidden pb-12 lg:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-400/20 to-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 border-0 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 mr-2" />Correction erreur TVA facture par IA
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Erreur TVA</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">sur facture</span>
              <br />
              <span className="text-slate-900">comment corriger ?</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              InvoiceAgent detecte automatiquement les <strong>erreurs de TVA sur vos factures</strong> — taux incorrect, base erronee, mentions manquantes — et vous guide pour les corriger avant tout redressement fiscal.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '< 30s', label: 'Detection erreur', sub: 'par facture PDF' },
                { value: '6', label: 'Types d\'erreurs', sub: 'TVA detectes' },
                { value: '2', label: 'Analyses gratuites', sub: 'sans carte bancaire' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-violet-700">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-lg px-8 h-14" asChild>
                <a href="#demo">Verifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#corriger">Comment corriger ?</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Taux TVA verifie automatiquement', 'Facture rectificative guidee', 'Redressement fiscal evite'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative px-2 mt-8 lg:mt-0"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Facture FACT-2024-0847</p>
                    <p className="text-sm text-slate-500">Analyse TVA en 18 secondes</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">2 erreurs</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Taux TVA applique', detail: '20% applique — taux correct 10% (travaux)', status: 'Erreur', color: 'red' },
                  { point: 'Montant TVA calcule', detail: '480€ facture — devrait etre 240€', status: 'Erreur', color: 'red' },
                  { point: 'Numero TVA intracommunautaire', detail: 'FR 32 123456789 — format valide', status: 'OK', color: 'emerald' },
                  { point: 'Base HT de calcul', detail: '2 400€ HT — correcte', status: 'OK', color: 'emerald' },
                  { point: 'Mentions obligatoires', detail: 'Date, numero, adresse — completes', status: 'OK', color: 'emerald' },
                  { point: 'Coherence HT/TVA/TTC', detail: 'TTC recalcule : 2 640€ (vs 2 880€ facture)', status: 'Erreur', color: 'red' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'red' ? 'bg-red-50 border border-red-100' : 'bg-slate-50'}`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'red' ? 'text-red-600' : 'text-slate-500'}`}>{item.detail}</p>
                    </div>
                    <span className={`text-xs font-bold flex-shrink-0 ml-2 px-2 py-0.5 rounded-full ${item.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-xs font-semibold text-violet-700">Recommandation IA</p>
                <p className="text-xs text-violet-600 mt-1">Emettez un avoir pour annuler FACT-2024-0847, puis une nouvelle facture avec TVA 10% (240€) et TTC 2 640€. Corrigez avant la prochaine declaration de TVA.</p>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">TVA incorrecte</p>
                  <p className="text-xs text-red-600 font-semibold">+240€ surfactures</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-slate-900">Avoir</span>
                <span className="text-xs text-violet-500 font-semibold">genere en 30s</span>
              </div>
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
      icon: Calculator,
      title: 'Taux de TVA incorrect',
      description: "Appliquer 20% sur des travaux de renovation (taux reduit 10%) ou sur des produits alimentaires de base (5,5%) est l'erreur la plus courante. InvoiceAgent verifie le taux applicable selon la nature de la prestation ou du produit.",
      color: 'from-red-400 to-rose-500',
      exemple: 'Ex : Travaux renovation → 10%, pas 20%'
    },
    {
      icon: FileText,
      title: 'Base HT de calcul erronee',
      description: "La TVA doit etre calculee sur le montant HT apres deduction des remises et escomptes. Une remise commerciale oubliee dans la base HT entraine une TVA surfacturee et une incoherence HT/TVA/TTC.",
      color: 'from-orange-400 to-red-500',
      exemple: 'Ex : Remise 10% non deduite de la base TVA'
    },
    {
      icon: Ban,
      title: 'Mentions obligatoires manquantes',
      description: "L'absence de numero de TVA intracommunautaire, de la mention auto-liquidation pour les operations intracommunautaires, ou du taux applique rend la facture non conforme et peut entrainer un refus de deduction chez votre client.",
      color: 'from-violet-400 to-purple-500',
      exemple: 'Ex : Absence de « Auto-liquidation art. 283 »'
    },
    {
      icon: RefreshCw,
      title: 'TVA intracommunautaire mal appliquee',
      description: "Pour les prestations B2B vers un client UE, la TVA ne doit pas etre facturee — c'est le mecanisme d'auto-liquidation. Facturer de la TVA francaise a un client allemand est une erreur sanctionnee par l'administration fiscale.",
      color: 'from-blue-400 to-indigo-500',
      exemple: 'Ex : TVA 20% facturee a un client UE B2B'
    },
    {
      icon: XCircle,
      title: 'Incoherence HT + TVA ≠ TTC',
      description: "Une erreur d'arrondi ou une ressaisie manuelle cree souvent des incoherences entre le montant HT, la TVA calculee et le TTC affiche. InvoiceAgent recalcule automatiquement et signale tout ecart, meme de quelques centimes.",
      color: 'from-amber-400 to-orange-500',
      exemple: 'Ex : HT 1000€ + TVA 200€ ≠ TTC 1205€'
    },
    {
      icon: Shield,
      title: 'TVA sur facture non assujettie',
      description: "Un auto-entrepreneur sous le seuil de franchise de TVA ne doit pas facturer de TVA. Mentionner « TVA non applicable art. 293 B » est obligatoire. Facturer de la TVA par erreur implique de la reverser a l'Etat sans pouvoir la recuperer.",
      color: 'from-emerald-400 to-teal-500',
      exemple: 'Ex : Auto-entrepreneur facturant TVA 20%'
    },
  ];
  return (
    <section id="erreurs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-red-100 text-red-700 border-0">Erreurs TVA detectees automatiquement</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Les 6 erreurs de TVA
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> les plus frequentes</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">InvoiceAgent analyse vos factures PDF et detecte ces 6 categories d'erreurs de TVA en moins de 30 secondes — avant tout redressement fiscal.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {erreurs.map((erreur, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-6 lg:p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${erreur.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <erreur.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{erreur.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{erreur.description}</p>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-700 font-medium">{erreur.exemple}</p>
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

function CommentCorrigerSection() {
  const etapes = [
    {
      num: '01',
      title: 'Ne modifiez jamais la facture originale',
      description: "Une facture emise et transmise au client ne peut jamais etre modifiee directement. Toute correction passe obligatoirement par l'emission d'un avoir (note de credit) qui annule integralement la facture erronee.",
      alerte: 'Modifier une facture originale est une fraude fiscale.'
    },
    {
      num: '02',
      title: 'Emettez un avoir d\'annulation',
      description: "L'avoir doit reprendre le meme numero de facture en reference, les memes montants (en negatif), et mentionner explicitement : « Avoir sur facture N°XXXX du JJ/MM/AAAA — annulation pour erreur de taux TVA ». Transmettez-le au client.",
      alerte: null
    },
    {
      num: '03',
      title: 'Emettez une nouvelle facture corrigee',
      description: "Creez une nouvelle facture avec un nouveau numero chronologique, les montants corriges, le bon taux de TVA, et la mention « Facture rectificative suite a avoir N°AV-XXXX ». La numerotation doit suivre votre sequence habituelle.",
      alerte: null
    },
    {
      num: '04',
      title: 'Corrigez votre declaration de TVA',
      description: "Si la facture erronee a deja ete incluse dans une declaration de TVA (CA3), vous devez corriger cette declaration sur impots.gouv.fr. Si la correction intervient sur une periode differente, mentionnez-la dans la declaration du mois en cours.",
      alerte: 'A faire avant la prochaine echeance de declaration TVA.'
    },
  ];
  return (
    <section id="corriger" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">Procedure de correction</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comment corriger une erreur de TVA
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> etape par etape</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">La procedure legale pour corriger une facture avec une erreur de TVA, conforme aux exigences de la DGFiP.</p>
        </AnimatedSection>
        <div className="space-y-6">
          {etapes.map((etape, index) => (
            <AnimatedSection key={index}>
              <Card className="border-slate-200 bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6 p-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">{etape.num}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{etape.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{etape.description}</p>
                      {etape.alerte && (
                        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-red-600 font-medium">{etape.alerte}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-10 bg-violet-50 rounded-2xl p-6 border border-violet-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-violet-900 mb-2">InvoiceAgent automatise cette procedure</h3>
              <p className="text-violet-700 text-sm leading-relaxed">InvoiceAgent detecte l'erreur de TVA, identifie le bon taux applicable, et vous guide pour generer l'avoir d'annulation et la facture rectificative — en conformite avec les regles fiscales francaises.</p>
              <Button className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white" asChild>
                <a href={`${BASE_URL}/auth/login`}>Corriger mes factures maintenant <ArrowRight className="ml-2 w-4 h-4" /></a>
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
      features: ['2 analyses factures gratuites', 'Detection erreurs TVA', 'Rapport corrections structure', 'Export PDF rapport'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Analyses illimitees', 'Detection 6 types erreurs TVA', 'Rapport detaille par erreur', 'Recommandations IA', 'Historique analyses', 'Export corrections'],
      cta: 'Choisir Pro',
      popular: true,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Analyses illimitees',
      features: ['Tout Pro inclus', 'Multi-utilisateurs', 'Export Word + PDF', 'API integration', 'Accompagnement personnalise'],
      cta: 'Choisir Business',
      popular: false,
      href: `${BASE_URL}/checkout?plan=business`
    },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Commencez avec 2 analyses gratuites. Un redressement fiscal evite vaut souvent des annees d'abonnement.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className={`relative h-full ${plan.popular ? 'border-2 border-violet-500 shadow-xl' : 'border-slate-200'} bg-white`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 px-4 py-1 whitespace-nowrap">Plus populaire</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-slate-900">{plan.price}€</span>
                      {plan.price !== '0' && <span className="text-slate-500 text-sm">/mois</span>}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-violet-600' : 'text-emerald-500'}`} />
                        <span className="text-slate-600 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full text-sm ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'bg-slate-100 text-slate-900'}`} asChild>
                    <a href={plan.href}>{plan.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-slate-400 text-sm mt-6">Sans engagement · Annulez a tout moment · Donnees hebergees en Europe</p>
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
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border">
            <Sparkles className="w-4 h-4 mr-2" />Demo gratuite — sans inscription
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Detectez les erreurs TVA sur vos factures</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA detecte les erreurs de TVA et vous guide pour les corriger en moins de 30 secondes.</p>
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
            { value: '< 30s', label: 'Detection complete', icon: Clock },
            { value: '6', label: 'Types erreurs TVA', icon: AlertTriangle },
            { value: '0€', label: 'Pour commencer', icon: Zap }
          ].map((stat) => (
            <AnimatedSection key={stat.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-violet-300" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-violet-300 mt-1">{stat.label}</p>
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
      q: "Comment corriger une erreur de TVA sur une facture ?",
      a: "La procedure legale comporte 4 etapes : 1) Ne jamais modifier la facture originale, 2) Emettre un avoir d'annulation avec reference a la facture erronee, 3) Emettre une nouvelle facture avec le bon taux de TVA et un nouveau numero, 4) Corriger votre declaration de TVA (CA3) si la facture a deja ete declaree. InvoiceAgent vous guide automatiquement dans cette procedure."
    },
    {
      q: "Quelles sont les consequences d'une erreur de TVA non corrigee ?",
      a: "Une erreur de TVA non corrigee peut entrainer un redressement fiscal par la DGFiP avec des penalites de 5% du montant de TVA due, des interets de retard de 0,20% par mois, et une majoration de 40% en cas de manquement delibere. Pour votre client, une TVA incorrecte peut entrainer un refus de deduction de TVA lors d'un controle."
    },
    {
      q: "Quel taux de TVA appliquer sur mes factures ?",
      a: "Les taux de TVA en France sont : 20% (taux normal, la majorite des biens et services), 10% (restauration, travaux renovation, transport), 5,5% (produits alimentaires de base, livres, equipements handicapes), 2,1% (medicaments remboursables, presse). InvoiceAgent verifie le taux applicable selon votre activite."
    },
    {
      q: "InvoiceAgent detecte-t-il automatiquement les erreurs de TVA ?",
      a: "Oui. InvoiceAgent analyse vos factures PDF et detecte 6 categories d'erreurs TVA : taux incorrect par rapport a l'activite, base de calcul erronee, mentions obligatoires manquantes, TVA intracommunautaire mal appliquee, incoherence HT/TVA/TTC, et TVA facturee par un non-assujetti. Chaque erreur est expliquee avec la correction a apporter."
    },
    {
      q: "Peut-on corriger une erreur de TVA apres la declaration ?",
      a: "Oui, mais la procedure est plus complexe. Si votre declaration de TVA a deja ete deposee avec l'erreur, vous devez deposer une declaration rectificative sur impots.gouv.fr dans les delais legaux. Pour les erreurs importantes, il est recommande de prendre contact avec votre service des impots des entreprises avant de proceder a la correction."
    },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Questions <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">frequentes</span>
          </h2>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">{faq.a}</div>
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Corrigez vos erreurs de TVA avant le prochain controle fiscal</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Detection complete en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild>
              <a href={`${BASE_URL}/auth/login`}>Verifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild>
              <a href="#demo">Tester la demo</a>
            </Button>
          </div>
          <p className="mt-6 text-violet-200 text-sm">Sans engagement · RGPD conforme · Annulez a tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Calcul TVA erreur entreprise', href: `${BASE_URL}/calcul-tva-erreur-entreprise` },
    { label: 'Logiciel TVA automatique PME', href: `${BASE_URL}/logiciel-tva-automatique-pme` },
    { label: 'Erreurs facture frequentes PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
    { label: 'Verifier contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
    { label: 'Extraction donnees facture', href: `${BASE_URL}/extraction-donnees-facture` },
    { label: 'Facturation Freelance', href: `${BASE_URL}/facturation-freelance` },
  ];
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Decouvrez toutes les fonctionnalites InvoiceAgent</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-violet-700 font-medium hover:border-violet-300 transition-all">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ErreurTvaFactureCommentCorriger() {
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
        <CommentCorrigerSection />
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