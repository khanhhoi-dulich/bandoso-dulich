var map = L.map('map').setView([10.76, 106.70], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

var geoLayer;

// 🔥 QUAN TRỌNG: kiểm tra đúng tên file
fetch('./Phuong.geojson')
  .then(res => res.json())
  .then(data => {

    data.features.forEach(f => {
        if (f.geometry.type === "LineString") {
            f.geometry.type = "Polygon";
            f.geometry.coordinates = [f.geometry.coordinates];
        }
    });

    geoLayer = L.geoJSON(data, {
        style: {
            color: "#e74c3c",
            weight: 2,
            fillColor: "#f1c40f",
            fillOpacity: 0.3
        }
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds());
})
.catch(err => {
    console.error("Lỗi load GEOJSON:", err);
});
var marker1 = L.marker([10.764222, 106.700976]).addTo(map);

marker1.bindPopup(`
    <b>Văn phòng Hội đồng nhân dân - Ủy ban nhân dân phường</b><br>
    Địa chỉ: 104 Bến Vân Đồn, Khánh Hội, TP. Hồ Chí Minh<br>
    <img src="https://via.placeholder.com/150" width="150">
    `);
