const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function clearInputs() {
    $("input[name='name']").value = "";
    $("input[name='authors']").value = "";
    $("input[name='page-count']").value = "";
    $("input[name='completion-status']").value = "";
}

const submitBtn = $("#add-book-popup button[name='submit-button']")
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const message = {
        action: "add",
        name: $("input[name='name']").value,
        authors: $("input[name='authors']").value,
        pageCount: $("input[name='page-count']").value,
        completionStatus: $("input[name='completion-status']").checked
    }
    window.parent.postMessage(message, '*'); // TODO change '*' to appropriate origin for security
    clearInputs();
});

const cancelBtn = $("#add-book-popup button[name='cancel-button']")
cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const message = {}
    window.parent.postMessage(message, '*'); // TODO change '*' to appropriate origin for security
    clearInputs();
});
