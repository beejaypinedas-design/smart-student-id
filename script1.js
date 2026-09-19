// ========================================
// SMART STUDENT ID
// JavaScript
// ========================================


// ================= STUDENT DATA =================

const student = {
    name: "Benedicto Pineda",
    firstName: "Benedicto",
    studentId: "WMA 2026-2027",
    program: "Web and Mobile Application",
    section: "WMA 3-B",
    balance: 0.00
};


// ================= LOGIN =================

function setupLogin() {

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const userError = document.getElementById("userError");
    const passError = document.getElementById("passError");
    const signInBtn = document.getElementById("signInBtn");
    const loginToggle = document.getElementById("loginToggle");

    if (!signInBtn) return;


    signInBtn.addEventListener("click", function () {

        let isValid = true;

        // Reset errors
        usernameInput.classList.remove("input-error");
        passwordInput.classList.remove("input-error");
        userError.style.display = "none";
        passError.style.display = "none";


        // Check username
        if (usernameInput.value.trim() === "") {
            usernameInput.classList.add("input-error");
            userError.style.display = "block";
            isValid = false;
        }


        // Check password
        if (passwordInput.value.trim() === "") {
            passwordInput.classList.add("input-error");
            passError.style.display = "block";
            isValid = false;
        }


        // Success
        if (isValid) {
            loginToggle.checked = true;
            showNotification("Welcome back, " + student.firstName + "!");
        }
    });


    // Remove error while typing
    usernameInput.addEventListener("input", function () {
        if (this.value.trim() !== "") {
            this.classList.remove("input-error");
            userError.style.display = "none";
        }
    });

    passwordInput.addEventListener("input", function () {
        if (this.value.trim() !== "") {
            this.classList.remove("input-error");
            passError.style.display = "none";
        }
    });
}


// ================= PAGE NAVIGATION =================

function openPage(pageName) {

    // Hide all pages
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });


    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }


    // Update bottom navigation
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });


    // Match navigation buttons
    navItems.forEach(item => {

        const text = item.innerText.toLowerCase();

        if (
            (pageName === "home" && text.includes("home")) ||
            (pageName === "wallet" && text.includes("wallet")) ||
            (pageName === "attendance" && text.includes("attendance")) ||
            (pageName === "profile" && text.includes("profile"))
        ) {
            item.classList.add("active");
        }

    });


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================= BALANCE =================

function updateBalance() {

    const balanceText =
        "₱" + student.balance.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


    const balanceElement =
        document.getElementById("balance");

    const walletBalanceElement =
        document.getElementById("walletBalance");


    if (balanceElement) {
        balanceElement.textContent = balanceText;
    }


    if (walletBalanceElement) {
        walletBalanceElement.textContent = balanceText;
    }
}


// ================= ADD BALANCE =================

function addBalance(amount) {

    student.balance += amount;

    updateBalance();

    showNotification(
        "₱" + amount.toFixed(2) + " added to your balance"
    );
}


// ================= ADD BALANCE MODAL =================

let selectedMethod = "";

function openBalanceModal() {

    document.getElementById("bmOverlay").classList.add("show");

    // Clear previous amount
    document.getElementById("bmAmountInput").value = "";
    bmValidateAmount();

    bmShowStep("methods");
}


function closeBalanceModal() {

    document.getElementById("bmOverlay").classList.remove("show");
}


function bmSelectMethod(method) {

    selectedMethod = method;

    document.getElementById("bmAmountTitle").textContent =
        "Add via " + method;

    document.getElementById("bmSummaryMethod").textContent = method;

    bmShowStep("amount");
}


function bmShowStep(step) {

    document.getElementById("bmStepMethods")
        .classList.toggle("bm-hidden", step !== "methods");

    document.getElementById("bmStepAmount")
        .classList.toggle("bm-hidden", step !== "amount");

    document.getElementById("bmStepSuccess")
        .classList.toggle("bm-hidden", step !== "success");
}


function bmSetAmount(amount) {

    document.getElementById("bmAmountInput").value = amount;

    bmValidateAmount();
}


function bmValidateAmount() {

    const value =
        parseFloat(document.getElementById("bmAmountInput").value) || 0;

    document.getElementById("bmSummaryTotal").textContent =
        "₱" + value.toFixed(2);

    document.getElementById("bmConfirmBtn").disabled = value <= 0;
}


function bmConfirmPayment() {

    const amount =
        parseFloat(document.getElementById("bmAmountInput").value) || 0;

    if (amount <= 0) return;


    // Update balance in Home and Wallet
    student.balance += amount;
    updateBalance();


    document.getElementById("bmSuccessMsg").textContent =
        "₱" + amount.toFixed(2) + " added successfully!";

    bmShowStep("success");
}


// ================= NFC =================

function simulateNFC() {

    showNotification(
        "NFC detected! Welcome, " + student.firstName + "!"
    );


    // Small visual effect
    const nfcButtons =
        document.querySelectorAll(".nfc-nav div");

    nfcButtons.forEach(button => {

        button.style.transform =
            "scale(1.15)";

        setTimeout(() => {

            button.style.transform =
                "scale(1)";

        }, 400);

    });
}


// ================= NOTIFICATION =================

let notificationTimer;

function showNotification(message) {

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");


    notificationText.textContent = message;

    notification.classList.add("show");


    clearTimeout(notificationTimer);


    notificationTimer = setTimeout(() => {

        notification.classList.remove("show");

    }, 2500);
}


// ================= INITIALIZATION =================

document.addEventListener("DOMContentLoaded", () => {

    setupLogin();
    updateBalance();

});
