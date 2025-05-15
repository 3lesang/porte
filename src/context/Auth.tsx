import { pb } from "@/pb";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthDialogType = "signin" | "signup";

interface AuthContextType {
  logged?: Boolean;
  dialog?: AuthDialogType;
  openDialog?: (dialog?: AuthDialogType) => void;
}

const AuthContext = createContext<AuthContextType>({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState(pb.authStore.isValid);
  const [dialog, setDialog] = useState<AuthDialogType | undefined>(undefined);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setLogged(pb.authStore.isValid);
      queryClient.invalidateQueries();
    });

    return unsubscribe;
  }, []);

  const openDialog = (dialog?: AuthDialogType) => setDialog(dialog);

  return (
    <AuthContext.Provider value={{ logged, dialog, openDialog }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
