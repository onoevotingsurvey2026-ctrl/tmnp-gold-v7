console.log("APP JS LOADED");
console.log("SAVE BUTTON CLICKED");
import { db } from "./firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/* SAVE MEMBER */

window.saveMember = async function () {

const name = document.getElementById("name").value.trim();
const phone = document.getElementById("phone").value.trim();

if (!name || !phone) {
alert("Name and Phone are required");
return;
}

try {

```
const memberId = "TMNP-" + Date.now();

const member = {
  memberId: memberId,
  name: name,
  phone: phone,
  voterid: document.getElementById("voterid").value.trim(),
  email: document.getElementById("email").value.trim(),
  district: document.getElementById("district").value.trim(),
  address: document.getElementById("address").value.trim(),
  photoURL: "",
  status: "Active",
  createdAt: serverTimestamp()
};

const docRef = await addDoc(
  collection(db, "members"),
  member
);

renderCard(member, docRef.id);

alert("Member Saved Successfully ✅");

resetForm();
```

} catch (error) {

```
console.error(error);

alert(
  "Firebase Save Failed ❌\n" +
  error.message
);
```

}

};

/* CARD PREVIEW */

window.renderCard = function (
member,
firestoreId
) {

const card = `

  <div class="card">

```
<div class="card-header">
  TMNP GOLD MEMBERSHIP CARD
</div>

<div class="card-body">

  <div><b>ID:</b> ${member.memberId}</div>

  <div><b>Name:</b> ${member.name}</div>

  <div><b>Phone:</b> ${member.phone}</div>

  <div><b>Voter ID:</b> ${member.voterid}</div>

  <div><b>District:</b> ${member.district}</div>

  <div id="qr"></div>

</div>
```

  </div>
  `;

document.getElementById(
"cardPreview"
).innerHTML = card;

setTimeout(() => {

```
const qr =
  document.getElementById("qr");

qr.innerHTML = "";

new QRCode(qr, {
  text:
    window.location.origin +
    "/verify.html?id=" +
    firestoreId,
  width: 100,
  height: 100
});
```

}, 100);

};

/* RESET FORM */

window.resetForm = function () {

document.getElementById("name").value = "";
document.getElementById("phone").value = "";
document.getElementById("voterid").value = "";
document.getElementById("email").value = "";
document.getElementById("district").value = "";
document.getElementById("address").value = "";
document.getElementById("photo").value = "";

};
