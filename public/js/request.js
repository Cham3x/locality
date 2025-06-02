document.addEventListener("DOMContentLoaded", () => {
    const inputCity = document.getElementById("city");
    const inputLat = document.getElementById("lat");
    const inputLon = document.getElementById("lon");
    const inputCp = document.getElementById("cp");
    const suggestionsDiv = document.getElementById("suggestions");




    function geocodeAddress(address) {
        const apiKey = 'AIzaSyB9uz8DtH0UlWwIiegt8MJUU1e_DvtFcNw';
        const encodedAddress = encodeURIComponent(address);
      
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === 'OK') {
              const lat = data.results[0].geometry.location.lat;
              const lng = data.results[0].geometry.location.lng;
              console.log('Coordonnées trouvées:', location); // { lat: ..., lng: ... }
              console.log(data);
                
                inputLat.value = lat;
                inputLon.value = lng;
                
            } else {
                
              console.error('Erreur Geocoding:', data.status);
            }
          })
          .catch(err => console.error('Erreur réseau:', err));
      }






    inputCity.addEventListener("input", () => {
        let query = inputCity.value;
        console.log('from query'+inputCity.value);
        if (query.length < 1) {
            suggestionsDiv.innerHTML = "";
            return;
        }

        fetch(`/api/City?q=${query}`)
            .then(response => response.json())
            .then(data => {
                
                suggestionsDiv.innerHTML = "";
                data.forEach(ville => {
                    let div = document.createElement("div");
                    div.textContent = `${ville.ville_nom_reel}(${ville.ville_code_postal})`;
                    div.classList.add("suggestion-item");
                    div.classList.add("bg-white");
                    div.classList.add("rounded-lg");
                

                    div.addEventListener("click", () => {
                        const inputAdresse = document.getElementById('adresse');
                        console.log(inputAdresse.value);
                        const adresseApiGeo = `${inputAdresse.value}, ${ville.ville_nom_reel}`;
                        inputCity.value = ville.ville_nom_reel;
                        inputCp.value = ville.ville_code_postal;
                        geocodeAddress(adresseApiGeo);
                        

                        suggestionsDiv.innerHTML = "";
                    });
                    suggestionsDiv.appendChild(div);
                });
            })
            .catch(error => console.error("Erreur:", error));
    });
});