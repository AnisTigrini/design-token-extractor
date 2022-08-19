import { Fills } from "./Fills";

export interface FigmaNode {
    id : string,
    name: string,
    type : string,
    fills?: Fills[],

    children : FigmaNode[]
}