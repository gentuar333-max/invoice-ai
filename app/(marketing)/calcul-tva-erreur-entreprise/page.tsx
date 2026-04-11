"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { FileText, Zap, Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, Calculator, Percent, FileSearch, Clock, Hash, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/calcul-tva-erreur-entreprise`;

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
  name: 'InvoiceAgent — Detection Erreurs Calcul TVA Entreprise',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '76' }
};
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quelles sont les erreurs de calcul TVA les plus frequentes ?", acceptedAnswer: { '@type': 'Answer', text: "Les 4 erreurs les plus frequentes : erreurs d'arrondi sur les centimes, inversion entre montant HT et TTC dans la base de calcul, application du mauvais taux sur une ligne multi-taux, et total TTC qui ne correspond pas a la somme HT plus TVA. InvoiceAgent recalcule chaque ligne automatiquement." } },
    { '@type': 'Question', name: "Comment verifier le calcul de TVA sur une facture ?", acceptedAnswer: { '@type': 'Answer', text: "Recalculez chaque ligne : base HT multipliee par le taux doit donner le montant TVA indique. Puis verifiez que HT plus TVA egale TTC. Sur les factures multi-taux, verifiez chaque bloc separement. InvoiceAgent automatise ce recalcul en 5 secondes par facture." } },
    { '@type': 'Question', name: "Une erreur de calcul TVA peut-elle bloquer la deduction ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. En cas de controle fiscal, une facture dont les calculs de TVA sont incoherents peut voir sa TVA deductible rejetee. Le fisc considere qu'une facture avec des calculs errones ne constitue pas un justificatif valable pour la deduction." } },
    { '@type': 'Question', name: "InvoiceAgent recalcule-t-il automatiquement la TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent extrait chaque montant de la facture PDF et recalcule integralement : base HT par taux egale TVA attendue, puis verifie la coherence avec le TTC. Les ecarts sont detectes au centime pres, meme sur les factures multi-taux complexes." } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Calcul TVA erreur entreprise', item: PAGE_URL }
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
                <Hash className="w-4 h-4 mr-2" />Les erreurs de calcul passent inapercues — pas pour l'IA
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Calcul TVA</span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">erreur entreprise</span>
              <br />
              <span className="text-slate-900">detectee au centime</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Erreurs d'arrondi, inversions HT/TTC, mauvais taux sur une ligne — <strong>les erreurs de calcul TVA sont invisibles a l'oeil mais couteuses au controle fiscal</strong>. InvoiceAgent recalcule chaque ligne de chaque facture en 5 secondes.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '0,01€', label: 'Precision detection', sub: 'ecarts au centime pres' },
                { value: '< 5s', label: 'Recalcul complet', sub: 'HT + TVA + TTC verifie' },
                { value: '12%', label: 'Factures avec ecart', sub: 'en moyenne par PME' },
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
                <a href="#demo">Verifier mes calculs <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild>
                <a href="#tarifs">Voir les tarifs</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              {['Recalcul ligne par ligne', 'Multi-taux verifie', 'Arrondis controles'].map((item) => (
                <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>{item}</span></div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative px-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-600/20 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center"><Calculator className="w-6 h-6 text-white" /></div>
                  <div><p className="font-semibold text-slate-900">Facture #F-1847 — ProBuild SARL</p><p className="text-sm text-slate-500">Recalcul TVA en 4 secondes</p></div>
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-0">2 ecarts</Badge>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { point: 'Ligne 1 — Materiaux (TVA 20%)', detail: 'HT 2 450€ x 20% = 490€ ✓ — facture indique 490€', status: 'OK', color: 'emerald' },
                  { point: 'Ligne 2 — Main d\'oeuvre (TVA 10%)', detail: 'HT 3 200€ x 10% = 320€ mais facture indique 340€ — ecart 20€', status: 'Ecart 20€', color: 'red' },
                  { point: 'Ligne 3 — Deplacement (TVA 20%)', detail: 'HT 180€ x 20% = 36€ mais facture indique 36,80€ — arrondi', status: 'Arrondi', color: 'amber' },
                  { point: 'Sous-total TVA 20%', detail: '490€ + 36€ = 526€ — coherent avec le bloc 20%', status: 'OK', color: 'emerald' },
                  { point: 'Sous-total TVA 10%', detail: '320€ attendu mais 340€ facture — ecart confirme', status: 'Ecart', color: 'red' },
                  { point: 'Total TTC', detail: '5 830€ + 866€ = 6 696€ mais facture indique 6 716,80€', status: 'Ecart 20,80€', color: 'red' },
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
                <p className="text-xs text-violet-600 mt-1">Ecart total de 20,80€ sur le calcul TVA. La ligne main d'oeuvre applique un montant TVA superieur au calcul theorique (340€ vs 320€). Demandez une facture rectificative avant comptabilisation — cet ecart sera conteste en cas de controle.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:flex absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"><Calculator className="w-5 h-5 text-violet-600" /></div>
                <div><p className="text-sm font-medium text-slate-900">Ecart 20,80€</p><p className="text-xs text-violet-600 font-semibold">recalcul ligne par ligne</p></div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="hidden lg:flex absolute bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium text-slate-900">Multi-taux</span><span className="text-xs text-violet-600 font-semibold">10% + 20% verifie</span></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Calculator, title: 'Recalcul ligne par ligne automatique', description: "InvoiceAgent ne verifie pas uniquement le total. L'IA recalcule chaque ligne individuellement : quantite multipliee par prix unitaire donne le HT, HT multiplie par taux donne la TVA attendue. Les ecarts entre le calcul theorique et le montant facture sont signales au centime pres — meme sur des factures de 50 lignes.", color: 'from-violet-400 to-purple-500' },
    { icon: Percent, title: 'Verification des factures multi-taux', description: "Une facture peut combiner 5,5% sur l'isolation, 10% sur la main d'oeuvre et 20% sur les equipements neufs. InvoiceAgent verifie la coherence de chaque bloc de taux separement puis controle que la somme des sous-totaux correspond au total general. Les erreurs de ventilation entre taux sont la cause principale d'ecarts sur les factures BTP.", color: 'from-red-400 to-rose-500' },
    { icon: Hash, title: 'Detection des erreurs d\'arrondi', description: "Les arrondis au centime peuvent generer des ecarts systematiques. Sur une facture a 3 decimales arrondie a 2, l'ecart semble negligeable — mais multiplie par 100 lignes et 12 mois, il atteint plusieurs centaines d'euros. InvoiceAgent detecte chaque arrondi non standard et calcule l'impact cumule sur la periode.", color: 'from-orange-400 to-red-500' },
    { icon: XCircle, title: 'Detection des inversions HT/TTC', description: "Appliquer le taux de TVA sur le montant TTC au lieu du HT est une erreur classique qui gonfle artificiellement la TVA. Sur une base de 10 000€, l'ecart entre 10 000 x 20% (2 000€) et 10 000 / 1,20 x 20% (1 666,67€) atteint 333€. InvoiceAgent detecte cette inversion instantanement.", color: 'from-amber-400 to-orange-500' },
    { icon: FileSearch, title: 'Coherence totaux et sous-totaux', description: "Le total HT doit egaler la somme des lignes HT. Le total TVA doit egaler la somme des montants TVA par taux. Le TTC doit egaler HT plus TVA. InvoiceAgent verifie ces trois coherences et signale tout ecart — meme de quelques centimes — car ce sont ces ecarts que le controleur fiscal releve en priorite.", color: 'from-blue-400 to-indigo-500' },
    { icon: AlertTriangle, title: 'Impact fiscal de chaque erreur calcule', description: "Chaque ecart detecte est accompagne du calcul precis de son impact : montant de TVA en trop ou en moins, consequence sur votre declaration, risque de rejet de la deduction et penalites potentielles. Vous savez exactement quel est l'enjeu financier de chaque correction — pour prioriser les plus couteuses.", color: 'from-emerald-400 to-teal-500' },
  ];
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-violet-100 text-violet-700 border-0">Recalcul TVA au centime pres</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ce que l'IA recalcule dans
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> chaque facture</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Chaque montant est recalcule independamment. Les ecarts sont detectes au centime pres. L'impact fiscal est chiffre automatiquement.</p>
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
    { name: 'Gratuit', price: '0', description: 'Pour tester', features: ['5 factures recalculees', 'Detection ecarts TVA', 'Verification multi-taux', 'Rapport ecarts PDF'], cta: 'Commencer gratuitement', popular: false, href: `${BASE_URL}/auth/login` },
    { name: 'Pro', price: '29', description: 'Pour PME', features: ['100 factures/mois', 'Recalcul ligne par ligne', 'Detection arrondis', 'Inversions HT/TTC', 'Impact fiscal calcule', 'Export FEC comptable'], cta: 'Choisir Pro', popular: true, href: `${BASE_URL}/checkout?plan=pro` },
    { name: 'Business', price: '49', description: 'Volume illimite', features: ['Factures illimitees', 'Tout Pro inclus', 'Multi-utilisateurs', 'Audit contrats fournisseurs', 'Rapport trimestriel', 'Accompagnement dedie'], cta: 'Choisir Business', popular: false, href: `${BASE_URL}/checkout?plan=business` },
  ];
  return (
    <section id="tarifs" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 border-0">Tarifs</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">12% des factures fournisseurs contiennent un ecart de calcul TVA. A 29€/mois, chaque ecart detecte vous fait economiser bien plus.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Recalculez la TVA de vos factures maintenant</h2>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto">Uploadez une facture PDF — l'IA recalcule chaque ligne, detecte les ecarts et verifie la coherence des totaux en 5 secondes.</p>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
          <InlineDemoV2 />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '0,01€', label: 'Precision', icon: Calculator }, { value: '< 5s', label: 'Recalcul complet', icon: Clock }, { value: '0€', label: 'Pour commencer', icon: Zap }].map((stat) => (
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
    { q: "Quelles sont les erreurs de calcul TVA les plus frequentes en entreprise ?", a: "Les 4 erreurs les plus frequentes sont : 1) Les erreurs d'arrondi sur les centimes qui s'accumulent sur des factures a nombreuses lignes, 2) L'inversion entre montant HT et TTC dans la base de calcul — appliquer 20% sur le TTC au lieu du HT gonfle la TVA de 3,33%, 3) L'application du mauvais taux sur une ligne dans une facture multi-taux (10% au lieu de 20% sur du materiel neuf), 4) Le total TTC qui ne correspond pas a la somme HT plus TVA a cause d'un cumul d'ecarts sur les lignes." },
    { q: "Comment verifier le calcul de TVA sur une facture fournisseur ?", a: "Recalculez chaque ligne individuellement : base HT multipliee par le taux doit donner exactement le montant de TVA indique. Puis verifiez que la somme des HT egale le total HT, que la somme des TVA egale le total TVA, et que HT plus TVA egale le TTC. Sur les factures multi-taux, verifiez chaque bloc de taux separement. InvoiceAgent automatise ce recalcul integral en 5 secondes par facture avec une precision au centime." },
    { q: "Une erreur de calcul TVA peut-elle bloquer la deduction fiscale ?", a: "Oui. En cas de controle fiscal, une facture dont les calculs de TVA sont incoherents — meme pour quelques euros d'ecart — peut voir sa TVA deductible rejetee. L'administration fiscale considere qu'une facture avec des montants incoherents ne constitue pas un justificatif fiable pour la deduction. Le risque est d'autant plus grand que l'ecart est systematique sur plusieurs factures du meme fournisseur." },
    { q: "InvoiceAgent recalcule-t-il automatiquement la TVA ?", a: "Oui. InvoiceAgent extrait chaque montant de la facture PDF par OCR et recalcule integralement : quantite multipliee par prix unitaire pour le HT de chaque ligne, HT multiplie par taux pour la TVA attendue, somme des lignes pour les sous-totaux, et HT plus TVA pour le TTC. Les ecarts sont detectes au centime pres, meme sur les factures complexes avec plusieurs taux et dizaines de lignes." },
    { q: "Les ecarts de quelques centimes sont-ils vraiment importants ?", a: "Individuellement non, mais cumules sur 12 mois et des centaines de factures, ils peuvent representer plusieurs centaines d'euros d'ecart. De plus, un controleur fiscal qui constate des ecarts systematiques de calcul sur vos factures fournisseurs peut remettre en question l'ensemble de vos deductions TVA — pas seulement les factures avec ecarts. La verification systematique par InvoiceAgent elimine ce risque." },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ne laissez plus un ecart de calcul TVA vous couter des milliers d'euros</h2>
          <p className="text-lg text-violet-100 mb-4 max-w-2xl mx-auto">5 factures recalculees gratuitement — sans carte bancaire. Ecarts detectes au centime pres en 5 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-semibold underline">contact@invoiceagent.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={`${BASE_URL}/auth/login`}>Verifier mes calculs <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
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
    { label: 'Erreur TVA facture comment corriger', href: `${BASE_URL}/erreur-tva-facture-comment-corriger` },
    { label: 'Logiciel TVA automatique PME', href: `${BASE_URL}/logiciel-tva-automatique-pme` },
    { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
    { label: 'Erreurs facturation TVA artisan', href: `${BASE_URL}/erreurs-facturation-tva-artisan` },
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

export default function CalculTvaErreurEntreprise() {
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