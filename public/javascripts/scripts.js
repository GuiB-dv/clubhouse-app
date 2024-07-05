// MODAL SCRIPTS

function showModal() {
    document.getElementById('myModal').style.display = 'block';
}
  
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}
  
// Close the modal if the user clicks outside of it
window.onclick = function(event) {
const modal = document.getElementById('myModal');
    if (event.target == modal) {
            modal.style.display = 'none';
    }
};

//-------------------------------------------------------------------