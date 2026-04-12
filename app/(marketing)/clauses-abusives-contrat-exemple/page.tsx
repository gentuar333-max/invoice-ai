"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Clock, Zap, FileText, Shield, XCircle, Search, Ban, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/clauses-abusives-contrat-exemple`;

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
  name: 'InvoiceAgent — Clauses Abusives Contrat Exemple',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '88' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce qu'une clause abusive dans un contrat commercial ?",
      acceptedAnswer: { '@type': 'Answer', text: "Une clause abusive est une clause qui cree un desequilibre significatif entre les droits et obligations des parties. En droit commercial B2B, elles sont encadrees par l'article L442-1 du Code de commerce. Les plus frequentes : limitation de responsabilite disproportionnee, resiliation unilaterale sans motif, cession de droits sans contrepartie, penalites asymetriques." }
    },
    {
      '@type': 'Question',
      name: "Quelles sont les clauses abusives les plus frequentes dans un contrat de prestation ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les 8 clauses abusives les plus frequentes : limitation de responsabilite a 1 mois de prestation, resiliation sans preavis ni motif, cession totale de propriete intellectuelle sans remuneration, clause de non-concurrence excessive, paiement a 90 jours (illegal au-dela de 60), modification unilaterale des conditions, exclusivite sans contrepartie, et clause penale asymetrique." }
    },
    {
      '@type': 'Question',
      name: "Une clause abusive dans un contrat B2B est-elle nulle ?",
      acceptedAnswer: { '@type': 'Answer', text: "En B2B, une clause abusive n'est pas automatiquement nulle comme en B2C — elle peut etre annulee par un juge si elle cree un desequilibre significatif (art. L442-1 C.com). La nullite est relative : seule la partie lesee peut l'invoquer. La clause peut etre renegociee avant signature pour eviter tout litige." }
    },
    {
      '@type': 'Question',
      name: "InvoiceAgent detecte-t-il les clauses abusives automatiquement ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse votre contrat PDF en moins de 30 secondes et identifie les clauses a risque : limitation de responsabilite, resiliation, propriete intellectuelle, non-concurrence, conditions de paiement. Chaque clause est evaluee avec une recommandation de negociation concrete." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Clauses Abusives Contrat Exemple', item: PAGE_URL }
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
            {[['8 exemples', '#exemples'], ['Comment negocier', '#negocier'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-50 rounded-full blur-3xl opacity-50" />
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-semibold">
                <Scale className="w-4 h-4" />
                Clauses abusives contrat — detection IA
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Clauses abusives
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">dans un contrat</span>
              <span className="block text-4xl sm:text-5xl font-bold text-slate-600 mt-1">8 exemples concrets a connaitre</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Limitation de responsabilite disproportionnee, resiliation sans motif, cession de droits sans remuneration — InvoiceAgent identifie ces clauses dans vos contrats PDF en 30 secondes et vous aide a les renegocier.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '8', label: 'Clauses abusives', sub: 'exemples concrets' },
                { value: '< 30s', label: 'Analyse contrat', sub: 'par PDF' },
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
                <a href="#exemples">Voir les 8 exemples</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500">
              {['Clause identifiee avec texte exact', 'Risque juridique evalue', 'Alternative de negociation proposee'].map((item) => (
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
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Contrat prestation — Agence XYZ</p>
                    <p className="text-xs text-slate-400">Analyse clauses — 28 secondes</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-600">4 clauses risque</span>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Limitation de responsabilite', detail: 'Plafonnee a 1 mois — disproportionnee au risque', risk: 'Critique' },
                  { label: 'Resiliation', detail: 'Unilaterale sans motif ni preavis par le client', risk: 'Critique' },
                  { label: 'Propriete intellectuelle', detail: 'Cession totale, illimitee, sans remuneration supplementaire', risk: 'Eleve' },
                  { label: 'Non-concurrence', detail: '36 mois, secteur entier — disproportionnee', risk: 'Eleve' },
                  { label: 'Conditions de paiement', detail: '45 jours date facture — conforme loi LME', risk: null },
                  { label: 'Sous-traitance', detail: 'Accord prealable client requis — acceptable', risk: null },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${row.risk === 'Critique' ? 'bg-red-50 border border-red-100' : row.risk === 'Eleve' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50 border border-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{row.label}</p>
                      <p className={`text-xs mt-0.5 ${row.risk === 'Critique' ? 'text-red-500' : row.risk === 'Eleve' ? 'text-amber-600' : 'text-slate-400'}`}>{row.detail}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${row.risk === 'Critique' ? 'bg-red-100 text-red-600' : row.risk === 'Eleve' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-600'}`}>
                      {row.risk ?? 'OK'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-4 border border-violet-100">
                <p className="text-xs font-bold text-violet-700 mb-1">Recommandation IA</p>
                <p className="text-xs text-violet-600 leading-relaxed">Ne signez pas sans renegocier la limitation de responsabilite (minimum 6 mois) et la clause de resiliation (preavis 30 jours minimum). La cession de PI sans remuneration est une perte majeure a long terme.</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg border border-red-100 px-4 py-3 items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                <Ban className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">4 clauses</p>
                <p className="text-xs text-red-500 font-semibold">a renegocier avant signature</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-2"
            >
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800">Analyse</span>
              <span className="text-xs text-violet-500 font-semibold">complete en 28s</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ExemplesSection() {
  const clauses = [
    {
      num: '01',
      icon: Shield,
      title: 'Limitation de responsabilite a 1 mois',
      abusif: '"La responsabilite du prestataire est limitee au montant des honoraires du dernier mois de prestation."',
      risque: "Si votre livraison cause un prejudice de 50 000€ a votre client, vous n'etes couvert qu'a hauteur de votre derniere facture mensuelle — souvent 2 000 a 5 000€. Cette asymetrie est disproportionnee pour des prestations a forts enjeux.",
      negociation: 'Proposez une limitation a 6 ou 12 mois de prestation, ou au montant total du contrat. Souscrivez une assurance RC Pro adaptee pour couvrir au-dela.',
      color: 'from-red-500 to-rose-600',
      badge: 'Critique',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      num: '02',
      icon: XCircle,
      title: 'Resiliation unilaterale sans motif',
      abusif: '"Le client peut resilier le contrat a tout moment et sans motif par simple notification ecrite, sans indemnite."',
      risque: "Cette clause vous expose a une perte de revenus immediate sans compensation pour le travail engage, les sous-traitants mobilises ou les opportunites refusees. Elle est particulierement risquee sur les projets longs avec investissement initial.",
      negociation: 'Exigez un preavis minimum de 30 a 60 jours et une indemnite egale au montant du travail realise non facture plus un dedit de 10 a 20% du solde restant.',
      color: 'from-orange-500 to-red-500',
      badge: 'Critique',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      num: '03',
      icon: FileText,
      title: 'Cession totale de propriete intellectuelle',
      abusif: '"Le client devient proprietaire de l\'integralite des droits sur les livrables, pour toute duree et tout territoire, sans remuneration supplementaire."',
      risque: "Une cession totale sans limite vous prive de tout droit de reutilisation de vos propres creations — code, designs, methodologies. Vous ne pouvez plus utiliser ces elements pour d'autres clients ni les presenter dans votre portfolio sans autorisation.",
      negociation: "Limitez la cession aux livrables specifiques au client. Conservez les droits sur vos outils, methodologies et composants generiques. Ou negociez une remuneration supplementaire pour la cession totale.",
      color: 'from-violet-500 to-purple-600',
      badge: 'Eleve',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      num: '04',
      icon: Ban,
      title: 'Non-concurrence de 36 mois sur secteur entier',
      abusif: '"Le prestataire s\'interdit d\'exercer toute activite similaire ou concurrente pour tout acteur du secteur X pendant 36 mois suivant la fin du contrat."',
      risque: "Une clause de non-concurrence de 36 mois sur un secteur entier est disproportionnee et souvent annulable par un juge. Elle peut bloquer totalement votre activite et est frequemment utilisee pour fideliser artificiellement le prestataire.",
      negociation: 'Maximum 12 mois, perimetre limite aux clients directs du donneur d\'ordre, compensation financiere obligatoire pour toute duree superieure a 6 mois.',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Eleve',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      num: '05',
      icon: Clock,
      title: 'Delai de paiement a 90 jours',
      abusif: '"Le paiement interviendra dans un delai de 90 jours a compter de la date de reception de la facture."',
      risque: "Un delai de 90 jours est illegal en France — la loi LME plafonne les delais de paiement a 60 jours date de facture ou 45 jours fin de mois. Cette clause expose le client donneur d'ordre a des sanctions DGCCRF et vous prive de tresorerie pendant 3 mois.",
      negociation: 'Exigez le respect legal : maximum 30 jours (standard), 45 jours fin de mois ou 60 jours date de facture. Ajoutez des penalites de retard au taux BCE + 10 points.',
      color: 'from-teal-500 to-emerald-600',
      badge: 'Illegal',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      num: '06',
      icon: Search,
      title: 'Modification unilaterale des conditions',
      abusif: '"Le client se reserve le droit de modifier les specifications du projet sans que cela constitue une cause de revision de prix ou de delai."',
      risque: "Cette clause autorise le client a modifier indefiniment le perimetre sans compensation. Elle est la source principale des derives de projet — scope creep — ou vous livrez deux fois plus que prevu pour le meme prix.",
      negociation: 'Tout changement de specification doit faire l\'objet d\'un avenant signe avec impact sur le prix et le delai. Definissez un processus de gestion des demandes de modification.',
      color: 'from-pink-500 to-rose-600',
      badge: 'Eleve',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      num: '07',
      icon: Scale,
      title: 'Exclusivite sans contrepartie',
      abusif: '"Le prestataire s\'engage a travailler exclusivement pour le client pendant toute la duree du contrat."',
      risque: "L'exclusivite sans compensation financiere vous oblige a refuser tous autres clients — ce qui, combinee a un prix insuffisant ou a des retards de paiement, peut mettre votre activite en peril. Elle cree aussi un risque de requalification en salariat.",
      negociation: 'Refusez l\'exclusivite totale. Si le client insiste, exigez une compensation mensuelle minimale garantie et limitez la duree a 6 mois maximum.',
      color: 'from-slate-500 to-slate-700',
      badge: 'Critique',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      num: '08',
      icon: AlertTriangle,
      title: 'Penalites asymetriques',
      abusif: '"En cas de retard de livraison, le prestataire sera penalise de 5% du montant du contrat par semaine de retard. Aucune penalite ne s\'applique en cas de retard de paiement."',
      risque: "Des penalites de retard uniquement a la charge du prestataire, sans reciprocite pour les retards de paiement, creent un desequilibre manifeste. Ces penalites peuvent rapidement depasser le montant total du contrat.",
      negociation: 'Exigez la reciprocite : penalites de retard de paiement identiques aux penalites de retard de livraison. Plafonnez les penalites totales a 10% du montant du contrat.',
      color: 'from-amber-500 to-orange-600',
      badge: 'Eleve',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <section id="exemples" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Exemples de clauses abusives detectees par InvoiceAgent
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            8 clauses abusives frequentes
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> avec texte exact et alternative</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Chaque exemple inclut le texte type de la clause abusive, le risque concret pour votre activite, et la formulation alternative a proposer en negociation.</p>
        </AnimatedSection>

        <div className="space-y-6">
          {clauses.map((c, i) => (
            <AnimatedSection key={i}>
              <Card className="bg-white border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start gap-0">
                    <div className={`w-1.5 self-stretch bg-gradient-to-b ${c.color} flex-shrink-0`} />
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow flex-shrink-0`}>
                          <c.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-black text-slate-300">#{c.num}</span>
                            <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>{c.badge}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                          <p className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Clause abusive type</p>
                          <p className="text-xs text-red-600 italic leading-relaxed">{c.abusif}</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                          <p className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Risque concret</p>
                          <p className="text-xs text-amber-700 leading-relaxed">{c.risque}</p>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                          <p className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Negociation recommandee</p>
                          <p className="text-xs text-emerald-700 leading-relaxed">{c.negociation}</p>
                        </div>
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

function NegocierSection() {
  const conseils = [
    {
      title: 'Identifiez les clauses avant de negocier',
      description: "Avant toute negociation, listez toutes les clauses problematiques avec leur impact concret chiffre. InvoiceAgent genere cette liste automatiquement en 30 secondes. Negocier sans liste precise revient a accepter tacitement les clauses non mentionnees.",
      icon: Search,
      color: 'from-violet-500 to-indigo-600',
    },
    {
      title: 'Negociez les clauses critiques en premier',
      description: "Commencez par les clauses les plus impactantes : limitation de responsabilite, resiliation, propriete intellectuelle. Obtenez un accord de principe sur ces points avant d'aborder les clauses secondaires. Cedez sur des points mineurs pour obtenir des concessions sur les critiques.",
      icon: Scale,
      color: 'from-blue-500 to-violet-600',
    },
    {
      title: 'Proposez des alternatives concretes',
      description: "Ne dites pas 'cette clause est abusive' — proposez directement une formulation alternative equitable. 'Je propose de limiter la responsabilite a 6 mois plutot qu'a 1 mois' est plus efficace qu'un refus. Preparez vos alternatives avant la negociation.",
      icon: FileText,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Faites relire par un avocat pour les contrats importants',
      description: "InvoiceAgent identifie les clauses a risque et propose des alternatives — mais pour les contrats de plus de 50 000€ ou sur des domaines sensibles (PI, responsabilite), consultez un avocat specialise en droit commercial. Le cout de la relance est negligeable face au risque.",
      icon: Shield,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section id="negocier" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-semibold">
            Strategie de negociation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Comment negocier
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> les clauses abusives</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">4 principes pour renegocier efficacement avant signature — sans rompre la relation commerciale.</p>
        </AnimatedSection>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
          {conseils.map((c, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="h-full bg-slate-50 border-slate-100 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow mb-4`}>
                    <c.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{c.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-8 bg-violet-50 rounded-2xl p-6 border border-violet-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-violet-900 mb-2">InvoiceAgent prepare votre negociation en 30 secondes</h3>
              <p className="text-violet-700 text-sm leading-relaxed mb-4">Uploadez votre contrat PDF — InvoiceAgent identifie chaque clause abusive, evalue le risque et propose la formulation alternative a negocier. Vous arrivez en negociation avec une liste precise et des contre-propositions concretes.</p>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm" asChild>
                <a href={`${BASE_URL}/auth/login`}>Analyser mon contrat <ArrowRight className="ml-2 w-4 h-4" /></a>
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
      features: ['2 analyses contrat gratuites', 'Detection clauses abusives', 'Rapport risques structure', 'Export PDF rapport'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Analyses illimitees', '25+ types de clauses', 'Alternatives de negociation', 'Rapport detaille par risque', 'Recommandations IA', 'Historique analyses'],
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
          <p className="text-lg text-slate-500 max-w-xl mx-auto">2 analyses offertes. Un litige evite rembourse des annees d'abonnement.</p>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Detectez les clauses abusives de votre contrat</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez votre contrat PDF — l'IA identifie chaque clause abusive et propose une alternative en moins de 30 secondes.</p>
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
            { value: '8+', label: 'Clauses analysees', icon: Scale },
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
      q: "Qu'est-ce qu'une clause abusive dans un contrat commercial B2B ?",
      a: "En droit commercial B2B (article L442-1 du Code de commerce), une clause abusive est une clause qui cree un desequilibre significatif dans les droits et obligations des parties. Contrairement au B2C, elle n'est pas automatiquement nulle — elle peut etre contestee en justice par la partie lesee. Les plus sanctionnees : limitation de responsabilite disproportionnee, resiliation sans preavis, modification unilaterale des conditions."
    },
    {
      q: "Puis-je refuser de signer un contrat avec des clauses abusives ?",
      a: "Oui, absolument. Vous avez le droit de renegocier ou de refuser de signer tout contrat avant sa conclusion. Identifiez les clauses problematiques, proposez des alternatives ecrites, et negociez par email pour garder une trace. Si le cocontractant refuse toute modification sur des points critiques, c'est un signal d'alerte sur la relation commerciale future."
    },
    {
      q: "Une clause abusive peut-elle etre annulee apres signature ?",
      a: "Oui, mais c'est plus complexe. Apres signature, vous pouvez saisir le tribunal de commerce pour demander la nullite d'une clause creant un desequilibre significatif (art. L442-1). Le juge peut annuler la clause tout en maintenant le reste du contrat. La procedure est longue — mieux vaut negocier avant signature."
    },
    {
      q: "InvoiceAgent peut-il analyser tous types de contrats ?",
      a: "InvoiceAgent analyse les contrats de prestation de services, sous-traitance, lettres de mission, contrats de conseil, conventions de partenariat, et contrats cadre. L'IA detecte les clauses abusives dans ces types de documents en moins de 30 secondes par PDF."
    },
    {
      q: "Faut-il un avocat pour negocier les clauses abusives ?",
      a: "Pour les contrats standards de moins de 50 000€, InvoiceAgent suffit pour identifier les clauses a risque et preparer votre negociation. Pour les contrats importants, multi-annuels ou avec des enjeux de propriete intellectuelle significatifs, un avocat specialise en droit commercial est recommande. Le cout de consultation (500 a 1 500€) est negligeable face aux risques identifies."
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
            Ne signez plus un contrat sans l'avoir analyse
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Detection complete en 30 secondes.</p>
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
    { label: 'Analyse contrat prestation', href: `${BASE_URL}/analyse-contrat-prestation` },
    { label: 'Verifier contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
    { label: 'Risque contrat prestation entreprise', href: `${BASE_URL}/risque-contrat-prestation-entreprise` },
    { label: 'Frais caches contrat entreprise', href: `${BASE_URL}/frais-caches-contrat-entreprise` },
    { label: 'Detection clauses abusives', href: `${BASE_URL}/detection-clauses-abusives` },
    { label: 'Comment analyser contrat fournisseur', href: `${BASE_URL}/comment-analyser-contrat-fournisseur` },
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

export default function ClausesAbusivesContratExemple() {
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
        <NegocierSection />
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