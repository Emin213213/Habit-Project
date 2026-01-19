/*
  Warnings:

  - Added the required column `link` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL
);
INSERT INTO "new_Info" ("id", "image", "title") SELECT "id", "image", "title" FROM "Info";
DROP TABLE "Info";
ALTER TABLE "new_Info" RENAME TO "Info";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
