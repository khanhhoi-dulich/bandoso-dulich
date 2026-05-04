// Tạo bản đồ
var map = L.map('map').setView([10.76, 106.70], 14);

// Nền bản đồ
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Dữ liệu địa điểm (bạn có thể sửa)
var locations = [
    {
        name: "UBND Phường",
        lat: 10.76,
        lng: 106.70,
        desc: "Trung tâm hành chính",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Trường học",
        lat: 10.762,
        lng: 106.702,
        desc: "Trường tiểu học",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Trạm y tế",
        lat: 10.758,
        lng: 106.699,
        desc: "Cơ sở y tế",
        img: "https://via.placeholder.com/150"
    }
];

// Hiển thị marker + sidebar
var list = document.getElementById("locationList");

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