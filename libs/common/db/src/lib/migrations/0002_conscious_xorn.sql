CREATE TABLE `link_bids` (
	`id` varchar(30) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`link_id` varchar(30),
	`user_id` varchar(30),
	`amount` float NOT NULL,
	`status` enum('created','selected','not_selected') NOT NULL DEFAULT 'created',
	`payment_status` enum('pending','paid','failed') NOT NULL DEFAULT 'pending',
	`answer_status` enum('pending','answered','not_answered') NOT NULL DEFAULT 'pending',
	`answer` text,
	`answered_on` timestamp,
	CONSTRAINT `link_bids_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` varchar(30) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`creator_id` varchar(31),
	`name` varchar(50),
	`expires_at` timestamp NOT NULL,
	`token_mint` varchar(44) NOT NULL,
	`base_amount` float NOT NULL,
	`wallet_address` varchar(44) NOT NULL,
	`number_of_bids` mediumint NOT NULL,
	CONSTRAINT `links_id` PRIMARY KEY(`id`)
);
