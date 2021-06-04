import {Clovek} from "./clovek";
import {Postava} from "./postava";

export class Film {
  constructor(
    public name: string,
    public year: number,
    public id?: number,
    public imdbID?: string,
    public slovenskyNazov?: string,
    public poradieVRebricku?: { [title: string]: number },
    public reziser: Clovek[] = [],
    public postava: Postava[] = []
  ) {}
}
