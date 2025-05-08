/**
 * Represents an asset owner type
 */
export type AssetOwner = "account" | "user" | "team" | "organization";

/**
 * Represents a campaign in the system
 */
export interface Campaign {
  id: string;
  name: string;
  ownerType: AssetOwner;
  ownerId: string;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  schedule?: CampaignSchedule;
  metrics?: CampaignMetrics;
  settings: CampaignSettings;
  // Other campaign fields based on context clues
}

/**
 * Campaign status types
 */
export enum CampaignStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  SCHEDULED = "scheduled",
}

/**
 * Campaign scheduling information
 */
interface CampaignSchedule {
  startDate: string;
  endDate?: string;
  recurringState?: "start" | "stop"; // Based on what we saw in change-recurring-state-mutation.ts
  frequency?: "once" | "daily" | "weekly" | "monthly";
}

/**
 * Campaign performance metrics
 */
interface CampaignMetrics {
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  // Other metrics fields
}

/**
 * Campaign configuration settings
 */
interface CampaignSettings {
  sendEmail: boolean;
  sendPush: boolean;
  sendSms: boolean;
  targetAudience?: string;
  // Other settings fields
}
