"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Gift, Users, Euro, TrendingUp, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";
const GREEN = "#4ade80";

interface ReferralData {
  referral_code: string | null;
  referral_link: string | null;
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

interface IbanData {
  iban: string | null;
  iban_name: string | null;
  iban_verified: boolean;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pending:    { label: "Invité",      color: MUTED, bg: "#2e405830" },
    registered: { label: "Inscrit",     color: GOLD,  bg: "#e8b84b20" },
    paid:       { label: "Payé ✓",      color: GREEN, bg: "#4ade8020" },
    bonus_paid: { label: "Bonus versé", color: GREEN, bg: "#4ade8020" },
  };
  const s = map[status] ?? { label: status, color: MUTED, bg: "#2e405830" };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function IbanSection() {
  const [ibanData, setIbanData] = useState<IbanData>({ iban: null, iban_name: null, iban_verified: false });
  const [iban, setIban] = useState("");
  const [ibanName, setIbanName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("/api/referral/iban")
      .then(r => r.json())
      .then(d => {
        setIbanData(d);
        if (d.iban) setIban(d.iban);
        if (d.iban_name) setIbanName(d.iban_name);
      });
  }, []);

  function formatIban(value: string) {
    const clean = value.replace(/\s/g, '').toUpperCase();
    return clean.match(/.{1,4}/g)?.join(' ') ?? clean;
  }

  async function saveIban() {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/referral/iban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iban: iban.replace(/\s/g, ''), iban_name: ibanName }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSaved(true);
      setEditing(false);
      setIbanData(prev => ({ ...prev, iban: data.iban, iban_name: ibanName }));
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const hasIban = !!ibanData.iban;

