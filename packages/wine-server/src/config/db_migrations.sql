UPDATE wine
SET wine.color = 'Rött vin'
WHERE wine.color = 'Rött';

UPDATE wine
SET wine.color = 'Vitt vin'
WHERE wine.color = 'Vitt';

UPDATE wine
SET wine.color = 'Rosévin'
WHERE wine.color = 'Rosé';

UPDATE wine
SET wine.color = 'Mousserande vin'
Where wine.color = 'Vitt bubbel';

ALTER TABLE wine CHANGE color type VARCHAR(20);

ALTER TABLE wine ADD subType VARCHAR(40) DEFAULT NULL;

ALTER TABLE wine CHANGE sizeml volume VARCHAR(10);
