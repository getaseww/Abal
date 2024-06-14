export enum Role {
    ADMIN = "Admin",
    HEADOFFICE = "Headoffice",
    DISTRICT = "District",
    BRANCH = "Branch",
    COMMUNITY = "Community",
    RESIDENT = "Resident",
    WOREDA = "Woreda"
}

export enum PaymentMethod {
    CASH = "Cash",
    CHEQUE = "Cheque",
    ONLINE = "Online",
    TRANSFER = "Transfer",
    BANK_DEPOSIT = "Bank Deposit"
}
export enum InquiryStatus {
    Reviewed = "Reviewed",
    Initiated = "Initiated"
}
export enum PaymentStatus {
    PENDING = "Pending",
    SUCCESS = "Success",
    FAILED = "Failed"
}
export enum IncomeExpenseType {
    INCOME = "Income",
    EXPENSE = "Expense",
}
export enum PaymentPeriodType {
    MONTHLY = "Monthly",
    SPECIFIC_PERIOD = "Specific Period"
}

export enum PenalityRateType {
    PERCENT = "Percent",
    FLAT = "Flat"
}

export enum PenalityOccurrence {
    MONTHLY = "Monthly",
    DAILY = "Daily"
}

export enum Specialization {
    Electrician = "Electrician",
    Plumber = "Plumber",
    Painter = "Painter",
    CeramicWorker = "CeramicWorker",
    Servant = "Servant",
    Nanny = "Nanny"
}

export enum ResidentType {
    OWNER = "Owner",
    NON_RESIDENT = "Non Resident",
    TENANT = "Tenant",
    ATTORNEY = "Attorney",
}

export enum PaidUnpaidStatus{
    PAID="Paid",
    UNPAID="Unpaid"
}