import fetch, {RequestInit} from "node-fetch";
import { FigmaNode } from "./interfaces/FigmaNode";
import { extractDesignToken } from "./utils/ExtractDesignToken";

const TOKEN_ID : string = "figd_LTep544Z1-jdMS8nawbRzIY_f2o63kpwMuukrJxi"

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
        const mydoc : FigmaNode = v.document
        const result = extractDesignToken("--", mydoc)
        console.log(result ,result.length)
    })
})

