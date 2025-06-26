// login
const swipeContainer = document.getElementById("swipeContainer");

function showModal() {
  document.getElementById("popup").style.display = "block";
}

function hideModal() {
  document.getElementById("popup").style.display = "none";
}
// Fungsi untuk menampilkan form register dengan animasi geser
function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Menyembunyikan form login dan menampilkan form register dengan efek geser
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  setTimeout(() => {
    registerForm.classList.add("swipe-in");
  }, 10); // Memberikan waktu sedikit agar animasi bisa berjalan
}

// Fungsi untuk menampilkan form login dengan animasi geser
function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Menyembunyikan form register dan menampilkan form login dengan efek geser
  registerForm.classList.remove("swipe-in");
  setTimeout(() => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  }, 400); // Waktu yang sama dengan durasi animasi
}

window.onclick = function (event) {
  const modal = document.getElementById("popup");
  if (event.target == modal) {
    hideModal();
  }
};

// Mengambil data JSON dari file
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateButtonsContainer = document.getElementById("dateButtons");
    const busList = document.getElementById("busList");
    const busListItems = document.getElementById("busListItems");

    let firstAvailableDate = null;

    // Fungsi untuk menampilkan daftar bus dengan efek "refresh"
    function updateBusList() {
      // Tambahkan efek fade-out sebelum mengganti daftar bus
      busListItems.style.opacity = "0";
      setTimeout(() => {
        busListItems.innerHTML = ""; // Bersihkan daftar sebelum menampilkan ulang

        data.buses.forEach((bus) => {
          const busCard = document.createElement("div");
          busCard.classList.add("bus-card", "d-flex", "justify-content-between", "rounded-0");

          busCard.innerHTML = `
            <div class="bus-container rounded-0 text-center">
                <div class="bus-image-container">
                    <img src="${bus.image}" class="bus-logo" alt="${bus.jenis}">
                    <p class="bus-jenis mt-3">${bus.jenis}</p> 
                </div>
                <div class="bus-info d-flex align-items-center justify-content-center gap-4 text-center mt-3">
                    <p class="bus-time">${bus.time}</p>
                    <p class="bus-name">${bus.name}</p>
                    <p class="bus-route">
                        <i class="fa-solid fa-location-dot text-secondary"></i> ${bus.route}
                        <i class="fa-solid fa-location-dot text-secondary"></i>
                    </p>
                    <p class="bus-price">${bus.price}</p>
                    <p class="bus-seats"><i class="bi bi-person-fill"></i> ${bus.seats}</p>
                </div>
                <div class="bus-select">
                    <button class="btn btn-danger"><a href="details_bus.html" class="text-decoration-none text-white">SELECT</a></button>
                </div>
            </div>
          `;

          busListItems.appendChild(busCard);
        });

        // Tambahkan efek fade-in setelah daftar bus diperbarui
        busListItems.style.opacity = "1";
      }, 300); // Delay untuk memberikan efek refresh
    }

    // Fungsi untuk mengatur tombol aktif
    function setActiveButton(selectedButton) {
      document
        .querySelectorAll(".date-selector .btn")
        .forEach((btn) => btn.classList.remove("btn-danger", "active"));
      selectedButton.classList.add("btn-danger", "active");
    }

    // Membuat tombol tanggal berdasarkan data JSON
    data.dates.slice(0, 8).forEach((dateData) => {
      const dateObject = new Date(dateData.month);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn m-10";
      button.innerText = dateData.date;

      // Nonaktifkan tombol jika tanggal sudah lewat
      if (dateObject < today) {
        button.classList.add("disabled");
        button.setAttribute("disabled", "true");
      } else {
        button.classList.add("btn-outline-danger");
        if (!firstAvailableDate) {
          firstAvailableDate = button; // Simpan tombol pertama yang tersedia
        }

        button.addEventListener("click", function () {
          setActiveButton(button);
          updateBusList();
        });
      }

      dateButtonsContainer.appendChild(button);
    });

    // Pilih tanggal pertama yang tersedia secara otomatis
    if (firstAvailableDate) {
      firstAvailableDate.classList.add("btn-danger", "active");
      updateBusList();
    }
  })
  .catch((error) => console.error("Error loading the JSON data:", error));



