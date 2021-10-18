const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const submitBtn = $("#add-book-popup button[name='submit-button']")
submitBtn.addEventListener("click", () => {
    console.log("Book added"); 
});
