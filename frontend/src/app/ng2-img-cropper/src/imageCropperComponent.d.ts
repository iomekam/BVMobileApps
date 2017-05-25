import { Renderer, ElementRef, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ImageCropper } from './imageCropper';
import { CropperSettings } from './cropperSettings';
import { CropPosition } from './model/cropPosition';
export declare class ImageCropperComponent implements AfterViewInit, OnChanges {
    cropcanvas: ElementRef;
    settings: CropperSettings;
    image: any;
    cropper: ImageCropper;
    cropPosition: CropPosition;
    cropPositionChange: EventEmitter<CropPosition>;
    onCrop: EventEmitter<any>;
    croppedWidth: number;
    croppedHeight: number;
    intervalRef: number;
    renderer: Renderer;
    private isCropPositionUpdateNeeded;
    constructor(renderer: Renderer);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onTouchMove(event: TouchEvent): void;
    onTouchStart(event: TouchEvent): void;
    onTouchEnd(event: TouchEvent): void;
    onMouseDown(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    fileChangeListener($event: any): void;
    reset(): void;
    setImage(image: HTMLImageElement, newBounds?: any): void;
    private isCropPositionChanged(changes);
    private updateCropBounds();
    private getOrientedImage(image, callback);
}