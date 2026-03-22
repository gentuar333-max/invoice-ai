 
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

type Props = {
  trigger?: "auto" | "manual";
  onClose?: () => void;
};

export function FeedbackWidget({ trigger = "manual", onClose }: Props) {
  const [visible, setVisible] = useState(trigger === "manual");
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!rating) return;
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from("feedback").insert({
        nps_score: rating,
        improvement: comment || null,
        context: trigger,
      });
      setDone(true);
      setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 2000);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, width: 320, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 22px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>
          {done ? "Merci ! 🎉" : "Votre avis compte"}
        </p>
        <button onClick={handleClose} style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
      </div>

      {done ? (
        <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
          Nous prenons en compte votre retour pour améliorer AgentHub.
        </p>
      ) : (
        <>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.5 }}>
            Comment évaluez-vous votre expérience?
          </p>

          {/* Stars */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 28, padding: 0, transition: "transform 0.1s", transform: hovered !== null && star <= hovered ? "scale(1.2)" : "scale(1)" }}
              >
                <span style={{ color: star <= (hovered ?? rating ?? 0) ? "#f59e0b" : BORDER, transition: "color 0.15s" }}>★</span>
              </button>
            ))}
          </div>

          {/* Label */}
          {(hovered || rating) && (
            <p style={{ fontSize: 11, color: GOLD, marginBottom: 12, letterSpacing: 0.5 }}>
              {(hovered ?? rating) === 1 ? "Très insatisfait" :
               (hovered ?? rating) === 2 ? "Insatisfait" :
               (hovered ?? rating) === 3 ? "Correct" :
               (hovered ?? rating) === 4 ? "Satisfait" :
               "Très satisfait 😍"}
            </p>
          )}

          {/* Comment */}
          {rating && (
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Qu'est-ce qu'on pourrait améliorer? (optionnel)"
              rows={3}
              style={{ width: "100%", background: "#0f1923", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "10px 12px", fontSize: 12, color: TEXT, outline: "none", fontFamily: "inherit", resize: "none", boxSizing: "border-box", marginBottom: 12 }}
            />
          )}

          {/* Submit */}
          {rating && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", background: loading ? BORDER : GOLD, color: "#0f1923", border: "none", padding: "10px", borderRadius: 4, fontSize: 11, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}
            >
              {loading ? "ENVOI..." : "ENVOYER"}
            </button>
          )}