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
var locations = [
    {
        name: "Văn phòng HĐND-UBND Phường",
        lat: 10.764222,
        lng: 106.700975,
        desc: "104 Bến Vân Đồn, phường Khánh Hội, TP. HCM"
        type: "hanhchinh"

    },
    {
        name: "Trung tâm Phục vụ Hành chính công",
        lat: 10.761353,
        lng: 106.705483,
        desc: "531 Vĩnh Khánh, phường Khánh Hội, TP. HCM"
        type: "hanhchinh"

    }
];
var listHC = document.getElementById("hanhchinh");
var listTG = document.getElementById("tongiao");

locations.forEach(loc => {

    // Marker
    var marker = L.marker([loc.lat, loc.lng]).addTo(map);

    marker.bindPopup(`
        <b>${loc.name}</b><br>
        ${loc.desc}<br>
        <img src="${loc.img}" width="150">
    `);

    // Sidebar item
    var li = document.createElement("li");
    li.innerText = loc.name;

    li.onclick = function() {
        map.setView([loc.lat, loc.lng], 16);
        marker.openPopup();
    };

    list.appendChild(li);
});
