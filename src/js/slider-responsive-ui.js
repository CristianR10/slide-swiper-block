const { __ } = wp.i18n;
const { __experimentalNumberControl, ToggleControl, RangeControl, TextControl, PanelBody } = wp.components;

export default function SlidesAndResponsive(props) {
	const { attributes, setAttributes, sizename } = props;
	const centeredSlidesAttribute = `centeredSlides${sizename}`;
	const slidesOnAttribute = `slidesOn${sizename}`;

	const setResponsiveAttribute = (attribute, value) => {
		if (!isNaN(value)) {
			value = String(value)
		}
		setAttributes({ [attribute]: value })
	}

	return (
		<PanelBody
			title={`${sizename} settings`}
			initialOpen={false}
		>
			{!(sizename === 'HugeDesktop') && (
				<__experimentalNumberControl
					label={__('Breakpoint', 'rk')}
					isShiftStepEnabled={true}
					onChange={(value) => setAttributes({ [`breakpoint${sizename}`]: Number(value) })}
					shiftStep={1}
					step={1}
					min={0}
					value={attributes[`breakpoint${sizename}`]}
				/>
			)}
			<RangeControl
				label={__('Slides', 'rk')}
				value={attributes[`slidesOn${sizename}`]}
				onChange={(value) => setAttributes({ [`slidesOn${sizename}`]: Number(value) })}
				min={1}
				max={10}
			/>
			<TextControl
				label={__('Slides', 'rk')}
				value={attributes[slidesOnAttribute]}
				onChange={(value) => setResponsiveAttribute(slidesOnAttribute, value)}
				help={__('Enter a number or "auto"', 'rk')}
			/>
			<TextControl
				label={__('Space between slides in px', 'rk')}
				type="number"
				value={attributes[`spaceBetween${sizename}`]}
				onChange={(value) => setAttributes({ [`spaceBetween${sizename}`]: Number(value) })}
			/>
			<ToggleControl
				label={__('Center Slides', 'rk')}
				checked={attributes[centeredSlidesAttribute]}
				onChange={(value) => setAttributes({ [centeredSlidesAttribute]: value })}
			/>

		</PanelBody>
	);
}
