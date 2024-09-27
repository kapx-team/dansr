CREATE TABLE `contact_form_submissions` (
	`id` varchar(31) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(50) NOT NULL,
	`email` varchar(40) NOT NULL,
	`subject` varchar(40) NOT NULL,
	`message` varchar(500) NOT NULL,
	CONSTRAINT `contact_form_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_invites` (
	`id` varchar(30) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`creator_id` varchar(31),
	`is_used` boolean DEFAULT false,
	CONSTRAINT `creator_invites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creators` (
	`id` varchar(31) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`user_id` varchar(30),
	`earnings` decimal(18,2) DEFAULT '0.00',
	`is_verified` boolean DEFAULT false,
	`no_of_referrals` smallint DEFAULT 0,
	CONSTRAINT `creators_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_id_unique_idx` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `free_questions` (
	`id` varchar(30) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`question` text NOT NULL,
	`creator_handle` varchar(20),
	`user_handle` varchar(20),
	CONSTRAINT `free_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_wallet_signin_requests` (
	`id` varchar(31) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`header` json NOT NULL,
	`payload` json NOT NULL,
	`is_verified` boolean DEFAULT false,
	CONSTRAINT `user_wallet_signin_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(30) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(50),
	`profile_image` varchar(200),
	`email` varchar(40),
	`wallet` varchar(44),
	`notification_preference` json DEFAULT ('{"email":false}'),
	`username` varchar(40),
	`x_handle` varchar(20),
	`x_id` varchar(20),
	`x_access_token` varchar(200),
	`x_access_secret` varchar(200),
	`type` enum('admin','normal','creator') NOT NULL,
	`last_login_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_unique_idx` UNIQUE(`email`),
	CONSTRAINT `username_unique_idx` UNIQUE(`username`),
	CONSTRAINT `wallet_unique_idx` UNIQUE(`wallet`),
	CONSTRAINT `x_handle_unique_idx` UNIQUE(`x_handle`)
);
--> statement-breakpoint
CREATE TABLE `verification_requests` (
	`id` varchar(31) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`creator_id` varchar(31),
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`rejection_reason` text,
	`reviewer_id` varchar(30),
	`reviewed_at` timestamp,
	CONSTRAINT `verification_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `creator_id_idx` ON `creator_invites` (`creator_id`);--> statement-breakpoint
CREATE INDEX `creator_handle_idx` ON `free_questions` (`creator_handle`);--> statement-breakpoint
CREATE INDEX `user_handle_idx` ON `free_questions` (`user_handle`);--> statement-breakpoint
CREATE INDEX `creator_id_idx` ON `verification_requests` (`creator_id`);