function hideDetailsKursi() {
  const popup = document.querySelector(".popup-details-kursi");
  console.log(popup); // Pastikan elemen ditemukan
  if (popup) {
    popup.style.display = "none";
  } else {
    console.error("Popup tidak ditemukan");
  }
}

function bookingTicket() {
  const popup = document.querySelector(".popup-details-kursi");
  popup.style.display = "flex";
}

// Data Kursi
const seatsData = [
  {
    seats: Array.from({ length: 8 }, (_, i) => ({
      number: `A${i + 1}`,
      price: 50000,
      status: i < 7 ? "available" : "unavailable" ,
    })),
  },
  {
    seats: Array.from({ length: 8 }, (_, i) => ({
      number: `B${i + 1}`,
      price: 50000,
      status: i < 5 ? "available" : "booked" ,
    })),
  },
  // buatlah agar ada jarak antara seat A,B dan C,D
  { seats: [] },

  {
    seats: Array.from({ length: 8 }, (_, i) => ({
      number: `C${i + 1}`,
      price: 50000,
      status: i === 4 ? "occupied" : "available" && i === 6 ? "available" : "booked",
    })),
  },
  {
    seats: Array.from({ length: 8 }, (_, i) => ({
      number: `D${i + 1}`,
      price: 50000,
      status: "available " && i === 4 ? "occupied" : "available",
    })),
  },
];

// Render Kursi
const container = document.getElementById("seats-container");
let selectedSeats = [];
let totalPrice = 0;

seatsData.forEach((rowData) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "d-flex gap-3 pt-2";

  rowData.seats.forEach((seat) => {
    const seatEl = document.createElement("i");
    seatEl.className = "fa-solid fa-couch fs-4";
    seatEl.style.transform = "rotate(270deg)";
    seatEl.dataset.number = seat.number;
    seatEl.dataset.price = seat.price;

    // Warna berdasarkan status
    if (seat.status === "available") {
      seatEl.classList.add("text-success");
      seatEl.addEventListener("click", () => toggleSeatSelection(seat, seatEl));
    } else if (seat.status === "booked") {
      seatEl.classList.add("text-warning");
    } else if (seat.status === "occupied") {
      seatEl.classList.add("text-danger");
    } else if (seat.status === "unavailable") {
      seatEl.classList.add("text-secondary");
    }

    rowDiv.appendChild(seatEl);
  });

  container.appendChild(rowDiv);
});

// Toggle Kursi
function toggleSeatSelection(seat, seatEl) {
  if (selectedSeats.includes(seat.number)) {
    selectedSeats = selectedSeats.filter((s) => s !== seat.number);
    totalPrice -= seat.price;
    seatEl.classList.remove("selected");
  } else {
    selectedSeats.push(seat.number);
    totalPrice += seat.price;
    seatEl.classList.add("selected");
  }
  updateSummary();
}

// Update Ringkasan
function updateSummary() {
  document.getElementById("selected-seats").textContent =
    selectedSeats.join(", ");
  document.getElementById("total-price").textContent = `Rp${totalPrice}`;
}

// Close Popup
function hideDetailsKursi() {
  document.querySelector(".popup-details-kursi").style.display = "none";
}

function addOrder() {
  const orderDetails = {
    selectedSeats,
    totalPrice,
    passengerDetails: [],
  };

  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

  window.location.href = "detail-penumpang.html";
}

// Fungsi Register (Simpan ke localStorage)
function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Password dan konfirmasi password tidak cocok!');
    return;
  }

  // Cek apakah email sudah terdaftar
  if (localStorage.getItem(email)) {
    alert('Email sudah terdaftar! Silakan login.');
    showLogin();
    return;
  }

  // Simpan user ke localStorage
  localStorage.setItem(email, JSON.stringify({ password }));
  alert('Registrasi berhasil! Silakan login.');
  showLogin();
}

// Fungsi Login (Cek dari localStorage)
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Cek apakah user sudah terdaftar
  const userData = localStorage.getItem(email);
  if (!userData) {
    alert('Akun tidak ditemukan! Silakan register terlebih dahulu.');
    return;
  }

  const { password: savedPassword } = JSON.parse(userData);
  if (password === savedPassword) {
    alert('Login berhasil!');
    hideModal();
  } else {
    alert('Password salah!');
  }
}