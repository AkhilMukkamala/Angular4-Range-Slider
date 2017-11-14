
## Angular4-Range-Slider

Here is basic range slider supported in Angular version 2 & 4 without angular material.

## How to use?

1. Download **custom-range-slider** folder

2. Include the component in **AppModule** **imports**

3. Use it in any component as `<app-custom-range-slider></app-custom-range-slider>`

### Configure range slider

	populationSlider: object = {
		min: 10,
		max: 1500,
		start: 150,
		thumbShow: true,
		selectCallBack: this.selectCallBack.bind(this)
	}


The above object shows the configuration of the slider


    min: number - minimum value on the slider
    max: number - maximum value on the slider
    start: number - starting value of the slider
    thumbShow: boolean - whether thumb should be shown or not
    selectCallBack: function - callback function to execute on slider value selection


Pass the configuration object to slider component as an input as shown below

`<app-custom-range-slider [sliderConfig]="populationSlider"></app-custom-range-slider>`
