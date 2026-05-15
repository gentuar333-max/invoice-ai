"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Calculator, Percent, FileSearch, Clock, Wrench, HardHat, Building2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/erreurs-facturation-tva-artisan`;

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
  name: 'InvoiceAgent — Vérification TVA Artisans BTP',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '89' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quelles sont les erreurs de TVA les plus fréquentes chez les artisans ?", acceptedAnswer: { '@type': 'Answer', text: "Les 4 erreurs principales sont : appliquer 20% au lieu de 10% sur des travaux de rénovation en logement de plus de 2 ans, oublier l'attestation simplifiée CERFA 13948, facturer avec un numéro de TVA invalide ou expiré, et mélanger les taux sur une même facture multi-prestations." } },
    { '@type': 'Question', name: "Quand appliquer la TVA à 10% ou 5,5% pour un artisan BTP ?", acceptedAnswer: { '@type': 'Answer', text: "La TVA à 10% s'applique aux travaux d'amélioration, transformation et aménagement dans un logement achevé depuis plus de 2 ans. La TVA à 5,5% concerne les travaux de rénovation énergétique (isolation, chaudière, pompe à chaleur). La TVA à 20% s'applique aux constructions neuves et aux travaux qui augmentent la surface habitable de plus de 10%." } },
    { '@type': 'Question', name: "Quel risque en cas d'erreur de taux de TVA sur une facture artisan ?", acceptedAnswer: { '@type': 'Answer', text: "En cas de contrôle fiscal, l'artisan doit reverser la différence de TVA plus les pénalités de retard (0,2% par mois) et une majoration de 10% à 40% selon la gravité. Le client perd la déduction de TVA si la facture comporte des erreurs formelles. Le risque financier total peut atteindre plusieurs milliers d'euros." } },
    { '@type': 'Question', name: "InvoiceAgent détecte-t-il automatiquement le bon taux de TVA BTP ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse la nature des travaux décrits dans la facture et vérifie que le taux appliqué correspond. Rénovation logement ancien, construction neuve, travaux d'énergie — l'IA identifie le contexte et signale toute incohérence de taux en moins de 5 secondes." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Erreurs facturation TVA artisan', item: PAGE_URL }
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-slate-50 to-indigo-50/20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-amber-400/15 to-violet-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-400/10 to-amber-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-amber-100 text-amber-700 border-0 text-sm font-medium">
                <HardHat className="w-4 h-4 mr-2" />TVA artisan — les erreurs coûtent cher
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Erreurs facturation</span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">TVA artisan</span>
              <br />
              <span className="text-slate-900">détectées par IA</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              TVA à 10%, 5,5% ou 20% — <strong>un mauvais taux sur une facture BTP peut coûter des milliers d'euros</strong> en cas de contrôle fiscal. InvoiceAgent vérifie automatiquement le taux, l'attestation CERFA et les mentions obligatoires de chaque facture artisan.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '3 taux', label: 'TVA vérifiés', sub: '5,5% · 10% · 20%' },
                { value: '< 5s', label: 'Vérification complète', sub: 'taux + mentions + CERFA' },
                { value: '6 200€', label: 'TVA perdue en moyenne', sub: 'par an et par artisan' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-amber-600">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xl shadow-amber-600/30 text-lg px-8 h-14" asChild>
                <a href="#demo">Vérifier ma TVA <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Taux 10% / 5,5% / 20% vérifié', 'Attestation CERFA contrôlée', 'Mentions obligatoires vérifiées'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-amber-600/15 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"><Percent className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Facture #F-892 — Plomberie Martin</p><p className="text-sm text-slate-500">Vérification TVA en 4 secondes</p></div>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">2 erreurs TVA</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Taux TVA principal — 20% appliqué', detail: 'Rénovation salle de bain logement 1987 → taux correct = 10%', montant: '1 840€', status: 'Erreur taux', color: 'red' },
                  { point: 'Attestation CERFA 13948', detail: 'Document absent du dossier — obligatoire pour TVA réduite', montant: '—', status: 'Manquante', color: 'red' },
                  { point: 'Fournitures — TVA 20%', detail: 'Robinetterie et sanitaires fournis et posés → 10% applicable', montant: '320€', status: 'Surcoût', color: 'amber' },
                  { point: 'Main d\'œuvre — taux horaire', detail: '58€/h conforme au devis accepté #D-456', montant: '—', status: 'OK', color: 'emerald' },
                  { point: 'Numéro TVA intracommunautaire', detail: 'FR 82 451 236 789 — vérifié et actif sur VIES', montant: '—', status: 'Valide', color: 'emerald' },
                  { point: 'Mentions obligatoires facture', detail: 'SIRET, adresse, date, n° facture — toutes présentes', montant: '—', status: 'OK', color: 'emerald' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={`flex items-center justify-between p-2.5 rounded-lg ${item.color === 'red' ? 'bg-red-50 border border-red-100' : item.color === 'amber' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50'}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{item.point}</p>
                      <p className={`text-xs mt-0.5 ${item.color === 'red' ? 'text-red-600' : item.color === 'amber' ? 'text-amber-600' : 'text-slate-500'}`}>{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {item.montant !== '—' && <span className="text-xs font-bold text-red-700">{item.montant}</span>}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.color === 'red' ? 'bg-red-100 text-red-600' : item.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <p className="text-xs font-semibold text-amber-700">Recommandation IA</p>
                <p className="text-xs text-amber-600 mt-1">Le taux de 20% est incorrect pour des travaux de rénovation dans un logement de plus de 2 ans. Demandez une facture rectificative avec TVA à 10% et faites signer l'attestation CERFA 13948. Économie potentielle : 2 160€ sur cette seule facture.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"><Calculator className="w-5 h-5 text-amber-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">2 160€ récupérables</p><p className="text-xs text-amber-600 font-semibold">TVA incorrecte</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">3 taux TVA</span><span className="text-xs text-emerald-600 font-semibold">vérifiés auto</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function TauxSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-amber-950/80 to-slate-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-amber-500/20 text-amber-300 border-amber-500/30 border">Les 3 taux TVA artisan BTP</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Quel taux de TVA appliquer
            <span className="text-amber-400"> selon le type de travaux ?</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Le mauvais taux coûte de l'argent au client et expose l'artisan à un redressement fiscal. InvoiceAgent vérifie automatiquement la cohérence entre la nature des travaux et le taux appliqué.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
          {[
            { taux: '5,5%', titre: 'Rénovation énergétique', travaux: 'Isolation thermique, pompe à chaleur, chaudière haute performance, fenêtres double vitrage, panneaux solaires thermiques', condition: 'Logement achevé depuis plus de 2 ans — résidence principale ou secondaire', risque: "Erreur fréquente : appliquer 10% au lieu de 5,5% sur des travaux d'isolation qui ouvrent droit au taux super-réduit", color: 'from-emerald-500 to-teal-600' },
            { taux: '10%', titre: 'Amélioration et rénovation', travaux: 'Rénovation salle de bain, cuisine, plomberie, électricité, peinture, carrelage, menuiserie intérieure', condition: 'Logement achevé depuis plus de 2 ans — attestation CERFA 13948 obligatoire', risque: "Erreur fréquente : oublier l'attestation CERFA ou appliquer 20% par défaut sur des travaux éligibles au taux intermédiaire", color: 'from-amber-500 to-orange-600' },
            { taux: '20%', titre: 'Construction neuve et extension', travaux: 'Construction neuve, extension augmentant la surface de plus de 10%, gros œuvre sur bâtiment neuf', condition: "Toute construction neuve ou travaux qui ne portent pas sur un logement de plus de 2 ans", risque: "Erreur fréquente : appliquer 10% sur des travaux d'extension qui dépassent le seuil de 10% de surface supplémentaire", color: 'from-red-500 to-rose-600' },
          ].map((item, i) => (
            <motion.div key={i} variants={scaleIn} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-colors">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.color} mb-5`}>
                <Percent className="w-5 h-5 text-white" />
                <span className="text-2xl font-bold text-white">{item.taux}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.titre}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4"><strong className="text-white">Travaux concernés :</strong> {item.travaux}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4"><strong className="text-slate-300">Condition :</strong> {item.condition}</p>
              <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                <p className="text-xs text-red-300 leading-relaxed"><AlertTriangle className="w-3 h-3 inline mr-1" />{item.risque}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Percent, title: 'Vérification automatique du taux TVA', description: "InvoiceAgent analyse la description des travaux dans la facture et détermine le taux applicable — 5,5% pour la rénovation énergétique, 10% pour l'amélioration de l'habitat ancien, 20% pour la construction neuve. Chaque incohérence entre la nature des travaux et le taux facturé est signalée avec l'économie potentielle.", color: 'from-amber-400 to-orange-500' },
    { icon: FileText, title: 'Contrôle de l\'attestation CERFA', description: "Pour bénéficier du taux réduit de 10%, l'attestation simplifiée CERFA 13948 doit être signée par le client avant facturation. InvoiceAgent vérifie la présence de ce document et vous alerte si la TVA réduite est appliquée sans l'attestation correspondante — un motif fréquent de redressement.", color: 'from-red-400 to-rose-500' },
    { icon: Calculator, title: 'Vérification des calculs TVA', description: "Base HT, montant de TVA, total TTC — InvoiceAgent recalcule chaque ligne et compare avec les montants facturés. Les erreurs d'arrondi, les incohérences de calcul et les totaux incorrects sont détectés automatiquement. Sur des factures multi-taux, ces erreurs sont particulièrement fréquentes.", color: 'from-violet-400 to-purple-500' },
    { icon: Shield, title: 'Validation du numéro de TVA', description: "InvoiceAgent vérifie que le numéro de TVA intracommunautaire indiqué sur la facture est valide et actif via le système européen VIES. Un numéro invalide vous prive de la déduction de TVA — une perte directe et définitive que seule une vérification systématique peut prévenir.", color: 'from-blue-400 to-indigo-500' },
    { icon: Receipt, title: 'Mentions obligatoires complètes', description: "SIRET, adresse complète, date d'émission, numéro de facture séquentiel, conditions de paiement, taux de pénalités — InvoiceAgent vérifie la présence des 12 mentions obligatoires. Une facture non conforme est irrécupérable en cas de litige et inacceptable pour la déduction fiscale.", color: 'from-emerald-400 to-teal-500' },
    { icon: Building2, title: 'Gestion multi-taux par chantier', description: "Sur un même chantier, plusieurs taux de TVA peuvent coexister — 10% sur la main d'œuvre de rénovation, 20% sur les équipements neufs, 5,5% sur l'isolation. InvoiceAgent vérifie la cohérence de chaque ligne avec le bon taux et signale les mélanges incorrects.", color: 'from-orange-400 to-red-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-amber-100 text-amber-700 border-0">6 vérifications TVA automatiques</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ce que l'IA vérifie dans
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> chaque facture artisan</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Taux, attestation, calculs, mentions — chaque point de conformité TVA est vérifié en moins de 5 secondes par facture.</p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-500">
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Démo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Vérifiez la TVA de vos factures artisan maintenant</h2>
          <p className="text-lg text-amber-200 max-w-2xl mx-auto">Uploadez une facture BTP en PDF — l'IA vérifie le taux, les calculs et les mentions obligatoires en moins de 5 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Vérification complète', icon: Clock }, { value: '3 taux', label: 'TVA vérifiés', icon: Percent }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
            <AnimatedSection key={stat.label} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3"><stat.icon className="w-6 h-6 text-amber-300" /></div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-amber-300 mt-1">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['5 factures vérifiées', 'Taux TVA vérifié', 'Mentions obligatoires', 'Rapport conformité PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour artisans et PME', features: ['100 factures/mois', 'Vérification 3 taux TVA', 'Contrôle CERFA 13948', 'Validation numéro TVA VIES', 'Gestion multi-taux chantier', 'Export FEC comptable'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimité', features: ['Factures illimitées', 'Tout Pro inclus', 'Audit contrats fournisseurs', 'Multi-utilisateurs', 'Historique conformité', 'Accompagnement dédié'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Un seul redressement évité <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">rembourse des années d'abonnement</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Une erreur de taux TVA sur un chantier à 20 000€ coûte 2 000€ minimum. L'abonnement Pro coûte 29€/mois.</p>
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
    { q: "Quelles sont les erreurs de TVA les plus fréquentes chez les artisans BTP ?", a: "Les 4 erreurs les plus courantes et coûteuses : 1) Appliquer 20% au lieu de 10% sur des travaux de rénovation dans un logement de plus de 2 ans — surcoût direct pour le client, 2) Oublier l'attestation simplifiée CERFA 13948 — la TVA réduite devient non justifiable en cas de contrôle, 3) Facturer avec un numéro de TVA invalide — le client perd la déductibilité, 4) Mélanger les taux sur une facture multi-prestations sans ventiler correctement chaque ligne." },
    { q: "Quand appliquer la TVA à 10%, 5,5% ou 20% pour un artisan ?", a: "TVA 5,5% : travaux de rénovation énergétique (isolation, pompe à chaleur, chaudière haute performance) dans un logement de plus de 2 ans. TVA 10% : travaux d'amélioration et rénovation (salle de bain, électricité, peinture, plomberie) dans un logement de plus de 2 ans, avec attestation CERFA 13948. TVA 20% : construction neuve, extension augmentant la surface de plus de 10%, et tous travaux dans un bâtiment de moins de 2 ans." },
    { q: "Quel risque en cas d'erreur de taux de TVA sur une facture artisan ?", a: "En cas de contrôle fiscal, l'artisan doit reverser la différence de TVA au Trésor Public, plus des pénalités de retard de 0,2% par mois et une majoration de 10% à 40% selon que l'erreur est considérée comme involontaire ou délibérée. Le client, lui, perd la déduction de TVA si la facture comporte des erreurs formelles. Sur un chantier à 30 000€, une erreur de taux peut coûter 3 000€ à 6 000€ au total." },
    { q: "L'attestation CERFA 13948 est-elle vraiment obligatoire ?", a: "Oui, pour bénéficier du taux réduit de TVA à 10% sur des travaux dans un logement de plus de 2 ans, le client doit signer l'attestation simplifiée CERFA 13948 (ou 13947 pour le gros œuvre) avant le début des travaux. Sans ce document, l'artisan ne peut pas justifier l'application du taux réduit en cas de contrôle fiscal et devra reverser la différence entre 20% et 10%." },
    { q: "InvoiceAgent détecte-t-il automatiquement le bon taux de TVA ?", a: "Oui. InvoiceAgent analyse la nature des travaux décrits dans chaque facture et vérifie la cohérence avec le taux appliqué. Rénovation de logement ancien, construction neuve, travaux d'énergie — l'IA identifie le contexte en 5 secondes et signale toute incohérence. Le système vérifie également la présence de l'attestation CERFA, la validité du numéro de TVA et l'exactitude des calculs." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">fréquentes</span></h2>
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-violet-700" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ne laissez plus une erreur de TVA vous coûter des milliers d'euros</h2>
          <p className="text-lg text-amber-100 mb-4 max-w-2xl mx-auto">5 factures vérifiées gratuitement — sans carte bancaire. Taux, CERFA, mentions — tout est contrôlé en 5 secondes.</p>
          <p className="text-amber-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Vérifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la démo</a></Button>
          </div>
          <p className="mt-6 text-amber-200 text-sm">Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Facturation Électricien', href: `${BASE_URL}/facturation-electricien` },
    { label: 'Facturation Plombier', href: `${BASE_URL}/facturation-plombier` },
    { label: 'Facturation Maçon', href: `${BASE_URL}/facturation-macon` },
    { label: 'Facturation BTP Construction', href: `${BASE_URL}/facturation-btp-construction` },
    { label: 'TVA récupérable erreur facture', href: `${BASE_URL}/tva-recuperable-erreur-facture` },
    { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
    { label: 'Perte argent facture entreprise', href: `${BASE_URL}/perte-argent-facture-entreprise` },
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

export default function ErreursFacturationTvaArtisan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <TauxSection />
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