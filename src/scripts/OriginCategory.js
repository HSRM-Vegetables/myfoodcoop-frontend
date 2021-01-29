/**
 * Enum of all origin categories
 */
export const OriginCategory = {
    LOCAL: 'LOCAL',
    REGIONAL: 'REGIONAL',
    SUPRAREGIONAL: 'SUPRAREGIONAL',
    UNKNOWN: 'UNKNOWN'
};

/**
 * Export all categories with an appropriate german description
 */
export const OriginCategoryWithDescription = [
    {
        identifier: OriginCategory.LOCAL,
        descripton: 'Lokal' 
    },
    {
        identifier: OriginCategory.REGIONAL,
        descripton: 'Regional'
    },
    {
        identifier: OriginCategory.SUPRAREGIONAL,
        descripton: 'Überregional'
    },
    {
        identifier: OriginCategory.UNKNOWN,
        descripton: 'Unbekannt'
    }
];

/**
 * Localizes a origin category identifier based on the descriptions above
 * @param {OriginCategory} status origin category of an item
 */
export const getLocalizedOriginCategory = (originCategory) => 
    OriginCategoryWithDescription.find(oc => oc.identifier === originCategory).descripton;
