import fetch from "node-fetch";

export async function fetchFigmaData(tokenID : string, fileID : string) {
    return fetch(`https://api.figma.com/v1/files/${fileID}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'X-FIGMA-TOKEN': tokenID
            }
        })
}