  return (
    <div style={{ background: CARD, border: `1px solid ${hasIban ? "#4ade8040" : BORDER}`, borderRadius: 8, padding: "14px", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CreditCard size={15} color={hasIban ? GREEN : GOLD} />
          <p style={{ fontSize: 10, fontWeight: 700, color: TEXT, margin: 0, letterSpacing: 1, textTransform: "uppercase" }}>Coordonnées bancaires</p>
        </div>
        {hasIban && !editing && (
          <button onClick={() => setEditing(true)} style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "3px 10px", color: MUTED, fontSize: 10, cursor: "pointer", fontWeight: 600 }}>
            Modifier
          </button>
        )}
      </div>

      {!hasIban && (
        <div style={{ background: "#e8b84b15", border: "1px solid #e8b84b40", borderRadius: 6, padding: "8px 10px", marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <AlertCircle size={13} color={GOLD} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 11, color: GOLD, margin: 0, lineHeight: 1.4 }}>
            Ajoutez votre IBAN pour recevoir vos bonus de parrainage par virement bancaire.
          </p>
        </div>
      )}

      {hasIban && !editing && (
        <div style={{ background: BG, border: "1px solid #4ade8030", borderRadius: 6, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <CheckCircle size={12} color={GREEN} />
            <span style={{ fontSize: 10, color: GREEN, fontWeight: 700 }}>IBAN enregistré</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, margin: "0 0 2px", letterSpacing: 1, wordBreak: "break-all" }}>
            {formatIban(ibanData.iban ?? '')}
          </p>
          <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>{ibanData.iban_name}</p>
        </div>
      )}

      {(!hasIban || editing) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div>
            <label style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 4 }}>Nom du titulaire</label>
            <input type="text" value={ibanName} onChange={e => setIbanName(e.target.value)} placeholder="Jean Dupont"
              style={{ width: "100%", background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "9px 10px", fontSize: 13, color: TEXT, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 4 }}>IBAN</label>
            <input type="text" value={iban} onChange={e => setIban(formatIban(e.target.value))} placeholder="FR76 3000 6000 0112 3456 7890 189" maxLength={42}
              style={{ width: "100%", background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "9px 10px", fontSize: 12, color: TEXT, outline: "none", fontFamily: "monospace", boxSizing: "border-box", letterSpacing: 1 }} />
          </div>
          {error && <p style={{ fontSize: 11, color: "#ef4444", margin: 0 }}>{error}</p>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveIban} disabled={saving || !iban || !ibanName}
              style={{ flex: 1, background: saving || !iban || !ibanName ? BORDER : GOLD, color: "#0f1923", border: "none", borderRadius: 6, padding: "10px", fontSize: 11, fontWeight: 800, cursor: saving || !iban || !ibanName ? "not-allowed" : "pointer", letterSpacing: 1, textTransform: "uppercase" }}>
              {saving ? "Enregistrement..." : saved ? "Enregistré !" : "Enregistrer l'IBAN"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(false); setIban(ibanData.iban ?? ""); setIbanName(ibanData.iban_name ?? ""); }}
                style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 14px", color: MUTED, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                Annuler
              </button>
            )}
          </div>
          <p style={{ fontSize: 9, color: MUTED, margin: 0, lineHeight: 1.5 }}>
            Vos coordonnées bancaires sont chiffrées et utilisées uniquement pour le versement de vos bonus.
          </p>
        </div>
      )}
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

  const paid_count = data?.paid_count ?? 0;
  const bonus = ((data?.bonus_total ?? 0) / 100).toFixed(0);
  const nextIn = data?.next_milestone_in ?? 0;

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", width: "100%", overflowX: "hidden" }}>
      <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: "16px 14px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Gift size={18} color={GOLD} />
            <h1 style={{ fontSize: 17, fontWeight: 800, color: TEXT, margin: 0 }}>Programme de parrainage</h1>
          </div>
          <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Invitez vos contacts — gagnez jusqu'à 400€ et plus</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[
            { icon: <Users size={13} color={GOLD} />, label: "Filleuls payés", value: String(paid_count) },
            { icon: <Euro size={13} color={GREEN} />, label: "Bonus accumulé", value: `${bonus}€` },
            { icon: <TrendingUp size={13} color={MUTED} />, label: "Prochain palier", value: nextIn === 0 ? "✓" : `${nextIn}` },
          ].map((s, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}>
                {s.icon}
                <span style={{ fontSize: 8, color: MUTED, textTransform: "uppercase", letterSpacing: 0.3, lineHeight: 1.2 }}>{s.label}</span>
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: TEXT, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Paliers */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px", marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: TEXT, margin: "0 0 12px", letterSpacing: 1, textTransform: "uppercase" }}>Paliers de gains</p>

          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 10 }}>
            {[
              { n: 1,  r: "35€",  l: "1 filleul" },
              { n: 3,  r: "120€", l: "3 filleuls" },
              { n: 10, r: "400€", l: "10 filleuls" },
            ].map((m) => {
              const done = paid_count >= m.n;
              return (
                <div key={m.n} style={{ textAlign: "center" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto 5px", background: done ? GOLD : CARD, border: `2px solid ${done ? GOLD : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: done ? "#0f1923" : MUTED }}>
                    {done ? "✓" : m.n}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: done ? GOLD : MUTED, margin: 0 }}>{m.r}</p>
                  <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>{m.l}</p>
                </div>
              );
            })}
          </div>

          <div style={{ height: 4, background: BORDER, borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", background: GOLD, borderRadius: 4, width: `${Math.min((paid_count / 10) * 100, 100)}%` }} />
          </div>
          <p style={{ fontSize: 9, color: MUTED, textAlign: "center", margin: "0 0 12px" }}>{paid_count}/10 filleuls payés</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            {[
              { l: "1 FILLEUL",  a: "35€",  s: "par parrainage" },
              { l: "3 FILLEULS", a: "120€", s: "+15€ bonus" },
              { l: "10 FILLEULS",a: "400€", s: "+50€ bonus" },
            ].map((p, i) => (
              <div key={i} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "8px 4px", textAlign: "center" }}>
                <p style={{ fontSize: 8, color: MUTED, margin: "0 0 2px", textTransform: "uppercase" }}>{p.l}</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: GOLD, margin: "0 0 1px" }}>{p.a}</p>
                <p style={{ fontSize: 8, color: MUTED, margin: 0 }}>{p.s}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 9, color: MUTED, textAlign: "center", marginTop: 8, marginBottom: 0 }}>♾️ Sans limite — chaque 10 filleuls = +50€ bonus</p>
        </div>

        {/* IBAN */}
        <IbanSection />

        {/* Lien */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px", marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: TEXT, margin: "0 0 10px", letterSpacing: 1, textTransform: "uppercase" }}>Votre lien de parrainage</p>
          <div style={{ display: "flex", gap: 8, alignItems: "stretch", marginBottom: 8 }}>
            <div style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "8px 10px", minWidth: 0 }}>
              <p style={{ fontSize: 9, color: MUTED, margin: "0 0 2px" }}>Votre code</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: GOLD, margin: 0, letterSpacing: 1 }}>{data?.referral_code ?? "—"}</p>
            </div>
            <button onClick={copyLink}
              style={{ display: "flex", alignItems: "center", gap: 5, background: copied ? "#4ade8020" : GOLD, color: copied ? GREEN : "#0f1923", border: copied ? `1px solid ${GREEN}` : "none", borderRadius: 6, padding: "0 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>
          <div style={{ background: BG, borderRadius: 6, padding: "7px 10px", border: `1px solid ${BORDER}`, marginBottom: 10, overflow: "hidden" }}>
            <p style={{ fontSize: 9, color: MUTED, margin: 0, wordBreak: "break-all", lineHeight: 1.5 }}>
              {data?.referral_link ?? "—"}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            {[
              { label: "📧 Email", href: `mailto:?subject=Essayez InvoiceAgent&body=${data?.referral_link ?? ''}` },
              { label: "💼 LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data?.referral_link ?? '')}` },
              { label: "💬 WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(data?.referral_link ?? '')}` },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "8px 4px", textAlign: "center", color: MUTED, fontSize: 10, fontWeight: 600, textDecoration: "none", display: "block" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Comment ca marche */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px", marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: TEXT, margin: "0 0 12px", letterSpacing: 1, textTransform: "uppercase" }}>Comment ça marche</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Partagez votre lien unique à vos contacts, clients ou sur LinkedIn",
              "Votre contact s'inscrit sur InvoiceAgent via votre lien",
              "Dès qu'il souscrit à un plan payant, vous recevez 35€",
              "À 3 et 10 parrainages, des bonus supplémentaires sont débloqués",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: GOLD, color: "#0f1923", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.5 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${BORDER}` }}>
            {(["filleuls", "gains"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "11px 6px", border: "none", cursor: "pointer", background: activeTab === tab ? BG : "transparent", color: activeTab === tab ? GOLD : MUTED, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: activeTab === tab ? `2px solid ${GOLD}` : "2px solid transparent" }}>
                {tab === "filleuls" ? `Mes filleuls (${data?.referrals?.length ?? 0})` : `Mes gains (${data?.payouts?.length ?? 0})`}
              </button>
            ))}
          </div>
          <div style={{ padding: "12px" }}>
            {activeTab === "filleuls" ? (
              !data?.referrals?.length ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Users size={24} color={BORDER} />
                  <p style={{ color: MUTED, fontSize: 12, margin: "8px 0 0" }}>Aucun filleul pour l'instant</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {data.referrals.map((r) => (
                    <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", background: BG, borderRadius: 6, border: `1px solid ${BORDER}`, gap: 6 }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.invited_email}</p>
                        <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>{new Date(r.created_at).toLocaleDateString("fr-FR")}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        {r.status === "paid" && r.bonus_amount > 0 && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: GOLD }}>+{(r.bonus_amount / 100).toFixed(0)}€</span>
                        )}
                        <StatusBadge status={r.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              !data?.payouts?.length ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Euro size={24} color={BORDER} />
                  <p style={{ color: MUTED, fontSize: 12, margin: "8px 0 0" }}>Aucun gain pour l'instant</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {data.payouts.map((p) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", background: BG, borderRadius: 6, border: `1px solid ${BORDER}`, gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: p.type === "milestone_bonus" ? "#e8b84b20" : "#4ade8020", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {p.type === "milestone_bonus" ? <Gift size={11} color={GOLD} /> : <Euro size={11} color={GREEN} />}
                        </div>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, margin: "0 0 1px" }}>{p.type === "milestone_bonus" ? "Bonus palier" : "Bonus parrainage"}</p>
                          <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>{new Date(p.created_at).toLocaleDateString("fr-FR")}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: p.type === "milestone_bonus" ? GOLD : GREEN }}>+{(p.amount / 100).toFixed(0)}€</span>
                        <span style={{ fontSize: 9, fontWeight: 600, color: p.status === "paid" ? GREEN : MUTED, background: p.status === "paid" ? "#4ade8015" : "#2e405830", padding: "2px 5px", borderRadius: 4, whiteSpace: "nowrap" }}>
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

        <p style={{ fontSize: 10, color: MUTED, textAlign: "center", lineHeight: 1.6, margin: 0 }}>
          Les bonus sont versés sous 7 jours ouvrés après validation.<br />
          <a href="mailto:contact@invoiceagent.fr" style={{ color: GOLD }}>contact@invoiceagent.fr</a>
        </p>

      </div>
    </div>
  );
}