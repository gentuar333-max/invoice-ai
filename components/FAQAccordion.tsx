'use client'

import { useState } from 'react'

type FAQ = { q: string; a: string }

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            marginBottom: 10,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>{faq.q}</span>
            <span style={{
              width: 28, height: 28, borderRadius: '50%',
              backgroundColor: open === i ? '#2563eb' : '#f1f5f9',
              color: open === i ? 'white' : '#64748b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: 18, fontWeight: 300,
              transition: 'all 0.2s',
            }}>
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <div style={{ padding: '0 24px 20px' }}>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 14, margin: 0 }}>{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}