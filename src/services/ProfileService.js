// services/ProfileService.js
/**
 * Fetches the current user's profile including referral data
 * @returns {Promise<Object>} User data with referral_code, referral_count, etc.
 */
export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('https://api.hirewave.online/api/auth/profile/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch profile');
  }

  return await response.json();
};