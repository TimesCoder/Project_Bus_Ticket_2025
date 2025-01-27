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



