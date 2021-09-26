export const BASE_NAME = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BASE_NAME : process.env.REACT_APP_DEV_BASE_NAME;
export const BASE_URL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BASE_URL : process.env.REACT_APP_DEV_BASE_URL) + BASE_NAME;
export const API_BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_BASE_URL : process.env.REACT_APP_DEV_API_BASE_URL;
export const SCENTDB_URL = API_BASE_URL + "/scentdb/v1"

// OAUTH2

export const OAUTH2_REDIRECT_URL = BASE_URL + "/oauth2/redirect";
export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URL;
export const GITHUB_AUTH_URL = API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URL;
export const FACEBOOK_AUTH_URL = API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + OAUTH2_REDIRECT_URL;
export const ACCESS_TOKEN = "accessToken";
export const USER = "user";

// PERFUMES

export const SAVE_PERFUME_URL = SCENTDB_URL + "/perfumes";
export const GET_ALL_PERFUMES_URL = SCENTDB_URL + "/perfumes";
export let SEARCH_PERFUMES_URL = SCENTDB_URL + "/perfumes/search";
export const getSearchPerfumesUrl = (params) => {
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {

        if (params.has('page')) {
            let page = params.get('page')
            SEARCH_PERFUMES_URL = BASE_NAME + `/mocks/perfumes/search-perfumes-page-${page}.json`;
        } else{
            SEARCH_PERFUMES_URL = BASE_NAME + "/mocks/perfumes/search-perfumes-page-0.json";
        }

        console.log("Using mock SEARCH_PERFUMES_URL")
    } 

    return SEARCH_PERFUMES_URL;
}

export let getPerfumeByIdURL = (perfumeId) => SCENTDB_URL + `/perfumes/${perfumeId}`;
if (process.env.REACT_APP_USE_MOCK_API === 'true') {
    getPerfumeByIdURL = (perfumeId) =>  BASE_NAME + `/mocks/perfumes/get-perfume-by-id-${perfumeId}.json`;
    console.log("Using mock getPerfumeByIdURL")
}

// BRANDS

export const SAVE_COMPANY_URL = SCENTDB_URL + "/companies";
export let SEARCH_COMPANIES_URL = SCENTDB_URL + "/companies/search";

export const getSearchBrandsUrl = (params) => {
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {

        if (params.has('page')) {
            let page = params.get('page')
            SEARCH_COMPANIES_URL = BASE_NAME + `/mocks/brands/search-brands-page-${page}.json`;
        } else{
            SEARCH_COMPANIES_URL = BASE_NAME + "/mocks/brands/search-brands-page-0.json";
        }

        console.log("Using mock SEARCH_COMPANIES_URL")
    } 

    return SEARCH_COMPANIES_URL;
}

export let GET_ALL_COMPANIES_URL = SCENTDB_URL + "/companies";
if (process.env.REACT_APP_USE_MOCK_API === 'true') {
    GET_ALL_COMPANIES_URL = BASE_NAME + "/mocks/brands/get-all-brands.json";
    console.log("Using mock GET_ALL_COMPANIES_URL")
}

// PERFUMERS

export const SAVE_PERFUMER_URL = SCENTDB_URL + "/perfumers";

export let SEARCH_PERFUMERS_URL = SCENTDB_URL + "/perfumers/search";
export const getSearchPerfumersUrl = (params) => {
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {

        if (params.has('page')) {
            let page = params.get('page')
            SEARCH_PERFUMERS_URL = BASE_NAME + `/mocks/perfumers/search-perfumers-page-${page}.json`;

        } else{
            SEARCH_PERFUMERS_URL = BASE_NAME + "/mocks/perfumers/search-perfumers-page-0.json";
        }

        console.log("Using mock SEARCH_PERFUMERS_URL")
    } 

    return SEARCH_PERFUMERS_URL;
}

export let GET_ALL_PERFUMERS_URL = SCENTDB_URL + "/perfumers";
if (process.env.REACT_APP_USE_MOCK_API === 'true') {
    GET_ALL_PERFUMERS_URL = BASE_NAME + "/mocks/perfumers/get-all-perfumers.json";
    console.log("Using mock GET_ALL_PERFUMERS_URL")
}

// NOTES

export const SAVE_NOTE_URL = SCENTDB_URL + "/notes";
export let SEARCH_NOTES_URL = SCENTDB_URL + "/notes/search";
export const getSearchNotesUrl = (params) => {
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {

        if (params.has('page')) {
            let page = params.get('page')
            SEARCH_NOTES_URL = BASE_NAME + `/mocks/notes/search-notes-page-${page}.json`;
        } else{
            SEARCH_NOTES_URL = BASE_NAME + "/mocks/notes/search-notes-page-0.json";
        }

        console.log("Using mock SEARCH_NOTES_URL")
    } 

    return SEARCH_NOTES_URL;
}


export let GET_ALL_NOTES_URL = SCENTDB_URL + "/notes";
if (process.env.REACT_APP_USE_MOCK_API === 'true') {
    GET_ALL_NOTES_URL = BASE_NAME + "/mocks/notes/get-all-notes.json";
    console.log("Using mock GET_ALL_NOTES_URL")
}


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
export const filterPlaceholder = "Type to filter results";

export const minYear = 1900;
export const maxYear = new Date().getFullYear() + 10;
