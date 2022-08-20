import { FigmaNode } from "../../interfaces/FigmaNode";

export function extractDesignToken(node : FigmaNode, prefix : string = "--") : FigmaNode[] {
    if (!node) return []
    if (node.name.trim().startsWith(prefix)) return [node]
    if (!node.children) return []

    return node.children.reduce((nodeList : FigmaNode[], nextNode : FigmaNode) => [...nodeList,...extractDesignToken(nextNode, prefix)], [])
}