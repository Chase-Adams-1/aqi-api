function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function handleFetch(baseUrl){
    fetch(baseUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        displayResults(responseJson);
    })
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    }); 
}

function displayResults(responseJson) {
    console.log(responseJson)
    $('.js-error-message').empty();
    $('.results-list').empty();
        $('.results-list').append(`<li><h3>${responseJson.data.city}</h3>
        <p> Current Air Quality Index: ${responseJson.data.current.pollution.aqius}</p>
        <p> Current Temperature: ${responseJson.data.current.weather.tp} °C</p>
        </li>`);
    }
    $('section').removeClass('hidden');

function watchForm() {
    $('.js-form').on('submit', function(event) {
        event.preventDefault();
        const apiKey = '25d748b2-e796-4e20-b5dc-17641019945a'
        const cityName = $('#js-search-city').val();
        const stateName = $('#js-search-state').val();
        const baseUrl = `https://api.airvisual.com/v2/city?city=${cityName}&state=${stateName}&country=USA&key=${apiKey}`
        handleFetch(baseUrl)
    }) 
}
$(watchForm);