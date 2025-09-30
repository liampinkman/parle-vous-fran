import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export default class GlobalErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: (error as any)?.message ?? "Une erreur s'est produite." };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Vous pouvez connecter ici un système d'analytics/sentry si besoin
    console.error("🌋 GlobalErrorBoundary caught: ", error, errorInfo);
  }

  handleReload = () => {
    try { sessionStorage.removeItem('chunk-reload'); } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-semibold">Une erreur est survenue</h1>
            <p className="text-sm opacity-80">{this.state.message}</p>
            <button onClick={this.handleReload} className="inline-flex items-center justify-center px-4 py-2 rounded-md border">
              Recharger la page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
