"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Gift, Users, TrendingUp, Euro, ChevronRight, Clock } from "lucide-react";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";
const GREEN = "#4ade80";
const RED = "#ef4444";

interface ReferralData {
  referral_code: string;
  referral_link: string;
  bonus_total: number;
  paid_count: number;
  next_milestone_in: number;
  referrals: {
    id: string;
    invited_email: string;
    status: string;
    bonus_amount: number;
    milestone_bonus: number;
    paid_at: string | null;
    created_at: string;
  }[];
  payouts: {
    id: string;
    amount: number;
    type: string;
    status: string;
    created_at: string;
  }[];
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "Invite", color: MUTED, bg: "#2e405830" },
    registered: { label: "Inscrit", color: GOLD, bg: "#e8b84b20" },
    paid: { label: "Paye ✓", color: GREEN, bg: "#4ade8020" },
    bonus_paid: { label: "Bonus verse", color: GREEN, bg: "#4ade8020" },
  };
  const s = map[status] ?? { label: status, color: MUTED, bg: "#2e405830" };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, padding: "3px 8px", borderRadius: 4, letterSpacing: 0.5 }}>
      {s.label}
    </span>
  );
}

function MilestoneBar({ paid_count }: { paid_count: number }) {
  const milestones = [
    { count: 1, reward: "15€", label: "1 filleul" },
    { count: 3, reward: "50€", label: "3 filleuls" },
    { count: 10, reward: "200€", label: "10 filleuls" },
  ];

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        {milestones.map((m) => {
          const done = paid_count >= m.count;
          return (
            <div key={m.count} style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", margin: "0 auto 6px",
                background: done ? GOLD : CARD,
                border: `2px solid ${done ? GOLD : BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                color: done ? "#0f1923" : MUTED,
              }}>
                {done ? "✓" : m.count}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: done ? GOLD : MUTED }}>{m.reward}</p>
              <p style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{m.label}</p>
            </div>
          );
        })}
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, background: BORDER, borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: `linear-gradient(90deg, ${GOLD}, #f59e0b)`,
          borderRadius: 4,
          width: `${Math.min((paid_count / 10) * 100, 100)}%`,
          transition: "width 0.8s ease",
        }} />
      </div>
      <p style={{ fontSize: 10, color: MUTED, marginTop: 6, textAlign: "center" }}>
        {paid_count}/10 filleuls payes
      </p>
    </div>
  );
}

export default function ReferralDashboard() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"filleuls" | "gains">("filleuls");

  useEffect(() => {
    fetch("/api/referral/register")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function copyLink() {
    if (!data?.referral_link) return;
    navigator.clipboard.writeText(data.referral_link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG }}>
        <p style={{ color: MUTED, fontSize: 13 }}>Chargement...</p>
      </div>
    );
  }

  const pendingBonus = (data?.bonus_total ?? 0) / 100;
  const nextMilestone = data?.next_milestone_in ?? 0;

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'DM Sans', sans-serif", padding: "24px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Gift size={22} color={GOLD} />
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, margin: 0, letterSpacing: -0.3 }}>
              Programme de parrainage
            </h1>
          </div>
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
            Invitez vos contacts — gagnez jusqu'a 200€ sans limite
          </p>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { icon: <Users size={16} color={GOLD} />, label: "Filleuls payes", value: data?.paid_count ?? 0, unit: "" },
            { icon: <Euro size={16} color={GREEN} />, label: "Bonus accumule", value: pendingBonus.toFixed(0), unit: "€" },
            { icon: <TrendingUp size={16} color={MUTED} />, label: "Prochain palier", value: nextMilestone === 0 ? "✓" : nextMilestone, unit: nextMilestone === 0 ? "" : " restant" },
          ].map((s, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                {s.icon}
                <span style={{ fontSize: 10, color: MUTED, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</span>
              </div>
              <p style={{ fontSize: 24, fontWeight: 800, color: TEXT, margin: 0 }}>
                {s.value}{s.unit}
              </p>
            </div>
          ))}
        </div>

        {/* Paliers */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "20px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: TEXT, margin: "0 0 16px", letterSpacing: 0.5, textTransform: "uppercase" }}>
            Paliers de gains
          </h2>
          <MilestoneBar paid_count={data?.paid_count ?? 0} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
            {[
              { label: "1 filleul", amount: "15€", sub: "par parrainage" },
              { label: "3 filleuls", amount: "50€", sub: "+5€ bonus" },
              { label: "10 filleuls", amount: "200€", sub: "+50€ bonus" },
            ].map((p, i) => (
              <div key={i} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "12px", textAlign: "center" }}>
                <p style={{ fontSize: 10, color: MUTED, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.label}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: GOLD, margin: "0 0 2px" }}>{p.amount}</p>
                <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>{p.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: MUTED, marginTop: 12, textAlign: "center" }}>
            ♾️ Sans limite — chaque 10 filleuls supplementaires = +50€ bonus
          </p>
        </div>

        {/* Lien referral */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "20px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: TEXT, margin: "0 0 12px", letterSpacing: 0.5, textTransform: "uppercase" }}>
            Votre lien de parrainage
          </h2>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "11px 14px" }}>
              <p style={{ fontSize: 10, color: MUTED, margin: "0 0 2px" }}>Votre code</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: GOLD, margin: 0, letterSpacing: 1 }}>
                {data?.referral_code ?? "—"}
              </p>
            </div>
            <button
              onClick={copyLink}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: copied ? "#4ade8020" : GOLD,
                color: copied ? GREEN : "#0f1923",
                border: copied ? `1px solid ${GREEN}` : "none",
                borderRadius: 6, padding: "12px 18px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                letterSpacing: 0.5, whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copie !" : "Copier le lien"}
            </button>
          </div>

          <div style={{ marginTop: 12, background: BG, borderRadius: 6, padding: "10px 14px", border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 11, color: MUTED, margin: 0, wordBreak: "break-all" }}>
              {data?.referral_link ?? "—"}
            </p>
          </div>

          {/* Share buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <a
              href={`mailto:?subject=Essayez InvoiceAgent gratuitement&body=Bonjour, je vous recommande InvoiceAgent pour automatiser vos factures. Utilisez mon lien pour commencer gratuitement : ${data?.referral_link}`}
              style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "9px", textAlign: "center", color: MUTED, fontSize: 11, fontWeight: 600, textDecoration: "none" }}
            >
              📧 Email
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data?.referral_link ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "9px", textAlign: "center", color: MUTED, fontSize: 11, fontWeight: 600, textDecoration: "none" }}
            >
              💼 LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=Essayez InvoiceAgent gratuitement avec mon lien : ${encodeURIComponent(data?.referral_link ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "9px", textAlign: "center", color: MUTED, fontSize: 11, fontWeight: 600, textDecoration: "none" }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Comment ca marche */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "20px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: TEXT, margin: "0 0 16px", letterSpacing: 0.5, textTransform: "uppercase" }}>
            Comment ca marche
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { num: "1", text: "Partagez votre lien unique a vos contacts, clients ou sur LinkedIn" },
              { num: "2", text: "Votre contact s'inscrit sur InvoiceAgent via votre lien" },
              { num: "3", text: "Des qu'il souscrit a un plan payant, vous recevez 15€" },
              { num: "4", text: "A 3 et 10 parrainages, des bonus supplementaires sont debloques" },
            ].map((s) => (
              <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: GOLD, color: "#0f1923", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.num}
                </div>
                <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs: filleuls / gains */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}` }}>
            {(["filleuls", "gains"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: "12px", border: "none", cursor: "pointer",
                  background: activeTab === tab ? BG : "transparent",
                  color: activeTab === tab ? GOLD : MUTED,
                  fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                  textTransform: "uppercase",
                  borderBottom: activeTab === tab ? `2px solid ${GOLD}` : "2px solid transparent",
                }}
              >
                {tab === "filleuls" ? `Mes filleuls (${data?.referrals?.length ?? 0})` : `Mes gains (${data?.payouts?.length ?? 0})`}
              </button>
            ))}
          </div>

          <div style={{ padding: "16px" }}>
            {activeTab === "filleuls" ? (
              data?.referrals?.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <Users size={32} color={BORDER} style={{ marginBottom: 12 }} />
                  <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>Aucun filleul pour l'instant</p>
                  <p style={{ color: MUTED, fontSize: 11, marginTop: 6 }}>Partagez votre lien pour commencer</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {data?.referrals?.map((r) => (
                    <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: BG, borderRadius: 6, border: `1px solid ${BORDER}` }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: "0 0 3px" }}>
                          {r.invited_email}
                        </p>
                        <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>
                          Invite le {new Date(r.created_at).toLocaleDateString("fr-FR")}
                          {r.paid_at && ` · Paye le ${new Date(r.paid_at).toLocaleDateString("fr-FR")}`}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {r.status === "paid" && r.bonus_amount > 0 && (
                          <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>
                            +{(r.bonus_amount / 100).toFixed(0)}€
                          </span>
                        )}
                        <StatusBadge status={r.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              data?.payouts?.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <Euro size={32} color={BORDER} style={{ marginBottom: 12 }} />
                  <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>Aucun gain pour l'instant</p>
                  <p style={{ color: MUTED, fontSize: 11, marginTop: 6 }}>Les bonus apparaissent ici apres paiement</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {data?.payouts?.map((p) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: BG, borderRadius: 6, border: `1px solid ${BORDER}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: p.type === "milestone_bonus" ? "#e8b84b20" : "#4ade8020", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {p.type === "milestone_bonus" ? <Gift size={14} color={GOLD} /> : <Euro size={14} color={GREEN} />}
                        </div>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT, margin: "0 0 2px" }}>
                            {p.type === "milestone_bonus" ? "Bonus palier" : "Bonus parrainage"}
                          </p>
                          <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>
                            {new Date(p.created_at).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: p.type === "milestone_bonus" ? GOLD : GREEN }}>
                          +{(p.amount / 100).toFixed(0)}€
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: p.status === "paid" ? GREEN : MUTED, background: p.status === "paid" ? "#4ade8015" : "#2e405830", padding: "3px 8px", borderRadius: 4 }}>
                          {p.status === "paid" ? "Verse" : "En attente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        {/* Note bas de page */}
        <p style={{ fontSize: 11, color: MUTED, textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
          Les bonus sont verses sur votre compte bancaire sous 7 jours ouvrés apres validation.
          <br />Une question ? <a href="mailto:contact@invoiceagent.fr" style={{ color: GOLD }}>contact@invoiceagent.fr</a>
        </p>

      </div>
    </div>
  );
}