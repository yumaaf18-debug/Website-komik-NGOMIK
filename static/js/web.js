/* ================= OOP ================= */

class User {
    constructor(data) {
        this.data = data; // [VARIABEL + OBJECT] menyimpan data user
    }

    login(email) {
        this.data.isLoggedIn = true;
        this.data.email = email;
        this.save();
    }

    logout() {
        this.data.isLoggedIn = false;
        this.save();
    }

    addBookmark(id) {
        // [PERCABANGAN + ARRAY]
        if (!this.data.bookmarks.includes(id)) {
            this.data.bookmarks.push(id);  // ARRAY 
            this.save();
        }
    }

    removeBookmark(id) {
        // [ARRAY + OPERATOR]
        this.data.bookmarks = this.data.bookmarks.filter(b => b !== id);
        this.save();
    }

    addHistory(id) {
        // [ARRAY + PERCABANGAN]
        if (!this.data.history.includes(id)) {
            this.data.history.push(id);
            this.save();
        }
    }

    save() {
        // [INPUT / OUTPUT] simpan data ke local storage
        localStorage.setItem("userData", JSON.stringify(this.data));
    }
}

/* ================= REGISTERED USERS ================= */

let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

/* ================= USER DATA ================= */
// [STRUKTUR DATA - OBJEK]
let userData = {
    isLoggedIn: false,
    email: "",
    bookmarks: [], //ARRAY
    history: []
};

if (localStorage.getItem("userData")) {
    userData = JSON.parse(localStorage.getItem("userData"));
}

/* ================= DOM ================= */

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const accountPanel = document.getElementById("accountPanel");
const openAccount = document.getElementById("openAccount");
const logoutBtn = document.getElementById("logoutBtn");
const changeBtn = document.getElementById("changeBtn");

const toast = document.getElementById("toast");           //VARIABEL

const homeBtn = document.getElementById("homeBtn");
const bookmarkBtn = document.getElementById("bookmarkBtn");
const historyBtn = document.getElementById("historyBtn");

const authModal = document.getElementById("authModal");

const featuredCards = document.getElementById("featuredCards");
const otherCards = document.getElementById("otherCards");
const filterContainer = document.getElementById("filterContainer");
const allCards = document.querySelectorAll(".card");

/* ================= HELPERS ================= */

function checkLoginStatus() {
    if (!userData.isLoggedIn) {
        authModal.style.display = "flex";
        return false;
    }
    return true;
}

function showToast(msg) {
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
}

/* ================= BOOKMARK ================= */

function toggleBookmark(id) {
    if (!checkLoginStatus()) return;

    const icon = document.querySelector(`.bookmark-icon[data-id="${id}"]`);
    if (!icon) return;

    if (userData.bookmarks.includes(id)) {
        userData.bookmarks = userData.bookmarks.filter(b => b !== id);
        icon.classList.remove("bookmarked");
        icon.innerHTML = '<i class="far fa-bookmark"></i>';
        showToast("Removed from bookmark");
    } else {
        userData.bookmarks.push(id);
        icon.classList.add("bookmarked");
        icon.innerHTML = '<i class="fas fa-bookmark"></i>';
        showToast("Added to bookmark");
    }

    localStorage.setItem("userData", JSON.stringify(userData));
}

/* ================= MIRROR ================= */

//FUNGSI + ARRAY + INPUT / OUTPUT

