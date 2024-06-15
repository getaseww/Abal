enum Gender {
    Male,
    Female
}

enum PaymentStatus {
    Pending,
    Verfied,
    Canceled
}

export enum Role {
    ADMIN = "Admin",
    OWNER = "Owner",
    MEMBER = "Member"
}

export enum SubscriptionStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    CANCELLED = "cancelled",
    EXPIRED = "expired"
}


export enum TelegramAPIEndPoint {
    SET_WEBHOOK = "setWebhook",
    SEND_MESSAGE = "sendMessage",
}