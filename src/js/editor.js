const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, ToggleControl, __experimentalNumberControl, RangeControl, TextControl, TextareaControl, ColorPalette } = wp.components;
const { useEffect } = wp.element;
import SlidesAndResponsive from './slider-responsive-ui.js';

registerBlockType('frn-seara-internacional/slide', {
	title: 'Slide',
	icon: 'columns',
	category: 'widgets',
	attributes: {},
	edit() {
		return (
			<div className="slide-editor">
				<p className="slide-editor__title">Slide</p>
				<InnerBlocks />
			</div>
		);
	},
	save() {
		return (
			<div className="slide swiper-slide" >
				<InnerBlocks.Content />
			</div>
		);
	},
});

registerBlockType('frn-seara-internacional/slider', {
	title: 'Slider',
	icon: 'images-alt',
	category: 'custom-blocks',

	attributes: {
		hasAutoscroll: {
			type: 'boolean',
			default: false,
		},
		hasArrows: {
			type: 'boolean',
			default: false,
		},
		prevArrowString: {
			type: 'string',
			default: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path transform="scale(-1,1) translate(-960, 0)" d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293z"/></svg>',
		},
		nextArrowString: {
			type: 'string',
			default: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path  d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293z"/></svg>',
		},
		hasDots: {
			type: 'boolean',
			default: false,
		},
		centeredSlidesMobile: {
			type: 'boolean',
			default: false,
		},
		centeredSlidesTablet: {
			type: 'boolean',
			default: false,
		},
		centeredSlidesLaptop: {
			type: 'boolean',
			default: false,
		},
		centeredSlidesDesktop: {
			type: 'boolean',
			default: false,
		},
		centeredSlidesHugeDesktop: {
			type: 'boolean',
			default: false,
		},
		dotsStyles: {
			type: 'object',
			default: {
				gap: '4px',
				width: '8px',
				height: '8px',
				borderRadius: '50%',
				colorActive: '#007aff',
				colorInactive: '#000',
				opacityActive: 1,
				opacityInactive: .3,
			},
		},
		dotsGeneratedStyles: {
			type: 'string',
		},
		autoscrollDuration: {
			type: 'number',
			default: 5000,
		},
		breakpointMobile: {
			type: 'number',
			default: 576,
		},
		breakpointTablet: {
			type: 'number',
			default: 992,
		},
		breakpointLaptop: {
			type: 'number',
			default: 1200,
		},
		breakpointDesktop: {
			type: 'number',
			default: 1400,
		},
		slidesOnMobile: {
			type: 'string',
			default: '1',
		},
		slidesOnTablet: {
			type: 'string',
			default: '1',
		},
		slidesOnLaptop: {
			type: 'string',
			default: '1',
		},
		slidesOnDesktop: {
			type: 'string',
			default: '1',
		},
		slidesOnHugeDesktop: {
			type: 'string',
			default: '1',
		},
		spaceBetweenMobile: {
			type: 'number',
			default: 25,
		},
		spaceBetweenTablet: {
			type: 'number',
			default: 25,
		},
		spaceBetweenLaptop: {
			type: 'number',
			default: 25,
		},
		spaceBetweenDesktop: {
			type: 'number',
			default: 25,
		},
		spaceBetweenHugeDesktop: {
			type: 'number',
			default: 25,
		},
		jsonConfigs: {
			type: 'string',
		},
	},

	edit({ attributes, setAttributes }) {
		useEffect(() => { //eslint-disable-line react-hooks/rules-of-hooks
			setAttributes({ jsonConfigs: generateJson() });
		});

		useEffect(() => { //eslint-disable-line react-hooks/rules-of-hooks
			setAttributes({ dotsGeneratedStyles: generateDotsStyles() });
		});

		function generateJson() {
			const generateSlidesPerView = (value) => {
				return value === 'auto' ? `"auto"` : Number(value);
			};

			const breakpoints = {
				[attributes.breakpointMobile]: {
					slidesPerView: generateSlidesPerView(attributes.slidesOnTablet),
					spaceBetween: `${attributes.spaceBetweenTablet}px`,
					centeredSlides: attributes.centeredSlidesTablet
				},
				[attributes.breakpointTablet]: {
					slidesPerView: generateSlidesPerView(attributes.slidesOnLaptop),
					spaceBetween: `${attributes.spaceBetweenLaptop}px`,
					centeredSlides: attributes.centeredSlidesLaptop
				},
				[attributes.breakpointLaptop]: {
					slidesPerView: generateSlidesPerView(attributes.slidesOnDesktop),
					spaceBetween: `${attributes.spaceBetweenDesktop}px`,
					centeredSlides: attributes.centeredSlidesDesktop
				},
				[attributes.breakpointDesktop]: {
					slidesPerView: generateSlidesPerView(attributes.slidesOnHugeDesktop),
					spaceBetween: `${attributes.spaceBetweenHugeDesktop}px`,
					centeredSlides: attributes.centeredSlidesHugeDesktop
				}
			};

			const breakpointsKeys = Object.keys(breakpoints);
			const breakpointsLength = breakpointsKeys.length;

			const breakpointsString = breakpointsKeys.map((key, index) => {
				const breakpoint = breakpoints[key];
				const breakpointString = JSON.stringify(breakpoint);

				if (index === breakpointsLength - 1) {
					return `"${key}": ${breakpointString}`;
				} else {
					return `"${key}": ${breakpointString},`;
				}
			}).join('\n');

			const json = `{
				${attributes.hasAutoscroll ? `"autoplay": {"delay": ${attributes.autoscrollDuration}},` : ''}
				"slidesPerView": ${generateSlidesPerView(attributes.slidesOnMobile)},
				"spaceBetween": "${attributes.spaceBetweenMobile}px",
				"centeredSlides": ${attributes.centeredSlidesMobile},
				"breakpoints": {
					${breakpointsString}
				}
			}`;

			return json;
		}


		function generateDotsStyles() {
			return `
			  /* Aplicando variáveis CSS para facilidade de modificação */
			  :root {
				--swiper-pagination-bullet-horizontal-gap: ${attributes.dotsStyles.gap};
				--swiper-pagination-bullet-width: ${attributes.dotsStyles.width};
				--swiper-pagination-bullet-height: ${attributes.dotsStyles.height};
				--swiper-pagination-bullet-border-radius: ${attributes.dotsStyles.borderRadius};
				--swiper-pagination-color: ${attributes.dotsStyles.colorActive};
				--swiper-pagination-bullet-inactive-color: ${attributes.dotsStyles.colorInactive};
				--swiper-pagination-bullet-opacity: ${attributes.dotsStyles.opacityActive};
				--swiper-pagination-bullet-inactive-opacity: ${attributes.dotsStyles.opacityInactive};
			  }
			  
			  /* Aplicando estilos diretamente com !important e seletores mais específicos */
			  .slider .swiper-pagination-bullet {
				margin: 0 var(--swiper-pagination-bullet-horizontal-gap) !important;
				width: var(--swiper-pagination-bullet-width) !important;
				height: var(--swiper-pagination-bullet-height) !important;
				border-radius: var(--swiper-pagination-bullet-border-radius) !important;
				background-color: var(--swiper-pagination-bullet-inactive-color) !important;
				opacity: var(--swiper-pagination-bullet-inactive-opacity) !important;
			  }
		
			  .slider .swiper-pagination-bullet.swiper-pagination-bullet-active {
				background-color: var(--swiper-pagination-color) !important;
				opacity: var(--swiper-pagination-bullet-opacity) !important;
			  }
			`;
		}	


		function setObjectAttribute(obj, objName, property, value) {
			const newObj = structuredClone(obj);
			newObj[property] = value;
			setAttributes({ [objName]: newObj });
		}

		function setDotsObject(property, value) {
			return setObjectAttribute(attributes.dotsStyles, 'dotsStyles', property, value);
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Common Settings')}
						initialOpen={true}
					>
						<ToggleControl
							label={__('Autoscroll')}
							checked={attributes.hasAutoscroll}
							onChange={(value) => setAttributes({ hasAutoscroll: value })}
						/>
						{(attributes.hasAutoscroll) && (
							<>
								<__experimentalNumberControl
									label={__('Duration of autoscroll in miliseconds')}
									isShiftStepEnabled={true}
									onChange={(value) => setAttributes({ autoscrollDuration: value })}
									shiftStep={100}
									step={100}
									min={100}
									value={attributes.autoscrollDuration}
								/>
							</>
						)}
						<ToggleControl
							label={__('Arrows')}
							checked={attributes.hasArrows}
							onChange={(value) => setAttributes({ hasArrows: value })}
						/>
						{(attributes.hasArrows) && (
							<>
								<TextareaControl
									label={__('Left arrow SVG code')}
									value={attributes.prevArrowString}
									onChange={(value) => setAttributes({ prevArrowString: value })}
								/>
								<TextareaControl
									label={__('Right arrow SVG code')}
									value={attributes.nextArrowString}
									onChange={(value) => setAttributes({ nextArrowString: value })}
								/>
							</>
						)}
						<ToggleControl
							label={__('Dots')}
							checked={attributes.hasDots}
							onChange={(value) => setAttributes({ hasDots: value })}
						/>
						{(attributes.hasDots) && (
							<>
								<TextControl
									label={__('Dot gap')}
									value={attributes.dotsStyles.gap}
									onChange={(value) => setDotsObject('gap', value)}
								/>
								<TextControl
									label={__('Dot width')}
									value={attributes.dotsStyles.width}
									onChange={(value) => setDotsObject('width', value)}
								/>
								<TextControl
									label={__('Dot height')}
									value={attributes.dotsStyles.height}
									onChange={(value) => setDotsObject('height', value)}
								/>
								<TextControl
									label={__('Dot border radius')}
									value={attributes.dotsStyles.borderRadius}
									onChange={(value) => setDotsObject('borderRadius', value)}
								/>
								<p>
									ACTIVE DOT COLOR
								</p>
								<ColorPalette
									value={attributes.dotsStyles.colorActive}
									onChange={(value) => setDotsObject('colorActive', value)}
								/>
								<p>
									INACTIVE DOT COLOR
								</p>
								<ColorPalette
									value={attributes.dotsStyles.colorInactive}
									onChange={(value) => setDotsObject('colorInactive', value)}
								/>
								<RangeControl
									label={__('Active dot opacity')}
									value={attributes.dotsStyles.opacityActive}
									onChange={(value) => setDotsObject('opacityActive', value)}
									step={0.1}
									min={0}
									max={1}
								/>
								<RangeControl
									label={__('Inactive dot opacity')}
									value={attributes.dotsStyles.opacityInactive}
									onChange={(value) => setDotsObject('opacityInactive', value)}
									step={0.1}
									min={0}
									max={1}
								/>
							</>
						)}
						<ToggleControl
							label={__('Center Slides')}
							checked={attributes.centeredSlides}
							onChange={(value) => setAttributes({ centeredSlides: value })}
						/>
					</PanelBody>
					<SlidesAndResponsive attributes={attributes} setAttributes={setAttributes} sizename={'Mobile'} />

					<SlidesAndResponsive attributes={attributes} setAttributes={setAttributes} sizename={'Tablet'} />

					<SlidesAndResponsive attributes={attributes} setAttributes={setAttributes} sizename={'Laptop'} />

					<SlidesAndResponsive attributes={attributes} setAttributes={setAttributes} sizename={'Desktop'} />

					<SlidesAndResponsive attributes={attributes} setAttributes={setAttributes} sizename={'HugeDesktop'} />

				</InspectorControls>
				<div className={'slider'} >
					<InnerBlocks allowedBlocks={['frn-seara-internacional/slide']}
						template={[
							['frn-seara-internacional/slide', {}],
							['frn-seara-internacional/slide', {}],
							['frn-seara-internacional/slide', {}],
							['frn-seara-internacional/slide', {}],
						]}
					/>
					{(attributes.hasArrows) && (
						<>
							<div
								className="swiper-prev"
								dangerouslySetInnerHTML={{ __html: attributes.prevArrowString }}
							/>
							<div
								className="swiper-next"
								dangerouslySetInnerHTML={{ __html: attributes.nextArrowString }}
							/>
						</>
					)}

					{(attributes.hasDots) && (
						<>
							<style>{attributes.dotsGeneratedStyles}</style>
							<div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
								<span className="swiper-pagination-bullet" />
								<span className="swiper-pagination-bullet swiper-pagination-bullet-active" />
								<span className="swiper-pagination-bullet" />
							</div>
						</>
					)}

				</div>
			</>
		);
	},

	save({ attributes }) {
		return (
			<div className="slider swiper-container" data-config={attributes.jsonConfigs}>
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				{(attributes.hasArrows) && (
					<>
						<div
							className="swiper-prev"
							dangerouslySetInnerHTML={{ __html: attributes.prevArrowString }}
						></div>
						<div
							className="swiper-next"
							dangerouslySetInnerHTML={{ __html: attributes.nextArrowString }}
						></div>
					</>
				)}
				{(attributes.hasDots) && (
					<>
						<style>{attributes.dotsGeneratedStyles}</style>
						<div className="swiper-pagination" />
					</>
				)}
			</div>
		);
	},
});
