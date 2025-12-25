import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import Loader from "../components/Loader";

export default function LoginScreen() {
  const { token, login, loading } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && token) {
      router.replace("/");
    }
  }, [token, loading]);

  const handleLogin = async () => {
    setSubmitting(true);
    await login(email, password);
    setSubmitting(false);
  };

  if (loading || submitting) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={submitting}
          style={styles.button}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          Demo credentials are pre-filled
        </Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 12,
    color: "#9ca3af",
  },
});
