"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, Clock, CheckCircle2, ArrowRight, ChevronDown, Sparkles, Building2, Calculator, FileSearch, Camera, Image, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/facturation-photographe`;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

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
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Facturation Photographe',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '38' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Les photographes professionnels sont-ils soumis à la TVA ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. Les photographes professionnels sont soumis à la TVA à 20% sur leurs honoraires de prestation (mariage, corporate, portrait). Les droits d'auteur bénéficient d'un régime fiscal spécifique. InvoiceAgent gère automatiquement ces distinctions." }
    },
    {
      '@type': 'Question',
      name: "Comment gérer les factures de matériel photo d'un photographe indépendant ?",
      acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement les factures de vos fournisseurs photo — Digit-Photo, Amazon, Canon, Nikon, Sony. Boîtiers, objectifs, flashs, abonnements logiciels — chaque achat est extrait en moins de 5 secondes par OCR IA." }
    },
    {
      '@type': 'Question',
      name: "Pourquoi analyser ses contrats de prestation photo avant de signer ?",
      acceptedAnswer: { '@type': 'Answer', text: "Un contrat photo sans clause de cession des droits d'auteur claire peut vous priver de revenus futurs. Sans clause de livraison définie, le client peut exiger des retouches illimitées. InvoiceAgent détecte ces clauses manquantes avant signature." }
    },
    {
      '@type': 'Question',
      name: "Comment gérer les droits d'auteur dans sa comptabilité de photographe ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les droits d'auteur perçus par un photographe bénéficient d'un abattement forfaitaire de 34% pour frais. InvoiceAgent classe automatiquement vos factures selon leur nature — honoraires de prestation ou cession de droits — pour une comptabilité rigoureuse." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Facturation Photographe', item: PAGE_URL }
  ]
};

