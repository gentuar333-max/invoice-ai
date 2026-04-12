"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Clock, Zap, FileText, Search, ShieldCheck, Copy, Ban, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/doublon-facture-que-faire`;

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
  name: 'InvoiceAgent — Doublon Facture Que Faire',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '79' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Que faire si j'ai paye une facture en double ?",
      acceptedAnswer: { '@type': 'Answer', text: "Si vous avez paye une facture en double, contactez immediatement le fournisseur par ecrit en joignant les deux preuves de paiement. Demandez un remboursement ou une imputation sur la prochaine facture. Si le fournisseur refuse, vous pouvez engager une procedure de recouvrement amiable puis judiciaire pour paiement indu." }
    },
    {
      '@type': 'Question',
      name: "Comment detecter un doublon de facture automatiquement ?",
      acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent compare chaque nouvelle facture avec l'historique complet : meme fournisseur, meme montant, meme periode ou reference similaire. Un doublon est detecte en moins de 30 secondes avant tout paiement, meme si la reference de facture est differente." }
    },
    {
      '@type': 'Question',
      name: "Quelles sont les causes les plus frequentes de doublons de facturation ?",
      acceptedAnswer: { '@type': 'Answer', text: "Les 5 causes principales : fournisseur qui renvoie une facture consideree comme non recue, erreur de saisie dans le logiciel comptable, facture recue par deux canaux differents (email + courrier), doublon lors d'une migration de logiciel, et relance automatique du fournisseur qui genere une seconde facture." }
    },
    {
      '@type': 'Question',
      name: "Un doublon de facture emis par erreur doit-il faire l'objet d'un avoir ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. Si vous avez emis une facture en double par erreur, vous devez imperativement emettre un avoir d'annulation pour la facture dupliquee. Ne supprimez jamais une facture emise — la numerotation doit rester chronologique et continue. L'avoir annule legalement la facture doublon." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Doublon Facture Que Faire', item: PAGE_URL }
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
            {[['Causes doublons', '#causes'], ['Que faire', '#quefaire'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
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
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-rose-50 rounded-full blur-3xl opacity-50" />
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold">
                <Copy className="w-4 h-4" />
                Doublon facture — detection et procedure
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Doublon de facture
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">que faire ?</span>
              <span className="block text-4xl sm:text-5xl font-bold text-slate-600 mt-1">procedure et prevention</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Doublon paye par erreur, facture emise en double, relance fournisseur non identifiee — InvoiceAgent detecte les doublons avant paiement et vous guide pour les corriger en conformite fiscale.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '0,5%', label: 'Des achats PME', sub: 'payes en double/an' },
                { value: '< 30s', label: 'Detection doublon', sub: 'avant paiement' },
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
                <a href="#demo">Detecter mes doublons <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-base px-8 h-13 rounded-xl hover:border-violet-300" asChild>
                <a href="#quefaire">Que faire ?</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500">
              {['Doublon detecte avant paiement', 'Avoir d\'annulation guide', 'Historique complet analyse'].map((item) => (
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
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow">
                    <Copy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Facture FOUR-2024-0892</p>
                    <p className="text-xs text-slate-400">Analyse doublon — 14 secondes</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-600">Doublon detecte</span>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Fournisseur', detail: 'SARL Martin Informatique — SIRET 48291736400029', ok: true },
                  { label: 'Montant TTC', detail: '2 988€ TTC (2 490€ HT + 498€ TVA 20%)', ok: true },
                  { label: 'Reference facture', detail: 'FOUR-2024-0892 — nouvelle reference', ok: true },
                  { label: 'Comparaison historique', detail: 'Facture FOUR-2024-0771 identique — payee le 03/10', ok: false },
                  { label: 'Periode de prestation', detail: 'Septembre 2024 — deja facturee et reglee', ok: false },
                  { label: 'Ecart de montant', detail: '2 988€ = identique a FOUR-2024-0771', ok: false },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${!row.ok ? 'bg-red-50 border border-red-100' : 'bg-slate-50 border border-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{row.label}</p>
                      <p className={`text-xs mt-0.5 ${!row.ok ? 'text-red-500' : 'text-slate-400'}`}>{row.detail}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${!row.ok ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {row.ok ? 'OK' : 'Doublon'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-4 border border-rose-100">
                <p className="text-xs font-bold text-rose-700 mb-1">🚫 Ne pas payer — doublon confirme</p>
                <p className="text-xs text-rose-600 leading-relaxed">Cette facture est un doublon de FOUR-2024-0771 deja reglee le 03/10 pour 2 988€. Contactez SARL Martin Informatique pour signaler l'erreur et demander l'annulation.</p>
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
                <p className="text-xs font-bold text-slate-800">2 988€ economies</p>
                <p className="text-xs text-red-500 font-semibold">paiement double evite</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800">Historique</span>
              <span className="text-xs text-violet-500 font-semibold">compare en 14s</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function CausesSection() {
  const causes = [
    {
      icon: FileText,
      title: 'Fournisseur qui renvoie la facture',
      description: "Le fournisseur considere sa facture comme non recue ou non regle et en envoie une seconde — parfois avec une nouvelle reference. Sans systeme de detection, votre comptabilite peut enregistrer les deux et declencher deux paiements.",
      exemple: 'Ex : facture email + relance courrier = 2 enregistrements',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: Copy,
      title: 'Double saisie en comptabilite',
      description: "Une facture recue par email et par courrier est saisie deux fois par deux personnes differentes. Sans controle de doublon automatique, les deux ecritures sont validees et les deux virements executes.",
      exemple: 'Ex : responsable achats + comptable saisissent la meme facture',
      color: 'from-orange-400 to-red-500',
    },
    {
      icon: RefreshCw,
      title: 'Migration de logiciel comptable',
      description: "Lors d'une migration de logiciel, les factures en cours de traitement sont parfois dupliquees dans le nouveau systeme. Les doublons issus de migration sont difficiles a detecter car les references peuvent avoir ete modifiees.",
      exemple: 'Ex : factures Q3 importees deux fois lors du changement d\'ERP',
      color: 'from-violet-400 to-purple-500',
    },
    {
      icon: Search,
      title: 'Reference differente, meme prestation',
      description: "Le fournisseur emet une facture de remplacement avec une nouvelle reference sans annuler l'originale. Les deux factures circulent et peuvent etre toutes deux enregistrees et reglees si aucun rapprochement n'est fait sur le montant et la periode.",
      exemple: 'Ex : FACT-0441 remplacee par FACT-0512 sans avoir',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: AlertTriangle,
      title: 'Relance automatique fournisseur',
      description: "Les systemes de facturation automatique des fournisseurs generent des relances avec de nouvelles references de document. Si votre equipe traite la relance comme une nouvelle facture, le doublon est paye sans que personne ne s'en rende compte.",
      exemple: 'Ex : relance automatique J+30 traitee comme une nouvelle facture',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: ShieldCheck,
      title: 'Facture d\'acompte + solde confondus',
      description: "Une facture d'acompte suivie d'une facture de solde sur le meme projet peut etre confondue avec un doublon — ou inversement, la facture de solde peut etre payee sans deduire l'acompte deja regle, generant un surpaiement.",
      exemple: 'Ex : acompte 30% puis solde 70% paye sur le total HT',
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <section id="causes" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Origines des doublons
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Pourquoi les doublons
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> de factures arrivent</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Ces 6 situations generent la majorite des doublons en PME. InvoiceAgent les detecte toutes automatiquement avant paiement.</p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {causes.map((c, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="group h-full bg-white border-slate-100 hover:shadow-lg transition-all duration-400">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <c.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{c.description}</p>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-700 font-medium">{c.exemple}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function QueFaireSection() {
  const scenarios = [
    {
      titre: 'Vous avez recu une facture doublon — pas encore payee',
      steps: [
        "Verifiez dans votre historique que la facture originale a bien ete reglee (releve bancaire + comptabilite).",
        "Contactez le fournisseur par email en joignant les deux factures et la preuve de paiement de l'originale.",
        "Demandez l'annulation de la facture doublon par un avoir ou une confirmation ecrite de non-facturation.",
        "Classez la facture doublon avec la mention 'Non a payer — doublon de [reference originale]'.",
      ],
      color: 'from-emerald-500 to-teal-600',
      badge: 'Situation 1',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      titre: 'Vous avez paye une facture deux fois par erreur',
      steps: [
        "Rassemblez les deux preuves de virement (releves bancaires) et les deux factures correspondantes.",
        "Envoyez une demande de remboursement ecrite au fournisseur avec les justificatifs — par email avec accusé de reception.",
        "Si le fournisseur refuse ou ne repond pas sous 15 jours, envoyez une mise en demeure par lettre recommandee.",
        "En cas d'echec, engagez une procedure d'injonction de payer au tribunal competent — la preuve de double paiement est irrefutable.",
      ],
      color: 'from-blue-500 to-indigo-600',
      badge: 'Situation 2',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      titre: 'Vous avez emis une facture doublon par erreur',
      steps: [
        "N'annulez jamais une facture emise en modifiant ou supprimant le document original — c'est une irregularite fiscale.",
        "Emettez un avoir d'annulation avec reference explicite a la facture doublon : 'Avoir sur facture N°XXXX — annulation doublon'.",
        "Transmettez l'avoir a votre client avec une explication claire et conservez les deux documents dans votre comptabilite.",
        "Si votre client a deja paye le doublon, remboursez le trop-percu ou imputez-le sur la prochaine facture avec son accord ecrit.",
      ],
      color: 'from-violet-500 to-purple-600',
      badge: 'Situation 3',
      badgeColor: 'bg-violet-100 text-violet-700',
    },
  ];

  return (
    <section id="quefaire" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-semibold">
            Procedure selon votre situation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Doublon de facture —
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> que faire selon votre cas</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">La procedure legale et pratique pour chaque situation de doublon — que vous soyez emetteur ou destinataire.</p>
        </AnimatedSection>

        <div className="space-y-8">
          {scenarios.map((s, i) => (
            <AnimatedSection key={i}>
              <Card className="border-slate-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${s.color} px-6 py-4 flex items-center justify-between`}>
                  <h3 className="text-white font-bold text-sm">{s.titre}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {s.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <span className="text-white text-xs font-black">{j + 1}</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-8 bg-violet-50 rounded-2xl p-6 border border-violet-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-violet-900 mb-2">Evitez ces situations avec InvoiceAgent</h3>
              <p className="text-violet-700 text-sm leading-relaxed mb-4">InvoiceAgent detecte les doublons avant paiement en comparant chaque facture recue avec votre historique complet — meme si la reference a change. Zero doublon paye, zero procedure de remboursement.</p>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm" asChild>
                <a href={`${BASE_URL}/auth/login`}>Detecter mes doublons maintenant <ArrowRight className="ml-2 w-4 h-4" /></a>
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
      features: ['2 analyses gratuites', 'Detection doublons basique', 'Rapport structure', 'Export PDF'],
      cta: 'Commencer gratuitement',
      popular: false,
      href: `${BASE_URL}/auth/login`
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Pour freelances et PME',
      features: ['Analyses illimitees', 'Detection doublons historique complet', 'Alerte avant paiement', 'Rapport detaille', 'Recommandations IA', 'Export analyses'],
      cta: 'Choisir Pro',
      popular: true,
      href: `${BASE_URL}/checkout?plan=pro`
    },
    {
      name: 'Business',
      price: '49',
      description: 'Volume et equipes',
      features: ['Tout Pro inclus', 'Multi-utilisateurs', 'Workflow validation', 'API integration ERP', 'Accompagnement dedie'],
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
          <p className="text-lg text-slate-500 max-w-xl mx-auto">2 analyses offertes. Un doublon detecte rembourse des annees d'abonnement.</p>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Detectez vos doublons de factures maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA compare avec votre historique et detecte chaque doublon en moins de 30 secondes.</p>
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
            { value: '< 30s', label: 'Detection doublon', icon: Clock },
            { value: '100%', label: 'Historique analyse', icon: Search },
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
      q: "Que faire si j'ai paye une facture fournisseur en double ?",
      a: "Procedure en 4 etapes : 1) Rassemblez les deux preuves de virement et les deux factures, 2) Envoyez une demande de remboursement ecrite avec justificatifs, 3) Si pas de reponse sous 15 jours, envoyez une mise en demeure par LRAR, 4) En cas de refus, engagez une injonction de payer au tribunal. La preuve de double paiement est irrefutable — le fournisseur est tenu de rembourser le trop-percu."
    },
    {
      q: "Comment savoir si une facture fournisseur est un doublon ?",
      a: "Comparez 4 criteres : le fournisseur (meme SIRET), le montant (identique ou proche), la periode de prestation (meme mois), et le contenu (meme description). Attention : un doublon peut avoir une reference differente si le fournisseur a reemis la facture. InvoiceAgent compare ces 4 criteres automatiquement sur tout votre historique en 30 secondes."
    },
    {
      q: "Peut-on supprimer une facture doublon emise par erreur ?",
      a: "Non. Une facture emise ne peut jamais etre supprimee — la numerotation doit rester chronologique et continue. La seule procedure legale est d'emettre un avoir d'annulation avec reference explicite a la facture doublon. Conservez les deux documents (facture + avoir) dans votre comptabilite. Toute suppression de facture emise est une irregularite fiscale sanctionnee."
    },
    {
      q: "Les doublons de factures sont-ils frequents en PME ?",
      a: "Oui. Les etudes sectorielles estiment que les doublons de paiement representent en moyenne 0,3% a 0,8% du volume d'achats annuel des PME. Pour une entreprise avec 600 000€ d'achats annuels, cela represente entre 1 800€ et 4 800€ de pertes evitables par an — souvent jamais detectees car les remboursements sont complexes a obtenir."
    },
    {
      q: "InvoiceAgent detecte-t-il les doublons meme si la reference a change ?",
      a: "Oui. InvoiceAgent ne se base pas uniquement sur la reference de facture — il compare le fournisseur, le montant, la periode de prestation et le contenu. Un doublon avec une nouvelle reference mais meme montant et meme fournisseur est detecte. C'est la difference cle avec une verification manuelle qui rate souvent ces cas."
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
            Ne payez plus jamais une facture en double
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">2 analyses gratuites — sans carte bancaire. Detection complete en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-bold underline">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-base px-8 h-14 font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Detecter mes doublons <ArrowRight className="ml-2 w-5 h-5" /></a>
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
    { label: 'Erreurs facture frequentes PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
    { label: 'Comment verifier facture fournisseur', href: `${BASE_URL}/comment-verifier-facture-fournisseur` },
    { label: 'Controle facture automatise', href: `${BASE_URL}/controle-facture-automatise` },
    { label: 'Detection doublons factures', href: `${BASE_URL}/detection-doublons-factures` },
    { label: 'Extraction donnees facture', href: `${BASE_URL}/extraction-donnees-facture` },
    { label: 'Facturation Auto-Entrepreneur', href: `${BASE_URL}/facturation-auto-entrepreneur` },
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

export default function DoblonFactureQueFaire() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <CausesSection />
        <QueFaireSection />
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