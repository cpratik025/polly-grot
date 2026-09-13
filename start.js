import { marked } from "marked";
import DOMPurify from "dompurify";
import { autoResizeTextarea, setLoading } from "./utils.js";


let sendBtn= document.getElementById('send-btn')
let userInput= document.getElementById('user-input')
let chatContainer= document.getElementById('chat-messages')
sendBtn.addEventListener('click',chatMessage)

async function chatMessage(e){
    e.preventDefault()
    const langToTranslate=document.querySelector('input[name="language"]:checked')
    console.log(langToTranslate.value)
    const userPrompt=`Translate the following text into ${langToTranslate.value}: "${userInput.value}"`
    let addUserHTML=`<div class="user-message">
                    <p>${userInput.value}</p>
                </div>`
    chatContainer.innerHTML+=addUserHTML
    const requestBody= await fetch('/api/translate',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({userPrompt})
    })
    const data=await requestBody.json()
    
    if(!requestBody.ok){
        throw new Error(data.message)
    }
    
    const translatedText=data.translatedText
    const html = marked.parse(translatedText);
    const safeHTML = DOMPurify.sanitize(html)
    let responseHTML=`<div class="system-message">
                    <p>${safeHTML}</p>
                </div>`
    chatContainer.innerHTML+=responseHTML
}