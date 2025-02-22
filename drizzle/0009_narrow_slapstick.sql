CREATE TABLE `calorie_totals_table ` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`total` integer NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_diary_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`date` text DEFAULT '2025-02-21T23:47:22.058Z' NOT NULL,
	`mealId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mealId`) REFERENCES `meals_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_diary_table`("id", "userId", "date", "mealId") SELECT "id", "userId", "date", "mealId" FROM `diary_table`;--> statement-breakpoint
DROP TABLE `diary_table`;--> statement-breakpoint
ALTER TABLE `__new_diary_table` RENAME TO `diary_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;