PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_progress_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`type` text NOT NULL,
	`value` integer NOT NULL,
	`date` integer DEFAULT 1740522961879 NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_progress_table`("id", "userId", "type", "value", "date") SELECT "id", "userId", "type", "value", "date" FROM `progress_table`;--> statement-breakpoint
DROP TABLE `progress_table`;--> statement-breakpoint
ALTER TABLE `__new_progress_table` RENAME TO `progress_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;