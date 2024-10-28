const apiKey = 'fN9UX5DHJEYvu6iAHg6HZ3JzJWr5XUS3';

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchGiphyImages(query);
    } else {
        alert('Please enter a search term.');
    }
});
fetchGiphyImages('Graduation');

async function fetchGiphyImages(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=47&offset=0&rating=g&lang=en`;

    console.log('Fetching URL:', url); 
    try {
        const response = await fetch(url);
        console.log('API response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('Response data:', data);

      
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

      
        if (data.data.length === 0) {
            resultsDiv.innerHTML = 'No results found.';
            return;
        }

      
        data.data.forEach(gif => {
            const img = document.createElement('img');
            console.log (gif.images.fixed_width_still)
            img.src = gif.images.fixed_width_still.url
            img.alt = gif.title || "GIF"; 
            img.style.margin = '10px'; 
            resultsDiv.appendChild(img);
            console.log('Added GIF:', img.src); 
        });
    } catch (error) {
        console.error('Error fetching data from Giphy API:', error);
    }
}

