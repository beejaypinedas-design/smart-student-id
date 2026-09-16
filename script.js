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


// ============================================================
// ADD BALANCE MODAL  (bagong dagdag para sa GCash/Maya/Card)
// ============================================================

let bmCurrentMethod = "GCash";

function openBalanceModal() {
    document.getElementById("bmOverlay").classList.add("active");
    bmShowStep("methods");
}

function closeBalanceModal() {
    document.getElementById("bmOverlay").classList.remove("active");
}

function bmShowStep(step) {
    document.getElementById("bmStepMethods").classList.toggle("bm-hidden", step !== "methods");
    document.getElementById("bmStepAmount").classList.toggle("bm-hidden", step !== "amount");
    document.getElementById("bmStepSuccess").classList.toggle("bm-hidden", step !== "success");
}

function bmSelectMethod(name) {
    bmCurrentMethod = name;
    document.getElementById("bmAmountTitle").innerText = "Add via " + name;
    document.getElementById("bmSummaryMethod").innerText = name;
    document.getElementById("bmAmountInput").value = "";
    bmValidateAmount();
    bmShowStep("amount");
}

function bmSetAmount(val) {
    document.getElementById("bmAmountInput").value = val;
    bmValidateAmount();
}

function bmValidateAmount() {
    const val = parseFloat(document.getElementById("bmAmountInput").value) || 0;
    document.getElementById("bmSummaryTotal").innerText = "₱" + val.toFixed(2);
    document.getElementById("bmConfirmBtn").disabled = val <= 0;
}

function bmConfirmPayment() {
    const val = parseFloat(document.getElementById("bmAmountInput").value) || 0;
    if (val <= 0) return;

    // NOTE: dito lang ito nagbabago ng student.balance sa frontend.
    // Para sa totoong bayad, dapat tumawag muna dito sa backend / payment
    // gateway (hal. PayMongo) at addBalance() lang ang tatawagin kapag
    // na-confirm na successful yung bayad doon.
    // Ginagamit lang dito yung addBalance() na existing sa itaas — ito na
    // ang nag-a-update ng student.balance, nagre-refresh ng balance sa
    // screen (updateBalance), at nagpapakita ng notification.
    addBalance(val);

    bmAddTransactionEntry(val, bmCurrentMethod);

    document.getElementById("bmSuccessMsg").innerText =
        "₱" + val.toFixed(2) + " added via " + bmCurrentMethod;
    bmShowStep("success");
}

function bmAddTransactionEntry(val, method) {
    // Nagdadagdag ng bagong "Balance Added" row sa taas ng bawat .transactions list sa page
    const lists = document.querySelectorAll(".transactions");

    lists.forEach(list => {
        const row = document.createElement("div");
        row.className = "transaction";
        row.innerHTML = `
            <div class="transaction-icon blue">
                <i class="fa-solid fa-wallet"></i>
            </div>
            <div class="transaction-info">
                <h4>Balance Added</h4>
                <p>Just now &bull; ${method}</p>
            </div>
            <strong class="income">+₱${val.toFixed(2)}</strong>
        `;
        list.insertBefore(row, list.firstChild);
    });
}
