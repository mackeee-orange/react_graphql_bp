import {
  Account,
  AccountEmailVerificationStatus,
  BoilerplateConnection,
  CodeReviewConnection,
  NoteConnection,
  ServiceConnection,
  MonthlyIncomeConnection,
  NotificationConnection,
  OrganizationConnection,
  PaymentHistoryConnection,
  PaymentMethod,
  Setting,
  WithdrawConnection,
  Driver,
  Navigator,
} from "../utilities/__generated__/graphql_schema";

export default class AccountEntity implements Partial<Account> {
  // ! はconstructorで保証
  id!: string;
  email!: string;
  username!: string;
  ghUrl!: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  firstNameKana?: string;
  lastNameKana?: string;
  birthday?: string;
  bio?: string;
  smsVerificationStatus?: string;
  setting?: Setting;
  driver?: Driver;
  navigator?: Navigator;

  emailVerificationStatus?: AccountEmailVerificationStatus;
  favoriteBoilerplates?: BoilerplateConnection;
  favoriteCodeReviews?: CodeReviewConnection;
  favoriteNotes?: NoteConnection;
  favoriteServices?: ServiceConnection;
  monthlyIncomes?: MonthlyIncomeConnection;
  notes?: NoteConnection;
  notifications?: NotificationConnection;
  organizations?: OrganizationConnection;
  paymentHistories?: PaymentHistoryConnection;
  paymentMethod?: PaymentMethod;
  withdraws?: WithdrawConnection;

  constructor(by?: Partial<Account>) {
    Object.assign(this, by);
    by?.id || (this.id = "");
    by?.email || (this.email = "");
    by?.username || (this.username = "");
    by?.ghUrl || (this.ghUrl = "");
  }
}
