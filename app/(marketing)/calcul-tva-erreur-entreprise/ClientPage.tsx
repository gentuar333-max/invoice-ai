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
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
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
function Hero() {
  return (
    <section className="relative lg:min-h-screen flex items-center pt-20 overflow-hidden pb-12 lg:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/20" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 bg-violet-100 text-violet-700 border-0">Detection automatique par IA</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Erreur calcul TVA facture detectee au centime pres</h1>
          <p className="text-lg text-slate-600 mb-8">12% des factures fournisseurs contiennent un ecart de calcul TVA. InvoiceAgent recalcule chaque ligne et detecte les erreurs en 5 secondes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl text-lg px-8 h-14" asChild><a href="#demo">Verifier mes calculs <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 text-lg px-8 h-14" asChild><a href="#tarifs">Voir les tarifs</a></Button>
          </div>
        </div>
      </motion.div>
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
          <h2 className="text-3xl font-bold text-white mb-4">Verifiez vos calculs TVA maintenant</h2>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8"><InlineDemoV2 /></motion.div>
      </div>
    </section>
  );
}
function Pricing() {
  const plans = [
    { name: 'Gratuit', price: '0', features: ['5 factures', 'Detection TVA', 'Rapport PDF'], cta: 'Commencer gratuitement', popular: false, href: BASE_URL + '/auth/login' },
    { name: 'Pro', price: '29', features: ['100 factures/mois', 'Recalcul complet', 'Export FEC'], cta: 'Choisir Pro', popular: true, href: BASE_URL + '/checkout?plan=pro' },
    { name: 'Business', price: '49', features: ['Illimite', 'Tout Pro inclus'], cta: 'Choisir Business', popular: false, href: BASE_URL + '/checkout?plan=business' },
  ];
  return (
    <section id="tarifs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Des prix <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">transparents</span></h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? 'border-2 border-violet-500 shadow-xl bg-white' : 'border-slate-200 bg-white'}>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4"><span className="text-3xl font-bold text-slate-900">{plan.price}</span>{plan.price !== '0' && <span className="text-slate-500 text-sm">/mois</span>}</div>
                <ul className="space-y-2 mb-6">{plan.features.map((f, i) => (<li key={i} className="flex items-center gap-2"><CheckCircle2 className={plan.popular ? 'w-4 h-4 text-violet-600' : 'w-4 h-4 text-emerald-500'} /><span className="text-slate-600 text-xs">{f}</span></li>))}</ul>
                <Button className={plan.popular ? 'w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'w-full bg-slate-100 text-slate-900'} asChild><a href={plan.href}>{plan.cta}</a></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  const faqs = [
    { q: 'Comment verifier le calcul TVA sur une facture ?', a: 'InvoiceAgent recalcule chaque ligne : base HT multipliee par le taux doit donner le montant TVA. Les ecarts sont detectes au centime pres en 5 secondes.' },
    { q: '12% des factures ont vraiment des erreurs de calcul ?', a: 'Oui. Les erreurs d arrondi, inversions HT/TTC et totaux incoherents representent 12% des factures fournisseurs en moyenne. Ces ecarts passent inapercus sans verification systematique.' },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Questions frequentes</h2>
        </AnimatedSection>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-slate-200 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-900 pr-4 text-sm">{faq.q}</span>
                <ChevronDown className={openIndex === index ? 'w-5 h-5 text-slate-500 rotate-180' : 'w-5 h-5 text-slate-500'} />
              </button>
              {openIndex === index && <div className="px-6 pb-6 text-slate-600 text-sm">{faq.a}</div>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Verifiez vos calculs TVA avant qu ils vous coutent</h2>
        <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-xl text-lg px-8 h-14" asChild><a href={BASE_URL + '/auth/login'}>Commencer gratuitement <ArrowRight className="ml-2 w-5 h-5" /></a></Button>
        <p className="mt-6 text-violet-200 text-sm">Sans engagement · RGPD conforme</p>
      </div>
    </section>
  );
}
export default function CalculTvaErreurEntreprise() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navigation /><Hero /><Demo /><Pricing /><FAQ /><CTA /><SharedFooter />
    </div>
  );
}
