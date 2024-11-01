const container = document.getElementById('countries-container');
let currentIndex = 0;
let totalSlides = 0;

// Fetch all countries from the REST Countries API
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const chunkSize = 20;
        totalSlides = Math.ceil(data.length / chunkSize);

        // Split the data into groups of 20
        for (let i = 0; i < totalSlides; i++) {
            const countryGroup = document.createElement('div');
            countryGroup.className = 'country-group';

            data.slice(i * chunkSize, i * chunkSize + chunkSize).forEach(country => {
                // Create a div for each country
                const countryDiv = document.createElement('div');
                countryDiv.className = 'country';

                // Add the country flag
                const flag = document.createElement('img');
                flag.src = country.flags.png;
                flag.alt = `${country.name.common} flag`;

                // Add the country name
                const name = document.createElement('span');
                name.textContent = country.name.common;

                // Append flag and name to the country div
                countryDiv.appendChild(flag);
                countryDiv.appendChild(name);

                // Append the country div to the group
                countryGroup.appendChild(countryDiv);

                // Add click event listener to show country info
                countryDiv.addEventListener('click', () => {
                    displayCountryInfo(country);
                });
            });

            // Append each group of 20 countries to the container
            container.appendChild(countryGroup);
        }

        updateButtons(); // Update button state based on index
    })
    .catch(error => console.error('Error fetching country data:', error));

// Scroll to the left
function scrollLeft() {
    if (currentIndex > 0) {
        currentIndex--;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateButtons();
    }
}

// Scroll to the right
function scrollRight() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateButtons();
    }
}

// Enable/disable buttons based on the current index
function updateButtons() {
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === totalSlides - 1;
}

// Function to display country info
function displayCountryInfo(country) {
    // Create a modal or alert to show country info
    const info = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Area:</strong> ${country.area} km²</p>
        <img src="${country.flags.png}" alt="${country.name.common} flag" style="width: 100px;">
    `;
    // Display country info in an alert or modal (for now, using alert)
    alert(info);
}

// Attach event listeners to buttons
document.getElementById('prevBtn').addEventListener('click', scrollLeft);
document.getElementById('nextBtn').addEventListener('click', scrollRight);

// Function to display country info in a modal
function displayCountryInfo(country) {
    // Populate modal content
    document.getElementById('modalCountryName').textContent = country.name.common;
    document.getElementById('modalCapital').textContent = country.capital || 'N/A';
    document.getElementById('modalPopulation').textContent = country.population.toLocaleString();
    document.getElementById('modalRegion').textContent = country.region;
    document.getElementById('modalSubregion').textContent = country.subregion;
    document.getElementById('modalArea').textContent = country.area;

    // Update the flag image in the modal
    const modalFlag = document.getElementById('modalFlag');
    modalFlag.src = country.flags.png;

    // Show the modal
    document.getElementById('countryModal').style.display = "block";
}

// Get the modal element
const modal = document.getElementById('countryModal');

// Get the <span> element that closes the modal
const closeModal = document.getElementById('closeModal');

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
