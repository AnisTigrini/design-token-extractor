import chalk from "chalk"
import inquirer from 'inquirer';
import {createSpinner} from "nanospinner"
import gradient from "gradient-string";
import { fetchFigmaData } from "../extraction-script/FetchFigmaData";

function sleep(ms = 2000) { return new Promise((r) => setTimeout(r, ms)) }
const log = console.log

export async function greeting() {
    console.clear()
    log(chalk.bgBlack.bold("Welcome to ", gradient.pastel.multiline("DESIGN TOKEN EXTRACTOR")))
    await sleep(2000)
}

async function askLinkAndToken() {
    const tokenIDInquiry = await inquirer.prompt({
        name: "tokenID",
        type: "input",
        message : "Please provide your user token ID",
        validate : (userInput) => {
            if (userInput.trim().length > 0) return true
            return "Your token ID is invalid!"
        } 
    })

    const fileIDInquiry = await inquirer.prompt({
        name: "fileID",
        type: "input",
        message : "Please provide your file ID",
        validate : (userInput) => {
            if (userInput.trim().length > 0) return true
            return "Your File ID you provided is invalid!"
        } 
    })

    log("Your token ID is :", chalk.bgBlue.bold.white(tokenIDInquiry.tokenID))
    log("Your file ID is :", chalk.bgBlue.bold.white(fileIDInquiry.fileID), "\n")
    
    return {tokenID: tokenIDInquiry.tokenID, fileID : fileIDInquiry.fileID}
}

async function useSpinner(text : string, cb : Function) {
    const spinner = createSpinner(text)
    spinner.start()
    const res = await cb()
    spinner.stop()
    return res
}

export async function executeCLI() {
    const {tokenID, fileID} = await askLinkAndToken()

    const res = await useSpinner("Trying to fetch resources",() => fetchFigmaData(tokenID, fileID))

    if (res.status >= 200 && res.status < 300) {
        log(chalk.bold.bgGreen("✅ Your file has been successfully retrieved from Figma's API service."))
    } else if (res.status >= 400 && res.status < 500) {
        log(chalk.bold.bgRed("💀 We were unable to retreive data based on the token ID and the file ID you provided."))
        const retryPrompt =  await inquirer.prompt({
            name: "choice",
            type: "list",
            message: "Would you like to try again ?",
            choices: [
                "yes",
                "no"
            ],
        })
        if (retryPrompt.choice === "yes") {
            executeCLI()
            return
        }

        
    } else if (res.status >= 500 && res.status < 600) {
        log(chalk.bold.bgRed("💀 There was an error with Figma's servers, you might want to try again later."))
    } else {
        log(chalk.bold.bgRed("💀 An unknown error occured."))
    }
    
    log("\n", chalk.bgBlack.bold("Thank you for using ", gradient.pastel.multiline("DESIGN TOKEN EXTRACTOR")))
}