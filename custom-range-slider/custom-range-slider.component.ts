import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';

@Component({
    selector: 'app-custom-range-slider',
    templateUrl: './custom-range-slider.component.html',
    styleUrls: ['./custom-range-slider.component.scss']
})
export class CustomRangeSliderComponent implements OnInit {
    @ViewChild('sliderBar') sliderBar: ElementRef;
    @Input() sliderConfig;
    percentage: any;
    thumb;
    overlay;
    dot;
    filledBar;
    initMouseMove;
    
    /**
     * constructor function of the component 
     */
    constructor(private elemRef: ElementRef) { }

    /**
     * called on the component initialization
     */
    ngOnInit() {    

        // store slider move function in a variable for same reference in add/remove listeners
        this.initMouseMove = this.onMouseMoveOnSlider.bind(this);
        
        // calculate initial percentage
        this.percentage = (this.sliderConfig.start / this.sliderConfig.max) * 100;

        // get thumb, overlay, dot and bar
        this.thumb = this.sliderBar.nativeElement.querySelector('.c2-thumb-value');
        this.overlay = this.sliderBar.nativeElement.querySelector('.overlay');
        this.dot = this.sliderBar.nativeElement.querySelector('.c2-js-slider-movable-thumb-dot');
        this.filledBar = this.sliderBar.nativeElement.querySelector('.c2-filled-bar');

        if(!this.sliderConfig.thumbShow) {
            this.thumb.classList.add('hide-completely')
        }

        this.setSliderUIValues(this.percentage, this.sliderConfig);
    }

	/**
	 * check for mouse click and mouse move, set ui values of slider
     * @param {Object} event - mousemove event object
	 */
    onMouseMoveOnSlider(event: MouseEvent) {

        // show overlay
        this.overlay.classList.remove('c2-hide');

        // check for slider bar
        if (this.sliderBar) {

            // show thumb
            this.thumb.classList.remove('c2-hide');

            // calculate percentage according to mouse movement
            let sliderLeftPos = this.sliderBar.nativeElement.offsetLeft;
            let sliderRightPos = sliderLeftPos + this.sliderBar.nativeElement.offsetWidth;
            let mouseLeft = event.pageX;
            if (mouseLeft < sliderLeftPos) {
                this.percentage = 0;
            } else if (mouseLeft > sliderRightPos) {
                this.percentage = 100;
            } else {
                this.percentage = ((event.pageX - sliderLeftPos) / this.sliderBar.nativeElement.offsetWidth) * 100;
            }

            this.setSliderUIValues(this.percentage, null);
            
            if(this.sliderConfig.selectCallBack) {
                this.sliderConfig.selectCallBack(this.percentage);
            }
            return parseInt(this.percentage); // return calculated/set percentage
        }
    }

    /**
     * add mouse move event on document
     * @param {Object} event - mousedown event object
     */
    onMouseDown(event) {
        document.addEventListener('mousemove', this.initMouseMove);
    }

    /**
     * add mouse up event on window
     * remove mouse move event on document
     * @param {Object} event - mouseup event object
     */
    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event) {
        this.thumb.classList.add('c2-hide');
        this.overlay.classList.add('c2-hide');
        document.removeEventListener('mousemove', this.initMouseMove);
    }

    /**
     * move dot on click
     * set ui values of slider
     * @param event - click event object
     */
    onClick(event) {
        this.onMouseMoveOnSlider(event);
        
        // hide thumb and overlay
        setTimeout(()=>{
            this.thumb.classList.add('c2-hide');
            this.overlay.classList.add('c2-hide');
        }, 300);
    }

    /**
     * set filled bar value
     * set dot position
     * set thumb value
     * @param { number } percentage - any number
     * @param { Object } sliderConfig - custom slider configuration
     */
    setSliderUIValues(percentage, sliderConfig) {
        this.dot.style.left = percentage + "%";
        this.filledBar.style.width = percentage + "%";
        this.thumb.innerHTML = parseInt(percentage) + "%";

        // set slider ui configuration
        if(sliderConfig) {
            if(sliderConfig.barColor) {
                this.sliderBar.nativeElement.style.backgroundColor = sliderConfig.barColor;
            }
            if(sliderConfig.barWidth) {
                this.sliderBar.nativeElement.style.width = sliderConfig.barWidth;
            }
            if(sliderConfig.dotColor) {
                this.dot.style.backgroundColor = sliderConfig.dotColor;
            }
            if(sliderConfig.thumbColor) {
                this.thumb.style.backgroundColor = sliderConfig.thumbColor;
            }
            if(sliderConfig.filledBarColor) {
                this.filledBar.style.backgroundColor = sliderConfig.filledBarColor;
            }
        }
    }
}
