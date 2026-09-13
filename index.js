import { marked } from "marked";
import DOMPurify from "dompurify";
import { autoResizeTextarea, setLoading } from "./utils.js";

const langSelect=document.getElementById('language-select')
const translateBtn=document.getElementById('translate-btn')
const translateText=document.getElementById('input-text')
const btnContainer=document.getElementById('btn-container')
const startChatbtn=document.getElementById('start-chat')

translateBtn.addEventListener('click',textToTranslate)

async function textToTranslate(e){
    e.preventDefault()
    const langToTranslate=document.querySelector('input[name="language"]:checked')
    const userPrompt=`Translate the following text into ${langToTranslate.value}: "${translateText.value}"`
    console.log(userPrompt)
    const requestBody= await fetch('/api/translate',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({userPrompt})
    })
    console.log(requestBody)
    const data=await requestBody.json()
    if(!requestBody.ok){
        throw new Error(data.message)
    }
    
    const translatedText=data.translatedText
    const markedhtml = marked.parse(translatedText)
    const safeHTML = DOMPurify.sanitize(markedhtml)
    let html=`<h1 class="input-title">Translated Text</h1>
    <textarea id="input-text" placeholder="How are you?" readonly>${translatedText}</textarea>
    `
    langSelect.innerHTML=html

    let btnHtml=`
                <button class="btn" id="start-over">Start Over</button>
                <button class="btn" id="start-chat">Start Chat</button>
            `
    btnContainer.innerHTML=btnHtml

    document.getElementById('start-over').addEventListener('click', () => {
        window.location.href = "./index.html";
    })
    document.getElementById('start-chat').addEventListener('click', () => {
        window.location.href = "chat.html";
    })}

    startChatbtn.addEventListener('click', () => {
        window.location.href = "./chat.html";
    })


