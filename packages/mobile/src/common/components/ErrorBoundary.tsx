import { ReactNode, Component, ErrorInfo } from 'react';
import { CardContainer } from './CardContainer';

interface Props {
  children: ReactNode;
  error: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return <CardContainer errorMessage={this.props.error} />;
    }

    return this.props.children;
  }
}