function openMirror(url, id) {
    if (!checkLoginStatus()) return;

    if (!userData.history.includes(id)) {
        userData.history.push(id);
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    document.getElementById("mirrorReader").style.display = "flex";
    document.getElementById("mirrorFrame").src = url;
}

function closeMirror() {
    document.getElementById("mirrorReader").style.display = "none";
    document.getElementById("mirrorFrame").src = "";
}

/* ================= CARD CLICK ================= */

function attachCardClick(card) {
    card.addEventListener("click", () => {
        const id = card.dataset.id;
        const url = card.dataset.mirror;
        if (id && url) openMirror(url, id);
    });
}

/* ================= INIT CARD ================= */

// [PERULANGAN ]

allCards.forEach(card => {
    attachCardClick(card);

    const icon = card.querySelector(".bookmark-icon");
    if (icon) {
        icon.onclick = (e) => {
            e.stopPropagation();
            toggleBookmark(card.dataset.id);
        };
    }
});

/* ================= NAVIGATION ================= */

function setActive(btn) {
    [homeBtn, bookmarkBtn, historyBtn].forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

homeBtn.onclick = () => {
    if (!checkLoginStatus()) return;
    setActive(homeBtn);
    featuredCards.style.display = "flex";
    otherCards.style.display = "flex";
    filterContainer.style.display = "flex";
    document.getElementById("bookmarkedCards")?.remove();
    document.getElementById("historyCards")?.remove();
};

bookmarkBtn.onclick = () => {
    if (!checkLoginStatus()) return;
    setActive(bookmarkBtn);

    featuredCards.style.display = "none";
    otherCards.style.display = "none";
    filterContainer.style.display = "none";
    document.getElementById("historyCards")?.remove();

    let wrap = document.getElementById("bookmarkedCards");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.id = "bookmarkedCards";
        wrap.className = "cards";
        document.querySelector("h2").after(wrap);
    }
    wrap.innerHTML = "";

    if (userData.bookmarks.length === 0) {
        wrap.innerHTML = `<div class="empty-state">No Bookmark</div>`;
        return;
    }

    userData.bookmarks.forEach(id => {
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (!card) return;

        const clone = card.cloneNode(true);
        wrap.appendChild(clone);

        attachCardClick(clone);
        clone.querySelector(".bookmark-icon").onclick = (e) => {
            e.stopPropagation();
            toggleBookmark(id);
        };
    });
};

historyBtn.onclick = () => {
    if (!checkLoginStatus()) return;
    setActive(historyBtn);

    featuredCards.style.display = "none";
    otherCards.style.display = "none";
    filterContainer.style.display = "none";
    document.getElementById("bookmarkedCards")?.remove();

    let wrap = document.getElementById("historyCards");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.id = "historyCards";
        wrap.className = "cards";
        document.querySelector("h2").after(wrap);
    }
    wrap.innerHTML = "";

    if (userData.history.length === 0) {
        wrap.innerHTML = `<div class="empty-state">No History</div>`;
        return;
    }

    [...new Set(userData.history)].reverse().forEach(id => {
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (!card) return;

        const clone = card.cloneNode(true);
        wrap.appendChild(clone);

        attachCardClick(clone);
        clone.querySelector(".bookmark-icon").onclick = (e) => {
            e.stopPropagation();
            toggleBookmark(id);
        };
    });
};

/* ================= PROFILE ================= */

profileBtn.onclick = (e) => {
    e.stopPropagation();
    if (!checkLoginStatus()) return;
    profileMenu.style.display =
        profileMenu.style.display === "block" ? "none" : "block";
    accountPanel.style.display = "none";
};

openAccount.onclick = (e) => {
    e.stopPropagation();
    profileMenu.style.display = "none";
    accountPanel.style.display = "block";
};

logoutBtn.onclick = (e) => {
    e.stopPropagation();
    userData.isLoggedIn = false;
    localStorage.setItem("userData", JSON.stringify(userData));
    profileMenu.style.display = "none";
    accountPanel.style.display = "none";
    showToast("Logout berhasil");
    setTimeout(() => authModal.style.display = "flex", 800);
};

document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) &&
        !profileMenu.contains(e.target) &&
        !accountPanel.contains(e.target)) {
        profileMenu.style.display = "none";
        accountPanel.style.display = "none";
    }
});

/* ================= CHANGE ACCOUNT ================= */

const changeModal = document.getElementById("changeModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");

