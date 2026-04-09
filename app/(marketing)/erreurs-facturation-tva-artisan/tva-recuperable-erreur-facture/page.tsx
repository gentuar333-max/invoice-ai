"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Calculator, Percent, FileSearch, Clock, XCircle, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/tva-recuperable-erreur-facture`;

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
  name: 'InvoiceAgent — Verification TVA Recuperable Factures',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '97' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quelles erreurs de facture empechent de recuperer la TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Les 5 erreurs qui bloquent la deduction de TVA : numero de TVA intracommunautaire invalide ou expire, mentions obligatoires absentes (SIRET, adresse, date), taux de TVA incorrect par rapport a la nature de la prestation, erreur de calcul entre base HT et montant TTC, et facture au nom d'une entite differente du declarant." } },
    { '@type': 'Question', name: "Combien de TVA les PME perdent-elles a cause d'erreurs de factures ?", acceptedAnswer: { '@type': 'Answer', text: "En moyenne, une PME francaise perd 6 200 euros par an de TVA non recuperable a cause d'erreurs formelles sur les factures fournisseurs. Cela represente environ 3% du montant total de TVA deductible. InvoiceAgent detecte ces erreurs avant comptabilisation." } },
    { '@type': 'Question', name: "Comment verifier qu'une facture permet la deduction de TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Verifiez 5 points : 1) Le numero de TVA du fournisseur est valide sur le systeme VIES, 2) Les 12 mentions obligatoires sont presentes, 3) Le taux applique correspond a la nature des biens ou services, 4) Les calculs HT/TVA/TTC sont exacts, 5) La facture est au nom de votre entite juridique." } },
    { '@type': 'Question', name: "InvoiceAgent verifie-t-il le numero de TVA sur VIES ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent extrait automatiquement le numero de TVA intracommunautaire de chaque facture PDF et verifie sa validite. Un numero invalide ou expire est signale immediatement — avant que la facture ne soit comptabilisee et la TVA declaree." } },
    { '@type': 'Question', name: "Que faire si une facture fournisseur comporte une erreur de TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Demandez une facture rectificative au fournisseur avant de comptabiliser. Ne deduisez jamais la TVA sur une facture non conforme — en cas de controle fiscal, la deduction sera rejetee et vous devrez rembourser la TVA plus les penalites. InvoiceAgent identifie ces erreurs en 5 secondes." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'TVA recuperable erreur facture', item: PAGE_URL }
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
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-400/15 to-violet-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 border-0 text-sm font-medium">
                <Calculator className="w-4 h-4 mr-2" />Chaque erreur de facture = TVA perdue definitivement
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">TVA recuperable</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">erreur facture</span>
              <br />
              <span className="text-slate-900">detectee par IA</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Un numero de TVA invalide, une mention manquante, un taux incorrect — <strong>chaque erreur formelle vous prive definitivement de la deduction fiscale</strong>. InvoiceAgent verifie les 5 points de conformite TVA en moins de 5 secondes par facture.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '6 200€', label: 'TVA perdue par an', sub: 'moyenne par PME francaise' },
                { value: '5', label: 'Points verifies', sub: 'par facture en 5 secondes' },
                { value: '100%', label: 'TVA securisee', sub: 'avant comptabilisation' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 rounded-xl p-3 border border-slate-100 text-center">
                  <p className="text-xl font-bold text-violet-700">{stat.value}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl shadow-violet-600/25 text-lg px-8 h-14" asChild>
                <a href="#demo">Verifier ma TVA <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Numero TVA verifie sur VIES', '12 mentions obligatoires controlees', 'Calculs HT/TVA/TTC recalcules'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"><Percent className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Facture #F-7834 — DataTech Solutions</p><p className="text-sm text-slate-500">Verification TVA en 3 secondes</p></div>
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-0">3 erreurs TVA</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Numero TVA intracommunautaire', detail: 'FR 47 892 145 XXX — invalide sur base VIES depuis 02/2026', status: 'Invalide', color: 'red' },
                  { point: 'Mention obligatoire manquante', detail: 'Adresse complete du siege social absente de la facture', status: 'Manquante', color: 'red' },
                  { point: 'Calcul TVA incorrect', detail: 'Base HT 4 200€ × 20% = 840€ mais facture indique 870€', status: 'Ecart 30€', color: 'amber' },
                  { point: 'Taux TVA applique', detail: 'Prestation de conseil — taux 20% correct', status: 'OK', color: 'emerald' },
                  { point: 'Date et numero de facture', detail: 'Numerotation sequentielle respectee', status: 'OK', color: 'emerald' },
                  { point: 'SIRET et forme juridique', detail: 'SAS — SIRET 892 145 678 00012 — actif sur INSEE', status: 'OK', color: 'emerald' },
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
                <p className="text-xs font-semibold text-violet-700">Recommandation IA</p>
                <p className="text-xs text-violet-600 mt-1">Ne comptabilisez pas cette facture en l'etat. Demandez une facture rectificative avec un numero de TVA valide et l'adresse complete. La TVA de 870€ ne sera pas deductible tant que ces erreurs ne sont pas corrigees.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"><Calculator className="w-5 h-5 text-violet-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">870€ TVA en jeu</p><p className="text-xs text-violet-600 font-semibold">3 erreurs bloquantes</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">Verification VIES</span><span className="text-xs text-violet-600 font-semibold">automatique</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Shield, title: 'Validation numero TVA intracommunautaire', description: "InvoiceAgent extrait le numero de TVA de chaque facture PDF et le verifie en temps reel sur la base europeenne VIES. Un numero invalide, expire ou appartenant a une entite radiee est signale immediatement. Sans numero valide, la TVA facturee n'est pas deductible — une perte seche definitive que seule la verification systematique peut prevenir.", color: 'from-violet-400 to-purple-500' },
    { icon: FileText, title: 'Controle des 12 mentions obligatoires', description: "SIRET, adresse complete, date d'emission, numero sequentiel, designation precise des biens ou services, quantite, prix unitaire HT, taux de TVA, montant de TVA, total TTC, conditions de paiement et penalites de retard. InvoiceAgent verifie la presence de chacune. Une seule mention absente peut rendre la TVA non deductible lors d'un controle fiscal.", color: 'from-red-400 to-rose-500' },
    { icon: Calculator, title: 'Recalcul integral HT / TVA / TTC', description: "L'IA recalcule chaque ligne de la facture : base HT × taux = montant TVA attendu, puis verifie la coherence avec le total TTC. Les erreurs d'arrondi, les inversions de montants et les ecarts de calcul sont detectes au centime pres. Sur les factures multi-taux, ces erreurs de calcul sont particulierement frequentes et couteuses.", color: 'from-orange-400 to-red-500' },
    { icon: Percent, title: 'Verification du taux de TVA applicable', description: "Prestation de services a 20%, travaux de renovation a 10%, renovation energetique a 5,5%, produits alimentaires a 5,5% — InvoiceAgent analyse la nature de la prestation decrite et verifie que le taux applique correspond. Un taux incorrect genere un ecart de TVA qui sera rejete en cas de controle.", color: 'from-amber-400 to-orange-500' },
    { icon: Receipt, title: 'Detection des factures non conformes', description: "Facture au nom d'une filiale au lieu de la maison mere, facture pro forma comptabilisee comme facture definitive, avoir non deduit — InvoiceAgent identifie les documents qui ne permettent pas la deduction de TVA et explique pourquoi. Chaque facture non conforme bloquee avant comptabilisation est une perte evitee.", color: 'from-blue-400 to-indigo-500' },
    { icon: AlertTriangle, title: 'Alerte fournisseurs a risque TVA', description: "Certains fournisseurs emettent regulierement des factures avec des erreurs de TVA — numero invalide, mentions manquantes, calculs errones. InvoiceAgent identifie ces fournisseurs recidivistes et vous recommande de leur demander une mise a jour de leur processus de facturation pour securiser vos deductions futures.", color: 'from-emerald-400 to-teal-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">6 verifications TVA automatiques</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ce que l'IA verifie pour
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> securiser votre TVA</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Chaque facture fournisseur est passee au crible avant comptabilisation. Les erreurs sont bloquees avant de devenir des pertes fiscales definitives.</p>
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

function Demo() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Demo gratuite — sans inscription</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Verifiez la TVA de vos factures maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture fournisseur en PDF — l'IA verifie numero TVA, mentions, taux et calculs en moins de 5 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Verification complete', icon: Clock }, { value: '5', label: 'Points TVA verifies', icon: CheckCircle2 }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
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

