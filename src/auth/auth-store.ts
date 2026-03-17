import { useStorage } from "@vueuse/core";
import { RemovableRef } from "@vueuse/shared";
export interface User {
  userId?: string;
  userName?: string;
}
export interface Auth {
  token?: string | null;
  orgId?: string | null;
  user?: User | null;
}

const authStore: RemovableRef<Auth> = useStorage<Auth>("auth", {});

export default authStore;