function Navigation() {
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100">
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
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex text-slate-600 hover:text-violet-600" asChild>
              <a href={`${BASE_URL}/auth/login`}>Connexion</a>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-600/25" asChild>
              <a href={`${BASE_URL}/auth/login`}>Essai gratuit</a>
            </Button>
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
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-400/15 to-violet-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 hover:bg-violet-200 border-0 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Pour photographes professionnels — factures matériel et contrats de prestation
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Facturation photographe</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">automatique</span>
              <br />
              <span className="text-slate-900">par IA</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              En tant que photographe indépendant, vous passez du temps à shooter — pas à gérer des factures. InvoiceAgent automatise vos factures fournisseurs matériel photo et analyse vos contrats de prestation pour que vous vous concentriez sur ce que vous aimez.
            </motion.p>
            <motion.div variants={fadeInUp} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm font-semibold text-amber-800 mb-1">⚠ Ce que beaucoup de photographes ignorent</p>
              <p className="text-sm text-amber-700">Un contrat de prestation photo sans clause de cession des droits d'auteur bien rédigée peut vous priver de <strong>revenus futurs importants</strong> — si le client utilise vos photos dans une campagne publicitaire sans vous payer de droits supplémentaires. InvoiceAgent analyse vos contrats avant que vous signiez.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl shadow-violet-600/30 text-lg px-8 h-14" asChild>
                <a href="#demo">Tester gratuitement <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {["Gratuit jusqu'à 5 factures/mois", 'Droits auteur gérés automatiquement', 'Contrats photo analysés par IA'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Photographe indépendant</p>
                    <p className="text-sm text-slate-500">Tableau de bord</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">Actif</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Honoraires ce mois</p>
                  <p className="text-2xl font-bold text-slate-900">€8,400</p>
                  <p className="text-xs text-emerald-600 mt-1">TVA 20% calculée</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Achats matériel</p>
                  <p className="text-2xl font-bold text-slate-900">€2,840</p>
                  <p className="text-xs text-emerald-600 mt-1">Déductibles auto</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { client: 'Mariage Dupont — Reportage complet', amount: '€3,200', status: 'Payée' },
                  { client: 'Canon France — Objectif 85mm f/1.4', amount: '€1,299', status: 'Payée' },
                  { client: 'Shoot corporate Entreprise Martin', amount: '€1,800', status: 'En attente' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <Image className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{item.client}</p>
                        <p className="text-xs text-slate-500">Prestation / Matériel</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 text-sm">{item.amount}</p>
                      <span className={`text-xs font-medium ${item.status === 'Payée' ? 'text-emerald-600' : 'text-amber-600'}`}>{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Contrat analysé</p>
                  <p className="text-xs text-amber-600 font-semibold">Droits auteur — clause manquante</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-medium text-slate-900">TVA 20%</span>
                <span className="text-xs text-slate-500">honoraires</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Zap,
      title: 'OCR factures matériel photo',
      description: "Scannez vos factures Digit-Photo, Amazon, Canon, Nikon, Sony, Adobe. Boîtiers, objectifs, abonnements Lightroom, stockage cloud — chaque achat extrait en moins de 5 secondes et classé automatiquement comme dépense déductible.",
      color: 'from-amber-400 to-orange-500'
    },
    {
      icon: Camera,
      title: 'Droits d\'auteur et honoraires séparés',
      description: "InvoiceAgent distingue automatiquement vos honoraires de prestation (TVA 20%) de vos droits d'auteur (régime BNC spécifique avec abattement 34%). Deux catégories comptables bien séparées pour une déclaration sans erreur.",
      color: 'from-violet-400 to-purple-500'
    },
    {
      icon: FileText,
      title: 'Analyse contrats photo et cession droits',
      description: "Uploadez votre contrat de prestation ou convention de cession de droits avant de signer. L'IA détecte les clauses de cession manquantes, les utilisations non prévues, les délais de livraison flous et les conditions de retouche abusives.",
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Conformité RGPD — données clients protégées',
      description: "Vos clients vous confient leurs moments les plus précieux. InvoiceAgent traite uniquement vos données comptables — jamais vos photos ou données personnelles de clients. Hébergement Frankfurt (UE), chiffrement AES-256.",
      color: 'from-emerald-400 to-teal-500'
    },
    {
      icon: Clock,
      title: 'Réconciliation bancaire CSV',
      description: "Importez votre relevé bancaire CSV. L'IA rapproche automatiquement les virements clients avec vos prestations facturées — mariages, shoots corporate, portraits, événements. Fini les heures passées à croiser les lignes.",
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Calculator,
      title: 'Export FEC conforme DGFiP',
      description: "Générez votre FEC en un clic. Compatible Sage, EBP, Cegid. En cas de contrôle fiscal, votre dossier est complet et structuré. Votre comptable gagne du temps — vous économisez sur ses honoraires.",
      color: 'from-cyan-400 to-blue-500'
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <Badge className="mb-4 px-4 py-2 bg-indigo-100 text-indigo-700 border-0">Fonctionnalités</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Factures matériel et contrats photo
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> gérés automatiquement</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            InvoiceAgent gère les deux aspects comptables spécifiques aux photographes professionnels — les achats matériel déductibles et les contrats de cession de droits.
          </p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 backdrop-blur-sm border-slate-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-600/10 transition-all duration-500">
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

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Importez vos factures matériel',
      description: "Scannez ou uploadez vos factures Canon, Digit-Photo, Adobe. L'IA les extrait en 5 secondes et les classe comme dépenses déductibles.",
      icon: FileText
    },
    {
      number: '02',
      title: "L'IA distingue honoraires et droits",
      description: "Honoraires de prestation TVA 20%, droits d'auteur BNC — InvoiceAgent sépare automatiquement les deux catégories pour votre comptabilité.",
      icon: Zap
    },
    {
      number: '03',
      title: 'Analysez vos contrats avant signature',
      description: "Uploadez votre contrat client. L'IA vérifie la clause de cession de droits, les conditions de livraison et les éventuelles pénalités cachées.",
      icon: FileSearch
    },
    {
      number: '04',
      title: 'Exportez pour votre comptable',
      description: "FEC conforme DGFiP ou CSV. Votre comptable reçoit un fichier propre et structuré — sans ressaisie manuelle.",
      icon: Calculator
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">Comment ça marche</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Opérationnel en <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">4 étapes</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">Moins de 5 secondes par facture. Moins de 30 secondes pour analyser un contrat de prestation photo.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index}>
              <div className="relative text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-600/30 group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center" style={{ left: '58%' }}>
                    <span className="text-sm font-bold text-violet-600">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
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
      description: 'Pour commencer sans risque',
      features: ['5 factures fournisseurs/mois', 'Scan matériel photo (OCR)', 'Suivi honoraires payés / impayés', 'Tableau de bord simple', 'Export PDF'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Starter',
      price: '19',
      description: 'Pour photographes indépendants',
      features: ['100 factures / mois', 'TVA 20% et droits auteur séparés', 'Réconciliation bancaire CSV', 'Alertes honoraires impayés', 'Export CSV + PDF', 'Tableau de bord complet'],
      cta: 'Choisir Starter',
      popular: true,
      href: `${BASE_URL}/checkout?plan=starter`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Factures + contrats photo',
      features: ['Factures illimitées', 'IA correspondances bancaires', 'Export FEC conforme DGFiP', 'Analyse contrats photo (5/mois)', 'Détection clauses droits auteur', 'Conditions livraison vérifiées'],
      cta: 'Choisir Pro',
      popular: false,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Studios photo et agences',
      features: ['Tout Pro inclus', 'Multi-photographes', 'Analyse contrats illimitée', 'Résumé intelligent', 'Historique sécurisé RGPD', 'Accompagnement personnalisé'],
      cta: 'Choisir Business',
      popular: false,
      href: `${BASE_URL}/checkout?plan=business`
    },
  ];

  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Sans engagement. Sans frais cachés. Annulez à tout moment.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className={`relative h-full ${plan.popular ? 'border-2 border-violet-500 shadow-xl shadow-violet-600/20' : 'border-slate-200'} bg-white`}>
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
                        <span className="text-slate-600 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full text-sm ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-600/30' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`} asChild>
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border">
            <Sparkles className="w-4 h-4 mr-2" />
            Demo gratuite — sans inscription
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Testez avec une vraie facture Canon ou un contrat de prestation photo
          </h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">
            Importez une facture matériel photo ou un contrat client — l'IA extrait les données et analyse les clauses en quelques secondes.
          </p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[
            { value: '20%', label: 'TVA honoraires auto', icon: Calculator },
            { value: '< 5s', label: 'Par facture traitée', icon: Zap },
            { value: '€0', label: 'Pour commencer', icon: CheckCircle2 },
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
      q: "Les photographes professionnels sont-ils soumis à la TVA ?",
      a: "Oui. Les photographes professionnels sont soumis à la TVA au taux normal de 20% sur leurs honoraires de prestation — mariages, shoots corporate, portraits, événements. Les droits d'auteur bénéficient d'un régime fiscal spécifique relevant des BNC avec un abattement forfaitaire de 34% pour frais. InvoiceAgent gère automatiquement ces distinctions et sépare les deux catégories dans votre comptabilité."
    },
    {
      q: "Comment gérer les factures de matériel photo d'un photographe indépendant ?",
      a: "InvoiceAgent extrait automatiquement les factures de vos fournisseurs photo — Digit-Photo, Amazon, Canon, Nikon, Sony, Adobe Creative Cloud, Lightroom. Chaque achat est traité en moins de 5 secondes par OCR IA et classé automatiquement comme dépense professionnelle déductible. Vous pouvez photographier la facture avec votre smartphone."
    },
    {
      q: "Pourquoi analyser ses contrats de prestation photo avant de signer ?",
      a: "Un contrat photo sans clause de cession des droits d'auteur bien rédigée peut vous priver de revenus futurs importants — si le client utilise vos photos dans une campagne publicitaire sans vous payer de droits supplémentaires. Sans clause de livraison précise, le client peut exiger des retouches illimitées. InvoiceAgent détecte ces clauses manquantes et les conditions abusives avant que vous signiez."
    },
    {
      q: "Comment gérer les droits d'auteur dans sa comptabilité de photographe ?",
      a: "Les droits d'auteur perçus par un photographe bénéficient d'un abattement forfaitaire de 34% pour frais dans le cadre du régime BNC. InvoiceAgent classe automatiquement vos factures selon leur nature — honoraires de prestation soumis à TVA 20% ou cession de droits — pour une comptabilité rigoureuse et une déclaration sans erreur."
    },
    {
      q: "InvoiceAgent fonctionne-t-il pour les studios photo multi-photographes ?",
      a: "Oui. Le plan Business à 49€/mois permet de gérer plusieurs photographes depuis un seul dashboard avec des FEC séparés par entité. Idéal pour les studios photo qui emploient des photographes salariés ou travaillent avec des freelances en sous-traitance."
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
            Questions <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">fréquentes</span>
          </h2>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="space-y-4">
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
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Concentrez-vous sur vos photos, pas sur votre comptabilité
          </h2>
          <p className="text-lg sm:text-xl text-violet-100 mb-4 max-w-2xl mx-auto">
            5 factures gratuites — sans carte bancaire, sans installation. Opérationnel en 2 minutes.
          </p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline underline-offset-2">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild>
              <a href={`${BASE_URL}/auth/login`}>Commencer gratuitement <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild>
              <a href="#demo">Tester la démo</a>
            </Button>
          </div>
          <p className="mt-6 text-violet-200 text-sm">Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Facturation Freelance', href: `${BASE_URL}/facturation-freelance` },
    { label: 'Facturation Traducteur', href: `${BASE_URL}/facturation-traducteur` },
    { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
    { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
  ];

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Découvrez toutes les fonctionnalités InvoiceAgent</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-violet-700 font-medium hover:border-violet-300 hover:shadow-sm transition-all">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FacturationPhotographe() {
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
        <HowItWorks />
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