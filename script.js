var map = L.map('map').setView([10.76, 106.70], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

var geoLayer;
var routeControl;

// ===== LOAD GEOJSON =====
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


// ===== HÀM CHỈ ĐƯỜNG =====
function routeTo(lat, lng) {

    if (!navigator.geolocation) {
        alert("Trình duyệt không hỗ trợ định vị");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {

        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Xóa route cũ
        if (routeControl) {
            map.removeControl(routeControl);
        }

        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(userLat, userLng),
                L.latLng(lat, lng)
            ],

            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,

            createMarker: function () { return null; },

            lineOptions: {
                styles: [
                    { color: '#2ecc71', weight: 6 }
                ]
            }

        }).addTo(map);

    }, function() {
        alert("Không lấy được vị trí");
    });
}


// ===== DATA =====
var locations = [
{
        name: "Văn phòng Đảng ủy phường Khánh Hội",
        lat: 10.760295,
        lng: 106.700214,
        desc: "31 đường 12A, Phường Khánh Hội, TP. Hồ Chí Minh",
        type: "hanhchinh"
    },
    {
        name: "Ủy ban Mặt trận Tổ quốc Việt Nam phường Khánh Hội",
        lat: 10.760295,
        lng: 106.700214,
        desc: "31 đường 12A, Phường Khánh Hội, TP. Hồ Chí Minh",
        type: "hanhchinh"
    },
    {
        name: "Văn phòng HĐND-UBND Phường",
        lat: 10.764222,
        lng: 106.700975,
        desc: "104 Bến Vân Đồn, phường Khánh Hội, TP. Hồ Chí Minh",
        type: "hanhchinh"
    },
    {
        name: "Trung tâm Phục vụ Hành chính công",
        lat: 10.761353,
        lng: 106.705483,
        desc: "531 Vĩnh Khánh, phường Khánh Hội, TP. Hồ Chí Minh",
        type: "hanhchinh"
    },
      {
        name: "Trạm Y tế phường Khánh Hội",
        lat: 10.76179,
        lng: 106.69779,
        desc: "178 Bến Vân Đồn, phường Khánh Hội, TP. Hồ Chí Minh",
        type: "hanhchinh"
    }
];


// ===== SIDEBAR =====
var listHC = document.getElementById("hanhchinh");
var listTG = document.getElementById("tongiao");

locations.forEach(loc => {

    var marker = L.marker([loc.lat, loc.lng]).addTo(map);

marker.bindPopup(`
    <b>${loc.name}</b><br>
    ${loc.desc}<br><br>
    <button onclick="showInput(${loc.lat}, ${loc.lng})">
        🧭 Chỉ đường
    </button>
`);

  
    var li = document.createElement("li");
    li.innerText = loc.name;

    // 🔥 CLICK SIDEBAR → VẼ ĐƯỜNG
    li.onclick = function () {
    map.setView([loc.lat, loc.lng], 17);
    marker.openPopup();
    };

    if (loc.type === "hanhchinh") {
        listHC.appendChild(li);
    } else {
        listTG.appendChild(li);
    }
});


// ===== NÚT XÓA ROUTE =====
var btn = document.getElementById("clearRoute");

if (btn) {
    btn.onclick = function () {
        if (routeControl) {
            map.removeControl(routeControl);
        }
    };
}
