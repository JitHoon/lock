const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const addComment = (text, id) => {
    const questionComments = document.querySelector(".question_garden_grid");
    const newComment = document.createElement("i");
    newComment.dataset.id = id;
    newComment.className = "question_garden_comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = " ❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    questionComments.appendChild(newComment); //prepend는 위에 담
} //새로고침하기 전까지만 html에 가짜 댓글을 달게 해줌. 새로고침시 이는 사라지고 DB속 내용으로 추가됨 

const handleSubmit = async (event) => {
    event.preventDefault();
    const text =textarea.value;
    const questionId = questionContainer.dataset.id;
    if(text === ""){
        return; //댓글이 공백일때 전송 x
    }
    const response = await fetch(`/qna/${questionId}/comment`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",  //string을 보내주지만 json string이라고 알려주는 표시
        },
        body: JSON.stringify({text}), //req.body 속 내용을 전달하는 역할을 함 
    });
    if(response.status === 201){
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text,newCommentId);
        
    }
    
    

    //window.location.reload(); //자동 새로고침 ! -> 부하걸리는 작업이라 변환할 거임
};
 
form.addEventListener("submit", handleSubmit);


