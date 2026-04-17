export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'var(--font-body)',
        color: 'var(--brown-dark)',
        background: 'var(--cream)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '4rem',
          fontWeight: 700,
        }}
      >
        404
      </h1>
      <p style={{ color: 'var(--text-light)' }}>Page non trouvée</p>
      <a
        href="/"
        style={{
          color: 'var(--brown)',
          textDecoration: 'underline',
          fontSize: '0.9rem',
        }}
      >
        Retour à l&apos;accueil
      </a>
    </div>
  );
}
