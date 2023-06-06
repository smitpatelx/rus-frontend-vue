export interface GetAllRoleRes {
  [key: string]: {
    name: string;
    capabilities: Record<string, boolean>;
  };
}
