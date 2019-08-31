import { Distance } from './distance';
import { Properties } from './type-utils';

export class Point {
  constructor(public x: number = 0, public y: number = 0) {
  }

  getDistanceTo(anotherPoint: Properties<Point>): Distance {
    return new Distance(this.x - anotherPoint.x, this.y - anotherPoint.y);
  }

  move({ x, y }: Properties<Distance>): this {
    this.x += x;
    this.y += y;
    return this;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  static clone(point: Point): Point {
    return point.clone();
  }
}
