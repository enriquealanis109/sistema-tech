ALTER TABLE "detail_sales" RENAME TO "sale_details";
ALTER TABLE "sale_details" RENAME CONSTRAINT "detail_sales_pkey" TO "sale_details_pkey";
ALTER TABLE "sale_details" RENAME CONSTRAINT "detail_sales_sale_id_fkey" TO "sale_details_sale_id_fkey";
ALTER TABLE "sale_details" RENAME CONSTRAINT "detail_sales_product_id_fkey" TO "sale_details_product_id_fkey";
