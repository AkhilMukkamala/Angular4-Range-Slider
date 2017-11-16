
## Angular4-Range-Slider

Here is basic range slider supported in Angular version 2 & 4 without angular material.

## How to use?

1. Download **custom-range-slider** folder

2. Include the component in **AppModule** **imports**

3. Use it in any component as `<app-custom-range-slider></app-custom-range-slider>`

### Configure range slider

	workWageSlider: object = {
		min: 1,
		max: 1000,
		start: 500,
		thumbShow: true,
		barColor: "",
		dotColor: "",
		thumbColor: "",
		filledBarColor: "",
		barWidth: "",
		selectCallBack: this.selectCallBack.bind(this)
	}


The above object shows the configuration of the slider


    min: number - minimum value on the slider
    max: number - maximum value on the slider
    start: number - starting value of the thumb
    thumbShow: boolean - whether thumb should be shown or not
    barColor: string - color of the bar
    dotColor: string - color of the movable dot
    thumbColor: string - color of the thumb
    filledBarColor: string - color of the filled/selected portion
    barWidth: number - width of the slider bar
    selectCallBack: function - callback function to execute on slider value selection


Pass the configuration object to slider component as an input as shown below

`<app-custom-range-slider [sliderConfig]="populationSlider"></app-custom-range-slider>`
