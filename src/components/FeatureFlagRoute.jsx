import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import featureFlags from '../config/featureFlags';

// Component that renders a route only if the feature flag is enabled
const FeatureFlagRoute = ({ flag, element, fallbackPath = "/", ...rest }) => {
  // Check if the feature flag is enabled
  const isFeatureEnabled = featureFlags[flag];
  
  // If feature is enabled, render the route normally
  // Otherwise, redirect to the fallback path
  return isFeatureEnabled ? (
    <Route {...rest} element={element} />
  ) : (
    <Route {...rest} element={<Navigate to={fallbackPath} replace />} />
  );
};

export default FeatureFlagRoute;