changeBtn.onclick = () => changeModal.style.display = "flex";
closeModal.onclick = cancelBtn.onclick = () => changeModal.style.display = "none";

saveBtn.onclick = () => {
    const email = document.getElementById("emailInput").value;
    if (!email.includes("@")) {
        showToast("Email tidak valid");
        return;
    }
    userData.email = email;
    localStorage.setItem("userData", JSON.stringify(userData));
    document.getElementById("emailInfoBox").innerHTML =
        `<strong>Email</strong><br>${email}`;
    changeModal.style.display = "none";
    showToast("Account updated");
};

/* ================= AUTH ================= */

document.getElementById("loginBtn").onclick = () => {
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value;

    if (!email || !pass) {
        showToast("Isi email & password");
        return;
    }

    //  CEK KE AKUN TERDAFTAR
    const user = registeredUsers.find(
        u => u.email === email && u.password === pass
    );

    if (!user) {
        showToast("Email atau password salah");
        return;
    }

    //  LOGIN BERHASIL
    userData.isLoggedIn = true;
    userData.email = email;
    localStorage.setItem("userData", JSON.stringify(userData));

    authModal.style.display = "none";
    showToast("Login berhasil");
};


/* ================= INIT BOOKMARK UI ================= */

userData.bookmarks.forEach(id => {
    const icon = document.querySelector(`.bookmark-icon[data-id="${id}"]`);
    if (icon) {
        icon.classList.add("bookmarked");
        icon.innerHTML = '<i class="fas fa-bookmark"></i>';
    }
});
/* ================= GENRE FILTER (FIX) ================= */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
    btn.onclick = () => {
        if (!checkLoginStatus()) return;

        // active button
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter.toLowerCase();

        allCards.forEach(card => {
            const genre = card.dataset.genre.toLowerCase();

            if (filter === "all" || genre === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    };
});
/* ================= SEARCH (FIX TOTAL) ================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();

    // SEARCH HANYA AKTIF DI BERANDA
    if (featuredCards.style.display === "none") return;

    // Reset genre filter ke "All"
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === "all") btn.classList.add("active");
    });

    allCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();

        if (title.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    // Jika input kosong → tampilkan semua
    if (keyword === "") {
        allCards.forEach(card => card.style.display = "block");
    }
});
/* ================= AUTH FIX (REGISTER & CLOSE) ================= */

const closeAuthBtn = document.getElementById("closeAuthModal");
const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
const registerTab = document.querySelector('.auth-tab[data-tab="register"]');

if (loginTab && registerTab) {
    loginTab.onclick = () => {
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        document.getElementById("loginContent").classList.add("active");
        document.getElementById("registerContent").classList.remove("active");
    };

    registerTab.onclick = () => {
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        document.getElementById("registerContent").classList.add("active");
        document.getElementById("loginContent").classList.remove("active");
    };
}

/* ===== CLOSE AUTH MODAL ===== */

closeAuthBtn.onclick = () => {
    authModal.style.display = "none";
};

/* ===== REGISTER BUTTON FIX ===== */

document.getElementById("registerBtn").onclick = () => {
    const email = document.getElementById("registerEmail").value.trim();
    const pass = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmRegisterPassword").value;

    if (!email || !pass || !confirm) {
        showToast("Semua field wajib diisi");
        return;
    }

    if (pass.length < 8) {
        showToast("Password minimal 8 karakter");
        return;
    }

    if (pass !== confirm) {
        showToast("Password tidak sama");
        return;
    }

    // CEK EMAIL SUDAH TERDAFTAR
    const exists = registeredUsers.find(u => u.email === email);
    if (exists) {
        showToast("Email sudah terdaftar");
        return;
    }

    // SIMPAN AKUN BARU
    registeredUsers.push({
        email: email,
        password: pass
    });

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    showToast("Register berhasil, silakan login");
    
    // pindah ke tab login
    document.querySelector('.auth-tab[data-tab="login"]').click();
};

