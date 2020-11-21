import PersistenceKeys from "../constants/persistenceKeys";
import routes from "../constants/routes";

export default function signOut(): void {
  localStorage.setItem(PersistenceKeys.AUTH_TOKEN, "");
  window.location.href = routes.signIn();
}
