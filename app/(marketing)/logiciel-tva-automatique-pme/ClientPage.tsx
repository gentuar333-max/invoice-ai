"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Calculator, Percent, FileSearch, Clock, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/logiciel-tva-automatique-pme`;

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
  name: 'InvoiceAgent — Logiciel TVA Automatique PME',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '124' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Qu'est-ce qu'un logiciel TVA automatique pour PME ?", acceptedAnswer: { '@type': 'Answer', text: "Un logiciel TVA automatique verifie en temps reel la conformite TVA de chaque facture : taux applique, numero intracommunautaire, mentions obligatoires et calculs. InvoiceAgent automatise cette verification par IA en 5 secondes par facture, sans intervention humaine." } },
    { '@type': 'Question', name: "Pourquoi automatiser la verification TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Une PME recoit en moyenne 80 a 200 factures par mois. Verifier manuellement la TVA de chacune prend 3 a 5 minutes — soit 4 a 16 heures par mois. InvoiceAgent reduit ce temps a quelques minutes et detecte les erreurs invisibles a l'oeil humain." } },
    { '@type': 'Question', name: "InvoiceAgent est-il compatible avec mon logiciel comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent genere un export FEC natif compatible Sage, EBP, Cegid et tous les logiciels comptables francais. Les factures verifiees sont exportees avec les bonnes imputations TVA sans ressaisie." } },
    { '@type': 'Question', name: "Combien coute un logiciel TVA automatique ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent propose un plan gratuit pour 5 factures, un plan Pro a 29 euros par mois pour 100 factures et un plan Business a 49 euros par mois en illimite. Le retour sur investissement est immediat : une seule erreur TVA corrigee rembourse des mois d'abonnement." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Logiciel TVA automatique PME', item: PAGE_URL }
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-400/20 to-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 border-0 text-sm font-medium">
                <Settings className="w-4 h-4 mr-2" />Automatisez la verification TVA de chaque facture
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Logiciel TVA</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">automatique</span>
              <br />
              <span className="text-slate-900">pour PME</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Verifier manuellement la TVA de 100 factures prend <strong>8 heures par mois</strong>. InvoiceAgent le fait en 8 minutes — taux, numero VIES, mentions et calculs verifies automatiquement par IA sur chaque facture PDF.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '8 min', label: 'Pour 100 factures', sub: 'au lieu de 8 heures' },
                { value: '99,2%', label: 'Precision IA', sub: 'sur la detection erreurs' },
                { value: '0€', label: 'Pour commencer', sub: '5 factures gratuites' },
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
                <a href="#demo">Tester gratuitement <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Verification 100% automatique', 'Export FEC natif Sage/EBP', 'Compatible toutes banques'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"><BarChart3 className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Tableau de bord TVA — Mars 2026</p><p className="text-sm text-slate-500">94 factures traitees automatiquement</p></div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">98% conforme</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Factures conformes TVA', detail: '87 factures — taux, numeros et calculs valides', status: '87/94', color: 'emerald' },
                  { point: 'Erreurs de taux detectees', detail: '3 factures — 10% applique au lieu de 20% sur services', status: '3 erreurs', color: 'red' },
                  { point: 'Numeros TVA invalides', detail: '2 fournisseurs — numeros expires sur base VIES', status: '2 alertes', color: 'red' },
                  { point: 'Mentions manquantes', detail: '2 factures — adresse incomplete sur 1, SIRET absent sur 1', status: '2 a corriger', color: 'amber' },
                  { point: 'TVA deductible securisee', detail: '18 740€ de TVA verifiee et confirmee deductible', status: '18 740€', color: 'emerald' },
                  { point: 'Export FEC genere', detail: 'Compatible Sage, EBP, Cegid — pret pour comptabilite', status: 'Pret', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'red' ? 'bg-red-50 border border-red-100' : item.color === 'amber' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50'}`}>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-slate-500'}`}>{item.detail}</p>
                    </div>
                    <span className={`text-xs font-bold flex-shrink-0 ml-2 px-2 py-0.5 rounded-full ${item.color === 'red' ? 'bg-red-100 text-red-600' : item.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>{item.status}</span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-xs font-semibold text-violet-700">Synthese automatique</p>
                <p className="text-xs text-violet-600 mt-1">94 factures traitees en 7 minutes. 7 anomalies detectees representant 1 420€ de TVA a risque. Demandez des factures rectificatives aux 2 fournisseurs avec numeros TVA expires avant la declaration du 15 avril.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"><Settings className="w-5 h-5 text-violet-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">94 factures</p><p className="text-xs text-violet-600 font-semibold">traitees en 7 min</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">18 740€ TVA</span><span className="text-xs text-emerald-600 font-semibold">securisee</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Zap, title: 'Verification TVA en 5 secondes par facture', description: "Uploadez un lot de factures PDF. InvoiceAgent traite chaque document en 5 secondes — extraction du taux, verification du numero TVA sur VIES, controle des 12 mentions obligatoires et recalcul des montants. 100 factures sont traitees en moins de 8 minutes au lieu de 8 heures de verification manuelle.", color: 'from-violet-400 to-purple-500' },
    { icon: Shield, title: 'Validation VIES en temps reel', description: "Chaque numero de TVA intracommunautaire extrait des factures est verifie automatiquement sur la base europeenne VIES. Les numeros invalides, expires ou appartenant a des entites radiees sont signales avant comptabilisation. Cette verification est la plus critique — un numero invalide annule 100% de la TVA deductible.", color: 'from-red-400 to-rose-500' },
    { icon: Calculator, title: 'Recalcul automatique des montants', description: "L'IA recalcule chaque ligne : base HT multipliee par le taux donne le montant TVA attendu, puis verifie la coherence avec le total TTC. Les erreurs d'arrondi, inversions et ecarts sont detectes au centime pres. Sur les factures multi-taux, ces erreurs passent systematiquement inapercues en verification manuelle.", color: 'from-orange-400 to-red-500' },
    { icon: Percent, title: 'Controle automatique des taux', description: "5,5% pour la renovation energetique, 10% pour les travaux en logement ancien, 20% pour les services standard — InvoiceAgent analyse la nature de chaque prestation et verifie que le taux corresponde. Les factures avec un taux incorrect sont bloquees avec l'explication du taux applicable.", color: 'from-amber-400 to-orange-500' },
    { icon: FileText, title: 'Export FEC natif pour votre comptable', description: "InvoiceAgent genere un fichier FEC (Fichier des Ecritures Comptables) directement compatible avec Sage, EBP, Cegid et tous les logiciels comptables francais. Votre expert-comptable recoit des donnees propres avec les bonnes imputations TVA — sans ressaisie, sans erreur de transcription.", color: 'from-blue-400 to-indigo-500' },
    { icon: BarChart3, title: 'Tableau de bord TVA mensuel', description: "Visualisez en un coup d'oeil le volume de factures traitees, le taux de conformite, le montant de TVA deductible securisee et les fournisseurs a risque. Le rapport mensuel automatique vous prepare pour chaque echeance de declaration TVA avec la certitude que vos deductions sont justifiees.", color: 'from-emerald-400 to-teal-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">Verification TVA 100% automatique</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ce que le logiciel automatise pour
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> securiser votre TVA</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Plus de verification manuelle. L'IA traite chaque facture en 5 secondes et vous alerte uniquement quand une intervention est necessaire.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-500">
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

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['5 factures/mois', 'Verification taux TVA', 'Controle mentions', 'Rapport conformite PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME', features: ['100 factures/mois', 'Verification TVA complete', 'Validation VIES automatique', 'Recalcul HT/TVA/TTC', 'Export FEC Sage/EBP/Cegid', 'Tableau de bord TVA'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimite', features: ['Factures illimitees', 'Tout Pro inclus', 'Multi-utilisateurs', 'Rapport TVA trimestriel', 'Audit contrats fournisseurs', 'Accompagnement dedie'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">8 heures de verification manuelle remplacees par 8 minutes automatiques. 29€/mois pour securiser 100 factures et des milliers d'euros de TVA deductible.</p>
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
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Demo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Testez la verification TVA automatique maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA verifie taux, numero VIES, mentions et calculs en 5 secondes. Resultat immediat.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Par facture', icon: Clock }, { value: '100%', label: 'Automatique', icon: Settings }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
            <AnimatedSection key={stat.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3"><stat.icon className="w-6 h-6 text-violet-300" /></div>
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
    { q: "Qu'est-ce qu'un logiciel TVA automatique pour PME ?", a: "Un logiciel TVA automatique verifie en temps reel la conformite TVA de chaque facture fournisseur sans intervention humaine. InvoiceAgent analyse chaque facture PDF en 5 secondes : extraction et verification du taux applique, validation du numero TVA intracommunautaire sur la base VIES, controle des 12 mentions obligatoires et recalcul des montants HT/TVA/TTC. Les factures conformes passent directement en comptabilite, les factures avec erreurs sont bloquees avec un rapport detaille." },
    { q: "Pourquoi automatiser la verification TVA en PME ?", a: "Une PME recoit en moyenne 80 a 200 factures par mois. Verifier manuellement la conformite TVA de chacune prend 3 a 5 minutes — soit 4 a 16 heures de travail mensuel. L'automatisation avec InvoiceAgent reduit ce temps a quelques minutes et detecte les erreurs invisibles a l'oeil humain : numeros TVA expires, ecarts de calcul inferieurs a 1%, mentions manquantes dans les petits caracteres. Le cout des erreurs non detectees (6 200€ par an en moyenne) depasse largement le cout de l'abonnement." },
    { q: "InvoiceAgent est-il compatible avec mon logiciel comptable ?", a: "Oui. InvoiceAgent genere un export FEC (Fichier des Ecritures Comptables) natif compatible avec Sage, EBP, Cegid et tous les logiciels comptables utilises en France. Les factures verifiees et conformes sont exportees avec les bonnes imputations TVA, les bons comptes et les montants valides. Votre expert-comptable importe directement sans ressaisie — moins d'erreurs de transcription et une cloture plus rapide." },
    { q: "Combien de temps faut-il pour traiter 100 factures ?", a: "Environ 8 minutes avec InvoiceAgent contre 8 heures en verification manuelle. Chaque facture PDF est analysee en 5 secondes : extraction OCR des donnees, verification du taux TVA, validation du numero VIES, controle des mentions et recalcul des montants. Le resultat est un rapport complet avec les factures conformes, les erreurs detectees et les actions correctives recommandees." },
    { q: "Combien coute InvoiceAgent ?", a: "Le plan Gratuit permet de verifier 5 factures par mois — ideal pour tester. Le plan Pro a 29€/mois couvre 100 factures avec toutes les verifications TVA, l'export FEC et le tableau de bord. Le plan Business a 49€/mois offre un volume illimite avec multi-utilisateurs et accompagnement dedie. Le retour sur investissement est immediat : une seule erreur TVA corrigee rembourse des mois d'abonnement." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">frequentes</span></h2>
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
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Arretez de perdre 8 heures par mois sur la verification TVA</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">5 factures verifiees gratuitement — sans carte bancaire. Resultat en 5 secondes par facture.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Tester gratuitement <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Voir la demo</a></Button>
          </div>
          <p className="mt-6 text-violet-200 text-sm">Sans engagement · RGPD conforme · Annulez a tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
    { label: 'TVA recuperable erreur facture', href: `${BASE_URL}/tva-recuperable-erreur-facture` },
    { label: 'Erreur TVA facture comment corriger', href: `${BASE_URL}/erreur-tva-facture-comment-corriger` },
    { label: 'Calcul TVA erreur entreprise', href: `${BASE_URL}/calcul-tva-erreur-entreprise` },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
  ];
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Decouvrez toutes les fonctionnalites InvoiceAgent</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (<a key={link.label} href={link.href} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-violet-700 font-medium hover:border-violet-300 transition-all">{link.label}</a>))}
        </div>
      </div>
    </section>
  );
}

export default function LogicielTvaAutomatiquePme() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <Features />
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