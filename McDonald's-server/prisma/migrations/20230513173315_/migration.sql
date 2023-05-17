/*
  Warnings:

  - You are about to drop the `_DishToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total_price` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DishToOrder" DROP CONSTRAINT "_DishToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToOrder" DROP CONSTRAINT "_DishToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_DishToOrder";

-- CreateTable
CREATE TABLE "OrderDish" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "order_id" INTEGER,

    CONSTRAINT "OrderDish_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
