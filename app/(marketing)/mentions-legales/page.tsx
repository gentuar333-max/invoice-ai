import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'Mentions Légales | InvoiceAgent',
  description: 'Mentions légales du site InvoiceAgent — éditeur, hébergeur, propriété intellectuelle et données personnelles.',
  alternates: { canonical: `${BASE_URL}/mentions-legales` },
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <>
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', padding: '48px', border: '1px solid #e2e8f0' }}>

          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Mentions légales</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '48px' }}>Dernière mise à jour : mars 2026</p>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>1. Éditeur du site</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              Le site <strong>invoiceagent.fr</strong> est édité par :<br /><br />
              <strong>Riart Mehanja</strong><br />
              Particulier — personne physique<br />
              9 rue Édouard Herriot<br />
              21300 Chenôve, France<br /><br />
              Email : <a href="mailto:contact@invoiceagent.fr" style={{ color: '#6366f1', textDecoration: 'none' }}>contact@invoiceagent.fr</a>
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>2. Hébergement</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              Le site est hébergé par :<br /><br />
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723, États-Unis<br />
              Site : <a href="https://vercel.com" style={{ color: '#6366f1', textDecoration: 'none' }}>vercel.com</a><br /><br />
              Les données utilisateurs sont stockées sur les serveurs de :<br /><br />
              <strong>Supabase Inc.</strong><br />
              Région : Frankfurt, Allemagne (Union Européenne)<br />
              Site : <a href="https://supabase.com" style={{ color: '#6366f1', textDecoration: 'none' }}>supabase.com</a>
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>3. Propriété intellectuelle</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              L'ensemble du contenu du site invoiceagent.fr (textes, images, logos, code source, interface) est la propriété exclusive de Riart Mehanja, sauf mention contraire.
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginTop: '12px' }}>
              Toute reproduction, distribution, modification ou utilisation commerciale de ces contenus, en tout ou en partie, est interdite sans autorisation préalable écrite de l'éditeur.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>4. Données personnelles</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              InvoiceAgent collecte et traite des données personnelles dans le cadre de la fourniture de ses services. Ces traitements sont effectués conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679).
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginTop: '12px' }}>
              Pour toute question relative à vos données personnelles, vous pouvez contacter l'éditeur à l'adresse : <a href="mailto:contact@invoiceagent.fr" style={{ color: '#6366f1', textDecoration: 'none' }}>contact@invoiceagent.fr</a>
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginTop: '12px' }}>
              Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition concernant vos données personnelles. Pour exercer ces droits, adressez votre demande par email à l'adresse ci-dessus.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>5. Cookies</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              Le site invoiceagent.fr utilise des cookies techniques nécessaires au fonctionnement du service (authentification, session utilisateur). Ces cookies ne collectent pas de données à des fins publicitaires.
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginTop: '12px' }}>
              Conformément à la réglementation applicable, vous pouvez désactiver les cookies dans les paramètres de votre navigateur. La désactivation des cookies techniques peut altérer le fonctionnement du service.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>6. Responsabilité</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, il ne peut garantir l'exactitude, la complétude ou l'actualité des informations fournies. L'utilisation des informations du site se fait sous la seule responsabilité de l'utilisateur.
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginTop: '12px' }}>
              InvoiceAgent est un outil d'aide à la gestion comptable. Les données extraites par l'IA doivent être vérifiées par l'utilisateur avant toute utilisation à des fins fiscales ou comptables. L'éditeur ne saurait être tenu responsable des erreurs d'extraction ou d'interprétation des données.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>7. Droit applicable</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>8. Contact</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
              Pour toute question relative au site invoiceagent.fr :<br /><br />
              Email : <a href="mailto:contact@invoiceagent.fr" style={{ color: '#6366f1', textDecoration: 'none' }}>contact@invoiceagent.fr</a><br />
              Adresse : 9 rue Édouard Herriot, 21300 Chenôve, France
            </p>
          </section>

        </div>
      </main>
      <SharedFooter />
    </>
  )
}