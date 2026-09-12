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

    updateBalance();

});