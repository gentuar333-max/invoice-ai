"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, DollarSign, TrendingDown, FileSearch, Clock, BarChart3, XCircle, Eye, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/perte-argent-facture-entreprise`;

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>{children}</motion.div>;
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL };
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Détection Pertes Financières Factures',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '156' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Combien d'argent une PME perd-elle à cause d'erreurs de facturation ?", acceptedAnswer: { '@type': 'Answer', text: "En moyenne, une PME française perd entre 2% et 5% de son chiffre d'affaires à cause d'erreurs de facturation non détectées : doublons payés, frais cachés acceptés, TVA mal calculée et factures fournisseurs non vérifiées. Pour une entreprise à 500 000€ de CA, cela représente 10 000€ à 25 000€ par an." } },
    { '@type': 'Question', name: "Comment détecter les pertes d'argent dans mes factures ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent analyse vos factures par IA en moins de 5 secondes. Le logiciel détecte automatiquement les doublons, frais cachés, erreurs de TVA, montants incohérents et surfacturations. Chaque anomalie est signalée avec le montant exact de la perte potentielle." } },
    { '@type': 'Question', name: "Quelles sont les erreurs de facturation les plus coûteuses ?", acceptedAnswer: { '@type': 'Answer', text: "Les 5 erreurs les plus coûteuses sont : les doublons de factures payés deux fois, les frais cachés non détectés dans les contrats fournisseurs, la TVA non récupérable à cause d'erreurs formelles, les surfacturations par rapport au devis initial, et les pénalités de retard appliquées à tort." } },
    { '@type': 'Question', name: "InvoiceAgent peut-il analyser les factures de tous mes fournisseurs ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse les factures PDF de tous les fournisseurs, quel que soit le secteur. L'IA extrait automatiquement les montants, lignes de détail, TVA et conditions de paiement pour détecter toute anomalie ou surfacturation." } },
    { '@type': 'Question', name: "Quel est le retour sur investissement d'InvoiceAgent ?", acceptedAnswer: { '@type': 'Answer', text: "Les utilisateurs InvoiceAgent détectent en moyenne 3 200€ d'anomalies par trimestre. Avec un abonnement Pro à 29€/mois, le ROI est supérieur à 900% dès le premier trimestre. La version gratuite permet déjà d'analyser 5 factures pour identifier vos premières pertes." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Perte argent facture entreprise', item: PAGE_URL }
  ]
};

