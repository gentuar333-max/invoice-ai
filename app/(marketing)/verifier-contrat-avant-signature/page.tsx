"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, XCircle, Eye, Search, FileSearch, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/verifier-contrat-avant-signature`;

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>{children}</motion.div>;
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL };
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Vérifier Contrat Avant Signature', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '72' } };
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment vérifier un contrat avant de le signer ?", acceptedAnswer: { '@type': 'Answer', text: "Uploadez votre contrat en PDF dans InvoiceAgent. L'IA analyse chaque clause en moins de 30 secondes et vous présente un rapport structuré avec les points à risque classés par niveau — clauses abusives, pénalités cachées, conditions déséquilibrées — avant que vous signiez." } },
    { '@type': 'Question', name: "Quels points vérifier dans un contrat avant signature ?", acceptedAnswer: { '@type': 'Answer', text: "Les 6 points essentiels à vérifier : 1) Conditions de paiement et délais, 2) Clauses de pénalités de retard, 3) Conditions de résiliation et préavis, 4) Cession de droits et propriété intellectuelle, 5) Limitations de responsabilité, 6) Révisions tarifaires automatiques." } },
    { '@type': 'Question', name: "InvoiceAgent peut-il analyser n'importe quel type de contrat ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse les contrats de prestation de services, les marchés de travaux BTP, les contrats de sous-traitance, les lettres de mission, les contrats de fourniture et les conventions de partenariat — en moins de 30 secondes." } },
    { '@type': 'Question', name: "Vérifier un contrat avec l'IA remplace-t-il un avocat ?", acceptedAnswer: { '@type': 'Answer', text: "Non. InvoiceAgent est un outil d'aide à la décision qui identifie les clauses à risque et vous informe de vos droits. Pour les contrats à enjeux importants (>10 000€, exclusivité, cession de droits majeure), consultez un avocat. InvoiceAgent vous permet d'arriver informé et de cibler les points à négocier." } },
  ],
};
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Vérifier Contrat Avant Signature', item: PAGE_URL }] };

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
            {[['Fonctionnalités', '#features'], ['Demo', '#demo'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-400/20 to-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 border-0 text-sm font-medium">
                <Eye className="w-4 h-4 mr-2" />Vérification de contrat par IA avant signature
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Vérifier contrat</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">avant signature</span>
              <br />
              <span className="text-slate-900">en 30 secondes</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              <strong>62% des litiges contractuels B2B</strong> auraient pu être évités si les clauses problématiques avaient été identifiées avant la signature. InvoiceAgent analyse votre contrat PDF en moins de 30 secondes et vous présente un rapport clair des risques.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[{ value: '< 30s', label: 'Analyse complète', sub: 'par contrat PDF' }, { value: '6', label: 'Points essentiels', sub: 'vérifiés auto' }, { value: '62%', label: 'Litiges évitables', sub: 'si vérification préalable' }].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-violet-700">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-lg px-8 h-14" asChild>
                <a href="#demo">Vérifier mon contrat <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Analyse PDF en 30 secondes', '6 points essentiels vérifiés', 'Rapport structuré par risque'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"><FileSearch className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Contrat de prestation — 12 pages</p><p className="text-sm text-slate-500">Analysé en 27 secondes</p></div>
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-0">4 points à vérifier</Badge>
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { point: '✅ Conditions de paiement', detail: '30 jours — conforme loi LME', level: 'Conforme', color: 'emerald' },
                  { point: '🔴 Pénalités de retard', detail: '5% par semaine — illégal (max taux BCE +10pts)', level: 'Risque élevé', color: 'red' },
                  { point: '🔴 Résiliation', detail: 'Résiliation sans préavis possible par le client', level: 'Risque élevé', color: 'red' },
                  { point: '🟡 Cession de droits', detail: "Cession totale sans limitation de durée", level: 'À négocier', color: 'amber' },
                  { point: '🟡 Révision tarifaire', detail: 'Indexée sur indice non plafonné', level: 'À négocier', color: 'amber' },
                  { point: '✅ Responsabilité', detail: 'Plafond à 12 mois de prestations — acceptable', level: 'Conforme', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'red' ? 'bg-red-50 border border-red-100' : item.color === 'amber' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50'}`}>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-slate-500'}`}>{item.detail}</p>
                    </div>
                    <span className={`text-xs font-bold flex-shrink-0 ml-2 ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>{item.level}</span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-xs font-semibold text-violet-700">💡 Recommandation IA</p>
                <p className="text-xs text-violet-600 mt-1">Renégociez les clauses de pénalités et de résiliation avant signature. Demandez une cession de droits limitée à 5 ans et à la France.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"><Clock className="w-5 h-5 text-violet-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">Analysé en 27s</p><p className="text-xs text-violet-600 font-semibold">Avant signature</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Eye className="w-5 h-5 text-violet-500" /><span className="text-sm font-medium text-slate-900">12 pages</span><span className="text-xs text-slate-500">analysées</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ChecklistSection() {
  const points = [
    { number: '01', title: 'Conditions de paiement et délais', description: "Vérifiez que les délais de paiement ne dépassent pas 60 jours (loi LME). Tout délai supérieur est illégal. InvoiceAgent extrait et compare automatiquement les délais contractuels avec la loi.", icon: Clock, color: 'from-amber-400 to-orange-500' },
    { number: '02', title: 'Clauses de pénalités de retard', description: "Les pénalités de retard ne peuvent pas dépasser le taux BCE + 10 points. Une clause prévoyant 5% par semaine est illégale et peut être annulée par un tribunal. L'IA calcule et compare chaque taux.", icon: AlertTriangle, color: 'from-red-400 to-rose-500' },
    { number: '03', title: 'Conditions de résiliation et préavis', description: "Un préavis raisonnable doit être prévu pour les deux parties. Une clause permettant au client de résilier sans préavis ni indemnité crée un déséquilibre majeur que l'IA détecte automatiquement.", icon: XCircle, color: 'from-violet-400 to-purple-500' },
    { number: '04', title: 'Cession de droits et propriété intellectuelle', description: "Une cession totale de droits sans limite de durée, de territoire et sans rémunération additionnelle est abusive pour les créatifs et développeurs. InvoiceAgent identifie ces clauses et recommande des contreparties.", icon: FileText, color: 'from-pink-400 to-rose-500' },
    { number: '05', title: 'Limitations de responsabilité', description: "Une limitation à 1€ symbolique ou à 1 mois de prestation est souvent abusive. L'IA évalue si la limitation est proportionnelle aux risques réels et vous signale les clauses déséquilibrées.", icon: Shield, color: 'from-emerald-400 to-teal-500' },
    { number: '06', title: 'Révisions tarifaires automatiques', description: "Certains contrats prévoient des révisions tarifaires indexées sur des indices non plafonnés. InvoiceAgent détecte ces clauses et calcule l'impact financier potentiel sur la durée du contrat.", icon: Search, color: 'from-cyan-400 to-blue-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">6 points essentiels</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ce qu'il faut vérifier
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> avant de signer</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">InvoiceAgent vérifie automatiquement ces 6 points dans chaque contrat que vous uploadez — en moins de 30 secondes.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {points.map((point, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <point.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-slate-100">{point.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{point.description}</p>
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
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['2 analyses contrat gratuites', '6 points essentiels vérifiés', 'Rapport risques structuré', 'Export PDF rapport'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour indépendants et PME', features: ['5 analyses contrat/mois', '25+ types de clauses', 'Rapport détaillé par risque', 'Recommandations IA', 'Comparaison avec la loi', 'Historique analyses'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Analyses illimitées', features: ['Analyses illimitées', 'Tout Pro inclus', 'Multi-utilisateurs', 'Export Word + PDF', 'Résumé exécutif', 'Accompagnement personnalisé'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Commencez avec 2 analyses gratuites — sans carte bancaire. Un litige évité vaut souvent 100x le prix de l'abonnement.</p>
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

function Demo() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Demo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Vérifiez votre contrat maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez un contrat PDF — l'IA analyse les 6 points essentiels et vous présente un rapport structuré en moins de 30 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 30s', label: 'Analyse complète', icon: Clock }, { value: '6', label: 'Points vérifiés', icon: CheckCircle2 }, { value: '€0', label: 'Pour commencer', icon: Zap }].map((stat) => (
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
    { q: "Comment vérifier un contrat avant de le signer ?", a: "Uploadez votre contrat en PDF dans InvoiceAgent. L'IA analyse les 6 points essentiels en moins de 30 secondes — conditions de paiement, pénalités, résiliation, cession de droits, responsabilité et révisions tarifaires. Vous recevez un rapport structuré avec les risques classés par niveau et des recommandations concrètes pour négocier." },
    { q: "Quels points vérifier dans un contrat avant signature ?", a: "Les 6 points essentiels à vérifier : 1) Délais de paiement — max 60 jours légalement, 2) Pénalités de retard — max taux BCE + 10 points, 3) Conditions de résiliation — préavis raisonnable obligatoire, 4) Cession de droits — durée, territoire et rémunération, 5) Limitation de responsabilité — proportionnelle aux risques réels, 6) Révisions tarifaires — indexation plafonnée." },
    { q: "InvoiceAgent peut-il analyser n'importe quel type de contrat ?", a: "Oui. InvoiceAgent analyse les contrats de prestation de services, les marchés de travaux BTP, les contrats de sous-traitance, les lettres de mission comptables, les contrats de fourniture, les conventions de partenariat et les contrats de cession de droits — en moins de 30 secondes." },
    { q: "Vérifier un contrat avec l'IA remplace-t-il un avocat ?", a: "Non. InvoiceAgent est un outil d'aide à la décision qui identifie les clauses à risque et vous informe de vos droits légaux. Pour les contrats à enjeux importants (>10 000€, exclusivité longue durée, cession de droits majeure), consultez un avocat spécialisé. InvoiceAgent vous permet d'arriver informé et de cibler précisément les points à négocier — ce qui réduit le temps et le coût de la consultation juridique." },
    { q: "Que faire si InvoiceAgent détecte une clause problématique ?", a: "InvoiceAgent vous présente la clause problématique avec une explication claire et une recommandation de négociation. La plupart des clauses identifiées peuvent être renégociées avant signature — demandez la suppression ou la modification de la clause, en vous appuyant sur le rapport structuré généré par InvoiceAgent." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">fréquentes</span></h2>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ne signez plus un contrat sans l'analyser</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Vérifiez votre prochain contrat en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Vérifier mon contrat <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la démo</a></Button>
          </div>
          <p className="mt-6 text-violet-200 text-sm">Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Détection clauses abusives', href: `${BASE_URL}/detection-clauses-abusives` },
    { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Analyse contrat IA', href: `${BASE_URL}/analyse-contrat-ia` },
    { label: 'Facturation Freelance', href: `${BASE_URL}/facturation-freelance` },
    { label: 'Facturation Auto-Entrepreneur', href: `${BASE_URL}/facturation-auto-entrepreneur` },
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

export default function VerifierContratAvantSignature() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <ChecklistSection />
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