Select wine.*, systembolaget_wines.url
from wine
join systembolaget_wines on wine.nr = systembolaget_wines.productCode
Group by wine.id

-- CREATE FIELD "fk_image_blob_id" -----------------------------
ALTER TABLE `systembolaget_wines` ADD COLUMN `fk_image_blob_id` BigInt( 255 ) NULL;
-- -------------------------------------------------------------


-- CREATE LINK "FK_systembolaget_imageblob_id" -----------------
ALTER TABLE `systembolaget_wines`
	ADD CONSTRAINT `FK_systembolaget_imageblob_id` FOREIGN KEY ( `fk_image_blob_id` )
	REFERENCES `systembolaget_images`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- -------------------------------------------------------------


