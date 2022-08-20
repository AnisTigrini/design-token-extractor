import { executeCLI, greeting } from "./utils/command-line/CLIScript";

async function executeProgram() {
    await greeting()
    executeCLI()
}

executeProgram()
