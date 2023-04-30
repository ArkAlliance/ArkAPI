/*
  Warnings:

  - A unique constraint covering the columns `[server,gameId]` on the table `ark_characters` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ark_characters_gameId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ark_characters_server_gameId_key" ON "ark_characters"("server", "gameId");
