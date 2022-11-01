import fetch from "node-fetch";

const questionContainer = document.getElementById("questionContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const deleteComments = document.querySelectorAll(".delete_comment");

const addComment = (text, id) => {
    const commentContainer = document.querySelector(".question_garden_grid");
    const commentList = document.createElement("i");
    commentList.dataset.id = id;
    commentList.classList.add("question_garden_comment");
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const button = document.createElement("button");
    button.innerText = " ❌";
    commentList.appendChild(icon);
    commentList.appendChild(span);
    commentList.appendChild(button);
    commentContainer.appendChild(commentList); //prepend는 위에 담
    button.addEventListener("click", handleDelete);
} //새로고침하기 전까지만 html에 가짜 댓글을 달게 해줌. 새로고침시 이는 사라지고 DB속 내용으로 추가됨 

const deleteComment = (event) => {
    const commentContainer = document.querySelector(".question_garden_grid");
    const commentList = event.target.parentNode;
    commentContainer.removeChild(commentList);
}
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
        const { newCommentId } = await response.json();
        textarea.value = "";
        addComment(text,newCommentId);
    }
    //window.location.reload(); //자동 새로고침 ! -> 부하걸리는 작업이라 변환할 거임
};

const handleDelete = async (event) =>{
    const commentList = event.target.parentNode;
    const commentId = commentList.dataset.id;
    const questionId = questionContainer.dataset.id;
    const response = await fetch(`/qna/${commentId}/commentdelete`,{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            questionId,
        })
    });
    if(response.status === 201) {
        deleteComment(event);
    }
    if(response.status === 403) {
        alert("댓글 주인이 아닙니다.");
    }
}


if (form){
    form.addEventListener("submit", handleSubmit);
}
for (let i =0; i< deleteComments.length; i++)
{
    deleteComments[i].addEventListener("click", handleDelete);
}