function Navigation() {
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100">
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
            {[['Fonctionnalités', '#features'], ['Démo', '#demo'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors relative group">
                {label}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex text-slate-600" asChild><a href={`${BASE_URL}/auth/login`}>Connexion</a></Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white" asChild><a href={`${BASE_URL}/auth/login`}>Essai gratuit</a></Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative lg:min-h-screen flex items-center pt-20 overflow-hidden pb-12 lg:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 via-slate-50 to-indigo-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-400/15 to-violet-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-400/10 to-red-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-red-100 text-red-700 border-0 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 mr-2" />Chaque facture non vérifiée vous coûte de l'argent
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Perte d'argent</span>
              <br />
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 bg-clip-text text-transparent">sur vos factures</span>
              <br />
              <span className="text-slate-900">détectée par IA</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Les PME françaises perdent en moyenne <strong>2% à 5% de leur chiffre d'affaires</strong> à cause de factures non vérifiées. Doublons payés deux fois, frais cachés, TVA mal calculée — InvoiceAgent détecte chaque euro perdu en moins de 5 secondes par facture.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '3 200€', label: 'Anomalies détectées', sub: 'en moyenne par trimestre' },
                { value: '< 5s', label: 'Analyse par facture', sub: 'extraction IA complète' },
                { value: '900%', label: 'ROI moyen', sub: 'dès le 1er trimestre' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-red-600">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-600/30 text-lg px-8 h-14" asChild>
                <a href="#demo">Détecter mes pertes <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Doublons détectés automatiquement', 'Frais cachés identifiés', 'TVA vérifiée ligne par ligne'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-red-600/15 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center"><TrendingDown className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Audit factures — Dupont SARL</p><p className="text-sm text-slate-500">127 factures analysées en 4 min</p></div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">4 780€ perdus</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Doublon facture #F-2024-089', detail: 'Même montant 1 245€ payé deux fois le 12/01 et 15/02', montant: '1 245€', status: 'Doublon', color: 'red' },
                  { point: 'Frais cachés — Contrat maintenance', detail: 'Majoration 18% non prévue au contrat initial', montant: '890€', status: 'Frais caché', color: 'red' },
                  { point: 'TVA non récupérable', detail: 'Numéro TVA fournisseur invalide sur 3 factures', montant: '1 340€', status: 'TVA perdue', color: 'amber' },
                  { point: 'Surfacturation fournitures', detail: 'Prix unitaire 47€ vs devis accepté 38€ — écart 23%', montant: '855€', status: 'Surcoût', color: 'amber' },
                  { point: 'Pénalité retard injustifiée', detail: 'Paiement effectué J+28 — pénalité appliquée à tort', montant: '450€', status: 'Erreur', color: 'orange' },
                  { point: 'Conditions paiement conformes', detail: '47 factures — délais et montants corrects', montant: '—', status: 'OK', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'red' ? 'bg-red-50 border border-red-100' : item.color === 'amber' ? 'bg-amber-50 border border-amber-100' : item.color === 'orange' ? 'bg-orange-50 border border-orange-100' : 'bg-slate-50'}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : item.color === 'orange' ? 'text-orange-600' : 'text-slate-500'}`}>{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {item.montant !== '—' && <span className="text-xs font-bold text-red-700">{item.montant}</span>}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.color === 'red' ? 'bg-red-100 text-red-600' : item.color === 'amber' ? 'bg-amber-100 text-amber-600' : item.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <p className="text-xs font-semibold text-red-700">Synthèse IA — Pertes détectées</p>
                <p className="text-xs text-red-600 mt-1">4 780€ de pertes identifiées sur 127 factures. Priorité immédiate : récupérer le doublon de 1 245€ et contester la majoration non contractuelle de 890€. Action recommandée : vérifier les numéros TVA de vos 3 fournisseurs signalés.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><DollarSign className="w-5 h-5 text-red-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">4 780€ récupérables</p><p className="text-xs text-red-600 font-semibold">5 anomalies détectées</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">127 factures</span><span className="text-xs text-emerald-600 font-semibold">auditées en 4 min</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function PainSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-red-950/90 to-slate-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-red-500/20 text-red-300 border-red-500/30 border">Les chiffres qui font mal</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Votre entreprise perd de l'argent
            <span className="text-red-400"> sans le savoir</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Chaque facture fournisseur non vérifiée est une fuite potentielle dans votre trésorerie. Voici ce que les PME françaises perdent en moyenne chaque année.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '12 800€', label: 'Doublons de factures', description: 'Factures payées deux fois par erreur — la cause n°1 de pertes pour les PME qui traitent plus de 50 factures par mois.', icon: XCircle, color: 'from-red-500 to-rose-600' },
            { value: '8 500€', label: 'Frais cachés fournisseurs', description: "Majorations non contractuelles, frais de gestion ajoutés discrètement, coûts d'expédition gonflés — invisibles sans vérification ligne par ligne.", icon: Eye, color: 'from-orange-500 to-red-500' },
            { value: '6 200€', label: 'TVA non récupérée', description: "Numéros TVA invalides, taux incorrects, mentions obligatoires manquantes — chaque erreur formelle vous prive de la déduction fiscale.", icon: Calculator, color: 'from-amber-500 to-orange-500' },
            { value: '4 300€', label: 'Surfacturations', description: 'Prix unitaires supérieurs au devis accepté, quantités erronées, remises non appliquées — des écarts souvent inférieurs à 15% qui passent inaperçus.', icon: TrendingDown, color: 'from-rose-500 to-pink-600' },
          ].map((stat, i) => (
            <motion.div key={i} variants={scaleIn} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-red-300 mb-3">{stat.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <AnimatedSection className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-red-500/20 rounded-full px-6 py-3 border border-red-500/30">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-white font-semibold">Total moyen : <span className="text-red-400">31 800€ de pertes annuelles</span> pour une PME à 1M€ de CA</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: XCircle, title: 'Détection automatique des doublons', description: "InvoiceAgent compare chaque facture entrante avec l'historique complet de vos paiements. Même numéro, même montant, même fournisseur à quelques jours d'intervalle — le système vous alerte avant que vous ne payiez deux fois. Les doublons représentent la première source de pertes pour les PME traitant plus de 50 factures mensuelles.", color: 'from-red-400 to-rose-500' },
    { icon: Eye, title: 'Identification des frais cachés', description: "L'IA analyse ligne par ligne chaque facture fournisseur et la compare aux conditions contractuelles. Majorations non prévues, frais de gestion ajoutés discrètement, coûts d'expédition supérieurs au tarif convenu — chaque écart est signalé avec le montant exact de la surfacturation.", color: 'from-orange-400 to-red-500' },
    { icon: Calculator, title: 'Vérification TVA exhaustive', description: "InvoiceAgent vérifie la validité du numéro de TVA intracommunautaire, le taux appliqué selon la nature de la prestation, les mentions obligatoires et la cohérence des calculs. Chaque erreur formelle qui vous empêcherait de récupérer la TVA est identifiée avant comptabilisation.", color: 'from-amber-400 to-orange-500' },
    { icon: TrendingDown, title: 'Détection des surfacturations', description: "L'IA compare les prix unitaires facturés avec vos devis acceptés et les tarifs contractuels. Écarts de prix, quantités erronées, remises non appliquées — même les variations inférieures à 10% qui passent habituellement inaperçues sont signalées et chiffrées.", color: 'from-rose-400 to-pink-500' },
    { icon: BarChart3, title: 'Tableau de bord des pertes évitées', description: "Visualisez en temps réel le montant total des anomalies détectées, classées par type et par fournisseur. Suivez mois après mois les économies réalisées grâce à la vérification automatique et identifiez vos fournisseurs les plus problématiques.", color: 'from-violet-400 to-indigo-500' },
    { icon: FileSearch, title: 'Audit contrats fournisseurs', description: "Au-delà des factures, InvoiceAgent analyse vos contrats fournisseurs pour détecter les clauses qui génèrent des coûts cachés — révisions tarifaires automatiques, pénalités disproportionnées, conditions de résiliation coûteuses. Chaque clause à risque est identifiée et quantifiée.", color: 'from-blue-400 to-violet-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-red-100 text-red-700 border-0">6 types de pertes détectées automatiquement</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comment InvoiceAgent récupère
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"> votre argent perdu</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Chaque facture fournisseur est passée au crible par l'intelligence artificielle. Les anomalies sont détectées en moins de 5 secondes et chiffrées au centime près.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-red-200 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-6 lg:p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-rose-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Démo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Détectez les pertes dans vos factures maintenant</h2>
          <p className="text-lg text-red-200 max-w-2xl mx-auto">Uploadez une facture fournisseur en PDF — l'IA analyse les montants, TVA, doublons et frais cachés en moins de 5 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Analyse complète', icon: Clock }, { value: '6', label: 'Types de pertes détectées', icon: AlertTriangle }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
            <AnimatedSection key={stat.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3"><stat.icon className="w-6 h-6 text-red-300" /></div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-red-300 mt-1">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour découvrir', features: ['5 factures analysées', 'Détection doublons', 'Vérification TVA basique', 'Rapport anomalies PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME et freelances', features: ['100 factures/mois', 'Détection doublons avancée', 'Frais cachés identifiés', 'TVA vérifiée ligne par ligne', 'Surfacturations détectées', 'Tableau de bord pertes évitées', 'Export FEC comptable'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimité', features: ['Factures illimitées', 'Tout Pro inclus', 'Audit contrats fournisseurs', 'Multi-utilisateurs', 'Rapport pertes trimestriel', 'Accompagnement dédié'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Un abonnement qui <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">se rembourse 30 fois</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">29€/mois pour détecter en moyenne 3 200€ d'anomalies par trimestre. Le calcul est vite fait.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className={`relative h-full ${plan.popular ? 'border-2 border-violet-500 shadow-xl' : 'border-slate-200'} bg-white`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2"><Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 px-4 py-1 whitespace-nowrap">Plus populaire</Badge></div>}
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
        <p className="text-center text-slate-400 text-sm mt-6">Sans engagement · Annulez à tout moment · Données hébergées en Europe</p>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Combien d'argent une PME perd-elle à cause d'erreurs de facturation ?", a: "En moyenne, une PME française perd entre 2% et 5% de son chiffre d'affaires à cause d'erreurs de facturation non détectées. Pour une entreprise réalisant 500 000€ de CA annuel, cela représente 10 000€ à 25 000€ de pertes — doublons payés deux fois, frais cachés acceptés sans vérification, TVA non récupérée à cause d'erreurs formelles, et surfacturations par rapport aux devis acceptés." },
    { q: "Comment détecter les pertes d'argent dans mes factures fournisseurs ?", a: "InvoiceAgent analyse chaque facture PDF par intelligence artificielle en moins de 5 secondes. Le système extrait tous les montants, vérifie la TVA ligne par ligne, compare les prix aux conditions contractuelles, et croise avec votre historique pour détecter les doublons. Chaque anomalie est signalée avec le montant exact de la perte potentielle et une recommandation d'action." },
    { q: "Quelles sont les erreurs de facturation les plus coûteuses pour une PME ?", a: "Les 5 erreurs les plus coûteuses sont : 1) Les doublons de factures payés deux fois par inattention, 2) Les frais cachés non détectés dans les factures fournisseurs, 3) La TVA non récupérable à cause de mentions manquantes ou de numéros invalides, 4) Les surfacturations par rapport aux tarifs convenus, et 5) Les pénalités de retard appliquées à tort. InvoiceAgent détecte ces 5 types d'erreurs automatiquement." },
    { q: "InvoiceAgent peut-il analyser les factures de tous mes fournisseurs ?", a: "Oui. InvoiceAgent analyse les factures PDF de tous les fournisseurs, quel que soit le format, le secteur ou la mise en page. L'IA extrait automatiquement les montants HT et TTC, les lignes de détail, les taux de TVA, les conditions de paiement et les coordonnées pour détecter toute anomalie ou surfacturation. Compatible avec les factures BTP, services, fournitures, sous-traitance et prestations intellectuelles." },
    { q: "Quel est le retour sur investissement d'InvoiceAgent ?", a: "Les utilisateurs InvoiceAgent détectent en moyenne 3 200€ d'anomalies par trimestre. Avec un abonnement Pro à 29€/mois (soit 87€ par trimestre), le retour sur investissement dépasse 3 600% la première année. La version gratuite permet déjà d'analyser 5 factures pour identifier vos premières pertes sans engagement." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">fréquentes</span></h2>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-slate-200 overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900 pr-4 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={false} animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-600 to-violet-700" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Arrêtez de perdre de l'argent sur vos factures fournisseurs</h2>
          <p className="text-lg text-red-100 mb-4 max-w-2xl mx-auto">5 factures analysées gratuitement — sans carte bancaire. Découvrez combien vous perdez réellement.</p>
          <p className="text-red-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Détecter mes pertes <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la démo</a></Button>
          </div>
          <p className="mt-6 text-red-200 text-sm">Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Détection doublons factures', href: `${BASE_URL}/detection-doublons-factures` },
    { label: 'Frais cachés facture : comment détecter', href: `${BASE_URL}/frais-caches-facture-comment-detecter` },
    { label: 'Erreurs facturation TVA artisan', href: `${BASE_URL}/erreurs-facturation-tva-artisan` },
    { label: 'Comment éviter pertes comptabilité PME', href: `${BASE_URL}/comment-eviter-pertes-comptabilite-pme` },
    { label: 'TVA récupérable erreur facture', href: `${BASE_URL}/tva-recuperable-erreur-facture` },
    { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
    { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
  ];
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Découvrez toutes les fonctionnalités InvoiceAgent</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (<a key={link.label} href={link.href} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-violet-700 font-medium hover:border-violet-300 transition-all">{link.label}</a>))}
        </div>
      </div>
    </section>
  );
}

export default function PerteArgentFactureEntreprise() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <PainSection />
        <Features />
        <Demo />
        <Pricing />
        <FAQ />
        <CTA />
        <InternalLinks />
        <SharedFooter />
      </div>
    </>
  );
}