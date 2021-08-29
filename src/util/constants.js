export const BASE_URL = "http://localhost:8321/scentdb/v1/"

export const GET_ALL_PERFUMES_URL = "http://localhost:8321/scentdb/v1/perfumes";
export const GET_PERFUME_BY_ID_URL = "http://localhost:8321/scentdb/v1/perfumes/";
export const SEARCH_PERFUMES_URL = "http://localhost:8321/scentdb/v1/perfumes/search";
export const SAVE_PERFUME_URL = "http://localhost:8321/scentdb/v1/perfumes";

export const SEARCH_COMPANIES_URL = "http://localhost:8321/scentdb/v1/companies/search";
export const SAVE_COMPANY_URL = "http://localhost:8321/scentdb/v1/companies";
export const GET_ALL_COMPANIES_URL = "http://localhost:8321/scentdb/v1/companies";

export const SAVE_NOTE_URL = "http://localhost:8321/scentdb/v1/notes";
export const SEARCH_NOTES_URL = "http://localhost:8321/scentdb/v1/notes/search";
export const GET_ALL_NOTES_URL = "http://localhost:8321/scentdb/v1/notes";

export const SEARCH_PERFUMERS_URL = "http://localhost:8321/scentdb/v1/perfumers/search";
export const SAVE_PERFUMER_URL = "http://localhost:8321/scentdb/v1/perfumers";
export const GET_ALL_PERFUMERS_URL = "http://localhost:8321/scentdb/v1/perfumers";

export const TOP_NOTES = "top notes";
export const BASE_NOTES = "base notes";
export const MIDDLE_NOTES = "middle notes";
export const GENERAL_NOTES = "general notes";

export const PERFUME_TYPES = {
    EXTRAIT_DE_PARFUM: "Extrait de Parfum",
    ESPIRIT_DE_PARFUM: "Esprit de Parfum",
    EAU_DE_PARFUM: "Eau de Parfum",
    EAU_DE_TOILETTE: "Eau de Toilette",
    EAU_DE_COLOGNE: "Eau de Cologne",
    EAU_FRAICHE: "Eau Fraiche",
}

export const bottleSizes = [
    { size: '200ml', code: '200ml' },
    { size: '175ml', code: '175ml' },
    { size: '150ml', code: '150ml' },
    { size: '125ml', code: '125ml' },
    { size: '100ml', code: '100ml' },
    { size: '75ml', code: '75ml' },
    { size: '60ml', code: '60ml' },
    { size: '50ml', code: '50ml' },
    { size: '40ml', code: '40ml' },
    { size: '35ml', code: '35ml' },
    { size: '30ml', code: '30ml' },
    { size: '25ml', code: '25ml' },
    { size: '20ml', code: '20ml' },
    { size: '15ml', code: '15ml' },
    { size: '10ml', code: '10ml' },
    { size: '7.5ml', code: '7.5ml' },
    { size: '5ml', code: '5ml' },
    { size: '1.5ml', code: '1.5ml' },
    { size: '1ml', code: '1ml' },
];

export const genders = [
    { gender: 'Male', code: 'MALE' },
    { gender: 'Female', code: 'FEMALE' },
    { gender: 'Unisex', code: 'UNISEX' },
];

export const perfumeTypes = [
    { perfumeType: PERFUME_TYPES.EXTRAIT_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[0] },
    { perfumeType: PERFUME_TYPES.ESPIRIT_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[1] },
    { perfumeType: PERFUME_TYPES.EAU_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[2] },
    { perfumeType: PERFUME_TYPES.EAU_DE_TOILETTE, code: Object.keys(PERFUME_TYPES)[3] },
    { perfumeType: PERFUME_TYPES.EAU_DE_COLOGNE, code: Object.keys(PERFUME_TYPES)[4] },
    { perfumeType: PERFUME_TYPES.EAU_FRAICHE, code: Object.keys(PERFUME_TYPES)[5] },
];

export const companyTypes = [
    { companyType: 'Niche', code: 'NICHE' },
    { companyType: 'Designer', code: 'DESIGNER' },
];

export const middleNotesMultiselectEmptyMessage = "No middle notes found";
export const topNotesMultiselectEmptyMessage = "No top notes found";
export const baseNotesMultiselectEmptyMessage = "No base notes found";
export const bottleSizesMultiselectEmptyMessage = "No bottle sizes found";
export const filterPlaceholder= "Type to filter results";

export const maxYear = new Date().getFullYear() + 10;
