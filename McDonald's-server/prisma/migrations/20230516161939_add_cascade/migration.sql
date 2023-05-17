-- DropForeignKey
ALTER TABLE "OrderDish" DROP CONSTRAINT "OrderDish_dishId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDish" DROP CONSTRAINT "OrderDish_order_id_fkey";

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
