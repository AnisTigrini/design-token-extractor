interface FillsColor {
    r : number
    g : number
    b : number
    a : number
}

interface Fills {
    type: string,
    color: FillsColor
}


export interface FigmaNode {
    id : string,
    name: string,
    type : string,
    fills?: Fills[],

    children : FigmaNode[]
}