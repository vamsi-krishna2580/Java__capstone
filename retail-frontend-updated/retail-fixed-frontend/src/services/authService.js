// src/services/authService.js
// Mock implementation of the /auth/* endpoints from the SRS.
// Swap the bodies of these functions for `api.post(...)` calls (see
// src/api/axiosInstance.js) once the Java backend is available — the
// function signatures and return shapes already match the API contract.

// import { users } from '../data/mockData';
import api from '../api/axiosInstance';
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

// export async function loginRequest(email, password) {
//   await delay();
//   const found = users.find((u) => u.email === email && u.password === password);
//   if (!found) {
//     const err = new Error('Invalid email or password');
//     err.status = 401;
//     throw err;
//   }
//   return {
//     accessToken: `mock-access-token-${found.userId}`,
//     refreshToken: `mock-refresh-token-${found.userId}`,
//     expiresIn: 900,
//     user: { userId: found.userId, name: found.name, email: found.email, role: found.role },
//   };
// }

export async function loginRequest(email, password) {
  const { data } = await api.post('/auth/login', {
    email,
    password
  });

  localStorage.setItem("token", data.token);

  return data;
}

// export async function registerRequest({ name, email, password, role = 'CASHIER' }) {
//   await delay();
//   if (users.find((u) => u.email === email)) {
//     const err = new Error('Email already registered');
//     err.status = 409;
//     throw err;
//   }
//   const newUser = { userId: users.length + 1, name, email, password, role };
//   users.push(newUser);
//   return { userId: newUser.userId, name, email, role };
// }

export async function registerRequest(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function refreshTokenRequest(refreshToken) {
  await delay(200);
  if (!refreshToken) {
    const err = new Error('Refresh token expired');
    err.status = 401;
    throw err;
  }
  return { accessToken: `mock-access-token-${Date.now()}`, expiresIn: 900 };
}

export async function logoutRequest() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

// export async function forgotPasswordRequest(email) {
//   await delay();
//   return { message: `If an account exists for ${email}, a reset link has been sent.` };
// }

export async function forgotPasswordRequest(email) {
  const { data } = await api.post(
      "/auth/forgot-password",
      null,
      {
        params: { email }
      }
  );

  return data;
}

// export async function resetPasswordRequest(token, newPassword) {
//   await delay();
//   if (!token) {
//     const err = new Error('Invalid or expired reset token');
//     err.status = 401;
//     throw err;
//   }
//   return { message: 'Password updated successfully' };
// }


export async function resetPasswordRequest(
    token,
    newPassword
) {
  const { data } = await api.post(
      "/auth/reset-password",
      {
        token,
        newPassword
      }
  );

  return data;
}

// export async function getProfileRequest(userId) {
//   await delay(150);
//   const found = users.find((u) => u.userId === userId);
//   return found && { userId: found.userId, name: found.name, email: found.email, role: found.role };
// }

export async function getProfileRequest() {
  const { data } = await api.get('/auth/profile');
  return data;
}

export async function updateProfileRequest(userId, payload) {
  await delay();
  const found = users.find((u) => u.userId === userId);
  if (found) Object.assign(found, payload);
  return { userId, ...payload };
}
