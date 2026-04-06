"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, XCircle, Copy, Search, FileSearch, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/detection-doublons-factures`;

const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>{children}</motion.div>;
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL };
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Détection Doublons Factures', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '58' } };
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment détecter les doublons de facturation automatiquement ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent compare automatiquement chaque nouvelle facture avec l'historique complet par fournisseur. Si le même numéro de facture, montant ou référence apparaît deux fois, l'IA vous alerte immédiatement — avant que vous ne payiez deux fois." } },
    { '@type': 'Question', name: "Qu'est-ce qu'un doublon de facture ?", acceptedAnswer: { '@type': 'Answer', text: "Un doublon de facture est une facture émise deux fois pour la même prestation ou livraison. Il peut être intentionnel (fraude fournisseur) ou accidentel (erreur système). InvoiceAgent détecte les trois types : même numéro, même montant, même référence produit sur la même période." } },
    { '@type': 'Question', name: "Combien coûtent les doublons de facturation pour une PME ?", acceptedAnswer: { '@type': 'Answer', text: "Une PME qui reçoit 200 factures par mois et paie en moyenne 2% de doublons perd entre 500€ et 2000€ par an. InvoiceAgent détecte 100% des doublons automatiquement dès l'import de la facture." } },
    { '@type': 'Question', name: "InvoiceAgent détecte-t-il aussi les quasi-doublons ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent détecte les doublons exacts (même numéro, même montant) mais aussi les quasi-doublons — même fournisseur, montant proche, date proche — qui indiquent souvent une double facturation avec une légère variation." } },
  ],
};
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Détection Doublons Factures', item: PAGE_URL }] };

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
                <Copy className="w-4 h-4 mr-2" />Détection automatique des doublons de facturation
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Détection doublons</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">de facturation</span>
              <br />
              <span className="text-slate-900">automatique par IA</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Une PME qui reçoit 200 factures par mois perd en moyenne <strong>500€ à 2 000€ par an</strong> en doublons de facturation non détectés. InvoiceAgent compare chaque facture en temps réel avec votre historique complet — et vous alerte avant le paiement.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[{ value: '100%', label: 'Doublons détectés', sub: 'avant paiement' }, { value: '< 5s', label: 'Par facture', sub: 'comparaison auto' }, { value: '2 000€', label: 'Économies/an', sub: 'PME moyenne' }].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-violet-700">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-lg px-8 h-14" asChild>
                <a href="#demo">Détecter mes doublons <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Doublons exacts détectés', 'Quasi-doublons identifiés', 'Alerte avant paiement'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center"><Copy className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Détection doublons</p><p className="text-sm text-slate-500">3 doublons trouvés ce mois</p></div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">€1,240 à risque</Badge>
              </div>
              <div className="space-y-3 mb-4">
                {[
                  { facture: 'Fact. #2024-0892 — Point P', montant: '€480.00', date1: '12/03', date2: '14/03', type: 'Doublon exact', color: 'red' },
                  { facture: 'Fact. #2024-0721 — Rexel', montant: '€360.00', date1: '08/03', date2: '09/03', type: 'Même numéro', color: 'red' },
                  { facture: 'Fact. — Sonepar (sans n°)', montant: '€400.00', date1: '15/03', date2: '16/03', type: 'Quasi-doublon', color: 'amber' },
                  { facture: 'Fact. #2024-1102 — Cedeo', montant: '€890.00', date1: '20/03', date2: '—', type: 'Conforme', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className={`p-3 rounded-xl border ${item.color === 'red' ? 'bg-red-50 border-red-100' : item.color === 'amber' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {item.color === 'red' ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> : item.color === 'amber' ? <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                        <p className="text-xs font-semibold text-slate-900">{item.facture}</p>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{item.montant}</p>
                    </div>
                    <div className="flex items-center justify-between ml-6">
                      <p className={`text-xs font-medium ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>{item.type}</p>
                      {item.date2 !== '—' && <p className="text-xs text-slate-400">{item.date1} + {item.date2}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <p className="text-xs font-semibold text-red-700">🚨 Action requise : <span className="text-red-800">€1,240 de doublons détectés</span></p>
                <p className="text-xs text-red-600 mt-1">Ne payez pas ces factures avant vérification — contactez vos fournisseurs pour obtenir un avoir.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><Copy className="w-5 h-5 text-red-500" /></div>
                <div><p className="text-sm font-medium text-slate-900">3 doublons bloqués</p><p className="text-xs text-red-500 font-semibold">€1,240 sauvegardés</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">Avant paiement</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Copy, title: 'Détection doublons exacts', description: "InvoiceAgent compare chaque nouvelle facture avec l'historique complet par fournisseur. Même numéro de facture, même montant exact, même référence produit — détecté en moins de 5 secondes avant tout paiement.", color: 'from-red-400 to-rose-500' },
    { icon: Search, title: 'Détection quasi-doublons', description: "Les quasi-doublons sont plus difficiles à repérer : même fournisseur, montant légèrement différent, date proche. InvoiceAgent détecte ces variations suspectes qui passent souvent inaperçues dans les comptabilités manuelles.", color: 'from-amber-400 to-orange-500' },
    { icon: AlertTriangle, title: 'Alerte avant paiement', description: "Dès qu'un doublon est détecté, vous recevez une alerte immédiate avec le détail exact — quelle facture est en double, quel montant est concerné et quelle action prendre avant de payer.", color: 'from-violet-400 to-purple-500' },
    { icon: FileText, title: 'Rapport de doublon généré', description: "InvoiceAgent génère un rapport structuré du doublon détecté avec les deux factures côte à côte. Envoyez-le directement à votre fournisseur pour demander l'annulation de la facture en double.", color: 'from-pink-400 to-rose-500' },
    { icon: Shield, title: 'Historique complet par fournisseur', description: "Toutes vos factures sont indexées par fournisseur. InvoiceAgent remonte jusqu'à 24 mois d'historique pour détecter les factures réémises après une longue période — une technique courante de double facturation.", color: 'from-emerald-400 to-teal-500' },
    { icon: TrendingDown, title: 'Réconciliation bancaire', description: "En croisant vos factures avec votre relevé bancaire CSV, InvoiceAgent détecte aussi les paiements effectués deux fois pour le même fournisseur — même quand les numéros de facture diffèrent.", color: 'from-cyan-400 to-blue-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-red-100 text-red-700 border-0">Fonctionnalités</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Détectez chaque doublon
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> avant de payer</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">InvoiceAgent analyse automatiquement chaque facture reçue et la compare à l'historique complet — doublons exacts, quasi-doublons et paiements déjà effectués.</p>
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
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['5 factures/mois', 'Détection doublons exacts', 'Alerte avant paiement', 'Export PDF rapport'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Starter', price: '19', description: 'Pour PME actives', features: ['100 factures / mois', 'Doublons exacts + quasi-doublons', 'Historique 24 mois', 'Alerte temps réel', 'Réconciliation bancaire CSV', 'Rapport doublon généré'], cta: 'Choisir Starter', popular: true, href: `${BASE_URL}/checkout?plan=starter` },
    { name: 'Pro', price: '29', description: 'Factures illimitées', features: ['Factures illimitées', 'Tout Starter inclus', 'Export FEC conforme DGFiP', 'Détection doublons contrats', 'Rapport de contestation', 'Historique illimité'], cta: 'Choisir Pro', popular: false, href: `${BASE_URL}/checkout?plan=pro` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Le premier doublon détecté rembourse souvent plusieurs mois d'abonnement.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Testez avec vos factures fournisseurs</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Importez une facture PDF — l'IA vérifie immédiatement si un doublon existe dans votre historique et vous alerte avant paiement.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '100%', label: 'Doublons détectés', icon: Copy }, { value: '< 5s', label: 'Par facture', icon: Zap }, { value: '€0', label: 'Pour commencer', icon: CheckCircle2 }].map((stat) => (
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
    { q: "Comment détecter les doublons de facturation automatiquement ?", a: "InvoiceAgent compare automatiquement chaque nouvelle facture avec l'historique complet par fournisseur. Si le même numéro de facture, montant ou référence produit apparaît deux fois sur la même période, l'IA vous alerte immédiatement avec un rapport détaillé — avant que vous ne payiez deux fois." },
    { q: "Qu'est-ce qu'un doublon de facture ?", a: "Un doublon de facture est une facture émise deux fois pour la même prestation ou livraison. Il peut être intentionnel (erreur ou fraude fournisseur) ou accidentel (bug système ERP). InvoiceAgent détecte trois types : doublons exacts (même numéro, même montant), quasi-doublons (montant proche, même fournisseur, date proche) et paiements déjà effectués." },
    { q: "Combien coûtent les doublons de facturation pour une PME ?", a: "Une PME qui reçoit 200 factures par mois et paie 2% de doublons perd entre 500€ et 2000€ par an. Le Starter InvoiceAgent à 19€/mois se rembourse dès le premier doublon détecté évité." },
    { q: "InvoiceAgent détecte-t-il aussi les quasi-doublons ?", a: "Oui. InvoiceAgent détecte les doublons exacts mais aussi les quasi-doublons — même fournisseur, montant légèrement différent (±5%), date proche (±3 jours). Ces quasi-doublons sont souvent des doubles facturations avec une légère variation pour passer inaperçus." },
    { q: "Que faire quand un doublon est détecté ?", a: "InvoiceAgent génère automatiquement un rapport de doublon avec les deux factures côte à côte. Envoyez ce rapport à votre fournisseur pour demander l'annulation de la facture en double et l'émission d'un avoir. La plupart des fournisseurs corrigent rapidement quand la contestation est documentée et précise." },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ne payez plus deux fois la même facture</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">5 factures gratuites — sans carte bancaire. Détectez vos doublons dès aujourd'hui.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Détecter mes doublons <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
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
    { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Détection clauses abusives', href: `${BASE_URL}/detection-clauses-abusives` },
    { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
    { label: 'Analyse contrat IA', href: `${BASE_URL}/analyse-contrat-ia` },
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

export default function DetectionDoublonsFactures() {
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