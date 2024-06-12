const rulesButtonOpen = document.getElementById("rulesButtonOpen");
const returnPolicyButtonOpen = document.getElementById("returnPolicyButtonOpen");

rulesButtonOpen.addEventListener("click", () => {
  const rulesModal = document.getElementById("rulesModal");
  rulesModal.showModal();
})

returnPolicyButtonOpen.addEventListener("click", () => {
  const returnPolicyModal = document.getElementById("returnPolicyModal");
  returnPolicyModal.showModal();
})
