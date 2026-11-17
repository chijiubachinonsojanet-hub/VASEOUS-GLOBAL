import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      const demoSession = { user: { email: 'demo@vaseous.com', role: 'admin' } };
      setSession(demoSession);
      setLoading(false);
      return undefined;
    }

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);
    };

    loadSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription?.subscription?.unsubscribe?.();
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      isAuthenticated: Boolean(session),
      user: session?.user ?? null,
      signOut: async () => {
        if (!supabase) {
          setSession(null);
          return;
        }

        await supabase.auth.signOut();
      },
    }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
}
