import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import LostConnection from './LostConnection';

// window.addEventListener('online', () => {
//   window.location.reload();
// });

function FallbackComponent({ hasConnection }) {
  return hasConnection ? <div>An error has occurred</div> : <LostConnection />;
}

const ErrorBoundary = props => {
  const { children } = props;
  const [hasConnection, setHasConnection] = useState(true);

  useEffect(() => {
    const handleLostConnection = () => {
      setHasConnection(false);
    };

    window.addEventListener('offline', handleLostConnection);

    return () => window.removeEventListener('offline', handleLostConnection);
  }, []);

  return (
    <Sentry.ErrorBoundary
      fallback={
        process.env.NODE_ENV === 'development' ? null : (
          <FallbackComponent hasConnection={hasConnection} />
        )
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;
