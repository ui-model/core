export class Distance {
  constructor(public x: number = 0, public y: number = 0) {
  }

  getLength(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  zoom(scale: number): void {
    this.x *= scale;
    this.y *= scale;
  }

  zoomToX(x: number): void {
    this.zoom(x / this.x);
  }

  zoomToY(y: number): void {
    this.zoom(y / this.y);
  }

  clone(): Distance {
    return new Distance(this.x, this.y);
  }
}
