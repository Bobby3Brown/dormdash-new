const BASE = 'https://dormdashbackend.onrender.com';
// const API_URL = `http://localhost:2100`

function getToken(): string | null {
  try {
    return localStorage.getItem('dormdash_token');
  } catch (e) {
    return null;
  }
}

function buildHeaders(isJson = true, extra: Record<string, string> = {}) {
  const headers: Record<string, string> = { ...extra };
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function request(path: string, opts: RequestInit = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const res = await fetch(url, opts);
  const text = await res.text().catch(() => '');
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }
  if (!res.ok) {
    const err: any = new Error(data?.message || data || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function setAuthToken(token: string | null) {
  try {
    if (token) localStorage.setItem('dormdash_token', token);
    else localStorage.removeItem('dormdash_token');
  } catch (e) {
    // ignore
  }
}

// Auth
export async function login(email: string, password: string) {
  return request('/auth/login', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify({ email, password }) });
}

export async function signup(email: string, password: string) {
  return request('/auth/signup', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify({ email, password }) });
}

export async function authTest() {
  return request('/auth/test', { method: 'GET', headers: buildHeaders(false) });
}

export async function health() {
  return request('/', { method: 'GET', headers: buildHeaders(false) });
}

// Profile
export async function createProfile(profile: Record<string, any>) {
  return request('/profile/createProfile', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify(profile) });
}

export async function getProfile(email: string, password: string) {
  return request('/profile/getProfile', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify({ email, password }) });
}

export async function updateProfile(payload: Record<string, any>) {
  return request('/profile/updateProfile', { method: 'PUT', headers: buildHeaders(true), body: JSON.stringify(payload) });
}

// Products
export async function getAllProducts() {
  return request('/product/all', { method: 'GET', headers: buildHeaders(false) });
}

export async function getProductById(id: string) {
  return request(`/product/get/${id}`, { method: 'GET', headers: buildHeaders(false) });
}

export async function getProductsByLogin(email: string, password: string) {
  return request('/product/getByLogin', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify({ email, password }) });
}

export async function createProduct(product: any) {
  return request('/product/create', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify(product) });
}

export async function deleteProduct(id: string, credentials?: { email: string; password: string }) {
  return request(`/product/delete/${id}`, { method: 'DELETE', headers: buildHeaders(true), body: JSON.stringify(credentials || {}) });
}

export async function updateProduct(id: string, payload: Record<string, any>) {
  return request(`/product/${id}`, { method: 'PUT', headers: buildHeaders(true), body: JSON.stringify(payload) });
}

export async function updateAvailability(id: string, availability: string) {
  return request(`/product/${id}/availability`, { method: 'PUT', headers: buildHeaders(true), body: JSON.stringify({ availability }) });
}

export async function searchProducts(query: Record<string, any>) {
  const qs = new URLSearchParams();
  Object.entries(query || {}).forEach(([k, v]) => { if (v !== undefined && v !== null) qs.append(k, String(v)); });
  return request(`/product/search?${qs.toString()}`, { method: 'GET', headers: buildHeaders(false) });
}

export async function getMyProducts() {
  return request('/product/my', { method: 'GET', headers: buildHeaders(false) });
}

// Boosting
export async function getBoostPlans() {
  return request('/boost/plans', { method: 'GET', headers: buildHeaders(false) });
}

export async function initiateBoost(productId: string, planId: string) {
  return request(`/product/${productId}/boost`, { method: 'POST', headers: buildHeaders(true), body: JSON.stringify({ planId }) });
}

// Inquiries
export async function createInquiry(payload: Record<string, any>) {
  return request('/inquiries', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify(payload) });
}

export async function getInquiries(propertyId?: string) {
  const qs = propertyId ? `?propertyId=${encodeURIComponent(propertyId)}` : '';
  return request(`/inquiries${qs}`, { method: 'GET', headers: buildHeaders(false) });
}

// Uploads
export async function uploadImage(file: File) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BASE}/product/1/images`, { method: 'POST', body: fd, headers: buildHeaders(false) });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function uploadImageFetch(file: File) {
  return uploadImage(file);
}

// Favorites
export async function addFavorite(productId: string) {
  return request('/favorites', { method: 'POST', headers: buildHeaders(true), body: JSON.stringify({ productId }) });
}

export async function getFavorites() {
  return request('/favorites', { method: 'GET', headers: buildHeaders(false) });
}

export default {
  setAuthToken,
  login,
  signup,
  authTest,
  health,
  createProfile,
  getProfile,
  updateProfile,
  getAllProducts,
  getProductById,
  getProductsByLogin,
  createProduct,
  deleteProduct,
  updateProduct,
  updateAvailability,
  searchProducts,
  getMyProducts,
  getBoostPlans,
  initiateBoost,
  createInquiry,
  getInquiries,
  uploadImage,
  uploadImageFetch,
  addFavorite,
  getFavorites,
};
