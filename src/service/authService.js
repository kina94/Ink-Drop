import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

export const onAuthChange = (onUserChanged) => {
  firebaseAuth.onAuthStateChanged((user) => {
    onUserChanged(user);
  });
};

export const logout = () => {
  firebaseAuth.signOut();
};

export const getProvider = (providerName) => {
  switch (providerName) {
    case "Google":
      return googleProvider;
    case "Github":
      return githubProvider;
    default:
      throw new Error(`not supported provider: ${providerName}`);
  }
};

export const login = (providerName) => {
  const authProvider = getProvider(providerName);
  return firebaseAuth.signInWithPopup(authProvider);
};