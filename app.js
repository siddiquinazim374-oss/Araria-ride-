// ============================================================
// 🎯 DOM ELEMENTS
// ============================================================
const villageGrid = document.getElementById("villageGrid");
const searchInput = document.getElementById("searchInput");
const pickup = document.getElementById("pickup");
const drop = document.getElementById("drop");
const pickupSearch = document.getElementById("pickupSearch");
const dropSearch = document.getElementById("dropSearch");
const distanceInput = document.getElementById("distanceInput");
const calcDistBtn = document.getElementById("calcDistBtn");
const distStatus = document.getElementById("distStatus");
const fareDisplay = document.getElementById("fareDisplay");
const fareInfo = document.getElementById("fareInfo");
const bookBtn = document.getElementById("bookBtn");
const bookMsg = document.getElementById("bookMsg");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const mPickup = document.getElementById("mPickup");
const mDrop = document.getElementById("mDrop");
const mDist = document.getElementById("mDist");
const mFare = document.getElementById("mFare");
const mVeh = document.getElementById("mVeh");
const bName = document.getElementById("bName");
const bPhone = document.getElementById("bPhone");
const bLandmark = document.getElementById("bLandmark");
const bTime = document.getElementById("bTime");
const confirmBtn = document.getElementById("confirmBtn");
const modalMsg = document.getElementById("modalMsg");

let selectedVeh = "bike";
let currentFare = 0;
let currentDist = 0;

// ============================================================
// 📋 DISPLAY PLACES
// ============================================================
function getTypeIcon(type) {
    const icons = { village: "🏘️", hospital: "🏥", college: "🎓", office: "🏛️", police: "👮", court: "⚖️", transport: "🚌" };
    return icons[type] || "📍";
}

function displayPlaces(list) {
    villageGrid.innerHTML = "";
    list.forEach(function(p) {
        const div = document.createElement("div");
        const icon = getTypeIcon(p.type);
        div.innerHTML = icon + " <b>" + p.name + "</b><br><span style='font-size:11px;color:#888;'>" + p.block + "</span>";
        div.onclick = function() {
            pickup.value = p.name;
            pickupSearch.value = p.name;
            filterPickup();
        };
        villageGrid.appendChild(div);
    });
}

// ============================================================
// 🔍 SEARCH
// ============================================================
searchInput.addEventListener("input", function() {
    const q = this.value.toLowerCase().trim();
    if (!q) { displayPlaces(places); return; }
    const filtered = places.filter(function(p) {
        return p.name.toLowerCase().includes(q) || p.block.toLowerCase().includes(q) || (p.type && p.type.toLowerCase().includes(q));
    });
    displayPlaces(filtered);
});

