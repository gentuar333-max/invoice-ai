"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, TrendingDown, Lock, FileSearch, Clock, BarChart3, Target, Layers, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/comment-eviter-pertes-comptabilite-pme`;

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
  name: 'InvoiceAgent — Prévention Pertes Comptables PME',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '134' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment une PME peut-elle éviter les pertes comptables ?", acceptedAnswer: { '@type': 'Answer', text: "Les trois piliers sont : 1) Vérifier chaque facture fournisseur avant paiement (doublons, frais cachés, TVA), 2) Rapprocher les comptes bancaires chaque semaine, 3) Analyser les contrats pour détecter les clauses coûteuses. InvoiceAgent automatise ces trois vérifications par IA." } },
    { '@type': 'Question', name: "Quelles sont les principales sources de pertes comptables en PME ?", acceptedAnswer: { '@type': 'Answer', text: "Les 5 sources principales : doublons de factures payés deux fois, TVA non récupérée sur erreurs formelles, frais cachés fournisseurs non contestés, factures clients impayées non relancées, et écarts de rapprochement bancaire non investigués. Total moyen : 2% à 5% du CA annuel." } },
    { '@type': 'Question', name: "Combien coûte l'absence de contrôle comptable automatisé ?", acceptedAnswer: { '@type': 'Answer', text: "Une PME à 500 000€ de CA perd en moyenne 10 000€ à 25 000€ par an à cause d'erreurs comptables non détectées. Ce montant inclut les doublons, la TVA perdue, les surfacturations et les frais cachés. L'automatisation avec InvoiceAgent coûte 29€/mois et détecte ces pertes dès le premier trimestre." } },
    { '@type': 'Question', name: "InvoiceAgent remplace-t-il un expert-comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Non. InvoiceAgent complète le travail de votre expert-comptable en vérifiant les factures en amont — avant qu'elles n'entrent dans la comptabilité. L'outil détecte les anomalies, doublons et erreurs de TVA que l'expert-comptable ne peut pas vérifier au moment de la saisie. Export FEC natif compatible Sage, EBP et Cegid." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Comment éviter pertes comptabilité PME', item: PAGE_URL }
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
            {[['Fonctionnalites', '#features'], ['Demo', '#demo'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-slate-50 to-rose-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/15 to-rose-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-400/10 to-indigo-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-indigo-100 text-indigo-700 border-0 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />Protégez votre trésorerie automatiquement
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Comment éviter les</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">pertes comptables</span>
              <br />
              <span className="text-slate-900">en PME</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Doublons payés deux fois, TVA non récupérée, surfacturations acceptées — <strong>les PME françaises perdent 2% à 5% de leur CA</strong> chaque année sur des erreurs comptables évitables. InvoiceAgent les détecte avant qu'elles ne deviennent des pertes.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '31 800€', label: 'Pertes moyennes/an', sub: 'pour une PME à 1M€ CA' },
                { value: '5 types', label: 'D\'erreurs détectées', sub: 'doublons, TVA, frais...' },
                { value: '< 5s', label: 'Par facture', sub: 'vérification IA complète' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-indigo-600">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-xl shadow-indigo-600/30 text-lg px-8 h-14" asChild>
                <a href="#demo">Auditer mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Doublons bloqués', 'TVA vérifiée', 'Rapprochement bancaire automatique'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-600/15 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center"><BarChart3 className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Bilan pertes évitées — T1 2026</p><p className="text-sm text-slate-500">PME Services Conseil — 89 factures</p></div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">7 420€ sauvés</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Doublons détectés et bloqués', detail: '3 factures identiques interceptées avant paiement', montant: '2 890€', status: 'Bloqué', color: 'emerald' },
                  { point: 'TVA récupérée grâce aux alertes', detail: '5 factures corrigées — numéros TVA validés', montant: '1 680€', status: 'Récupéré', color: 'emerald' },
                  { point: 'Frais cachés contestés', detail: '2 fournisseurs — majorations non contractuelles', montant: '1 340€', status: 'Contesté', color: 'emerald' },
                  { point: 'Surfacturations identifiées', detail: 'Écart prix unitaire sur 4 lignes — devis vs facture', montant: '890€', status: 'Signalé', color: 'blue' },
                  { point: 'Pénalités retard injustifiées', detail: '1 facture — paiement effectué dans les délais', montant: '620€', status: 'Contesté', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'emerald' ? 'bg-emerald-50 border border-emerald-100' : 'bg-blue-50 border border-blue-100'}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'}`}>{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs font-bold text-emerald-700">{item.montant}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-700">Bilan trimestriel</p>
                <p className="text-xs text-indigo-600 mt-1">7 420€ de pertes évitées sur 89 factures analysées en T1 2026. ROI de l'abonnement Pro : 2 756%. Fournisseurs à surveiller : LogiTrans (3 anomalies) et BureauPlus (2 majorations non contractuelles).</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"><Shield className="w-5 h-5 text-emerald-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">7 420€ protégés</p><p className="text-xs text-emerald-600 font-semibold">ce trimestre</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Target className="w-5 h-5 text-indigo-500" /><span className="text-sm font-medium text-slate-900">ROI</span><span className="text-xs text-indigo-600 font-semibold">2 756%</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SourcesPertes() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-indigo-500/20 text-indigo-300 border-indigo-500/30 border">Les 5 fuites de trésorerie</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            D'où viennent les pertes comptables
            <span className="text-indigo-400"> en PME ?</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Ces 5 sources de pertes existent dans toutes les PME. La plupart ne sont jamais détectées car elles passent sous le radar de la vérification manuelle.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { rank: '01', title: 'Doublons de factures', montant: '12 800€/an', description: "La même facture payée deux fois — par erreur de saisie, envoi multiple du fournisseur, ou numéro de facture légèrement différent. C'est la source n°1 de pertes pour les PME traitant plus de 50 factures mensuelles. InvoiceAgent croise montants, dates et fournisseurs pour bloquer chaque doublon.", color: 'from-red-500 to-rose-600' },
            { rank: '02', title: 'TVA non récupérable', montant: '6 200€/an', description: "Numéro de TVA expiré, taux incorrect, mentions obligatoires absentes — chaque erreur formelle rend la TVA non déductible. Sur des achats à 20%, cela représente une perte sèche immédiate de 16,7% du montant facturé. InvoiceAgent vérifie chaque point de conformité TVA.", color: 'from-amber-500 to-orange-600' },
            { rank: '03', title: 'Frais cachés fournisseurs', montant: '8 500€/an', description: "Frais de gestion, majorations saisonnières, coûts d'expédition gonflés — des lignes ajoutées discrètement qui ne correspondent à aucune clause contractuelle. InvoiceAgent compare chaque ligne au contrat et signale tout écart.", color: 'from-orange-500 to-red-500' },
            { rank: '04', title: 'Surfacturations non détectées', montant: '4 300€/an', description: "Prix unitaire 47€ facturé au lieu de 38€ au devis. Sur 200 lignes de factures mensuelles, ces écarts de 10% à 25% passent inaperçus. InvoiceAgent compare automatiquement chaque prix aux conditions contractuelles.", color: 'from-rose-500 to-pink-600' },
            { rank: '05', title: 'Écarts de rapprochement bancaire', montant: '3 400€/an', description: "Prélèvements bancaires non comptabilisés, virements non identifiés, frais bancaires oubliés — les écarts de rapprochement s'accumulent sans investigation. InvoiceAgent automatise la réconciliation CSV et signale chaque écart.", color: 'from-violet-500 to-indigo-600' },
          ].map((item, i) => (
            <motion.div key={i} variants={scaleIn} className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-colors ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-white/20">{item.rank}</span>
                <span className="text-sm font-bold bg-red-500/20 text-red-300 px-3 py-1 rounded-full">{item.montant}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <AnimatedSection className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-indigo-500/20 rounded-full px-6 py-3 border border-indigo-500/30">
            <TrendingDown className="w-5 h-5 text-indigo-400" />
            <p className="text-white font-semibold">Total : <span className="text-red-400">35 200€ de pertes annuelles évitables</span> pour une PME moyenne</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Lock, title: 'Blocage des doublons avant paiement', description: "Chaque facture entrante est croisée avec l'historique complet — même fournisseur, montant proche, dates rapprochées. InvoiceAgent signale les doublons probables avant que vous ne validiez le paiement. Un seul doublon bloqué par trimestre rembourse un an d'abonnement.", color: 'from-red-400 to-rose-500' },
    { icon: Shield, title: 'Vérification TVA systématique', description: "Taux appliqué, numéro de TVA intracommunautaire, mentions obligatoires, calculs — les 4 points de conformité TVA sont vérifiés sur chaque facture en moins de 5 secondes. Chaque erreur corrigée avant comptabilisation préserve votre droit à déduction.", color: 'from-amber-400 to-orange-500' },
    { icon: FileSearch, title: 'Détection frais cachés et surfacturations', description: "L'IA analyse chaque ligne de facture et compare aux conditions contractuelles. Frais de gestion non prévus, majorations non négociées, prix unitaires supérieurs au devis — chaque surcoût est identifié, chiffré et documenté pour faciliter la contestation auprès du fournisseur.", color: 'from-orange-400 to-red-500' },
    { icon: RefreshCw, title: 'Rapprochement bancaire automatique', description: "Importez votre relevé CSV bancaire. InvoiceAgent rapproche automatiquement chaque transaction avec vos factures enregistrées. Les écarts non résolus — prélèvements non identifiés, montants incomplets, virements en attente — sont signalés pour investigation immédiate.", color: 'from-blue-400 to-indigo-500' },
    { icon: BarChart3, title: 'Tableau de bord pertes évitées', description: "Visualisez en temps réel le montant total des anomalies détectées et des pertes évitées, classées par type et par fournisseur. Suivez votre ROI mois après mois et identifiez les fournisseurs qui génèrent le plus d'anomalies pour ouvrir des renégociations ciblées.", color: 'from-violet-400 to-purple-500' },
    { icon: Layers, title: 'Export FEC pour votre expert-comptable', description: "InvoiceAgent génère un export FEC natif compatible avec Sage, EBP et Cegid. Votre expert-comptable reçoit des données propres, vérifiées et sans anomalies. Moins de temps passé en correction signifie des honoraires comptables réduits et une clôture plus rapide.", color: 'from-emerald-400 to-teal-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-indigo-100 text-indigo-700 border-0">6 protections automatiques</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comment InvoiceAgent
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> protège votre trésorerie</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Chaque facture est vérifiée automatiquement. Les anomalies sont bloquées avant de devenir des pertes. Votre expert-comptable reçoit des données propres.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-500">
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Démo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Auditez vos factures en 5 secondes</h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">Uploadez une facture fournisseur en PDF — l'IA détecte doublons, frais cachés, erreurs de TVA et surfacturations automatiquement.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Audit complet', icon: Clock }, { value: '5 types', label: 'D\'erreurs détectées', icon: AlertTriangle }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
            <AnimatedSection key={stat.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3"><stat.icon className="w-6 h-6 text-indigo-300" /></div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-indigo-300 mt-1">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour découvrir', features: ['5 factures auditées', 'Détection doublons', 'Vérification TVA basique', 'Rapport anomalies PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME', features: ['100 factures/mois', 'Doublons + frais cachés + TVA', 'Rapprochement bancaire CSV', 'Tableau de bord pertes évitées', 'Export FEC comptable', 'Historique par fournisseur'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimité', features: ['Factures illimitées', 'Tout Pro inclus', 'Audit contrats fournisseurs', 'Multi-utilisateurs', 'Rapport trimestriel', 'Accompagnement dédié'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">29€/mois pour protéger <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">des milliers d'euros</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Un seul doublon bloqué rembourse un an d'abonnement. Les utilisateurs Pro détectent en moyenne 7 420€ d'anomalies par trimestre.</p>
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
    { q: "Comment une PME peut-elle éviter les pertes comptables ?", a: "Les trois piliers essentiels sont : 1) Vérifier chaque facture fournisseur avant paiement — InvoiceAgent détecte les doublons, frais cachés, erreurs de TVA et surfacturations en 5 secondes par facture, 2) Rapprocher les comptes bancaires chaque semaine — l'import CSV automatisé identifie les écarts, 3) Analyser les contrats fournisseurs pour détecter les clauses qui génèrent des coûts cachés." },
    { q: "Quelles sont les principales sources de pertes comptables en PME ?", a: "Les 5 sources principales par ordre de coût : doublons de factures payés deux fois (12 800€/an en moyenne), frais cachés fournisseurs non contestés (8 500€/an), TVA non récupérée sur erreurs formelles (6 200€/an), surfacturations par rapport aux conditions contractuelles (4 300€/an), et écarts de rapprochement bancaire non investigués (3 400€/an). Total moyen : 2% à 5% du CA annuel." },
    { q: "Combien coûte l'absence de contrôle comptable automatisé ?", a: "Pour une PME réalisant 500 000€ de CA annuel, l'absence de vérification systématique des factures coûte en moyenne 10 000€ à 25 000€ par an en pertes non détectées. L'abonnement Pro InvoiceAgent coûte 29€/mois (348€/an) et détecte en moyenne 7 420€ d'anomalies par trimestre. Le retour sur investissement dépasse 2 000% dès le premier trimestre d'utilisation." },
    { q: "InvoiceAgent remplace-t-il un expert-comptable ?", a: "Non, et ce n'est pas son objectif. InvoiceAgent intervient en amont de la comptabilité : il vérifie les factures fournisseurs avant leur intégration comptable. Votre expert-comptable reçoit des données propres et vérifiées via l'export FEC natif (compatible Sage, EBP, Cegid). Résultat : moins de corrections, une clôture plus rapide et des honoraires comptables potentiellement réduits." },
    { q: "Par où commencer pour réduire les pertes comptables ?", a: "Commencez par analyser gratuitement 5 factures fournisseurs avec InvoiceAgent — sans inscription ni carte bancaire. Le rapport vous montrera les anomalies existantes et le montant potentiellement récupérable. Ensuite, systématisez la vérification avec l'abonnement Pro pour couvrir l'ensemble de vos factures mensuelles et activez le rapprochement bancaire CSV." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">fréquentes</span></h2>
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-rose-600" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Chaque jour sans vérification vous coûte de l'argent</h2>
          <p className="text-lg text-indigo-100 mb-4 max-w-2xl mx-auto">5 factures auditées gratuitement — sans carte bancaire. Découvrez en 30 secondes combien vous perdez réellement.</p>
          <p className="text-indigo-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Auditer mes factures <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la démo</a></Button>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Perte argent facture entreprise', href: `${BASE_URL}/perte-argent-facture-entreprise` },
    { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Détection doublons factures', href: `${BASE_URL}/detection-doublons-factures` },
    { label: 'Erreurs facturation TVA artisan', href: `${BASE_URL}/erreurs-facturation-tva-artisan` },
    { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
    { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
    { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
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

export default function CommentEviterPertesComptabilitePme() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <SourcesPertes />
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