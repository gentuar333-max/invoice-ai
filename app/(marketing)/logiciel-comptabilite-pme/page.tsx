'use client'

import { useState } from 'react'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-comptabilite-pme`

function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const plans = [
    { name: 'Gratuit', monthly: 0, desc: 'Pour tester', items: ['5 factures/mois', '1 analyse contrat', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer', featured: false },
    { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Réconciliation CSV', 'Alertes TVA', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
    { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Factures illimitées', '5 analyses contrats', 'Frais cachés détectés', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
    { name: 'Business', monthly: 49, desc: 'Cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
  ]
  return (
    <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Tarifs transparents</h2>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Sans engagement. Sans frais cachés.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '40px', padding: '6px 20px', marginBottom: '48px' }}>
          <span style={{ fontSize: '14px', color: !annual ? '#1e293b' : '#94a3b8', fontWeight: !annual ? 700 : 400 }}>Mensuel</span>
          <div onClick={() => setAnnual(!annual)} style={{ width: '48px', height: '26px', backgroundColor: annual ? '#2563eb' : '#e2e8f0', borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: annual ? '25px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </div>
          <span style={{ fontSize: '14px', color: annual ? '#1e293b' : '#94a3b8', fontWeight: annual ? 700 : 400 }}>
            Annuel <span style={{ marginLeft: '8px', backgroundColor: '#dbeafe', color: '#1d4ed8', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>-20%</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
            return (
              <div key={plan.name} style={{ backgroundColor: plan.featured ? '#2563eb' : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '24px', borderRadius: '16px', boxShadow: plan.featured ? '0 10px 25px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative', border: plan.featured ? 'none' : '1px solid #e2e8f0' }}>
                {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>}
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px' }}>{plan.name}</h3>
                <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0 2px' }}>{price}€<span style={{ fontSize: '13px', opacity: 0.7, fontWeight: 400 }}>/mois</span></div>
                {annual && plan.monthly > 0 && <div style={{ fontSize: '11px', color: plan.featured ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginBottom: '2px', textDecoration: 'line-through' }}>{plan.monthly}€/mois</div>}
                <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '14px' }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '12px', lineHeight: 1.9, marginBottom: '16px' }}>
                  {plan.items.map((item) => <li key={item} style={{ color: plan.featured ? 'rgba(255,255,255,0.9)' : '#64748b' }}>✓ {item}</li>)}
                </ul>
                <a href={plan.link} style={{ display: 'block', padding: '10px', backgroundColor: plan.featured ? 'white' : 'transparent', border: plan.featured ? 'none' : '2px solid #e2e8f0', borderRadius: '8px', color: plan.featured ? '#2563eb' : '#64748b', textDecoration: 'none', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{plan.cta}</a>
              </div>
            )
          })}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '20px' }}>Annulez à tout moment · Sans frais cachés · Remboursement 14 jours</p>
      </div>
    </section>
  )
}

export default function LogicielComptabilitePMEPage() {
  return (
    <>
      <SharedNav />
      <main>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Factures · Banque · Contrats · Export FEC · RGPD
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Logiciel de comptabilité PME <span style={{ color: '#fbbf24' }}>automatisé par IA</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 16px' }}>
              InvoiceAgent automatise l'extraction de vos factures PDF, la réconciliation bancaire CSV et l'analyse de vos contrats fournisseurs — le tout conforme aux normes comptables françaises.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              Les PME françaises consacrent en moyenne <strong style={{ color: '#fbbf24' }}>3 jours par mois</strong> à la comptabilité manuelle. InvoiceAgent réduit ce temps à moins de 2 heures.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>Gratuit jusqu'à 5 factures/mois</span>
              <span>Sans carte bancaire</span>
              <span>RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '3 jours', label: 'Économisés par mois', sub: 'vs comptabilité manuelle' },
              { value: '98%', label: 'Précision extraction', sub: 'sur factures françaises' },
              { value: '500+', label: 'PME utilisatrices', sub: 'en France' },
              { value: '0€', label: 'Pour commencer', sub: 'sans carte bancaire' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#2563eb' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                Testez le logiciel maintenant
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>
                Importez une facture ou un contrat — voyez le resultat en quelques secondes.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* FONCTIONNALITES */}
        <section id="fonctionnalites" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Tout ce dont votre PME a besoin
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>Un logiciel comptable complet, sans installation, conforme aux normes françaises.</p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                {
                  color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
                  title: 'Extraction factures PDF par IA',
                  desc: "Importez vos factures PDF ou photos. L'IA extrait fournisseur, SIRET, montants HT/TTC, TVA et dates d'échéance en moins de 5 secondes. Précision 98% sur factures françaises.",
                  items: ['Fournisseur, SIRET, N° facture', 'Montants HT, TVA, TTC automatiques', 'Détection des doublons', 'Compatible toutes banques françaises'],
                },
                {
                  color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
                  title: 'Réconciliation bancaire CSV',
                  desc: "Exportez votre relevé CSV depuis votre banque et importez-le en un clic. L'IA rapproche automatiquement chaque transaction avec vos factures avec un score de confiance.",
                  items: ['Import CSV BNP, SG, CA, LCL, CIC', 'Matching automatique par IA', 'Alertes factures impayées', 'Rapport de réconciliation mensuel'],
                },
                {
                  color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
                  title: 'Analyse contrats fournisseurs',
                  desc: "Téléchargez vos contrats PDF. L'IA détecte les clauses dangereuses, frais cachés, pénalités de retard et dates de reconduction tacite avant que vous ne signiez.",
                  items: ['Clauses à risque Haut/Moyen/Faible', 'Frais cachés et commissions', 'Pénalités et conditions abusives', 'Dates de reconduction automatique'],
                },
                {
                  color: '#dc2626', bg: '#fff1f2', border: '#fecaca',
                  title: 'Export FEC et rapports comptables',
                  desc: "Exportez vos données au format FEC (Fichier des Écritures Comptables) standard français, compatible avec tous les logiciels comptables du marché.",
                  items: ['Export FEC natif — Sage, EBP, Cegid', 'Export CSV universel pour Excel', 'Rapport TVA mensuel automatique', 'Alertes déclaration TVA'],
                },
              ].map((f) => (
                <article key={f.title} style={{ backgroundColor: f.bg, borderRadius: '16px', padding: '32px', border: `1px solid ${f.border}` }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: f.color, marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{f.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {f.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', padding: '5px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ color: f.color, flexShrink: 0 }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* POUR QUI */}
        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Pour qui est InvoiceAgent ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'PME 5-50 salariés', desc: 'Automatisez la saisie comptable sans embaucher. Gagnez 3 jours par mois sur les tâches répétitives.' },
                { title: 'Freelances & consultants', desc: 'Gérez vos factures clients et fournisseurs en 30 minutes par mois. Export FEC pour votre comptable.' },
                { title: 'Artisans & TPE', desc: 'Scannez vos reçus avec votre téléphone. L\'IA extrait tout automatiquement, même les photos floues.' },
                { title: 'Experts-comptables', desc: 'Traitez les factures de vos clients plus rapidement. Multi-clients avec rapport par dossier.' },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPATIBILITE */}
        <section style={{ padding: '64px 20px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Compatible avec votre logiciel comptable actuel
            </h2>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>
              Export FEC natif et CSV universel. Aucune migration requise.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {['Sage', 'EBP', 'Cegid', 'QuickBooks', 'Excel', 'FEC Export', 'Coala', 'Pennylane'].map((tool) => (
                <div key={tool} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>{tool}</div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES */}
        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi choisir InvoiceAgent ?
            </h2>
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '40px', textAlign: 'left' }}>
              {[
                'Extraction factures PDF en moins de 5 secondes',
                'Réconciliation bancaire automatique — toutes banques françaises',
                'Détection des frais cachés et clauses abusives dans vos contrats',
                'Export FEC natif compatible Sage, EBP, Cegid',
                'Alertes TVA automatiques chaque mois',
                'Aucune installation — 100% cloud, prêt en 2 minutes',
                'Données hébergées en Europe — conforme RGPD',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#2563eb', flexShrink: 0, fontSize: '16px', marginTop: '2px' }}>→</span>
                  <p style={{ color: '#1e3a8a', fontSize: '15px', margin: 0, fontWeight: 500 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <PricingSection />

        {/* FAQ */}
        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes
            </h2>
            {[
              { q: "InvoiceAgent remplace-t-il un expert-comptable ?", a: "Non. InvoiceAgent automatise les tâches répétitives de saisie et de réconciliation pour vous faire gagner du temps. Votre expert-comptable reste indispensable pour le conseil fiscal et la validation de vos comptes. InvoiceAgent lui simplifie le travail grâce aux exports FEC." },
              { q: "Comment InvoiceAgent est-il conforme aux normes comptables françaises ?", a: "InvoiceAgent exporte vos données au format FEC (Fichier des Écritures Comptables), le standard imposé par l'administration fiscale française. Le logiciel respecte également les règles de calcul et de déclaration de TVA françaises (5.5%, 10%, 20%)." },
              { q: "Puis-je importer mes données depuis mon logiciel comptable actuel ?", a: "Oui. InvoiceAgent accepte les imports CSV depuis Sage, EBP, Cegid et QuickBooks. Vos données existantes peuvent être migrées sans perte. Notre support vous accompagne dans la transition." },
              { q: "L'IA fonctionne-t-elle sur des factures manuscrites ou scannées ?", a: "Oui. L'IA Gemini reconnaît les factures PDF natifs, les scans et les photos prises avec un smartphone, même en mauvaise qualité. Les champs non lisibles sont signalés pour vérification manuelle." },
              { q: "Combien de temps faut-il pour mettre en place InvoiceAgent ?", a: "Moins de 2 minutes. Créez votre compte, importez votre première facture et voyez le résultat immédiatement. Aucune installation, aucune configuration technique requise." },
              { q: "Mes données comptables sont-elles sécurisées ?", a: "Oui. Toutes vos données sont chiffrées et hébergées à Frankfurt, Allemagne (UE), conformément au RGPD. Vos données ne sont jamais partagées avec des tiers et peuvent être supprimées à tout moment sur demande." },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à automatiser votre comptabilité ?</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Commencer gratuitement
          </a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}