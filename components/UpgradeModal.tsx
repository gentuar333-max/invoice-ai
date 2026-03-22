"use client";
import Link from "next/link";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

type Props = {
  reason: "invoices" | "csv" | "reconciliation" | "ai_matching" | "export";
  onClose: () => void;
};

const MESSAGES = {
  invoices: {
    icon: "📄",
    title: "Limite atteinte",
    description: "Vous avez atteint la limite de 5 factures du plan gratuit.",
    cta: "Passez au plan Starter pour importer jusqu'à 100 factures par mois.",
  },
  csv: {
    icon: "🏦",
    title: "Fonctionnalité Premium",
    description: "L'import CSV bancaire est disponible à partir du plan Starter.",
    cta: "Automatisez votre rapprochement bancaire dès 19€/mois.",
  },
  reconciliation: {
    icon: "🔄",
    title: "Fonctionnalité Premium",
    description: "Le rapprochement bancaire est disponible à partir du plan Starter.",
    cta: "Rapprochez vos factures automatiquement dès 19€/mois.",
  },
  ai_matching: {
    icon: "🤖",
    title: "Fonctionnalité Pro",
    description: "L'AI matching avancé est disponible à partir du plan Pro.",
    cta: "Obtenez un matching intelligent avec score de confiance dès 29€/mois.",
  },
  export: {
    icon: "📊",
    title: "Fonctionnalité Premium",
    description: "L'export avancé (FEC, CSV complet) est disponible à partir du plan Starter.",
    cta: "Exportez vos données comptables dès 19€/mois.",
  },
};

export default function UpgradeModal({ reason, onClose }: Props) {
  const msg = MESSAGES[reason];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: CARD, border: `1px solid ${GOLD}40`, borderRadius: 8, padding: "36px 32px", maxWidth: 420, width: "100%", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>{msg.icon}</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
          {msg.title}
        </h2>
        <p style={{ fontSize: 13, color: "#ef4444", fontWeight: 600, marginBottom: 8 }}>
          {msg.description}
        </p>
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 28 }}>
          {msg.cta}
        </p>
        <Link href="/pricing" style={{ display: "block", background: GOLD, color: "#0f1923", padding: "12px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
          VOIR LES PLANS
        </Link>
        <button onClick={onClose} style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 12 }}>
          Continuer avec le plan gratuit
        </button>
      </div>
    </div>
  );
}