import fetch, {RequestInit} from "node-fetch";

const TOKEN_ID : string = "DUMMY_TOKEN"

const options : RequestInit = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'X-FIGMA-TOKEN': TOKEN_ID
    }
}

fetch("https://api.figma.com/v1/files/k0XTmN5DeHLngLtuXkINDd", options)
.then((res) => {
    res.json().then((v) => {
        console.log(v)
    })
})