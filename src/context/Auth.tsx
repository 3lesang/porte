import { auth } from "@/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthDialogType = "signin" | "signup";

interface AuthContextType {
  user: User | null;
  dialog?: AuthDialogType;
  openDialog?: (dialog?: AuthDialogType) => void;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dialog, setDialog] = useState<AuthDialogType | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const openDialog = (dialog?: AuthDialogType) => setDialog(dialog);

  return (
    <AuthContext.Provider value={{ user, dialog, openDialog }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
