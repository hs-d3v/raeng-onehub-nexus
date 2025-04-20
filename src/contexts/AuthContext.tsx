
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Type for representing a user
interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  badge?: string;
  department?: string;
}

// Authentication context type
interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithQRCode: (qrData: string) => Promise<void>;
  loginWithBiometrics: (biometricId: string, type: 'facial' | 'digital') => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
  navigate?: NavigateFunction;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, navigate }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to map Supabase user to our AuthUser type
  const mapSupabaseUser = (user: User | null): AuthUser | null => {
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.user_metadata.name || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      avatar: user.user_metadata.avatar_url,
      role: user.user_metadata.role || 'user',
      // Additional fields can be added from user.user_metadata if needed
    };
  };

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Synchronously update state
        setSession(currentSession);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const mappedUser = mapSupabaseUser(currentSession?.user || null);
          setUser(mappedUser);
          
          // Record login activity (deferred with setTimeout to avoid deadlocks)
          if (mappedUser && event === 'SIGNED_IN') {
            setTimeout(() => {
              // Here you would record login activity to your database
              console.log('User signed in:', mappedUser.email);
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        if (currentSession) {
          // Map the user data to our format
          const mappedUser = mapSupabaseUser(currentSession.user);
          setUser(mappedUser);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
        toast({
          title: 'Erro de autenticação',
          description: 'Não foi possível verificar sua sessão',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Standard email/password login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        let errorMessage = 'Erro ao fazer login';
        if (error.message === 'Invalid login credentials') {
          errorMessage = 'E-mail ou senha inválidos';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Por favor, confirme seu e-mail antes de fazer login';
        }
        throw new Error(errorMessage);
      }
      
      toast({
        title: 'Login bem-sucedido',
        description: 'Bem-vindo de volta!',
      });
      
      if (navigate) navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: 'Falha no login',
        description: error instanceof Error ? error.message : 'Credenciais inválidas',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // QR Code badge login - AGORA CHAMA A EDGE FUNCTION PARA VERIFICAR O COLABORADOR
  const loginWithQRCode = async (qrData: string) => {
    setIsLoading(true);
    
    try {
      // Chamar a edge function para verificar o QR code
      const { data: response, error } = await supabase.functions.invoke('verificar-qr-code', {
        body: { qrHash: qrData }
      });
      
      if (error || !response.success) {
        throw new Error(error?.message || response?.error || 'Crachá não reconhecido');
      }
      
      // Se o colaborador tem um usuário associado, podemos fazer login
      if (response.usuario?.id) {
        // Aqui seria integrado o login real com supabase.auth.signIn
        // Esta é uma simulação para manter a compatibilidade com o fluxo atual
        const badgeUser: AuthUser = {
          id: response.usuario.id,
          name: response.usuario.nome || response.colaborador.nome,
          email: response.usuario.email || 'colaborador@exemplo.com',
          role: response.usuario.meta_data?.role || 'colaborador',
          badge: response.colaborador.matricula,
          department: response.colaborador.departamento
        };
        
        // Simular o login (em produção, seria feito via token)
        setUser(badgeUser);
        
        toast({
          title: 'Login com crachá bem-sucedido',
          description: `Bem-vindo, ${badgeUser.name}!`,
        });
      } else {
        // O colaborador não tem usuário associado, apenas retornamos os dados
        // mas não alteramos o estado de autenticação
        toast({
          title: 'Colaborador identificado',
          description: `${response.colaborador.nome} autenticado com sucesso.`,
        });
      }
      
      // Não redirecionamos automaticamente para permitir os fluxos
    } catch (error) {
      console.error('Erro no login com crachá:', error);
      toast({
        title: 'Falha na autenticação',
        description: error instanceof Error ? error.message : 'Crachá inválido ou expirado',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Biometric login (facial or digital) - CONECTAR COM EDGE FUNCTION
  const loginWithBiometrics = async (biometricId: string, type: 'facial' | 'digital') => {
    setIsLoading(true);
    
    try {
      // Chamar a edge function para processar a biometria
      const { data: response, error } = await supabase.functions.invoke('processar-biometria', {
        body: {
          tipoBiometria: type,
          dadosBiometricos: biometricId,
          empresaId: user?.id || 'default-empresa'
        }
      });
      
      if (error || !response?.success) {
        throw new Error(error?.message || response?.error || 'Biometria não reconhecida');
      }
      
      if (response.usuarioId) {
        // Similar ao loginWithQRCode, aqui seria integrado o login real
        const biometricUser: AuthUser = {
          id: response.usuarioId,
          name: response.colaboradorNome || 'Colaborador',
          email: 'colaborador@exemplo.com', // Simulação
          role: 'colaborador',
          badge: response.colaboradorId?.substring(0, 8),
          department: 'Departamento'
        };
        
        setUser(biometricUser);
        
        toast({
          title: `Login biométrico ${type === 'facial' ? 'facial' : 'digital'} bem-sucedido`,
          description: `Bem-vindo, ${biometricUser.name}!`,
        });
      } else {
        toast({
          title: 'Colaborador identificado',
          description: `Biometria ${type} processada com sucesso.`,
        });
      }
    } catch (error) {
      console.error(`Erro no login biométrico ${type}:`, error);
      toast({
        title: 'Falha na autenticação biométrica',
        description: error instanceof Error ? error.message : 'Biometria não reconhecida',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Clear local user state
      setUser(null);
      setSession(null);
      
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso',
      });
      
      if (navigate) navigate('/');
    } catch (error) {
      console.error('Erro no logout:', error);
      toast({
        title: 'Erro ao sair',
        description: 'Não foi possível desconectar sua conta',
        variant: 'destructive'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithQRCode,
        loginWithBiometrics,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
