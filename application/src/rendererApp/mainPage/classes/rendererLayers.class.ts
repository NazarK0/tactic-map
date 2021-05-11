import { Svg } from "@svgdotjs/svg.js"

interface ILayer {
    position: number;
    title: string;
    visible: boolean;
    value: Svg;
}

interface IGetLayerQuery {
    position: number;
    title: string;
}

export default class RendererLayers {
    list: ILayer[] = [];
    canvas: Svg;
    constructor(canvas: Svg){
        this.canvas = canvas;
    }

    [Symbol.iterator] = () => {
        let currentIndex = -1;
        const lastIndex = this.list.length - 1;
        return {
          next: () => {
            const layer: ILayer | undefined = this.list.find((layer) => layer.position  === ++currentIndex);
            if ((currentIndex < lastIndex) && layer) { 
              return { done: false, value: layer };
            } else {
              return { done: true };
            }
          }
        };
      };

    add() {
        const nextNumber = this.list.length;
        this.list.push({
            position: nextNumber,
            title: `Шар ${nextNumber + 1}`,
            visible: true,
            value: this.canvas.nested()
        })
    }

    getLayer(query: number): Svg | null {
        return this.list.find((layer) => layer.position === query)?.value || null;
    }
}