function filterPickup() {
    const q = pickupSearch.value.toLowerCase().trim();
    const options = pickup.querySelectorAll("option");
    options.forEach(function(opt) {
        if (opt.value === "") return;
        opt.style.display = opt.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}

function filterDrop() {
    const q = dropSearch.value.toLowerCase().trim();
    const options = drop.querySelectorAll("option");
    options.forEach(function(opt) {
        if (opt.value === "") return;
        opt.style.display = opt.textContent.toLowerCase().includes(q) ? "" : "none";
    });
}

// ============================================================
// 📥 LOAD DROPDOWNS
// ============================================================
function loadDropdowns() {
    places.forEach(function(p) {
        const o1 = document.createElement("option");
        o1.value = p.name;
        o1.textContent = p.name + " (" + p.block + ")";
        o1.dataset.lat = p.lat || "";
        o1.dataset.lon = p.lon || "";
        pickup.appendChild(o1);
        const o2 = document.createElement("option");
        o2.value = p.name;
        o2.textContent = p.name + " (" + p.block + ")";
        o2.dataset.lat = p.lat || "";
        o2.dataset.lon = p.lon || "";
        drop.appendChild(o2);
    });
}

function findPlace(name) {
    return places.find(function(p) { return p.name === name; });
}

// ============================================================
// 📏 DISTANCE
// ============================================================
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fallbackDistance(p, d) {
    const km = haversine(p.lat, p.lon, d.lat, d.lon);
    const rounded = Math.round(km * 10) / 10;
    distanceInput.value = rounded;
    distStatus.textContent = "✅ दूरी: " + rounded + " KM (अनुमानित)";
    distStatus.style.color = "green";
    calcFare();
}

function calcAutoDistance() {
    const pName = pickup.value;
    const dName = drop.value;

    if (!pName || !dName) {
        distStatus.textContent = "⚠️ Pickup और Drop चुनें!";
        distStatus.style.color = "red";
        return;
    }
    if (pName === dName) {
        distStatus.textContent = "⚠️ Pickup और Drop एक ही नहीं हो सकते!";
        distStatus.style.color = "red";
        return;
    }

    const p = findPlace(pName);
    const d = findPlace(dName);

    if (!p || !d || !p.lat || !d.lat) {
        distStatus.textContent = "⚠️ Coordinates नहीं मिले! मैन्युअल डालें।";
        distStatus.style.color = "orange";
        return;
    }

    distStatus.textContent = "⏳ दूरी निकाल रहे हैं...";
    distStatus.style.color = "#ff6f00";

    const url = "https://router.project-osrm.org/route/v1/driving/" + p.lon + "," + p.lat + ";" + d.lon + "," + d.lat + "?overview=false";

    fetch(url)
        .then(function(res) {
            if (!res.ok) throw new Error("OSRM API error");
            return res.json();
        })
        .then(function(data) {
            if (data.routes && data.routes.length > 0) {
                const km = data.routes[0].distance / 1000;
                const rounded = Math.round(km * 10) / 10;
                distanceInput.value = rounded;
                distStatus.textContent = "✅ दूरी: " + rounded + " KM (सड़क मार्ग)";
                distStatus.style.color = "green";
                calcFare();
            } else {
                fallbackDistance(p, d);
            }
        })
        .catch(function() {
            fallbackDistance(p, d);
        });
}

// ============================================================
// 💰 FARE CALCULATION (Auto Increased)
// ============================================================
function getSlab(dist) {
    if (dist <= 2) {
        return { rate: 0, fixed: selectedVeh === "bike" ? 25 : selectedVeh === "auto" ? 60 : 40 };
    }
    if (dist <= 5) {
        return { rate: selectedVeh === "bike" ? 12 : selectedVeh === "auto" ? 35 : 22, fixed: 0 };
    }
    if (dist <= 10) {
        return { rate: selectedVeh === "bike" ? 10 : selectedVeh === "auto" ? 30 : 20, fixed: 0 };
    }
    return { rate: selectedVeh === "bike" ? 8 : selectedVeh === "auto" ? 25 : 18, fixed: 0 };
}

function calcFare() {
    const dist = parseFloat(distanceInput.value);
    if (!dist || dist <= 0) {
        fareDisplay.textContent = "₹0";
        fareInfo.textContent = "किमी डालें";
        currentFare = 0;
        currentDist = 0;
        return;
    }
    currentDist = dist;
    const slab = getSlab(dist);
    let fare, detail;
    if (slab.fixed > 0) {
        fare = slab.fixed;
        detail = dist + " KM (Fixed ₹" + slab.fixed + ")";
    } else {
        fare = dist * slab.rate;
        detail = dist + " KM × ₹" + slab.rate + "/KM";
    }
    currentFare = Math.round(fare);
    const names = { bike: "Bike", auto: "Auto", erickshaw: "E-Rickshaw" };
    fareDisplay.textContent = "₹" + currentFare;
    fareInfo.textContent = detail + " (" + names[selectedVeh] + ")";
}

// ============================================================
// 🚗 VEHICLE SELECT
// ============================================================
function selectVeh(veh) {
    selectedVeh = veh;
    document.querySelectorAll(".vehicle-options button").forEach(function(b) { b.classList.remove("active"); });
    document.getElementById("v" + veh.charAt(0).toUpperCase() + veh.slice(1)).classList.add("active");
    calcFare();
}

// ============================================================
// 📲 BOOK RIDE
// ============================================================
bookBtn.addEventListener("click", function() {
    const p = pickup.value;
    const d = drop.value;
    const dist = parseFloat(distanceInput.value);

    if (!p || !d) {
        bookMsg.textContent = "⚠️ Pickup और Drop चुनें!";
        bookMsg.className = "msg error";
        return;
    }
    if (p === d) {
        bookMsg.textContent = "⚠️ Pickup और Drop एक ही नहीं हो सकते!";
        bookMsg.className = "msg error";
        return;
    }
    if (!dist || dist <= 0) {
        bookMsg.textContent = "⚠️ दूरी डालें (Auto या Manual)!";
        bookMsg.className = "msg error";
        return;
    }
    if (currentFare <= 0) {
        bookMsg.textContent = "⚠️ किराया calculate नहीं हुआ!";
        bookMsg.className = "msg error";
        return;
    }

    bookMsg.textContent = "";
    const names = { bike: "Bike", auto: "Auto", erickshaw: "E-Rickshaw" };
    mPickup.textContent = p;
    mDrop.textContent = d;
    mDist.textContent = dist + " KM";
    mFare.textContent = "₹" + currentFare;
    mVeh.textContent = names[selectedVeh];
    bName.value = "";
    bPhone.value = "";
    bLandmark.value = "";
    bTime.value = "";
    modalMsg.textContent = "";
    modal.style.display = "flex";
});

// ============================================================
// ❌ CLOSE MODAL
// ============================================================
closeModal.onclick = function() { modal.style.display = "none"; };
window.onclick = function(e) { if (e.target === modal) modal.style.display = "none"; };

// ============================================================
// ✅ CONFIRM BOOKING - TELEGRAM
// ============================================================
confirmBtn.addEventListener("click", function() {
    const name = bName.value.trim();
    const phone = bPhone.value.trim();
    const lm = bLandmark.value.trim();
    const rt = bTime.value;

    if (!name) { modalMsg.textContent = "⚠️ नाम डालें!"; modalMsg.className = "msg error"; return; }
    if (!/^[0-9]{10}$/.test(phone)) { modalMsg.textContent = "⚠️ सही 10 digit mobile डालें!"; modalMsg.className = "msg error"; return; }
    if (!rt) { modalMsg.textContent = "⚠️ Ride Time चुनें!"; modalMsg.className = "msg error"; return; }

    const id = "AT" + Date.now().toString().slice(-6);
    const msg = "🛵 ARARIA BIKE TAXI BOOKING\n\n" +
                "Booking ID: " + id + "\n" +
                "Name: " + name + "\n" +
                "Mobile: " + phone + "\n" +
                "Pickup: " + mPickup.textContent + "\n" +
                "Drop: " + mDrop.textContent + "\n" +
                "Distance: " + mDist.textContent + "\n" +
                "Vehicle: " + mVeh.textContent + "\n" +
                "Fare: " + mFare.textContent + "\n" +
                "Landmark: " + lm + "\n" +
                "Ride Time: " + rt;

    modalMsg.textContent = "⏳ Booking भेज रहे हैं...";
    modalMsg.className = "msg loading";

    const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: "HTML" })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data.ok) {
            modalMsg.textContent = "✅ Booking भेज दी गई! 🎉";
            modalMsg.className = "msg success";
            setTimeout(function() { modal.style.display = "none"; }, 2000);
        } else {
            modalMsg.textContent = "❌ Error: " + data.description;
            modalMsg.className = "msg error";
        }
    })
    .catch(function() {
        modalMsg.textContent = "❌ Network error! कृपया फिर try करें।";
        modalMsg.className = "msg error";
    });
});

// ============================================================
// 🚀 START
// ============================================================
displayPlaces(places);
loadDropdowns();

distanceInput.addEventListener("input", calcFare);
calcDistBtn.addEventListener("click", calcAutoDistance);

pickup.addEventListener("change", function() {
    pickupSearch.value = pickup.value;
    filterPickup();
});
drop.addEventListener("change", function() {
    dropSearch.value = drop.value;
    filterDrop();
});

console.log("✅ Araria Bike Taxi loaded!");
console.log("📦 Total Places:", places.length);
