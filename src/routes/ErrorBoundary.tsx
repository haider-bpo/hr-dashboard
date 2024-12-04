import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
          <span className="bg-gradient-to-b from-gray-800 to-transparent bg-clip-text text-[5rem] font-extrabold leading-none text-transparent">
            Something went wrong
          </span>
          <h2 className="my-2 text-2xl font-bold">please try again</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
