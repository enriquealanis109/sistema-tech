ALTER TABLE "sale_details" RENAME TO "detail_sales";
ALTER TABLE "detail_sales" RENAME CONSTRAINT "sale_details_pkey" TO "detail_sales_pkey";
ALTER TABLE "detail_sales" RENAME CONSTRAINT "sale_details_sale_id_fkey" TO "detail_sales_sale_id_fkey";
ALTER TABLE "detail_sales" RENAME CONSTRAINT "sale_details_product_id_fkey" TO "detail_sales_product_id_fkey";
