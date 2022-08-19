import { FigmaNode } from "../interfaces/FigmaNode";

export function extractDesignToken(prefix : string , node : FigmaNode) : FigmaNode[] {
    if (!node) return []
    if (node.name.startsWith(prefix)) return [node]
    if (!node.children) return []

    return node.children.reduce((nodeList : FigmaNode[], nextNode : FigmaNode) => [...nodeList,...extractDesignToken(prefix, nextNode)], [])
}