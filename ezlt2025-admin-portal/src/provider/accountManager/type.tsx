export namespace AccountManager {
  //Listing
  interface DataItem {
    id: string;
    access_config: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    user: User;
  }
  interface Role {
    id: string;
  }
  interface Status {
    id: string;
    name: string;
    __entity: string;
  }
  interface User {
    isApproved: boolean;
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    metaData: string | null;
    liscensed_partner: string | null;
    reference_code: string | null;
    isShowToolTip: boolean;
    heardBy: string | null;
    partnerStatus: string | null;
    partnerStatusNote: string | null;
    role: Role;
    status: Status;
    lastLogin: string | null;
    rejectedAt: string | null;
    archivedAt: string | null;
    waitingApprovalAt: string | null;
    approvedAt: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export type AccountManagerProps = {
    page?: number;
    limit?: number;
    status: string | undefined;
  };
  export type AccountManagerResponse = {
    data: DataItem[];
    current: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
  };
  export interface AccountManagerAPIPayload extends AccountManagerProps {}
  //Create
  export type AccountManagerCreateProps = {};
  export type AccountManagerCreateResponse = {
    message: string;
  };
  export type AccountManagerCreateAPIMutationPayload = {
    firstName: string;
    lastName: string;
    email: string;
    role?: {
      config_access?: string[] | undefined;
    };
  };
  export interface AccountManagerCreateAPIPayload
    extends AccountManagerCreateProps {
    data: AccountManagerCreateAPIMutationPayload;
  }
  export type AccountManagerPatchProps = {};
  export type AccountManagerAPIPatchPayload = {
    accountManagerId?: string;
    data: {
      user: {
        firstName: string;
        lastName?: string;
        email: string;
      };
      accountManager: {
        access_config: {
          roles: string[];
        };
      };
    };
  };
  export interface AccountManagerPatchResponse {}
  export type DeleteAccountManagerProps = {
    selectedAccountManager: string;
  };
}
