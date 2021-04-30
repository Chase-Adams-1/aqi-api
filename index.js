'use strict'
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function handleFetch(url){
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        console.log( responseJson );
    })
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    }); 
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.js-error-message').empty();
    $('.results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-list').append(`<li><h3>${responseJson.data[i].city}</h3>
        <p>${responseJson.data[i].current[i].pollution}</p>
        <p>${responseJson.data[i].current[i].weather}</p>
        </li>`);
    }
    $('.results').removeCLass('hidden');
}

function watchForm() {
    $('.js-form').on('submit', function(event) {
        event.preventDefault();
        const apiKey = '25d748b2-e796-4e20-b5dc-17641019945a'
        const cityName = $('#js-search-city').val();
        const stateName = $('#js-search-state').val();
        const url = `https://api.airvisual.com/v2/city?city=${cityName}&state=${stateName}&country=USA&key=${apiKey}`
        handleFetch(url);
    })
}
$(watchForm);