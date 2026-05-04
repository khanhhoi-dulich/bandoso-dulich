// Khởi tạo map
var map = L.map('map').setView([10.76, 106.70], 14);

// Nền bản đồ
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

var geoLayer; // biến toàn cục

// Load GeoJSON
fetch('Phuong.geojson')
  .then(res => res.json())
  .then(data => {

    // 🔥 CHUYỂN LineString → Polygon
    data.features.forEach(f => {
        if (f.geometry.type === "LineString") {
            f.geometry.type = "Polygon";
            f.geometry.coordinates = [f.geometry.coordinates];
        }
    });

    // Hiển thị
    geoLayer = L.geoJSON(data, {

        style: {
            color: "#e74c3c",
            weight: 2,
            fillColor: "#f1c40f",
            fillOpacity: 0.3
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<b>Phường Khánh Hội</b>");
        }

    }).addTo(map);

    map.fitBounds(geoLayer.getBounds());
});

// Sidebar click → zoom
function zoomToPhuong() {
    if (geoLayer) {
        map.fitBounds(geoLayer.getBounds());
    }
}
