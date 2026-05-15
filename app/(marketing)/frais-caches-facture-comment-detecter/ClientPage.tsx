"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Eye, EyeOff, FileSearch, Clock, Search, Receipt, Scale, BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/frais-caches-facture-comment-detecter`;

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
  name: 'InvoiceAgent — Détection Frais Cachés Factures',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment détecter les frais cachés sur une facture fournisseur ?", acceptedAnswer: { '@type': 'Answer', text: "Comparez chaque ligne de la facture avec les conditions contractuelles. InvoiceAgent automatise cette vérification par IA en moins de 5 secondes : majorations non prévues, frais de gestion ajoutés, coûts d'expédition gonflés et suppléments non contractuels sont identifiés et chiffrés automatiquement." } },
    { '@type': 'Question', name: "Quels sont les frais cachés les plus courants dans les factures ?", acceptedAnswer: { '@type': 'Answer', text: "Les frais cachés les plus fréquents sont : frais de gestion administrative (3% à 8%), majorations saisonnières non prévues au contrat, frais d'expédition supérieurs au tarif convenu, suppléments pour quantité minimale, frais de traitement urgence et coûts d'emballage spécial non contractuels." } },
    { '@type': 'Question', name: "Combien coûtent les frais cachés aux PME françaises ?", acceptedAnswer: { '@type': 'Answer', text: "En moyenne, les frais cachés représentent 1,5% à 4% du montant total des achats fournisseurs d'une PME. Pour une entreprise avec 300 000€ d'achats annuels, cela représente 4 500€ à 12 000€ de coûts invisibles acceptés sans vérification." } },
    { '@type': 'Question', name: "InvoiceAgent compare-t-il les factures aux devis et contrats ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse chaque facture PDF et compare les montants ligne par ligne avec les conditions contractuelles connues. Toute majoration, tout écart de prix unitaire et tout frais supplémentaire non prévu au contrat est signalé avec le montant exact de la surfacturation." } },
    { '@type': 'Question', name: "Comment éviter de payer des frais cachés à l'avenir ?", acceptedAnswer: { '@type': 'Answer', text: "Trois actions concrètes : 1) Vérifiez systématiquement chaque facture avant paiement avec InvoiceAgent, 2) Négociez des contrats avec des tarifs tout compris sans possibilité de frais supplémentaires, 3) Identifiez vos fournisseurs récidivistes grâce au tableau de bord d'anomalies InvoiceAgent." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Frais cachés facture : comment détecter', item: PAGE_URL }
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-slate-50 to-violet-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-400/15 to-violet-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-400/10 to-orange-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-orange-100 text-orange-700 border-0 text-sm font-medium">
                <EyeOff className="w-4 h-4 mr-2" />Vos fournisseurs comptent sur votre inattention
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Frais cachés facture</span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">comment les détecter</span>
              <br />
              <span className="text-slate-900">automatiquement</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Frais de gestion ajoutés discrètement, majorations saisonnières non contractuelles, coûts d'expédition gonflés — <strong>les frais cachés représentent 1,5% à 4% de vos achats fournisseurs</strong>. InvoiceAgent les détecte en 5 secondes par facture.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '8 500€', label: 'Frais cachés moyens', sub: 'par an et par PME' },
                { value: '< 5s', label: 'Détection par facture', sub: 'analyse IA complète' },
                { value: '100%', label: 'Lignes vérifiées', sub: 'aucun frais invisible' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-orange-600">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-xl shadow-orange-600/30 text-lg px-8 h-14" asChild>
                <a href="#demo">Scanner mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Chaque ligne analysée', 'Comparaison au contrat', 'Montant exact signalé'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-orange-600/15 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"><Eye className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Facture #F-4521 — BTP Services</p><p className="text-sm text-slate-500">Analysée en 3 secondes</p></div>
                </div>
                <Badge className="bg-orange-100 text-orange-700 border-0">3 frais cachés</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Frais de gestion administrative', detail: '+5,8% non prévu au contrat cadre — 347€ ajoutés', montant: '347€', status: 'Caché', color: 'red' },
                  { point: 'Supplément livraison express', detail: 'Tarif 89€ facturé vs 45€ contractuel — écart 97%', montant: '44€', status: 'Gonflé', color: 'orange' },
                  { point: 'Frais emballage spécial', detail: 'Ligne ajoutée — non mentionné dans le devis #D-2187', montant: '125€', status: 'Non prévu', color: 'amber' },
                  { point: 'Matériaux — ciment Portland', detail: 'Prix unitaire 14,20€ conforme au tarif négocié', montant: '—', status: 'OK', color: 'emerald' },
                  { point: 'Main d\'œuvre pose', detail: 'Taux horaire 52€ conforme au contrat', montant: '—', status: 'OK', color: 'emerald' },
                  { point: 'TVA 20% sur total', detail: 'Calcul correct, numéro TVA valide', montant: '—', status: 'OK', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'red' ? 'bg-red-50 border border-red-100' : item.color === 'orange' ? 'bg-orange-50 border border-orange-100' : item.color === 'amber' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50'}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'red' ? 'text-red-600' : item.color === 'orange' ? 'text-orange-600' : item.color === 'amber' ? 'text-amber-600' : 'text-slate-500'}`}>{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {item.montant !== '—' && <span className="text-xs font-bold text-orange-700">{item.montant}</span>}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.color === 'red' ? 'bg-red-100 text-red-600' : item.color === 'orange' ? 'bg-orange-100 text-orange-600' : item.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                <p className="text-xs font-semibold text-orange-700">Recommandation IA</p>
                <p className="text-xs text-orange-600 mt-1">516€ de frais cachés détectés sur cette facture. Contestez les frais de gestion non contractuels (347€) et demandez l'application du tarif livraison convenu. L'emballage spécial n'apparaît dans aucun document contractuel.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"><Eye className="w-5 h-5 text-orange-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">516€ de frais cachés</p><p className="text-xs text-orange-600 font-semibold">3 lignes suspectes</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">6 lignes</span><span className="text-xs text-emerald-600 font-semibold">vérifiées en 3s</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ExemplesSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-orange-950/80 to-slate-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-orange-500/20 text-orange-300 border-orange-500/30 border">Exemples réels</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Les 6 frais cachés les plus fréquents
            <span className="text-orange-400"> dans les factures PME</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Ces frais passent inaperçus dans 90% des cas. Ils sont légaux mais rarement contractuels — et ils s'accumulent trimestre après trimestre.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Frais de gestion administrative', percent: '3% à 8%', description: "Ligne discrète ajoutée en bas de facture. Non prévue au contrat, rarement contestée. Sur 10 000€ d'achats mensuels, cela représente 300€ à 800€ de surcoût invisible.", icon: Receipt },
            { title: 'Majoration saisonnière', percent: '5% à 15%', description: "Augmentation temporaire des prix en période de forte demande. Légitime si prévue au contrat, abusive si appliquée unilatéralement sans préavis ni base contractuelle.", icon: BadgeDollarSign },
            { title: 'Frais d\'expédition gonflés', percent: '+40% à +120%', description: "Le tarif facturé dépasse largement le coût réel de livraison. Fréquent avec les fournisseurs qui incluent une marge sur le transport sans la mentionner séparément.", icon: FileText },
            { title: 'Supplément quantité minimale', percent: '50€ à 200€', description: "Pénalité pour commande inférieure au seuil minimum — souvent mentionnée en petits caractères dans les CGV mais jamais discutée lors de la négociation commerciale.", icon: Scale },
            { title: 'Frais de traitement urgence', percent: '+20% à +50%', description: "Supplément appliqué automatiquement quand le délai de livraison demandé est inférieur au standard. Rarement signalé au moment de la commande, découvert à la facturation.", icon: Clock },
            { title: 'Emballage spécial non prévu', percent: '30€ à 150€', description: "Ligne ajoutée pour conditionnement renforcé ou palette — non mentionnée dans le devis initial. Le fournisseur justifie par les normes de transport, le client découvre à la facture.", icon: Search },
          ].map((item, i) => (
            <motion.div key={i} variants={scaleIn} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 shadow-lg">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <span className="text-xs font-bold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full flex-shrink-0">{item.percent}</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Search, title: 'Analyse ligne par ligne automatique', description: "InvoiceAgent ne se contente pas de vérifier le total. L'IA décompose chaque facture ligne par ligne — matériaux, main d'œuvre, frais annexes, transport — et vérifie que chaque poste correspond aux conditions contractuelles connues. Les frais ajoutés sans base contractuelle sont immédiatement signalés.", color: 'from-orange-400 to-amber-500' },
    { icon: Scale, title: 'Comparaison devis vs facture', description: "Uploadez votre devis accepté et la facture correspondante. InvoiceAgent compare automatiquement les prix unitaires, quantités, remises et conditions. Tout écart est signalé avec le montant exact de la différence et la ligne concernée dans les deux documents.", color: 'from-red-400 to-orange-500' },
    { icon: Eye, title: 'Détection des majorations récurrentes', description: "Certains fournisseurs ajoutent des frais qui augmentent progressivement d'une facture à l'autre. InvoiceAgent analyse l'historique de vos factures par fournisseur et détecte les tendances de hausse — frais de gestion qui passent de 3% à 5% en six mois sans renégociation.", color: 'from-amber-400 to-yellow-500' },
    { icon: Receipt, title: 'Vérification des CGV fournisseurs', description: "Les frais cachés sont souvent justifiés par une clause noyée dans les conditions générales de vente. InvoiceAgent analyse les CGV et identifie les clauses qui autorisent des frais supplémentaires — pour que vous sachiez exactement ce que vous avez accepté et ce qui est contestable.", color: 'from-violet-400 to-purple-500' },
    { icon: BadgeDollarSign, title: 'Chiffrage précis des pertes', description: "Chaque frais caché détecté est chiffré au centime près avec la source du surcoût (ligne de facture, clause contractuelle absente, écart avec le devis). Le rapport inclut un total récupérable par fournisseur pour faciliter les contestations et renégociations.", color: 'from-emerald-400 to-teal-500' },
    { icon: AlertTriangle, title: 'Alertes fournisseurs à risque', description: "InvoiceAgent identifie les fournisseurs dont les factures contiennent régulièrement des frais non contractuels. Le tableau de bord classe vos fournisseurs par niveau de risque et montant total de frais cachés détectés, pour vous aider à renégocier ou changer de prestataire.", color: 'from-rose-400 to-red-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-700 border-0">Détection intelligente par IA</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comment InvoiceAgent détecte
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"> chaque frais caché</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Pas de vérification manuelle ligne par ligne. L'IA analyse, compare et signale — vous décidez de contester ou d'accepter.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-500">
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-amber-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Démo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Scannez votre facture pour détecter les frais cachés</h2>
          <p className="text-lg text-orange-200 max-w-2xl mx-auto">Uploadez une facture fournisseur en PDF — l'IA vérifie chaque ligne et identifie les frais non contractuels en moins de 5 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Analyse complète', icon: Clock }, { value: '100%', label: 'Lignes vérifiées', icon: Search }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
            <AnimatedSection key={stat.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3"><stat.icon className="w-6 h-6 text-orange-300" /></div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-orange-300 mt-1">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour découvrir', features: ['5 factures analysées', 'Détection frais cachés', 'Vérification TVA basique', 'Rapport anomalies PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME et freelances', features: ['100 factures/mois', 'Détection frais cachés avancée', 'Comparaison devis vs facture', 'Historique par fournisseur', 'Alertes fournisseurs à risque', 'Export FEC comptable'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimité', features: ['Factures illimitées', 'Tout Pro inclus', 'Audit contrats fournisseurs', 'Multi-utilisateurs', 'Rapport pertes trimestriel', 'Accompagnement dédié'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Chaque frais caché détecté <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">rembourse votre abonnement</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Une seule facture vérifiée peut récupérer le coût de plusieurs mois d'abonnement.</p>
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
    { q: "Comment détecter les frais cachés sur une facture fournisseur ?", a: "La méthode la plus fiable est de comparer chaque ligne de la facture avec les conditions contractuelles — devis accepté, contrat cadre, grille tarifaire. InvoiceAgent automatise cette comparaison par IA en moins de 5 secondes par facture. Chaque majoration non prévue, frais de gestion ajouté et écart de prix est signalé avec le montant exact et la source du surcoût." },
    { q: "Quels sont les frais cachés les plus courants dans les factures fournisseurs ?", a: "Les 6 frais cachés les plus fréquents sont : 1) Les frais de gestion administrative (3% à 8% du montant), 2) Les majorations saisonnières non contractuelles, 3) Les frais d'expédition gonflés par rapport au tarif réel, 4) Les suppléments pour quantité minimale non atteinte, 5) Les frais de traitement urgence non signalés, et 6) Les coûts d'emballage spécial non prévus au devis." },
    { q: "Combien coûtent les frais cachés aux PME françaises ?", a: "En moyenne, les frais cachés représentent 1,5% à 4% du montant total des achats fournisseurs. Pour une PME avec 300 000€ d'achats annuels, cela représente entre 4 500€ et 12 000€ de coûts invisibles acceptés sans vérification. Ces montants s'accumulent année après année sans être jamais récupérés." },
    { q: "InvoiceAgent compare-t-il automatiquement les factures aux devis ?", a: "Oui. Uploadez le devis accepté et la facture correspondante — InvoiceAgent compare automatiquement les prix unitaires, les quantités, les remises négociées et les conditions de livraison. Tout écart est signalé avec le montant exact de la différence et la référence aux deux documents. Le système détecte même les variations mineures de prix unitaires inférieures à 5%." },
    { q: "Comment éviter de payer des frais cachés à l'avenir ?", a: "Trois actions concrètes : 1) Vérifiez systématiquement chaque facture avec InvoiceAgent avant de valider le paiement, 2) Négociez des contrats avec des tarifs forfaitaires tout compris, sans possibilité de frais supplémentaires hors avenant, 3) Utilisez le tableau de bord InvoiceAgent pour identifier vos fournisseurs récidivistes et ouvrir des renégociations ciblées." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">fréquentes</span></h2>
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-600 to-violet-700" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Arrêtez de payer des frais que vous n'avez jamais acceptés</h2>
          <p className="text-lg text-orange-100 mb-4 max-w-2xl mx-auto">5 factures scannées gratuitement — sans carte bancaire. Découvrez ce que vos fournisseurs vous facturent en trop.</p>
          <p className="text-orange-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Scanner mes factures <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la démo</a></Button>
          </div>
          <p className="mt-6 text-orange-200 text-sm">Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Perte argent facture entreprise', href: `${BASE_URL}/perte-argent-facture-entreprise` },
    { label: 'Frais cachés contrat entreprise', href: `${BASE_URL}/frais-caches-contrat-entreprise` },
    { label: 'Détection doublons factures', href: `${BASE_URL}/detection-doublons-factures` },
    { label: 'Comment vérifier facture fournisseur', href: `${BASE_URL}/comment-verifier-facture-fournisseur` },
    { label: 'Erreurs facture fréquentes PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
    { label: 'Analyse contrat fournisseur', href: `${BASE_URL}/comment-analyser-contrat-fournisseur` },
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

export default function FraisCachesFactureCommentDetecter() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <ExemplesSection />
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