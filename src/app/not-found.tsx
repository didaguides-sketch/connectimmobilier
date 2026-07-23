export default function RootNotFound() {
  return (
    <html lang="fr">
      <body>
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "4rem 1.25rem", fontFamily: "system-ui, sans-serif",
        }}>
          <div style={{ fontSize: "4rem", fontWeight: 800, color: "#7A2331", marginBottom: "1rem" }}>404</div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#20242A", marginBottom: "0.5rem" }}>
            Page introuvable
          </h1>
          <p style={{ color: "#7A828C", marginBottom: "2rem", maxWidth: 420 }}>
            La page que vous recherchez n'existe pas.
          </p>
          <a
            href="/fr"
            style={{
              background: "linear-gradient(135deg,#7A2331,#A33449)", color: "#fff",
              padding: "0.75rem 1.5rem", borderRadius: "0.75rem", fontWeight: 700, textDecoration: "none",
            }}
          >
            Retour à l'accueil
          </a>
        </div>
      </body>
    </html>
  );
}
