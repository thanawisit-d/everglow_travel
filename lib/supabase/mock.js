const noop = () => {};
const mockQuery = (data = []) => ({
  data,
  error: null,
  count: data.length,
  single: () => ({ data: data[0] || null, error: null }),
  order: () => mockQuery(data),
  eq: () => mockQuery(data),
  neq: () => mockQuery(data),
  in: () => mockQuery(data),
  ilike: () => mockQuery(data),
  gt: () => mockQuery(data),
  gte: () => mockQuery(data),
  lt: () => mockQuery(data),
  lte: () => mockQuery(data),
  range: () => mockQuery(data),
  limit: () => mockQuery(data),
  maybeSingle: () => ({ data: data[0] || null, error: null }),
  select: () => mockQuery(data),
  insert: () => ({ data: null, error: null, single: () => ({ data: null, error: null }) }),
  update: () => ({ data: null, error: null, single: () => ({ data: null, error: null }) }),
  delete: () => ({ data: null, error: null }),
});

export const mockClient = {
  from: () => mockQuery(),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: noop } } }),
  },
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};
