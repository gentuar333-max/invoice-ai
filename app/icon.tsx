import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#09090b',
          border: '1.5px solid #6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ color: '#6366f1', fontSize: 14, fontWeight: 700, marginRight: 1 }}>I</span>
        <span style={{ color: 'white', fontSize: 14, fontWeight: 300, fontStyle: 'italic' }}>A</span>
        <div
          style={{
            position: 'absolute',
            top: 3,
            right: 3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#818cf8',
          }}
        />
      </div>
    ),
    { ...size }
  );
}