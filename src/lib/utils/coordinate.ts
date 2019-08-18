import { BaseModel } from '../common/base-model';

export class Coordinate extends BaseModel {
  get x(): number {
    return fixRoundOffError(this.cx + this.radius * Math.cos(this.radian));
  }

  set x(value: number) {
    const x = value - this.cx;
    const y = this.y - this.cy;
    this.radius = Math.sqrt(x * x + y * y);
    this.radian = Math.atan2(y, x);
  }

  get y(): number {
    return fixRoundOffError(this.cy + this.radius * Math.sin(this.radian));
  }

  set y(value: number) {
    const x = this.x - this.cx;
    const y = value - this.cy;
    this.radius = Math.sqrt(x * x + y * y);
    this.radian = Math.atan2(y, x);
  }

  get degree(): number {
    return radianToDegree(this.radian);
  }

  set degree(value: number) {
    this.radian = degreeToRadian(value);
  }

  get percent(): number {
    return radianToPercent(this.radian);
  }

  set percent(value: number) {
    this.radian = percentToRadian(value);
  }

  private _cx: number;

  get cx(): number {
    return this._cx;
  }

  set cx(value: number) {
    if (this._cx !== value) {
      this._cx = fixRoundOffError(value);
      this.changed();
    }
  }

  private _cy: number;

  get cy(): number {
    return this._cy;
  }

  set cy(value: number) {
    if (this._cy !== value) {
      this._cy = fixRoundOffError(value);
      this.changed();
    }
  }

  private _radius: number;

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (this._radius !== value) {
      this._radius = fixRoundOffError(value);
      this.changed();
    }
  }

  private _radian: number;

  get radian(): number {
    return this._radian;
  }

  set radian(value: number) {
    if (this._radian !== value) {
      this._radian = fixRoundOffError(value);
      this.changed();
    }
  }

  setCx(value: number): this {
    this.cx = value;
    return this;
  }

  setCy(value: number): this {
    this.cy = value;
    return this;
  }

  setRadius(value: number): this {
    this.radius = value;
    return this;
  }

  setRadian(value: number): this {
    this.radian = value;
    return this;
  }

  setX(value: number): this {
    this.x = value;
    return this;
  }

  setY(value: number): this {
    this.y = value;
    return this;
  }

  setDegree(value: number): this {
    this.degree = value;
    return this;
  }

  setPercent(value: number): this {
    this.percent = value;
    return this;
  }

  moveX(dx: number): Coordinate {
    this.x += dx;
    return this;
  }

  moveY(dy: number): Coordinate {
    this.y += dy;
    return this;
  }

  move(dx: number, dy: number): Coordinate {
    this.moveX(dx);
    this.moveY(dy);
    return this;
  }

  translateX(dx: number): Coordinate {
    const latestX = this.x;
    this.cx += dx;
    this.x = latestX;
    return this;
  }

  translateY(dy: number): Coordinate {
    const latestY = this.y;
    this.cy += dy;
    this.y = latestY;
    return this;
  }

  /* Move origin, keep x and y */
  translate(dx: number, dy: number): Coordinate {
    this.translateX(dx);
    this.translateY(dy);
    return this;
  }

  rotate(theta: number): Coordinate {
    this.radian += theta;
    return this;
  }

  rotateByDegree(degree: number): Coordinate {
    return this.rotate(degreeToRadian(degree));
  }

  rotateByPercent(percent: number): Coordinate {
    return this.rotate(percentToRadian(percent));
  }
}

export function degreeToRadian(degree: number): number {
  return fixRoundOffError(degree / 180 * Math.PI);
}

export function radianToDegree(radian: number): number {
  return fixRoundOffError(radian * 180 / Math.PI);
}

export function percentToRadian(percent: number): number {
  return fixRoundOffError(percent * (2 * Math.PI));
}

export function radianToPercent(radian: number): number {
  return fixRoundOffError(radian / (2 * Math.PI));
}

function fixRoundOffError(value: number): number {
  const precision = 10000000;
  return Math.round(value * precision) / precision;
}