function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['5 factures verifiees', 'Numero TVA verifie VIES', 'Mentions obligatoires', 'Rapport conformite PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME et freelances', features: ['100 factures/mois', 'Verification TVA complete', 'Recalcul HT/TVA/TTC', 'Alertes fournisseurs a risque', 'Detection factures non conformes', 'Export FEC comptable'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimite', features: ['Factures illimitees', 'Tout Pro inclus', 'Audit contrats fournisseurs', 'Multi-utilisateurs', 'Rapport TVA trimestriel', 'Accompagnement dedie'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Une seule erreur de TVA corrigee rembourse des mois d'abonnement. 6 200€ de TVA perdue par an en moyenne — 29€/mois pour l'eviter.</p>
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

function FAQ() {
  const faqs = [
    { q: "Quelles erreurs de facture empechent de recuperer la TVA ?", a: "Les 5 erreurs qui bloquent la deduction de TVA lors d'un controle fiscal : 1) Numero de TVA intracommunautaire invalide ou expire — la verification VIES est indispensable, 2) Mentions obligatoires absentes (adresse complete, SIRET, designation precise), 3) Taux de TVA incorrect par rapport a la nature de la prestation, 4) Erreur de calcul entre base HT, montant TVA et total TTC, 5) Facture emise au nom d'une entite juridique differente du declarant." },
    { q: "Combien de TVA les PME perdent-elles a cause d'erreurs de factures ?", a: "En moyenne, une PME francaise perd 6 200€ par an de TVA non recuperable a cause d'erreurs formelles sur les factures fournisseurs. Ce montant represente environ 3% de la TVA deductible totale. Les erreurs les plus couteuses sont les numeros de TVA invalides (deduction rejetee integralement) et les mentions manquantes (contestation lors du controle fiscal)." },
    { q: "Comment verifier qu'une facture permet la deduction de TVA ?", a: "Verifiez systematiquement 5 points avant comptabilisation : 1) Le numero de TVA du fournisseur est valide sur le systeme europeen VIES, 2) Les 12 mentions obligatoires sont presentes et exactes, 3) Le taux de TVA applique correspond a la nature des biens ou services factures, 4) Les calculs HT × taux = TVA et HT + TVA = TTC sont corrects, 5) La facture est adressee a votre entite juridique exacte. InvoiceAgent verifie ces 5 points en 5 secondes." },
    { q: "InvoiceAgent verifie-t-il le numero de TVA sur la base VIES ?", a: "Oui. InvoiceAgent extrait automatiquement le numero de TVA intracommunautaire de chaque facture PDF et verifie sa validite sur la base europeenne VIES. Un numero invalide, expire, ou appartenant a une entite radiee ou en liquidation est signale immediatement — avant que la facture ne soit comptabilisee. Cette verification est la plus critique car un numero invalide annule 100% de la TVA deductible sur la facture." },
    { q: "Que faire si une facture fournisseur comporte une erreur de TVA ?", a: "Ne comptabilisez jamais une facture non conforme. Demandez une facture rectificative au fournisseur avec les corrections necessaires. En cas de controle fiscal, toute TVA deduite sur une facture non conforme est rejetee — vous devrez la rembourser avec des penalites de retard (0,2% par mois) et une majoration de 10% a 40%. InvoiceAgent detecte ces erreurs en 5 secondes pour que vous puissiez agir avant comptabilisation." },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ne perdez plus un euro de TVA sur une erreur de facture</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">5 factures verifiees gratuitement — sans carte bancaire. Rapport TVA complet en 5 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Verifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la demo</a></Button>
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
    { label: 'Erreurs facturation TVA artisan', href: `${BASE_URL}/erreurs-facturation-tva-artisan` },
    { label: 'Erreur TVA facture comment corriger', href: `${BASE_URL}/erreur-tva-facture-comment-corriger` },
    { label: 'Perte argent facture entreprise', href: `${BASE_URL}/perte-argent-facture-entreprise` },
    { label: 'Detection frais caches', href: `${BASE_URL}/detection-frais-caches` },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
    { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
    { label: 'Reconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
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

export default function TvaRecuperableErreurFacture() {
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