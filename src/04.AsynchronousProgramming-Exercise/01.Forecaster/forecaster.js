function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com';
    let submitBn = $('#submit');

    submitBn.on('click', getForecast);

    function getForecast() {
        let locationInput = $('#location').val();
        const getLocationUrl = baseUrl + `/locations.json`;
        $.get(getLocationUrl)
            .then(locations => {
                let location = locations.filter(l => l.name === locationInput)[0];
                let locationCode = location.code;
                const getForecastUrl = baseUrl + `/forecast/today/${locationCode}.json`;
                const getThreeDayForecastUrl = baseUrl + `/forecast/upcoming/${locationCode}.json`;

                $.get(getForecastUrl)
                    .then(displayForecast);

                $.get(getThreeDayForecastUrl)
                    .then(displayThreeDayForecast);
            })
            .catch(displayError);
    }

    function displayForecast(res) {
        let condition = res.forecast.condition;
        let location = res.name;
        let low = res.forecast.low;
        let high = res.forecast.high;

        let forecastDiv = $('#forecast');
        forecastDiv.css('display', 'block');

        let conditionSymbol = '';

        if(condition === 'Sunny'){
            conditionSymbol = '&#x2600';
        }
        else if(condition === 'Partly sunny'){
            conditionSymbol = '&#x26C5';
        }
        else if(condition === 'Overcast'){
            conditionSymbol = '&#x2601';
        }
        else if(condition === 'Rain'){
            conditionSymbol = '&#x2614';
        }

        let conditionSpan = $('<span>').html(conditionSymbol).addClass('condition symbol');

        let currentDiv = $('#current');
        currentDiv.append(conditionSpan);

        let conditionWrapperSpan = $('<span>').addClass('condition');

        let nameSpan = $('<span>').addClass('forecast-data').text(location);
        let temperatureSpan = $('<span>').addClass('forecast-data').html(`${low}&#176/${high}&#176`);
        let conditionSpanInWrapper = $('<span>').addClass('forecast-data').text(condition);

        conditionWrapperSpan.append(nameSpan).append(temperatureSpan).append(conditionSpanInWrapper);

        currentDiv.append(conditionWrapperSpan);
    }

    function displayThreeDayForecast(res) {
        let upcomingDiv = $('#upcoming');
        for (let forecast of res.forecast) {
            let condition = forecast.condition;
            let high = forecast.high;
            let low = forecast.low;

            let upcommingWraperSpan = $('<span>').addClass('upcoming');

            let conditionSymbol = '';

            if(condition === 'Sunny'){
                conditionSymbol = '&#x2600';
            }
            else if(condition === 'Partly sunny'){
                conditionSymbol = '&#x26C5';
            }
            else if(condition === 'Overcast'){
                conditionSymbol = '&#x2601';
            }
            else if(condition === 'Rain'){
                conditionSymbol = '&#x2614';
            }

            let symbolSpan = $('<span>').addClass('symbol').html(conditionSymbol);
            let temperatureSpan = $('<span>').addClass('forecast-data').html(`${low}&#176/${high}&#176`);
            let conditionSpan = $('<span>').addClass('forecast-data').text(condition);

            upcommingWraperSpan.append(symbolSpan).append(temperatureSpan).append(conditionSpan);

            upcomingDiv.append(upcommingWraperSpan);
        }
    }

    function displayError() {
        let forecastDiv = $('#forecast');
        forecastDiv.css('display', 'block');
        forecastDiv.text('Error');
    }
}