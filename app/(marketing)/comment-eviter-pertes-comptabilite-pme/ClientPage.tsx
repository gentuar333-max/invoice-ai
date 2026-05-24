"use client";
import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Shield, CheckCircle2, ArrowRight, ChevronDown, Sparkles, AlertTriangle, FileSearch, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SharedFooter from '@/components/SharedFooter';
import InlineDemoV2 from '@/components/InlineDemoV2';
const BASE_URL = 'https://invoiceagent.fr';
const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>{children}</motion.div>;
}
function Navigation() {
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href={BASE_URL} className="flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5" /><text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text><text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text><circle cx="28" cy="5" r="3" fill="#818cf8" /></svg>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">InvoiceAgent</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[['Fonctionnalites', '#features'], ['Demo', '#demo'], ['Tarifs', '#tarifs'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex text-slate-600" asChild><a href={BASE_URL + '/auth/login'}>Connexion</a></Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white" asChild><a href={BASE_URL + '/auth/login'}>Essai gratuit</a></Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
function Hero({ title, desc, cta }: { title: string; desc: string; cta: string }) {
  return (
    <section className="relative lg:min-h-screen flex items-center pt-20 overflow-hidden pb-12 lg:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/20" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 border-0">Detection automatique par IA</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">{title}</h1>
          <p className="text-lg text-slate-600 mb-8">{desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-lg px-8 h-14" asChild><a href="#demo">{cta} <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild><a href="#tarifs">Voir les tarifs</a></Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
function Demo({ title }: { title: string }) {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border"><Sparkles className="w-4 h-4 mr-2" />Demo gratuite — sans inscription</Badge>
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8"><InlineDemoV2 /></motion.div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {[{ value: '< 5s', label: 'Analyse complete', icon: Clock }, { value: '6', label: 'Types erreurs', icon: AlertTriangle }, { value: '0 euro', label: 'Pour commencer', icon: Zap }].map((stat) => (
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
    { name: 'Gratuit', price: '0', features: ['5 factures', 'Detection automatique', 'Rapport PDF'], cta: 'Commencer gratuitement', popular: false, href: BASE_URL + '/auth/login' },
    { name: 'Pro', price: '29', features: ['100 factures/mois', 'Detection complete', 'Export FEC', 'Historique'], cta: 'Choisir Pro', popular: true, href: BASE_URL + '/checkout?plan=pro' },
    { name: 'Business', price: '49', features: ['Illimite', 'Tout Pro inclus', 'Multi-utilisateurs'], cta: 'Choisir Business', popular: false, href: BASE_URL + '/checkout?plan=business' },
  ];
  return (
    <section id="tarifs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Commencez gratuitement. Une erreur detectee rembourse des mois d abonnement.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? 'relative border-2 border-violet-500 shadow-xl bg-white' : 'relative border-slate-200 bg-white'}>
              {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2"><Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 px-4 py-1">Plus populaire</Badge></div>}
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4"><span className="text-3xl font-bold text-slate-900">{plan.price}</span>{plan.price !== '0' && <span className="text-slate-500 text-sm">/mois</span>}</div>
                <ul className="space-y-2 mb-6">{plan.features.map((f, i) => (<li key={i} className="flex items-center gap-2 text-left"><CheckCircle2 className={plan.popular ? 'w-4 h-4 text-violet-600 flex-shrink-0' : 'w-4 h-4 text-emerald-500 flex-shrink-0'} /><span className="text-slate-600 text-xs">{f}</span></li>))}</ul>
                <Button className={plan.popular ? 'w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'w-full bg-slate-100 text-slate-900'} asChild><a href={plan.href}>{plan.cta}</a></Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-slate-400 text-sm mt-6">Sans engagement · Annulez a tout moment · Donnees hebergees en Europe</p>
      </div>
    </section>
  );
}
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Questions <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">frequentes</span></h2>
        </AnimatedSection>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-slate-200 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-900 pr-4 text-sm">{faq.q}</span>
                <ChevronDown className={openIndex === index ? 'w-5 h-5 text-slate-500 rotate-180 transition-transform' : 'w-5 h-5 text-slate-500 transition-transform'} />
              </button>
              {openIndex === index && <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">{faq.a}</div>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function CTA({ title, cta }: { title: string; cta: string }) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">5 analyses gratuites — sans carte bancaire.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={BASE_URL + '/auth/login'}>{cta} <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
          <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14" asChild><a href="#demo">Tester la demo</a></Button>
        </div>
        <p className="mt-6 text-violet-200 text-sm">Sans engagement · RGPD conforme · Annulez a tout moment</p>
      </div>
    </section>
  );
}
export default function PageComponent() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navigation />
      <Hero title="Comment eviter les pertes comptables en PME" desc="35 000 euros de pertes evitables par an. InvoiceAgent detecte doublons, TVA non recuperee et surfacturations automatiquement." cta="Auditer mes factures" />
      <Demo title="Auditez vos factures maintenant" />
      <Pricing />
      <FAQ faqs={[{ q: 'Comment fonctionne la detection automatique ?', a: 'Uploadez votre document PDF. L IA analyse en 5 secondes et signale chaque anomalie avec le montant exact et la recommandation d action.' }, { q: 'Combien d analyses gratuites ?', a: '5 analyses sans carte bancaire pour decouvrir les premieres anomalies.' }]} />
      <CTA title="Arretez de perdre de l argent sur vos factures" cta="Auditer mes factures" />
      <SharedFooter />
    </div>
  );
}
