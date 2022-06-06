
location.queryString = {};

location.search.substr(1).split('&').forEach(queryParamWithValue => {
    console.log('locarion search for each enabled');
    if (queryParamWithValue === '') return;
    var queryParam = queryParamWithValue.split('=');

    $('#' + queryParam[0]).val(queryParam[1]);
    location.queryString[queryParam[0]] = queryParam[1];
});

function updateQueryString() {
    console.log('udpate query run');
    if (location.queryString) {
        const keyValueArray = Object.entries(location.queryString).map(([key, value]) => {
            return key + '=' + value;
        });

        const newQueryString = keyValueArray.reduce((total, currentValue) => {
            const splitAmpersand = total === '' ? '' : '&';
            return total + splitAmpersand + currentValue;
        }, '')

        const newUrlOriginPath = location.origin + location.pathname;
        const queryStringSlash = !newUrlOriginPath.includes('/') ? '/' : '';
        const newUrl = newUrlOriginPath + queryStringSlash + '?' + newQueryString;
        history.pushState({}, 'Rewrite URL with updated query params', newUrl);
    }
}

(function (window, $) {
    'use strict';

    /**
     * Initialize login Controller
     *
     * @type {*|LoginController}
     */
    console.log('login controller formed');
    var loginController = new window.LoginController();

})(window, jQuery);


//Updating location url
$('input').change(function() {
    console.log('input chANGE');

    const inputId = $(this).attr('id');
    const inputValue = $(this).val();

    if (inputId!=='callPassword') {
        location.queryString[inputId] = inputValue;
        updateQueryString();
    }
})
