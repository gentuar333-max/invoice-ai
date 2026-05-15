"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Clock, Zap, FileText, Shield, Search, Scale, ClipboardCheck, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/comment-analyser-contrat-fournisseur`;

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
  name: 'InvoiceAgent — Comment Analyser Contrat Fournisseur',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '76' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment analyser un contrat fournisseur avant de le signer ?",
      acceptedAnswer: { '@type': 'Answer', text: "Analysez 6 points cles : conditions de paiement et penalites, clauses de resiliation et preavis, engagement de volume et exclusivite, responsabilite et garanties, propriete des donnees et confidentialite, et clause de revision de prix. InvoiceAgent automatise cette analyse en 30 secondes sur votre PDF." }
    },
    {
      '@type': 'Question',
      name: "Quels sont les risques d'un contrat fournisseur mal analyse ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les risques principaux : engagement de volume minimum non respecte (penalites), resiliation impossible sans frais importants, prix revises unilateralement sans preavis suffisant, responsabilite limitee du fournisseur en cas de defaillance, et clauses d'exclusivite qui bloquent votre approvisionnement concurrent." }
    },
    {
      '@type': 'Question',
      name: "Quelles clauses negocier en priorite dans un contrat fournisseur ?",
      acceptedAnswer: { '@type': 'Answer', text: "En priorite : les engagements de volume minimum (negociez une fourchette), les conditions de resiliation (preavis raisonnable sans penalite excessive), les clauses de revision de prix (plafonnez l'indexation), et la responsabilite du fournisseur en cas de rupture d'approvisionnement ou de defaut qualite." }
    },
    {
      '@type': 'Question',
      name: "InvoiceAgent analyse-t-il les contrats fournisseurs automatiquement ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. Uploadez votre contrat fournisseur PDF dans InvoiceAgent. L'IA analyse en moins de 30 secondes les 6 points critiques, identifie les clauses a risque et propose des alternatives de negociation concretes pour chaque point problematique." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Comment Analyser Contrat Fournisseur', item: PAGE_URL }
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
            {[['6 points cles', '#points'], ['Etapes analyse', '#etapes'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-50 rounded-full blur-3xl opacity-50" />
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold">
                <ClipboardCheck className="w-4 h-4" />
                Analyse contrat fournisseur par IA
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Comment analyser
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">un contrat fournisseur</span>
              <span className="block text-4xl sm:text-5xl font-bold text-slate-600 mt-1">avant de vous engager</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Engagement de volume, resiliation penalisante, revision de prix unilaterale — un contrat fournisseur mal analyse peut bloquer votre activite pendant des annees. InvoiceAgent detecte ces pieges en 30 secondes.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '6', label: 'Points cles analyses', sub: 'automatiquement' },
                { value: '< 30s', label: 'Par contrat PDF', sub: 'analyse complete' },
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
                <a href="#demo">Analyser mon contrat <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-base px-8 h-13 rounded-xl hover:border-violet-300" asChild>
                <a href="#points">Les 6 points cles</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500">
              {['Clauses pieges identifiees', 'Alternatives de negociation', 'Risques chiffres concretement'].map((item) => (
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
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow">
                    <ClipboardCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Contrat fournisseur — SARL Dupont Supplies</p>
                    <p className="text-xs text-slate-400">Analyse complete — 21 secondes</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">3 risques</span>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Engagement volume minimum', detail: '50 000€ HT/an obligatoire — penalite 20% si non atteint', risk: 'Eleve' },
                  { label: 'Conditions de resiliation', detail: 'Preavis 6 mois + indemnite 3 mois — excessif', risk: 'Eleve' },
                  { label: 'Revision de prix', detail: 'Revision trimestrielle sans plafond — risque hausse illimitee', risk: 'Critique' },
                  { label: 'Responsabilite fournisseur', detail: 'Limitee au montant mensuel — insuffisant pour rupture stock', risk: 'Moyen' },
                  { label: 'Conditions de paiement', detail: '30 jours net — conforme et standard', risk: null },
                  { label: 'Confidentialite', detail: 'Clause NDA reciproque 3 ans — equilibree', risk: null },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${row.risk === 'Critique' ? 'bg-red-50 border border-red-100' : row.risk === 'Eleve' ? 'bg-amber-50 border border-amber-100' : row.risk === 'Moyen' ? 'bg-orange-50 border border-orange-100' : 'bg-slate-50 border border-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{row.label}</p>
                      <p className={`text-xs mt-0.5 ${row.risk === 'Critique' ? 'text-red-500' : row.risk === 'Eleve' ? 'text-amber-600' : row.risk === 'Moyen' ? 'text-orange-600' : 'text-slate-400'}`}>{row.detail}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${row.risk === 'Critique' ? 'bg-red-100 text-red-600' : row.risk === 'Eleve' ? 'bg-amber-100 text-amber-700' : row.risk === 'Moyen' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {row.risk ?? 'OK'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4 border border-violet-100">
                <p className="text-xs font-bold text-violet-700 mb-1">Recommandation IA</p>
                <p className="text-xs text-violet-600 leading-relaxed">Negociez impeachment la clause de revision de prix : exigez un plafond d'indexation annuel (max +5%). Reduisez l'engagement minimum ou supprimez la penalite. Le preavis de 6 mois est excessif — proposez 3 mois.</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg border border-amber-100 px-4 py-3 items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">3 risques identifies</p>
                <p className="text-xs text-amber-600 font-semibold">avant signature</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-2"
            >
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800">Analyse</span>
              <span className="text-xs text-violet-500 font-semibold">complete en 21s</span>
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
      icon: TrendingDown,
      title: 'Engagements de volume minimum',
      description: "Un contrat fournisseur avec volume minimum garanti vous oblige a acheter une quantite definie — meme si votre activite ralentit. Les penalites en cas de non-atteinte peuvent representer 10 a 30% du montant non commande. Negociez une fourchette (min/max) plutot qu'un volume fixe.",
      question: "Quel volume minimum est-il impose ? Quelle penalite en cas de non-respect ?",
      color: 'from-red-500 to-rose-600',
    },
    {
      num: '02',
      icon: Clock,
      title: 'Conditions de resiliation et preavis',
      description: "Un preavis de 6 mois avec indemnite de resiliation de 3 mois d'achats vous bloque pendant 9 mois en cas de probleme fournisseur. Verifiez aussi les cas de resiliation pour juste motif — defaut qualite, retard de livraison — qui doivent vous permettre de sortir sans frais.",
      question: "Quel est le preavis ? Y a-t-il une indemnite ? Peut-on resilier pour faute du fournisseur ?",
      color: 'from-orange-500 to-red-500',
    },
    {
      num: '03',
      icon: Scale,
      title: 'Clauses de revision de prix',
      description: "Une clause de revision de prix sans plafond vous expose a des hausses illimitees. L'indexation doit etre liee a un indice officiel (INSEE, cours matieres premieres) avec un plafond annuel negocie. Une revision trimestrielle sans cap peut faire exploser votre cout d'approvisionnement.",
      question: "A quelle frequence ? Sur quel indice ? Quel plafond annuel ?",
      color: 'from-amber-500 to-orange-600',
    },
    {
      num: '04',
      icon: Shield,
      title: 'Responsabilite fournisseur en cas de defaillance',
      description: "Si le fournisseur ne livre pas et que cela bloque votre production ou vos engagements clients, sa responsabilite est souvent limitee au montant de la commande non livree. Cette limitation peut etre largement insuffisante face a votre prejudice reel — pertes clients, penalites contractuelles.",
      question: "Quelle est la limitation de responsabilite ? Couvre-t-elle le prejudice indirect ?",
      color: 'from-violet-500 to-purple-600',
    },
    {
      num: '05',
      icon: Search,
      title: 'Clauses d\'exclusivite et d\'approvisionnement',
      description: "Une clause d'exclusivite vous interdit de vous approvisionner ailleurs — ce qui vous rend totalement dependant du fournisseur. Si ce dernier rencontre des difficultes, vous n'avez aucun plan B. Negociez une clause de multi-sourcing ou une clause de defaillance qui leve l'exclusivite en cas de probleme.",
      question: "L'exclusivite est-elle totale ? Que se passe-t-il en cas de rupture de stock ?",
      color: 'from-blue-500 to-indigo-600',
    },
    {
      num: '06',
      icon: FileText,
      title: 'Propriete des donnees et confidentialite',
      description: "Verifiez qui est proprietaire des donnees echangees — historiques de commandes, specifications produits, donnees clients. Une clause trop large peut permettre au fournisseur d'utiliser vos donnees commerciales. Le NDA doit etre reciproque avec une duree et un perimetre precis.",
      question: "Qui possede les donnees ? Le NDA est-il reciproque ? Quelle duree ?",
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section id="points" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Analyse automatique par InvoiceAgent
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            6 points cles a analyser
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> dans tout contrat fournisseur</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Ces 6 points concentrent 90% des risques contractuels fournisseur. InvoiceAgent les analyse automatiquement avec la question cle et le risque chiffre pour chacun.</p>
        </AnimatedSection>

        <div className="space-y-5">
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
                        <span className="text-xs font-black text-slate-300 uppercase">Point {p.num}</span>
                        <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{p.description}</p>
                      <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-lg px-3 py-2">
                        <Search className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs font-semibold text-violet-600">{p.question}</p>
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
      title: 'Lisez d\'abord les annexes et CGV',
      description: "Les conditions generales de vente et annexes contiennent souvent les clauses les plus importantes — engagements de volume, conditions qualite, penalites. Le corps du contrat y fait reference sans les detailler. Commencez par ces documents avant le contrat principal.",
    },
    {
      num: '02',
      title: 'Identifiez toutes les obligations chiffrees',
      description: "Listez tous les montants, delais et pourcentages mentionnes : volume minimum, penalites, preavis, plafonds de responsabilite, taux de revision de prix. Ces chiffres determinent l'impact reel de chaque clause — une penalite de 5% sur 500 000€ d'achats represente 25 000€.",
    },
    {
      num: '03',
      title: 'Verifiez la reciprocite des clauses',
      description: "Toute obligation imposee au client doit avoir son equivalent pour le fournisseur. Si vous avez un preavis de 6 mois, le fournisseur doit en avoir un aussi. Si vous etes penalise en cas de commande insuffisante, le fournisseur doit l'etre en cas de livraison insuffisante.",
    },
    {
      num: '04',
      title: 'Simulez les scenarios defavorables',
      description: "Calculez ce que vous paieriez si votre activite baissait de 30%, si le fournisseur augmentait ses prix de 15%, ou si vous deviez resilier dans 3 mois. Ces simulations concretisent les risques abstraits et determinent vos priorites de negociation.",
    },
    {
      num: '05',
      title: 'Negociez par ecrit avec des contre-propositions',
      description: "Envoyez vos demandes de modification par email avec les formulations alternatives. Gardez une trace ecrite de toutes les negociations. Si le fournisseur refuse toute modification sur des points critiques, c'est un signal sur la relation commerciale future.",
    },
  ];

  return (
    <section id="etapes" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-semibold">
            Methode d'analyse
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Analyser un contrat fournisseur
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> en 5 etapes</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">La methode structuree pour analyser efficacement un contrat fournisseur — avant de confier l'analyse approfondie a InvoiceAgent.</p>
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
                      <h3 className="font-bold text-slate-900 mb-2">{e.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{e.description}</p>
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
              <h3 className="font-bold text-violet-900 mb-2">InvoiceAgent realise ces 5 etapes en 30 secondes</h3>
              <p className="text-violet-700 text-sm leading-relaxed mb-4">Uploadez votre contrat fournisseur PDF — l'IA identifie les 6 points critiques, simule les scenarios defavorables et propose des formulations alternatives pour chaque clause a risque.</p>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm" asChild>
                <a href={`${BASE_URL}/auth/login`}>Analyser mon contrat fournisseur <ArrowRight className="ml-2 w-4 h-4" /></a>
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
      features: ['2 analyses contrat gratuites', '6 points cles analyses', 'Rapport risques structure', 'Export PDF rapport'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Analyses illimitees', '25+ types de clauses', 'Simulation scenarios', 'Alternatives negociation', 'Recommandations IA', 'Historique analyses'],
      cta: 'Choisir Pro',
      popular: true,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Volume et equipes',
      features: ['Tout Pro inclus', 'Multi-utilisateurs', 'Export Word + PDF', 'Resume executif', 'Accompagnement dedie'],
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
          <p className="text-lg text-slate-500 max-w-xl mx-auto">2 analyses offertes. Un engagement fournisseur mal negocie peut couter des dizaines de milliers d'euros.</p>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Analysez votre contrat fournisseur maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez votre contrat PDF — l'IA analyse les 6 points critiques et identifie chaque clause a risque en moins de 30 secondes.</p>
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
            { value: '6', label: 'Points analyses', icon: ClipboardCheck },
            { value: '< 30s', label: 'Par contrat PDF', icon: Clock },
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
      q: "Comment analyser un contrat fournisseur avant de le signer ?",
      a: "Methode en 5 etapes : 1) Lisez d'abord les annexes et CGV (elles contiennent les clauses les plus importantes), 2) Listez toutes les obligations chiffrees (volumes, penalites, preavis), 3) Verifiez la reciprocite de chaque obligation, 4) Simulez les scenarios defavorables (baisse activite, hausse prix), 5) Negociez par ecrit avec des contre-propositions. InvoiceAgent automatise ces 5 etapes en 30 secondes."
    },
    {
      q: "Quelles sont les clauses les plus dangereuses dans un contrat fournisseur ?",
      a: "Les 3 clauses les plus dangereuses : 1) L'engagement de volume minimum sans flexibilite — vous oblige a acheter meme si votre activite baisse, 2) La clause de revision de prix sans plafond — expose a des hausses illimitees, 3) La resiliation avec indemnite excessive — vous bloque meme en cas de defaillance fournisseur. InvoiceAgent identifie ces 3 points en priorite."
    },
    {
      q: "Peut-on negocier un contrat fournisseur type ?",
      a: "Oui, meme les contrats presentes comme 'standard' sont negociables. Les fournisseurs s'attendent a des demandes de modification sur les points critiques. Concentrez-vous sur 3 a 4 points maximum — diluer vos demandes sur trop de clauses reduit votre pouvoir de negociation sur les points essentiels."
    },
    {
      q: "Quelle est la difference entre un contrat cadre et un contrat de prestation fournisseur ?",
      a: "Un contrat cadre fixe les conditions generales d'une relation commerciale durable (prix, conditions, engagements) sans definir chaque commande. Chaque commande est ensuite realisee par bon de commande ou avenant. Un contrat de prestation definit une mission precise avec un livrable, un delai et un prix fixes. InvoiceAgent analyse les deux types."
    },
    {
      q: "Faut-il un avocat pour analyser un contrat fournisseur ?",
      a: "Pour les contrats standards de moins de 100 000€/an, InvoiceAgent suffit pour identifier les risques et preparer la negociation. Pour les contrats strategiques, pluriannuels ou avec des enjeux d'exclusivite importants, consultez un avocat specialise en droit commercial. Le cout (500 a 2 000€) est negligeable face aux engagements sur plusieurs annees."
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
            Analysez votre contrat fournisseur avant de vous engager
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Rapport complet en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-bold underline">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-base px-8 h-14 font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Analyser mon contrat <ArrowRight className="ml-2 w-5 h-5" /></a>
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
    { label: 'Clauses abusives contrat exemple', href: `${BASE_URL}/clauses-abusives-contrat-exemple` },
    { label: 'Risque contrat prestation entreprise', href: `${BASE_URL}/risque-contrat-prestation-entreprise` },
    { label: 'Frais caches contrat entreprise', href: `${BASE_URL}/frais-caches-contrat-entreprise` },
    { label: 'Analyse contrat prestation', href: `${BASE_URL}/analyse-contrat-prestation` },
    { label: 'Detection clauses abusives', href: `${BASE_URL}/detection-clauses-abusives` },
    { label: 'Verifier contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
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

export default function CommentAnalyserContratFournisseur() {
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