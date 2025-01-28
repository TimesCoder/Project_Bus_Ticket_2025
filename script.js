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


function hideDetailsKursi() {
  const popup = document.querySelector(".popup-details-kursi");
  console.log(popup); // Pastikan elemen ditemukan
  if (popup) {
    popup.style.display = "none";
  } else {
    console.error("Popup tidak ditemukan");
  }
}

function bookingTicket(){
  const popup = document.querySelector(".popup-details-kursi");
  popup.style.display = "flex";
}


// Data Kursi
const seatsData = [
    {
        row: 1,
        seats: Array.from({ length: 10 }, (_, i) => ({
            number: `A${i + 1}`,
            price: 50000,
            status: i < 8 ? "available" : "unavailable",
        }))
    },
    {
        row: 2,
        seats: Array.from({ length: 10 }, (_, i) => ({
            number: `B${i + 1}`,
            price: 50000,
            status: i < 9 ? "available" : "booked",
        }))
    },
    {
        row: 3,
        seats: Array.from({ length: 10 }, (_, i) => ({
            number: `C${i + 1}`,
            price: 50000,
            status: i === 9 ? "occupied" : "available",
        }))
    },
    {
        row: 4,
        seats: Array.from({ length: 9 }, (_, i) => ({
            number: `D${i + 1}`,
            price: 50000,
            status: "available",
        }))
    }
];

// Render Kursi
const container = document.getElementById("seats-container");
let selectedSeats = [];
let totalPrice = 0;

seatsData.forEach(rowData => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "d-flex gap-3";

    
    rowData.seats.forEach(seat => {
        const seatEl = document.createElement("i");
        seatEl.className = "fa-solid fa-chair fs-4";
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
        selectedSeats = selectedSeats.filter(s => s !== seat.number);
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
    document.getElementById("total-seats").textContent = selectedSeats.length;
    document.getElementById("subtotal-price").textContent = `Rp${totalPrice}`;
    document.getElementById("selected-seats").textContent = selectedSeats.join(", ");
    document.getElementById("total-price").textContent = `Rp${totalPrice}`;
}

// Close Popup
function hideDetailsKursi() {
    document.querySelector(".popup-details-kursi").style.display = "none";
}

function addOrder() {
    alert(`Pesanan berhasil dibuat!\nTotal: Rp${totalPrice}`);
}
