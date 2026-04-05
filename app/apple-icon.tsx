import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#09090b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ color: '#6366f1', fontSize: 80, fontWeight: 700, marginRight: 4 }}>I</span>
        <span style={{ color: 'white', fontSize: 80, fontWeight: 300, fontStyle: 'italic' }}>A</span>
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#818cf8',
          }}
        />
      </div>
    ),
    { ...size }
  );
}