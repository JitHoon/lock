const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(questionContainer.dataset);
    const text =textarea.value;
    const question = questionContainer.dataset.id;
};

form.addEventListener("submit,", handleSubmit);