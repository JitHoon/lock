const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const handleSubmit = (event) => {
    event.preventDefault();
    const text =textarea.value;
    const questionId = questionContainer.dataset.id;
    if(text === ""){
        return;
    }
    fetch(`/qna/${questionId}/comment`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",  //string을 보내주지만 json string이라고 알려주는 표시
        },
        body: JSON.stringify({text}), //req.body 속 내용을 전달하는 역할을 함 
    });
};
 
form.addEventListener("submit ", handleSubmit);

