ALTER TABLE `creator_invites` ADD `invited_creator_id` varchar(31);--> statement-breakpoint
ALTER TABLE `creators` DROP COLUMN `no_of_referrals`;