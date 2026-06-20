import { db } from "./firebase-config.js";
import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let allMembers = [];

window.onload = async function () {
loadMembers();
};

async function loadMembers() {

const snapshot = await getDocs(collection(db, "members"));

allMembers = [];

snapshot.forEach((docSnap) => {
allMembers.push({
id: docSnap.id,
...docSnap.data()
});
});

renderList(allMembers);
}

function renderList(list) {

document.getElementById("countBox").innerText =
"Total Members: " + list.length;

const container = document.getElementById("memberList");
container.innerHTML = "";

list.forEach(m => {

container.innerHTML += `
<div class="card">

<h3>${m.name}</h3>
<p>📞 ${m.phone}</p>
<p>🆔 ${m.memberId}</p>
<p>📍 ${m.district}</p>

<button onclick="viewCard('${m.id}')">View</button>
<button onclick="deleteMember('${m.id}')">Delete</button>
<button onclick="shareWhatsApp('${m.name}','${m.phone}','${m.memberId}')">Share</button>

</div>
`;
});

}

/* SEARCH */

document.getElementById("search").addEventListener("input", function () {

const value = this.value.toLowerCase();

const filtered = allMembers.filter(m =>
(m.name || "").toLowerCase().includes(value) ||
(m.phone || "").includes(value) ||
(m.memberId || "").toLowerCase().includes(value)
);

renderList(filtered);

});

/* DELETE */

window.deleteMember = async function (id) {

if (!confirm("Delete this member?")) return;

await deleteDoc(doc(db, "members", id));

loadMembers();

};

/* VIEW CARD */

window.viewCard = function (id) {
window.open("view.html?id=" + id, "_blank");
};

/* WHATSAPP SHARE */

window.shareWhatsApp = function (name, phone, id) {

const msg =
`TMNP GOLD MEMBER

Name: ${name}
Phone: ${phone}
ID: ${id}

Join TMNP Movement`;

window.open(
`https://wa.me/?text=${encodeURIComponent(msg)}`,
"_blank"
);

};
