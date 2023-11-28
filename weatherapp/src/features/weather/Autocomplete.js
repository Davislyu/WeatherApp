
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export const getAutocompleteSuggestions = async (query) => {
    try {
        const response = await fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        return [];
    }
};
