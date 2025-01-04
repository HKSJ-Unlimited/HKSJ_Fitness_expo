CREATE TABLE `goals_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`weight` integer NOT NULL,
	`calories` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'Jeralt',
	`email` text DEFAULT 'jeralt@gmail.com',
	`age` integer DEFAULT 27,
	`height` integer DEFAULT 177,
	`image` text DEFAULT 'https://www.gravatar.com/avatar/?d=identicon'
);
--> statement-breakpoint
INSERT INTO `__new_users_table`("id", "name", "email", "age", "height", "image") SELECT "id", "name", "email", "age", "height", "image" FROM `users_table`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
ALTER TABLE `__new_users_table` RENAME TO `users_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);