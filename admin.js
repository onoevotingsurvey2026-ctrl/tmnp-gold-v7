import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let membersData = [];

/* AUTH CHECK */

onAuthStateChanged(auth,(user)=>{

```
if(!user){
    window.location.href="index.html";
    return;
}

loadMembers();
```

});

/* LOAD MEMBERS */

async function loadMembers(){

```
const memberList =
document.getElementById("memberList");

memberList.innerHTML =
"Loading Members...";

const snapshot =
await getDocs(collection(db,"members"));

membersData = [];

snapshot.forEach((docSnap)=>{

    membersData.push({
        docId: docSnap.id,
        ...docSnap.data()
    });

});

document.getElementById("memberCount")
.innerText = membersData.length;

renderMembers(membersData);
```

}

/* RENDER */

function renderMembers(data){

```
const memberList =
document.getElementById("memberList");

memberList.innerHTML = "";

if(data.length===0){

    memberList.innerHTML =
    "<p>No Members Found</p>";

    return;
}

data.forEach(member=>{

    memberList.innerHTML += `

    <div class="member-card">

        <h3>${member.name || ""}</h3>

        <p>ID: ${member.memberId || ""}</p>

        <p>Phone: ${member.phone || ""}</p>

        <p>District: ${member.district || ""}</p>

        <button onclick="deleteMember('${member.docId}')">
            Delete
        </button>

    </div>

    `;

});
```

}

/* SEARCH */

document.getElementById("searchBox")
.addEventListener("keyup",function(){

```
const q =
this.value.toLowerCase();

const filtered =
membersData.filter(m=>

    (m.name||"")
    .toLowerCase()
    .includes(q)

    ||

    (m.phone||"")
    .toLowerCase()
    .includes(q)

    ||

    (m.memberId||"")
    .toLowerCase()
    .includes(q)

);

renderMembers(filtered);
```

});

/* DELETE */

window.deleteMember =
async function(id){

```
const ok =
confirm("Delete Member?");

if(!ok) return;

await deleteDoc(
    doc(db,"members",id)
);

alert("Deleted Successfully");

loadMembers();
```

}

/* EXPORT CSV */

window.exportCSV =
function(){

```
if(membersData.length===0){

    alert("No Data");

    return;
}

let csv =
"Member ID,Name,Phone,District\n";

membersData.forEach(m=>{

    csv +=
    `"${m.memberId || ""}","${m.name || ""}","${m.phone || ""}","${m.district || ""}"\n`;

});

const blob =
new Blob([csv],
{type:"text/csv"});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"TMNP_MEMBERS.csv";

a.click();
```

};

/* LOGOUT */

window.logout =
async function(){

```
await signOut(auth);

window.location.href =
"index.html";
```

}

