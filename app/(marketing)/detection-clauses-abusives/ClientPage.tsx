"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, XCircle, Eye, Search, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/detection-clauses-abusives`;

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>{children}</motion.div>;
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL };
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Détection Clauses Abusives', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '78' } };
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Qu'est-ce qu'une clause abusive dans un contrat professionnel ?", acceptedAnswer: { '@type': 'Answer', text: "Une clause abusive est une clause contractuelle qui crée un déséquilibre significatif entre les droits et obligations des parties. En B2B, les clauses abusives les plus courantes sont : les pénalités de retard disproportionnées, les cessions de droits totales non rémunérées, les clauses de résiliation unilatérale sans préavis et les limitations de responsabilité excessives." } },
    { '@type': 'Question', name: "Comment détecter les clauses abusives dans un contrat ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent analyse automatiquement vos contrats par IA. En moins de 30 secondes, l'IA identifie les clauses de responsabilité déséquilibrées, les pénalités cachées, les conditions de résiliation abusives et les frais non prévus — avec un résumé clair des points à renégocier." } },
    { '@type': 'Question', name: "Quelles clauses abusives sont les plus fréquentes en B2B ?", acceptedAnswer: { '@type': 'Answer', text: "Les 5 clauses abusives les plus fréquentes en B2B : 1) Pénalités de retard supérieures au taux légal, 2) Cession de droits intellectuels sans contrepartie, 3) Résiliation sans préavis ni indemnité, 4) Limitation de responsabilité à 1€ symbolique, 5) Révision tarifaire unilatérale sans plafond." } },
    { '@type': 'Question', name: "InvoiceAgent peut-il analyser des contrats en PDF ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Uploadez votre contrat en PDF directement dans InvoiceAgent. L'IA extrait le texte, analyse les clauses et vous présente un rapport structuré avec les points d'attention classés par niveau de risque — en moins de 30 secondes." } },
  ],
};
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Détection Clauses Abusives', item: PAGE_URL }] };

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
              <Badge className="mb-6 px-4 py-2 bg-red-100 text-red-700 border-0 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 mr-2" />Détection automatique de clauses abusives par IA
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Détection clauses</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">abusives</span>
              <br />
              <span className="text-slate-900">dans vos contrats</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Uploadez votre contrat en PDF. L'IA InvoiceAgent analyse chaque clause en moins de 30 secondes et identifie les <strong>déséquilibres contractuels, pénalités cachées et conditions abusives</strong> — avant que vous signiez.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[{ value: '< 30s', label: 'Analyse complète', sub: 'par contrat PDF' }, { value: '5', label: 'Types de clauses', sub: 'détectées auto' }, { value: '€0', label: 'Pour tester', sub: 'sans inscription' }].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-violet-700">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-lg px-8 h-14" asChild>
                <a href="#demo">Analyser mon contrat <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Analyse PDF en 30 secondes', 'Clauses risque identifiées', 'Rapport structuré par niveau'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"><FileSearch className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Analyse contrat IA</p><p className="text-sm text-slate-500">Rapport en 30 secondes</p></div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">3 risques</Badge>
              </div>
              <div className="space-y-3 mb-4">
                {[
                  { type: 'Pénalité de retard', detail: '5% par jour — supérieure au taux légal (3x)', level: 'Risque élevé', color: 'red' },
                  { type: 'Résiliation unilatérale', detail: 'Client peut résilier sans préavis ni indemnité', level: 'Risque élevé', color: 'red' },
                  { type: 'Cession de droits', detail: 'Cession totale sans mention de durée ni territoire', level: 'Risque moyen', color: 'amber' },
                  { type: 'Conditions de paiement', detail: '90 jours — dépasse le délai légal de 60 jours', level: 'À vérifier', color: 'amber' },
                  { type: 'Garantie décennale', detail: 'Non mentionnée — obligatoire pour travaux BTP', level: 'Conforme', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${item.color === 'red' ? 'bg-red-100' : item.color === 'amber' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                      {item.color === 'red' ? <XCircle className="w-4 h-4 text-red-500" /> : item.color === 'amber' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm">{item.type}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    </div>
                    <span className={`text-xs font-semibold flex-shrink-0 ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>{item.level}</span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-xs font-semibold text-violet-700">💡 Recommandation IA</p>
                <p className="text-xs text-violet-600 mt-1">Renégociez les clauses de pénalité et de résiliation avant signature. Le contrat présente 2 clauses potentiellement abusives au sens de l'article L442-1 du Code de commerce.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><XCircle className="w-5 h-5 text-red-500" /></div>
                <div><p className="text-sm font-medium text-slate-900">2 clauses abusives</p><p className="text-xs text-red-500 font-semibold">Détectées en 28s</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Eye className="w-5 h-5 text-violet-500" /><span className="text-sm font-medium text-slate-900">Art. L442-1</span><span className="text-xs text-slate-500">vérifié</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ClausesExplained() {
  const clauses = [
    { icon: AlertTriangle, title: 'Pénalités de retard excessives', description: "Au-delà du taux légal (taux BCE + 10 points pour les pros), les pénalités de retard sont abusives. Un contrat prévoyant 5% par jour de retard — soit 1,825% par an — est clairement déséquilibré. InvoiceAgent détecte ces montants et les compare au taux légal en vigueur.", color: 'from-red-400 to-rose-500', risk: 'Risque élevé' },
    { icon: XCircle, title: 'Résiliation unilatérale sans préavis', description: "Une clause permettant au client de résilier le contrat sans préavis ni indemnité crée un déséquilibre majeur. La loi prévoit un préavis raisonnable selon la durée de la relation commerciale. InvoiceAgent identifie ces clauses et vous signale le manque à gagner potentiel.", color: 'from-orange-400 to-red-500', risk: 'Risque élevé' },
    { icon: FileText, title: 'Cession de droits totale sans contrepartie', description: "Une cession de droits d'auteur ou de propriété intellectuelle sans limitation de durée, de territoire et sans rémunération supplémentaire est abusive pour les créatifs, photographes et développeurs. L'IA détecte ces clauses et vous recommande des contreparties à négocier.", color: 'from-amber-400 to-orange-500', risk: 'Risque moyen' },
    { icon: Search, title: 'Délais de paiement dépassant 60 jours', description: "La loi LME (2008) et la directive européenne fixent à 60 jours le délai maximum de paiement entre professionnels. Un contrat prévoyant 90 ou 120 jours est illégal. InvoiceAgent détecte ces délais et vous informe de vos droits.", color: 'from-violet-400 to-purple-500', risk: 'Illégal' },
    { icon: Shield, title: 'Limitation de responsabilité à 1€ symbolique', description: "Certains contrats limitent la responsabilité du prestataire à 1€ ou au montant d'un mois de prestation. Ces clauses sont souvent abusives au sens de l'article L442-1 du Code de commerce. L'IA les détecte et évalue l'exposition réelle.", color: 'from-pink-400 to-rose-500', risk: 'À négocier' },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-red-100 text-red-700 border-0">Clauses détectées automatiquement</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Les 5 clauses abusives
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> les plus fréquentes en B2B</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">InvoiceAgent détecte automatiquement ces 5 types de clauses dans vos contrats PDF — et vous explique les risques en termes simples.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {clauses.map((clause, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${clause.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <clause.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${clause.risk === 'Risque élevé' || clause.risk === 'Illégal' ? 'bg-red-100 text-red-700' : clause.risk === 'Risque moyen' ? 'bg-amber-100 text-amber-700' : 'bg-violet-100 text-violet-700'}`}>{clause.risk}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{clause.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{clause.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <motion.div variants={scaleIn}>
            <Card className="h-full bg-gradient-to-br from-violet-600 to-indigo-600 border-0">
              <CardContent className="p-6 lg:p-8 flex flex-col justify-center items-center text-center h-full">
                <Sparkles className="w-12 h-12 text-white/80 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">+ 20 autres clauses analysées</h3>
                <p className="text-violet-200 text-sm mb-6">Révision tarifaire unilatérale, garanties manquantes, conditions de force majeure, clauses de non-concurrence abusives...</p>
                <Button className="bg-white text-violet-600 hover:bg-violet-50" asChild>
                  <a href="#demo">Tester maintenant</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['2 analyses contrat gratuites', 'Détection clauses principales', 'Résumé des risques', 'Export PDF rapport'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME et indépendants', features: ['5 analyses contrat/mois', 'Détection 25+ types de clauses', 'Rapport détaillé par risque', 'Recommandations IA', 'Comparaison avec la loi', 'Historique analyses'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Analyses illimitées', features: ['Analyses contrats illimitées', 'Tout Pro inclus', 'Multi-utilisateurs', 'Résumé exécutif', 'Export Word + PDF', 'Accompagnement personnalisé'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Commencez avec 2 analyses gratuites — sans carte bancaire.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Analysez votre contrat maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez un contrat PDF — l'IA détecte les clauses abusives, pénalités cachées et déséquilibres en moins de 30 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 30s', label: 'Analyse complète', icon: Zap }, { value: '25+', label: 'Types de clauses', icon: Search }, { value: '€0', label: 'Pour commencer', icon: CheckCircle2 }].map((stat) => (
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
    { q: "Qu'est-ce qu'une clause abusive dans un contrat professionnel ?", a: "Une clause abusive est une clause qui crée un déséquilibre significatif entre les droits et obligations des parties. En B2B, l'article L442-1 du Code de commerce sanctionne ces clauses. Les plus courantes : pénalités de retard excessives, résiliation sans préavis, cession de droits totale, délais de paiement dépassant 60 jours." },
    { q: "Comment détecter les clauses abusives dans un contrat ?", a: "InvoiceAgent analyse automatiquement votre contrat PDF par IA. En moins de 30 secondes, l'IA identifie les clauses déséquilibrées, les compare à la loi française en vigueur et vous présente un rapport structuré par niveau de risque — avec des recommandations concrètes pour renégocier." },
    { q: "Quelles clauses abusives sont les plus fréquentes en B2B ?", a: "Les 5 clauses abusives les plus fréquentes : 1) Pénalités de retard supérieures au taux légal (taux BCE + 10 points), 2) Résiliation sans préavis ni indemnité, 3) Cession de droits totale sans rémunération, 4) Délais de paiement dépassant 60 jours (illégal depuis la loi LME), 5) Limitation de responsabilité à 1€ symbolique." },
    { q: "InvoiceAgent peut-il analyser des contrats en PDF ?", a: "Oui. Uploadez votre contrat directement en PDF dans InvoiceAgent. L'IA extrait le texte, analyse chaque clause et vous présente un rapport avec les points d'attention classés par niveau de risque — en moins de 30 secondes." },
    { q: "InvoiceAgent remplace-t-il un avocat pour la vérification de contrats ?", a: "Non. InvoiceAgent est un outil d'aide à la décision — il identifie les clauses à risque et vous informe de vos droits. Pour les contrats à enjeux importants (>10 000€, exclusivité longue durée, cession de droits majeure), consultez un avocat spécialisé. InvoiceAgent vous permet d'arriver informé chez votre avocat." },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ne signez plus sans analyser vos contrats</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Détectez les clauses abusives avant qu'il soit trop tard.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Analyser mon contrat <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
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
    { label: 'Analyse contrat IA', href: `${BASE_URL}/analyse-contrat-ia` },
    { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Vérifier contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
    { label: 'Facturation Freelance', href: `${BASE_URL}/facturation-freelance` },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
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

export default function DetectionClausesAbusives() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <ClausesExplained />
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