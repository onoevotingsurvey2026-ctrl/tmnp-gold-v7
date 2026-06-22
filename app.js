console.log("APP JS LOADED");

import { db } from "./firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/* ================= LOCATION ================= */

window.getLocation = function () {

if (!navigator.geolocation) {
alert("Location not supported");
return;
}

navigator.geolocation.getCurrentPosition((pos) => {

const lat = pos.coords.latitude;
const lon = pos.coords.longitude;

document.getElementById("location").value =
  lat + "," + lon;

document.getElementById("locationStatus").innerText =
  "Location Captured ✔";

}, (err) => {
alert("Location Error: " + err.message);
});

};

/* ================= SAVE MEMBER ================= */

window.saveMember = async function () {

const name =
document.getElementById("name").value.trim();

const phone =
document.getElementById("phone").value.trim();

if (!name || !phone) {
alert("Name & Phone required");
return;
}

try {

const memberId =
  "TMNP-" + Date.now();

let photoURL = "";

const photoFile =
  document.getElementById("photo").files[0];

if (photoFile) {
  photoURL = URL.createObjectURL(photoFile);
}

const member = {
  memberId: memberId,
  name: name,
  phone: phone,

  voterid:
    document.getElementById("voterid").value.trim(),

  email:
    document.getElementById("email").value.trim(),

  district:
    document.getElementById("district").value.trim(),

  address:
    document.getElementById("address").value.trim(),

  location:
    document.getElementById("location").value,

  photoURL: photoURL,

  status: "Active",

  createdAt: serverTimestamp()
};

const docRef = await addDoc(
  collection(db, "members"),
  member
);

renderCard(member, docRef.id);

alert("Member Saved Successfully ✔");

resetForm();

} catch (err) {

console.error(err);

alert(
  "Firebase Error: " +
  err.message
);

}

};

/* ================= CARD ================= */

window.renderCard = function (member, id) {

const card = `

<div class="card" style="width:450px;padding:15px;">

  <div class="card-header">
    TMNP GOLD MEMBERSHIP CARD
  </div>

  <div class="card-body">

${member.photoURL ? `
  <img
    src="${member.photoURL}"
    style="
      width:120px;
      height:120px;
      border-radius:50%;
      border:4px solid gold;
      object-fit:cover;
      margin-bottom:10px;
    "
  >
` : ""}

<div><b>ID:</b> ${member.memberId}</div>
<div><b>Name:</b> ${member.name}</div>
<div><b>Phone:</b> ${member.phone}</div>
<div><b>Voter ID:</b> ${member.voterid}</div>
<div><b>Email:</b> ${member.email}</div>
<div><b>District:</b> ${member.district}</div>
<div><b>Address:</b> ${member.address}</div>
<div><b>Location:</b> ${member.location || "Not Captured"}</div>

<div id="qr" style="margin-top:15px;"></div>

  </div>

</div>

`;

document.getElementById("cardPreview").innerHTML = card;

setTimeout(() => {

const qr =
  document.getElementById("qr");

if (qr) {

  qr.innerHTML = "";

  new QRCode(qr, {
    text:
      window.location.href +
      "?id=" +
      id,
    width: 120,
    height: 120
  });

}

}, 100);

};

/* ================= PDF ================= */

window.downloadPDF = async function () {

const card =
document.getElementById("cardPreview");

if (!card) {
alert("Card not found");
return;
}

const canvas =
await html2canvas(card);

const img =
canvas.toDataURL("image/png");

const { jsPDF } =
window.jspdf;

const pdf =
new jsPDF("p", "mm", "a4");

pdf.addImage(
img,
"PNG",
10,
10,
190,
0
);

pdf.save("TMNP-Membership.pdf");

};

/* ================= WHATSAPP ================= */

window.shareWhatsApp = function () {

const text =
"TMNP GOLD MEMBERSHIP CARD";

const url =
window.location.href;

window.open(
"https://wa.me/?text=" +
encodeURIComponent(
text + " " + url
),
"_blank"
);

};

/* ================= RESET ================= */

window.resetForm = function () {

document.getElementById("name").value = "";
document.getElementById("phone").value = "";
document.getElementById("voterid").value = "";
document.getElementById("email").value = "";
document.getElementById("district").value = "";
document.getElementById("address").value = "";
document.getElementById("photo").value = "";
document.getElementById("location").value = "";

document.getElementById(
"locationStatus"
).innerText = "";

};
