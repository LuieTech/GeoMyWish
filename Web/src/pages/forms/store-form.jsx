import React, { useEffect } from 'react';

function StoreForm() {
  useEffect(() => {
    const input = document.getElementById("pac-input");

    const autocomplete = new window.google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("name", place.name);
      console.log("latitude", place.geometry.location.lat());
      console.log("longitude", place.geometry.location.lng());
      // Aquí iría la lógica para manejar la tienda seleccionada
    });
  }, []);

  return (
    <input id="pac-input" placeholder="Enter store name" />
  );
}

export default StoreForm;
