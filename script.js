fetch('Phuong.geojson')
  .then(res => res.json())
  .then(data => {

    var geoLayer = L.geoJSON(data, {
        style: {
            color: "#e74c3c",
            weight: 4
        }
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds());
});
