function initMap() {
    // Initialize Google Map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 51.5074, lng: -0.1278 }, // Default center (London)
    });

    // Fetch data from the API
    fetch('https://api.findofficers.com/hiring_test/get_all_employee')
        .then(response => response.json())
        .then(data => {
            // Process the response data
            data.forEach(employee => {
                // Add markers for each employee
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(employee.latitude), lng: parseFloat(employee.longitude) },
                    map: map,
                    title: `${employee.firstName} ${employee.lastName}`,
                });
                

                // Optional: Info Window
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><strong>${employee.firstName} ${employee.lastName}</strong><br>Email: ${employee.email}<br>Phone: ${employee.phoneNumber}</div>`,
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}