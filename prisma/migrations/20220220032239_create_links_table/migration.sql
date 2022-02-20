-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_token_key" ON "links"("token");

-- CreateIndex
CREATE UNIQUE INDEX "links_url_key" ON "links"("url");
