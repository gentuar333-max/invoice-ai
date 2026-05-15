"use client";

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Gift, Users, Euro, TrendingUp, Share2, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';

const BASE_URL = 'https://invoiceagent.fr';
const PAGE_URL = `${BASE_URL}/programme-parrainage`;

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
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment fonctionne le programme de parrainage InvoiceAgent ?",
      acceptedAnswer: { '@type': 'Answer', text: "Partagez votre lien unique. Quand votre filleul souscrit a un plan payant, vous recevez 15€. A 3 filleuls payes, vous recevez 50€ au total. A 10 filleuls payes, vous recevez 200€ au total. Sans limite de gains." }
    },
    {
      '@type': 'Question',
      name: "Quand est-ce que je recois mon bonus de parrainage ?",
      acceptedAnswer: { '@type': 'Answer', text: "Le bonus est credite automatiquement des que votre filleul effectue son premier paiement. Le virement sur votre compte bancaire est realise sous 7 jours ouvrés." }
    },
    {
      '@type': 'Question',
      name: "Y a-t-il une limite au nombre de filleuls ?",
      acceptedAnswer: { '@type': 'Answer', text: "Non, il n'y a aucune limite. Vous pouvez parrainer autant de personnes que vous voulez. Chaque nouveau palier de 10 filleuls payes debloque un bonus supplementaire de 50€." }
    },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Programme Parrainage', item: PAGE_URL }
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
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex text-slate-600 hover:text-violet-600" asChild>
              <a href={`${BASE_URL}/auth/login`}>Connexion</a>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md" asChild>
              <a href={`${BASE_URL}/auth/login`}>Commencer gratuitement</a>
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
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-yellow-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-50 rounded-full blur-3xl opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center"
      >
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold">
              <Gift className="w-4 h-4" />
              Programme de parrainage — sans limite de gains
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-slate-900">
            Invitez vos contacts
            <span className="block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">gagnez jusqu'a</span>
            <span className="block text-yellow-500">200€ et plus</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partagez InvoiceAgent avec vos contacts freelances et PME. Chaque filleul qui souscrit vous rapporte <strong>15€</strong> — avec des bonus supplementaires a chaque palier atteint.
          </motion.p>

          {/* Paliers */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
            {[
              { count: '1', amount: '15€', sub: 'par filleul' },
              { count: '3', amount: '50€', sub: '+5€ bonus' },
              { count: '10', amount: '200€', sub: '+50€ bonus' },
            ].map((p) => (
              <div key={p.count} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{p.count} filleul{Number(p.count) > 1 ? 's' : ''}</p>
                <p className="text-3xl font-black text-violet-600 mb-1">{p.amount}</p>
                <p className="text-xs text-slate-400">{p.sub}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-base px-10 h-14 rounded-xl font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Obtenir mon lien de parrainage <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-base px-8 h-14 rounded-xl hover:border-violet-300" asChild>
              <a href="#comment">Comment ca marche</a>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 text-sm text-slate-500 justify-center">
            {['Gratuit pour commencer', 'Bonus automatique des le 1er paiement', 'Sans limite de filleuls'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />{item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CommentSection() {
  const etapes = [
    {
      num: '01',
      icon: Share2,
      title: 'Partagez votre lien unique',
      description: "Connectez-vous a votre compte InvoiceAgent et copiez votre lien de parrainage unique. Partagez-le par email, LinkedIn, WhatsApp ou ou vous voulez.",
      color: 'from-violet-500 to-indigo-600',
    },
    {
      num: '02',
      icon: Users,
      title: 'Votre filleul s\'inscrit',
      description: "Votre contact clique sur votre lien et cree son compte gratuitement. Il beneficie des 2 analyses gratuites offertes a l'inscription — sans carte bancaire.",
      color: 'from-blue-500 to-violet-600',
    },
    {
      num: '03',
      icon: Zap,
      title: 'Il souscrit a un plan payant',
      description: "Des que votre filleul choisit un plan payant (Starter 19€, Pro 29€ ou Business 49€), le bonus est credite automatiquement sur votre compte.",
      color: 'from-emerald-500 to-teal-600',
    },
    {
      num: '04',
      icon: Euro,
      title: 'Vous recevez votre bonus',
      description: "15€ par filleul paye, vires sur votre compte bancaire sous 7 jours ouvrés. A 3 et 10 filleuls, des bonus supplementaires sont debloques automatiquement.",
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="comment" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
            Simple et automatique
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Comment ca
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> marche</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">4 etapes simples — le bonus est verse automatiquement sans aucune demarche de votre part.</p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-300 to-indigo-100 hidden md:block" />
          <div className="space-y-6">
            {etapes.map((e, i) => (
              <AnimatedSection key={i}>
                <div className="flex items-start gap-6">
                  <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${e.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <e.icon className="w-6 h-6 text-white" />
                  </div>
                  <Card className="flex-1 bg-white border-slate-100">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-black text-slate-300 uppercase tracking-wider">Etape {e.num}</span>
                        <h3 className="font-bold text-slate-900">{e.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{e.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PaliersSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold">
            Paliers de gains
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Plus vous parrainez
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"> plus vous gagnez</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Des bonus supplementaires se debloquent automatiquement a chaque palier — sans aucune action de votre part.</p>
        </AnimatedSection>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
          {[
            { filleuls: 1, base: 15, bonus: 0, total: 15, label: 'Premier parrainage', color: 'from-emerald-500 to-teal-600', highlight: false },
            { filleuls: 3, base: 45, bonus: 5, total: 50, label: 'Palier Bronze', color: 'from-amber-500 to-orange-500', highlight: false },
            { filleuls: 10, base: 150, bonus: 50, total: 200, label: 'Palier Or', color: 'from-yellow-500 to-amber-500', highlight: true },
            { filleuls: 20, base: 300, bonus: 50, total: 350, label: 'Palier Platine', color: 'from-violet-500 to-indigo-600', highlight: false },
          ].map((p, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className={`border-slate-100 overflow-hidden ${p.highlight ? 'ring-2 ring-yellow-400 shadow-xl shadow-yellow-100' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-0">
                    <div className={`w-2 self-stretch bg-gradient-to-b ${p.color} flex-shrink-0`} />
                    <div className="flex-1 p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow flex-shrink-0`}>
                          <span className="text-white font-black text-lg">{p.filleuls}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900">{p.filleuls} filleul{p.filleuls > 1 ? 's' : ''} payes</h3>
                            {p.highlight && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">⭐ Populaire</span>}
                          </div>
                          <p className="text-sm text-slate-500">{p.label} · {p.filleuls}×15€ = {p.base}€{p.bonus > 0 ? ` + ${p.bonus}€ bonus` : ''}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-3xl font-black text-slate-900">{p.total}€</p>
                        <p className="text-xs text-slate-400">total percu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="mt-8 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 border border-violet-100 text-center">
          <TrendingUp className="w-8 h-8 text-violet-500 mx-auto mb-3" />
          <h3 className="font-bold text-violet-900 mb-2">Sans limite — pour toujours</h3>
          <p className="text-violet-700 text-sm leading-relaxed max-w-lg mx-auto">Au-dela de 10 filleuls, chaque nouveau palier de 10 debloque un bonus supplementaire de 50€. Il n'y a aucune limite au nombre de filleuls ni au montant total que vous pouvez gagner.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Comment obtenir mon lien de parrainage ?",
      a: "Connectez-vous a votre compte InvoiceAgent, puis rendez-vous dans la section 'Parrainage' de votre dashboard. Votre lien unique est genere automatiquement — copiez-le en un clic et partagez-le."
    },
    {
      q: "Quand est-ce que je recois mon bonus ?",
      a: "Le bonus est credite automatiquement sur votre solde InvoiceAgent des que votre filleul effectue son premier paiement. Le virement bancaire est realise sous 7 jours ouvrés apres la validation."
    },
    {
      q: "Mon filleul doit-il rester abonne pour que je garde mon bonus ?",
      a: "Non. Le bonus de 15€ est definitif des le premier paiement de votre filleul — meme s'il resilie ensuite son abonnement, votre bonus est conserve."
    },
    {
      q: "Y a-t-il une limite au nombre de filleuls ?",
      a: "Aucune limite. Vous pouvez parrainer autant de personnes que vous voulez. Chaque nouveau palier de 10 filleuls payes debloque automatiquement un bonus supplementaire de 50€."
    },
    {
      q: "Puis-je utiliser mon propre lien pour m'inscrire ?",
      a: "Non, le systeme detecte et bloque les auto-parrainages. Le lien doit etre utilise par une autre personne pour etre valide."
    },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5">
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
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Commencez a parrainer maintenant
          </h2>
          <p className="text-lg text-violet-100 mb-3 max-w-2xl mx-auto">Creez votre compte gratuitement et obtenez votre lien de parrainage en 30 secondes.</p>
          <p className="text-violet-200 text-sm mb-10">
            Une question ? <a href="mailto:contact@invoiceagent.fr" className="text-white font-bold underline">contact@invoiceagent.fr</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-base px-10 h-14 font-bold" asChild>
              <a href={`${BASE_URL}/auth/login`}>Obtenir mon lien <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-base px-8 h-14" asChild>
              <a href={`${BASE_URL}/dashboard/referral`}>Voir mon dashboard</a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-sm text-violet-200">
            {['15€ par filleul paye', 'Bonus jusqu\'a 200€', 'Sans limite de gains'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />{item}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function ProgrammeParrainage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <CommentSection />
        <PaliersSection />
        <FAQ />
        <CTA />
        <SharedFooter />
      </div>
    </>
  );
}