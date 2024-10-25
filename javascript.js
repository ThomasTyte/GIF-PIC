const accessKey = 'xb4Wrbpm2TAtoUMayZuobv76eXyKQf0q64TijWG4hYg';
$(document).ready(function() {
    $('#search-button').on('click', function() {
        const query = $('#search-input').val().trim(); 
        if (query) {
            fetchImages(query);
        } else {
            alert('Please enter a search');
        }
    });
});

function fetchImages(query) {
    $.ajax({
        url: `https://api.unsplash.com/search/photos`,
        type: 'GET',
        dataType: 'json',
        data: {
            query: query,
            client_id: accessKey,
            per_page: 28
        },
        success: function(data) {
            displayImages(data.results);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching images:', error);
            alert('An error occurred while fetching images. Please try again.');
        }
    });
}

function displayImages(images) {
    const container = $('#images-container');
    container.empty(); 
    images.forEach(image => {
        const img = $('<img>').attr('src', image.urls.small)
                              .attr('alt', image.alt_description || 'Image from Unsplash');
        container.append(img);
    });
}