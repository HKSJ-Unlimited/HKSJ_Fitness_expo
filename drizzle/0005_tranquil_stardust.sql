PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_diary_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`date` text DEFAULT '2025-01-05T16:47:29.289Z' NOT NULL,
	`mealId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mealId`) REFERENCES `meals_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_diary_table`("id", "userId", "date", "mealId") SELECT "id", "userId", "date", "mealId" FROM `diary_table`;--> statement-breakpoint
DROP TABLE `diary_table`;--> statement-breakpoint
ALTER TABLE `__new_diary_table` RENAME TO `diary_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'Jeralt' NOT NULL,
	`email` text DEFAULT 'jeralt@gmail.com' NOT NULL,
	`age` integer DEFAULT 27 NOT NULL,
	`height` integer DEFAULT 177 NOT NULL,
	`image` text DEFAULT 'https://www.gravatar.com/avatar/?d=identicon' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users_table`("id", "name", "email", "age", "height", "image") SELECT "id", "name", "email", "age", "height", "image" FROM `users_table`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
ALTER TABLE `__new_users_table` RENAME TO `users_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);