-- CreateEnum
CREATE TYPE "ArkServer" AS ENUM ('CN', 'US', 'JP', 'KR', 'TW');

-- CreateEnum
CREATE TYPE "ArkCharacterProfession" AS ENUM ('PIONEER', 'SNIPER', 'CASTER', 'MEDIC', 'WARRIOR', 'TANK', 'SUPPORT', 'SPECIAL');

-- CreateEnum
CREATE TYPE "ArkCharacterPosition" AS ENUM ('MELEE', 'RANGED');

-- CreateEnum
CREATE TYPE "OAuthConnectionType" AS ENUM ('GITHUB');

-- CreateTable
CREATE TABLE "ark_characters" (
    "id" TEXT NOT NULL,
    "server" "ArkServer" NOT NULL DEFAULT 'CN',
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profession" "ArkCharacterProfession" NOT NULL,
    "position" "ArkCharacterPosition" NOT NULL,
    "rarity" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ark_characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_connections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "OAuthConnectionType" NOT NULL,
    "accessToken" TEXT NOT NULL,
    "extra" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "oauth_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_keys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "access_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ark_characters_gameId_key" ON "ark_characters"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "access_keys_key_key" ON "access_keys"("key");

-- AddForeignKey
ALTER TABLE "oauth_connections" ADD CONSTRAINT "oauth_connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_keys" ADD CONSTRAINT "access_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_keys" ADD CONSTRAINT "access_keys_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
