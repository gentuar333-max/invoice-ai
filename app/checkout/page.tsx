"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Gift, Users, Euro, TrendingUp, Share2, Zap, Star } from "lucide-react";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";
const GREEN = "#4ade80";

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
    pending:    { label: "Invité",       color: MUTED,  bg: "#2e405830" },
    registered: { label: "Inscrit",      color: GOLD,   bg: "#e8b84b20" },
    paid:       { label: "Payé ✓",       color: GREEN,  bg: "#4ade8020" },
    bonus_paid: { label: "Bonus versé",  color: GREEN,  bg: "#4ade8020" },
  };
  const s = map[status] ?? { label: status, color: MUTED, bg: "#2e405830" };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, padding: "3px 8px", borderRadius: 4, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
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
              <div style={{ width: 36, height: 36, borderRadius: "50%", margin: "0 auto 6px", background: done ? GOLD : CARD, border: `2px solid ${done ? GOLD : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done ? "#0f1923" : MUTED }}>
                {done ? "✓" : m.count}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: done ? GOLD : MUTED, margin: 0 }}>{m.reward}</p>
              <p style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{m.label}</p>
            </div>
          );
        })}
      </div>
      <div style={{ height: 4, background: BORDER, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${GOLD}, #f59e0b)`, borderRadius: 4, width: `${Math.min((paid_count / 10) * 100, 100)}%`, transition: "width 0.8s ease" }} />
      </div>
      <p style={{ fontSize: 10, color: MUTED, marginTop: 6, textAlign: "center" }}>{paid_count}/10 filleuls payés</p>
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
    <>
      <style>{`
        .referral-wrap { max-width: 680px; margin: 0 auto; padding: 20px 12px; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .palier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .share-row { display: flex; gap: 8px; }
        .share-btn { flex: 1; background: ${BG}; border: 1px solid ${BORDER}; border-radius: 6px; padding: 9px 6px; text-align: center; color: ${MUTED}; font-size: 11px; font-weight: 600; text-decoration: none; }
        .copy-row { display: flex; gap: 10px; align-items: center; }
        .code-box { flex: 1; background: ${BG}; border: 1px solid ${BORDER}; border-radius: 6px; padding: 10px 12px; min-width: 0; }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; }
          .palier-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; }
          .share-row { flex-wrap: wrap; }
          .share-btn { font-size: 10px; padding: 8px 4px; }
          .copy-row { flex-direction: column; gap: 8px; }
          .copy-row button { width: 100%; }
          .referral-wrap { padding: 16px 10px; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: BG, fontFamily: "'DM Sans', sans-serif" }}>
        <div className="referral-wrap">

          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Gift size={20} color={GOLD} />
              <h1 style={{ fontSize: 18, fontWeight: 800, color: TEXT, margin: 0 }}>Programme de parrainage</h1>
            </div>
            <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Invitez vos contacts — gagnez jusqu'à 200€ sans limite</p>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 16 }}>
            {[
              { icon: <Users size={14} color={GOLD} />, label: "Filleuls payés", value: String(data?.paid_count ?? 0) },
              { icon: <Euro size={14} color={GREEN} />, label: "Bonus accumulé", value: `${pendingBonus.toFixed(0)}€` },
              { icon: <TrendingUp size={14} color={MUTED} />, label: "Prochain palier", value: nextMilestone === 0 ? "✓" : String(nextMilestone) },
            ].map((s, i) => (
              <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                  {s.icon}
                  <span style={{ fontSize: 9, color: MUTED, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: 1.2 }}>{s.label}</span>
                </div>
                <p style={{ fontSize: 20, fontWeight: 800, color: TEXT, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Paliers */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: TEXT, margin: "0 0 14px", letterSpacing: 1, textTransform: "uppercase" }}>Paliers de gains</h2>
            <MilestoneBar paid_count={data?.paid_count ?? 0} />
            <div className="palier-grid" style={{ marginTop: 14 }}>
              {[
                { label: "1 filleul", amount: "15€", sub: "par parrainage" },
                { label: "3 filleuls", amount: "50€", sub: "+5€ bonus" },
                { label: "10 filleuls", amount: "200€", sub: "+50€ bonus" },
              ].map((p, i) => (
                <div key={i} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 6px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, color: MUTED, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: 0.3 }}>{p.label}</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: GOLD, margin: "0 0 2px" }}>{p.amount}</p>
                  <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>{p.sub}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 10, color: MUTED, marginTop: 10, textAlign: "center" }}>♾️ Sans limite — chaque 10 filleuls = +50€ bonus</p>
          </div>

          {/* Lien */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: TEXT, margin: "0 0 12px", letterSpacing: 1, textTransform: "uppercase" }}>Votre lien de parrainage</h2>

            <div className="copy-row">
              <div className="code-box">
                <p style={{ fontSize: 9, color: MUTED, margin: "0 0 2px" }}>Votre code</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: GOLD, margin: 0, letterSpacing: 1 }}>{data?.referral_code ?? "—"}</p>
              </div>
              <button
                onClick={copyLink}
                style={{ display: "flex", alignItems: "center", gap: 6, background: copied ? "#4ade8020" : GOLD, color: copied ? GREEN : "#0f1923", border: copied ? `1px solid ${GREEN}` : "none", borderRadius: 6, padding: "11px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, whiteSpace: "nowrap", flexShrink: 0 }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>

            <div style={{ marginTop: 10, background: BG, borderRadius: 6, padding: "8px 12px", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
              <p style={{ fontSize: 10, color: MUTED, margin: 0, wordBreak: "break-all", lineHeight: 1.4 }}>
                {data?.referral_link ?? "—"}
              </p>
            </div>

            <div className="share-row" style={{ marginTop: 10 }}>
              <a href={`mailto:?subject=Essayez InvoiceAgent&body=Commencez gratuitement : ${data?.referral_link}`} className="share-btn">📧 Email</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data?.referral_link ?? '')}`} target="_blank" rel="noopener noreferrer" className="share-btn">💼 LinkedIn</a>
              <a href={`https://wa.me/?text=Essayez InvoiceAgent : ${encodeURIComponent(data?.referral_link ?? '')}`} target="_blank" rel="noopener noreferrer" className="share-btn">💬 WhatsApp</a>
            </div>
          </div>

          {/* Comment ca marche */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: TEXT, margin: "0 0 14px", letterSpacing: 1, textTransform: "uppercase" }}>Comment ça marche</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Partagez votre lien unique à vos contacts, clients ou sur LinkedIn",
                "Votre contact s'inscrit sur InvoiceAgent via votre lien",
                "Dès qu'il souscrit à un plan payant, vous recevez 15€",
                "À 3 et 10 parrainages, des bonus supplémentaires sont débloqués",
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: GOLD, color: "#0f1923", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.5 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}` }}>
              {(["filleuls", "gains"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "12px 8px", border: "none", cursor: "pointer", background: activeTab === tab ? BG : "transparent", color: activeTab === tab ? GOLD : MUTED, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: activeTab === tab ? `2px solid ${GOLD}` : "2px solid transparent" }}>
                  {tab === "filleuls" ? `Mes filleuls (${data?.referrals?.length ?? 0})` : `Mes gains (${data?.payouts?.length ?? 0})`}
                </button>
              ))}
            </div>

            <div style={{ padding: "14px" }}>
              {activeTab === "filleuls" ? (
                !data?.referrals?.length ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <Users size={28} color={BORDER} style={{ marginBottom: 10 }} />
                    <p style={{ color: MUTED, fontSize: 12, margin: 0 }}>Aucun filleul pour l'instant</p>
                    <p style={{ color: MUTED, fontSize: 10, marginTop: 4 }}>Partagez votre lien pour commencer</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.referrals.map((r) => (
                      <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: BG, borderRadius: 6, border: `1px solid ${BORDER}`, gap: 8 }}>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.invited_email}</p>
                          <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>{new Date(r.created_at).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          {r.status === "paid" && r.bonus_amount > 0 && (
                            <span style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>+{(r.bonus_amount / 100).toFixed(0)}€</span>
                          )}
                          <StatusBadge status={r.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                !data?.payouts?.length ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <Euro size={28} color={BORDER} style={{ marginBottom: 10 }} />
                    <p style={{ color: MUTED, fontSize: 12, margin: 0 }}>Aucun gain pour l'instant</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.payouts.map((p) => (
                      <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: BG, borderRadius: 6, border: `1px solid ${BORDER}`, gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.type === "milestone_bonus" ? "#e8b84b20" : "#4ade8020", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {p.type === "milestone_bonus" ? <Gift size={12} color={GOLD} /> : <Euro size={12} color={GREEN} />}
                          </div>
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, margin: "0 0 2px" }}>
                              {p.type === "milestone_bonus" ? "Bonus palier" : "Bonus parrainage"}
                            </p>
                            <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>{new Date(p.created_at).toLocaleDateString("fr-FR")}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                          <span style={{ fontSize: 15, fontWeight: 800, color: p.type === "milestone_bonus" ? GOLD : GREEN }}>+{(p.amount / 100).toFixed(0)}€</span>
                          <span style={{ fontSize: 9, fontWeight: 600, color: p.status === "paid" ? GREEN : MUTED, background: p.status === "paid" ? "#4ade8015" : "#2e405830", padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
                            {p.status === "paid" ? "Versé" : "En attente"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <p style={{ fontSize: 10, color: MUTED, textAlign: "center", lineHeight: 1.6 }}>
            Les bonus sont versés sous 7 jours ouvrés après validation.<br />
            <a href="mailto:contact@invoiceagent.fr" style={{ color: GOLD }}>contact@invoiceagent.fr</a>
          </p>

        </div>
      </div>
    </>
  );
}