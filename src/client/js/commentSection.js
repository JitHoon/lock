const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const handleSubmit = async (event) => {
    event.preventDefault();
    const text =textarea.value;
    const questionId = questionContainer.dataset.id;
    if(text === ""){
        return; //댓글이 공백일때 전송 x
    }
    await fetch(`/qna/${questionId}/comment`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",  //string을 보내주지만 json string이라고 알려주는 표시
        },
        body: JSON.stringify({text}), //req.body 속 내용을 전달하는 역할을 함 
    });
    textarea.value = "";
    window.location.reload(); //자동 새로고침 ! -> 부하걸리는 작업이라 변환할 거임
};
 
form.addEventListener("submit", handleSubmit);


