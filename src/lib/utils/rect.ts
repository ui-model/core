import { BaseModel } from '../common/base-model';
import { Point } from './point';
import { Properties } from './type-utils';

export class Rect extends BaseModel {

  constructor(left = 0, top = 0, width = 0, height = 0) {
    super();
    this._left = left;
    this._top = top;
    this._width = width;
    this._height = height;
  }

  limit = Rect.InfinityRect;

  private _left = 0;

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
    this.changed();
  }

  get leftTop(): Point {
    return new Point(this.left, this.top);
  }

  get leftMiddle(): Point {
    return new Point(this.left, this.centerY);
  }

  get leftBottom(): Point {
    return new Point(this.left, this.bottom);
  }

  get centerTop(): Point {
    return new Point(this.centerX, this.top);
  }

  get center(): Point {
    return new Point(this.centerX, this.centerY);
  }

  get centerBottom(): Point {
    return new Point(this.centerX, this.bottom);
  }

  get rightTop(): Point {
    return new Point(this.right, this.top);
  }

  get rightMiddle(): Point {
    return new Point(this.right, this.centerY);
  }

  get rightBottom(): Point {
    return new Point(this.right, this.bottom);
  }

  private _top = 0;

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
    this.changed();
  }

  private _width = 0;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
    this.changed();
  }

  private _height = 0;

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
    this.changed();
  }

  get right(): number {
    return this.left + this.width;
  }

  get bottom(): number {
    return this.top + this.height;
  }

  get ratio(): number {
    return this.width / this.height;
  }

  get halfWidth(): number {
    return this.width / 2;
  }

  get halfHeight(): number {
    return this.height / 2;
  }

  get centerX(): number {
    return this.left + this.halfWidth;
  }

  get centerY(): number {
    return this.top + this.halfHeight;
  }

  setLeft(value: number): this {
    this.left = value;
    return this;
  }

  setTop(value: number): this {
    this.top = value;
    return this;
  }

  setWidth(value: number): this {
    this.width = value;
    return this;
  }

  addWidth(deltaX: number): this {
    this.width += deltaX;
    return this;
  }

  setHeight(value: number): this {
    this.height = value;
    return this;
  }

  addHeight(deltaY: number): this {
    this.height += deltaY;
    return this;
  }

  limitTo(limit: Rect): this {
    this.limit = limit;
    return this;
  }

  zoom(scale: number): this {
    scale = Math.min(scale, this.limit.width / this.width);
    scale = Math.min(scale, this.limit.height / this.height);
    this.left *= scale;
    this.top *= scale;
    this.width *= scale;
    this.height *= scale;
    return this;
  }

  zoomToMax(): this {
    return this.zoom(Number.MAX_VALUE);
  }

  zoomToWidth(width: number): this {
    return this.zoom(width / this.width);
  }

  zoomToHeight(height: number): this {
    return this.zoom(height / this.height);
  }

  moveX(deltaX: number): this {
    const left = this.left + deltaX;
    const minLeft = this.limit.left;
    const maxLeft = this.limit.right - this.width;
    this.left = Math.min(Math.max(left, minLeft), maxLeft);
    return this;
  }

  moveY(deltaY: number): this {
    const top = this.top + deltaY;
    const minTop = this.limit.top;
    const maxTop = this.limit.bottom - this.height;
    this.top = Math.min(Math.max(top, minTop), maxTop);
    return this;
  }

  move(deltaX: number, deltaY: number): this {
    this.moveX(deltaX);
    this.moveY(deltaY);
    return this;
  }

  moveTo(left: number, top: number): this {
    return this.move(left - this.left, top - this.top);
  }

  changeTo(left: number, top: number, right: number, bottom: number): this {
    this.left = left;
    this.top = top;
    this.width = right - left;
    this.height = bottom - top;
    return this;
  }

  centerTo(x: number, y: number): this {
    return this.moveTo(x - this.halfWidth, y - this.halfHeight);
  }

  copyFrom(rect: Properties<Rect>): this {
    this.left = rect.left;
    this.top = rect.top;
    this.width = rect.width;
    this.height = rect.height;
    return this;
  }

  clone(): Rect {
    return new Rect().copyFrom(this);
  }

  equals(anotherRect: Properties<Rect>): boolean {
    return this.left === anotherRect.left && this.top === anotherRect.top &&
      this.width === anotherRect.width && this.height === anotherRect.height;
  }

  static readonly InfinityRect = new Rect()
    .setLeft(-Number.MAX_VALUE / 2)
    .setTop(-Number.MAX_VALUE / 2)
    .setWidth(Number.MAX_VALUE)
    .setHeight(Number.MAX_VALUE);

  static of(left: number, top: number, width: number, height: number): Rect {
    return new Rect().setLeft(left).setTop(top).setWidth(width).setHeight(height);
  }

  static union(...rects: Rect[]): Rect {
    const left = Math.min(...rects.map(it => it.left));
    const top = Math.min(...rects.map(it => it.top));
    const right = Math.max(...rects.map(it => it.right));
    const bottom = Math.max(...rects.map(it => it.bottom));
    return new Rect(left, top, right - left, bottom - top);
  }

  static fromPoints(...points: Point[]): Rect {
    const left = Math.min(...points.map(it => it.x));
    const top = Math.min(...points.map(it => it.y));
    const right = Math.max(...points.map(it => it.x));
    const bottom = Math.max(...points.map(it => it.y));
    return new Rect(left, top, right - left, bottom - top);
  }

  static copyFrom(rect: Properties<Rect>): Rect {
    return Rect.of(rect.left, rect.top, rect.width, rect.height);
  }

  static fromClientRect(rect: ClientRect, scrollX: number = 0, scrollY: number = 0): Rect {
    return Rect.of(rect.left, rect.top, rect.width, rect.height).move(scrollX, scrollY);
  }
}
