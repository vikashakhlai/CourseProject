/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_key" ON "Dish"("name");

-- CreateIndex
CREATE UNIQUE INDEX "News_name_key" ON "News"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_name_key" ON "Promotion"("name");
