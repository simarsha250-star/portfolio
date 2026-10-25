import React from 'react';

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/** Catches WebGL / lazy-chunk failures so decorative 3D can never break the page. */
export default class ErrorBoundary extends React.Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('Decorative 3D layer disabled:', error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
