"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Calculator, Percent, FileSearch, Clock, RefreshCw, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/erreur-tva-facture-comment-corriger`;

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
  name: 'InvoiceAgent — Correction Erreurs TVA Factures',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '83' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment corriger une erreur de TVA sur une facture ?", acceptedAnswer: { '@type': 'Answer', text: "Emettez une facture rectificative qui annule et remplace la facture erronee. La facture rectificative doit mentionner le numero de la facture d'origine, la nature de l'erreur et les montants corriges. Ne modifiez jamais une facture deja emise — c'est illegal." } },
    { '@type': 'Question', name: "Peut-on modifier une facture deja emise ?", acceptedAnswer: { '@type': 'Answer', text: "Non. Une facture emise ne peut jamais etre modifiee. La seule procedure legale est d'emettre une facture rectificative ou un avoir qui reference la facture d'origine. Toute modification directe constitue un faux en ecriture et expose a des sanctions penales." } },
    { '@type': 'Question', name: "Quel delai pour corriger une erreur de TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Corrigez immediatement des la detection de l'erreur. Pour la TVA collectee, la regularisation doit intervenir avant la declaration de TVA suivante. Pour la TVA deductible, vous disposez de 2 ans pour demander une facture rectificative a votre fournisseur." } },
    { '@type': 'Question', name: "InvoiceAgent detecte-t-il les erreurs de TVA avant emission ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent analyse chaque facture PDF en 5 secondes et detecte les erreurs de taux, les calculs incorrects, les numeros TVA invalides et les mentions manquantes — avant comptabilisation. Corriger avant vaut mieux que rectifier apres." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Erreur TVA facture comment corriger', item: PAGE_URL }
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
                <PenTool className="w-4 h-4 mr-2" />Detecter et corriger avant le controle fiscal
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Erreur TVA facture</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">comment corriger</span>
              <br />
              <span className="text-slate-900">sans risque fiscal</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Mauvais taux, calcul errone, numero invalide — <strong>une erreur de TVA non corrigee peut couter des milliers d'euros en penalites</strong>. InvoiceAgent detecte l'erreur en 5 secondes et vous guide vers la procedure de correction legale.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '< 5s', label: 'Detection erreur', sub: 'par facture PDF' },
                { value: '40%', label: 'Majoration max', sub: 'en cas de controle fiscal' },
                { value: '2 ans', label: 'Delai correction', sub: 'pour TVA deductible' },
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
                <a href="#demo">Verifier mes factures <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Erreur detectee en 5 secondes', 'Procedure de correction guidee', 'Conformite fiscale assuree'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"><RefreshCw className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Facture #F-3291 — Immo Conseil SAS</p><p className="text-sm text-slate-500">2 erreurs detectees — correction requise</p></div>
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-0">2 corrections</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Taux TVA applique — 20%', detail: 'Honoraires de gestion locative — taux correct = 20%', status: 'OK', color: 'emerald' },
                  { point: 'Calcul montant TVA', detail: 'HT 3 800€ x 20% = 760€ mais facture indique 780€ — ecart 20€', status: 'Erreur calcul', color: 'red' },
                  { point: 'Numero TVA fournisseur', detail: 'FR 29 445 678 912 — expire depuis 11/2025 sur VIES', status: 'Expire', color: 'red' },
                  { point: 'Mentions obligatoires', detail: '12/12 mentions presentes et conformes', status: 'OK', color: 'emerald' },
                  { point: 'Date et numerotation', detail: 'Sequence respectee — F-3291 apres F-3290', status: 'OK', color: 'emerald' },
                  { point: 'SIRET fournisseur', detail: '445 678 912 00034 — actif au registre INSEE', status: 'OK', color: 'emerald' },
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
                <p className="text-xs text-violet-600 mt-1">Demandez une facture rectificative avec le montant TVA corrige (760€ au lieu de 780€) et un numero de TVA a jour. Ne comptabilisez pas avant reception du document corrige — la TVA de 780€ ne sera pas deductible en l'etat.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"><RefreshCw className="w-5 h-5 text-violet-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">780€ TVA bloquee</p><p className="text-xs text-violet-600 font-semibold">correction requise</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">Procedure</span><span className="text-xs text-violet-600 font-semibold">guidee par IA</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: AlertTriangle, title: 'Detection des 5 types d\'erreurs TVA', description: "Taux incorrect par rapport a la nature de la prestation, calcul errone entre base HT et montant TVA, numero de TVA invalide ou expire sur VIES, mentions obligatoires absentes et facture adressee a la mauvaise entite juridique. InvoiceAgent detecte ces 5 erreurs en 5 secondes par facture — avant qu'elles ne deviennent des pertes fiscales.", color: 'from-violet-400 to-purple-500' },
    { icon: RefreshCw, title: 'Procedure de facture rectificative', description: "Quand InvoiceAgent detecte une erreur, il vous guide vers la correction legale : demander une facture rectificative au fournisseur qui reference le numero de la facture d'origine, precise la nature de l'erreur et indique les montants corriges. La facture originale n'est jamais modifiee — c'est la loi.", color: 'from-red-400 to-rose-500' },
    { icon: FileText, title: 'Gestion des avoirs et notes de credit', description: "Quand une facture rectificative n'est pas possible, un avoir total ou partiel annule la facture erronee. InvoiceAgent verifie que l'avoir reference correctement la facture d'origine, que les montants sont coherents et que l'impact TVA est correctement calcule pour votre declaration.", color: 'from-orange-400 to-red-500' },
    { icon: Clock, title: 'Alerte sur les delais de correction', description: "Pour la TVA collectee, la regularisation doit intervenir avant la prochaine declaration. Pour la TVA deductible, le delai est de 2 ans. InvoiceAgent vous signale les factures erronees avec le delai restant pour corriger — plus vous attendez, plus le risque de penalites augmente.", color: 'from-amber-400 to-orange-500' },
    { icon: Calculator, title: 'Calcul automatique de l\'impact fiscal', description: "Chaque erreur detectee est accompagnee du calcul precis de l'impact : montant de TVA en jeu, penalites potentielles en cas de controle (0,2% par mois de retard plus majoration de 10% a 40%), et economie realisee par la correction. Vous savez exactement combien chaque correction vous fait economiser.", color: 'from-blue-400 to-indigo-500' },
    { icon: Shield, title: 'Prevention des erreurs recurrentes', description: "InvoiceAgent analyse votre historique et identifie les fournisseurs dont les factures contiennent regulierement des erreurs de TVA. Le tableau de bord classe les fournisseurs par frequence d'erreurs pour que vous puissiez demander une amelioration de leur processus de facturation et eviter les corrections repetitives.", color: 'from-emerald-400 to-teal-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">Detection et correction automatisees</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ce que l'IA fait pour
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> corriger vos erreurs TVA</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Detecter l'erreur, calculer l'impact, guider la correction — InvoiceAgent automatise le processus complet pour que chaque facture soit conforme avant comptabilisation.</p>
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
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['5 factures verifiees', 'Detection erreurs TVA', 'Rapport conformite PDF', 'Procedure correction guidee'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME et freelances', features: ['100 factures/mois', 'Detection 5 types erreurs', 'Calcul impact fiscal', 'Alertes delais correction', 'Fournisseurs a risque identifies', 'Export FEC comptable'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimite', features: ['Factures illimitees', 'Tout Pro inclus', 'Audit contrats fournisseurs', 'Multi-utilisateurs', 'Rapport conformite trimestriel', 'Accompagnement dedie'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Une seule erreur de TVA corrigee avant controle vous economise des milliers d'euros en penalites. L'abonnement Pro coute 29€/mois.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Detectez les erreurs de TVA dans vos factures maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture en PDF — l'IA detecte les erreurs de taux, calcul et mentions en 5 secondes et vous guide vers la correction.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Detection complete', icon: Clock }, { value: '5', label: 'Types d\'erreurs', icon: CheckCircle2 }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
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
    { q: "Comment corriger une erreur de TVA sur une facture ?", a: "La seule procedure legale est d'emettre une facture rectificative qui annule et remplace la facture erronee. Cette facture rectificative doit mentionner le numero de la facture d'origine, la nature exacte de l'erreur et les montants corriges. Ne modifiez jamais directement une facture deja emise — c'est un faux en ecriture passible de sanctions penales. InvoiceAgent detecte l'erreur et vous guide etape par etape vers la correction conforme." },
    { q: "Peut-on modifier une facture deja emise ?", a: "Non, c'est interdit. Une facture emise constitue un document fiscal officiel qui ne peut etre ni modifie ni supprime. La procedure legale consiste a emettre soit une facture rectificative (qui corrige les erreurs), soit un avoir total (qui annule la facture) suivi d'une nouvelle facture correcte. Toute modification directe est un faux en ecriture et expose a des sanctions penales et fiscales." },
    { q: "Quel delai pour corriger une erreur de TVA ?", a: "Pour la TVA collectee (que vous facturez a vos clients), la regularisation doit intervenir avant la declaration de TVA suivante — mensuelle ou trimestrielle selon votre regime. Pour la TVA deductible (factures de vos fournisseurs), vous disposez d'un delai de 2 ans pour demander une facture rectificative. InvoiceAgent detecte les erreurs en 5 secondes pour vous laisser le maximum de temps pour corriger." },
    { q: "Quelles sont les penalites en cas d'erreur de TVA non corrigee ?", a: "En cas de controle fiscal, les penalites dependent de la nature de l'erreur : penalites de retard de 0,2% par mois sur la TVA non versee, majoration de 10% pour declaration inexacte involontaire, et majoration de 40% pour manquement delibere. Sur une TVA de 5 000€, les penalites peuvent atteindre 2 000€ a 3 000€ en quelques mois. InvoiceAgent vous evite ces penalites en detectant les erreurs avant declaration." },
    { q: "InvoiceAgent detecte-t-il les erreurs avant emission ?", a: "Oui. InvoiceAgent analyse chaque facture PDF en 5 secondes et signale les 5 types d'erreurs TVA les plus couteuses — taux incorrect, calcul errone, numero invalide, mentions manquantes et entite erronee. Chaque erreur detectee est accompagnee de l'impact fiscal chiffre et de la procedure de correction a suivre. Corriger avant de comptabiliser est toujours moins couteux que rectifier apres un controle." },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Corrigez vos erreurs de TVA avant que le fisc ne les trouve</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">5 factures verifiees gratuitement — sans carte bancaire. Erreurs detectees et procedure de correction en 5 secondes.</p>
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
    { label: 'TVA recuperable erreur facture', href: `${BASE_URL}/tva-recuperable-erreur-facture` },
    { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
    { label: 'Calcul TVA erreur entreprise', href: `${BASE_URL}/calcul-tva-erreur-entreprise` },
    { label: 'Erreurs facturation TVA artisan', href: `${BASE_URL}/erreurs-facturation-tva-artisan` },
    { label: 'Logiciel TVA automatique PME', href: `${BASE_URL}/logiciel-tva-automatique-pme` },
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

export default function ErreurTvaFactureCommentCorriger() {
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