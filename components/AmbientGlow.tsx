export default function AmbientGlow() {
  return (
    <>
      <div
        className="fixed pointer-events-none"
        style={{
          top: '15%',
          right: '10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(126,184,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: '20%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
}
