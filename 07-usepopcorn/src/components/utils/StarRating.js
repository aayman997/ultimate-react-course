import PropTypes from "prop-types";
import {useState} from "react";

const containerStyle = {
	display   : "flex",
	alignItems: "center",
	gap       : "16px"
};
const startContainerStyle = {
	display: "flex",
	gap    : "4px"
};

const StarRating = ({
	                    maxRating = 5,
	                    color = "#FCC419",
	                    size = 48,
	                    borderColor = color,
	                    className = "",
	                    messages = [],
	                    defaultRating = 0,
	                    onSetRating
                    }) => {
	const [rating, setRating] = useState(defaultRating);
	const [tempRating, setTempRating] = useState(0);

	const textStyle = {
		lineHeight: "1",
		margin    : "0",
		color,
		fontSize  : `${size / 1.5}px`
	};

	return (
		<div style={containerStyle} className={className}>
			<div style={startContainerStyle}>
				{Array.from({length: maxRating}, (_, i) => (
					<Star
						key={i} index={i}
						full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						half={tempRating
						      ? ((tempRating === 0.5 && i === 0) ? true : (i !== 0 && tempRating !== 0.5) ? tempRating % i === 0.5 : false)
						      : ((rating === 0.5 && i === 0) ? true : (i !== 0 && rating !== 0.5) ? rating % i === 0.5 : false)}
						onRate={setRating}
						onHoverIn={setTempRating}
						onHoverOut={() => setTempRating(0)}
						color={color}
						size={size}
						borderColor={borderColor}
						onSetRating={onSetRating}
					/>
				))}
			</div>
			<div style={textStyle}>{
				messages.length === maxRating
				? messages[tempRating ? Math.round(tempRating - 1) : rating - 1]
				: tempRating || rating || ""}</div>
		</div>
	);
};

StarRating.propTypes = {
	maxRating    : PropTypes.number,
	defaultRating: PropTypes.number,
	color        : PropTypes.string,
	size         : PropTypes.number,
	messages     : PropTypes.array,
	className    : PropTypes.string,
	onSetRating  : PropTypes.func.isRequired,
	borderColor  : PropTypes.string
};
export default StarRating;

const Star = ({index, onRate, full, half, onHoverIn, onHoverOut, size, color, borderColor, onSetRating}) => {
	const starStyle = {
		width  : `${size}px`,
		height : `${size}px`,
		display: "block",
		cursor : "pointer"
	};
	const handleRating = (e, temp = false) => {
		const rect = e.target.getBoundingClientRect();
		const pixelsFromLeft = e.clientX - rect.left;
		const pixelsFromRight = rect.right - e.clientX;
		const halfStar = pixelsFromRight > pixelsFromLeft;

		if (temp) {
			return onHoverIn(halfStar ? index + 0.5 : index + 1);
		}
		onRate(halfStar ? index + 0.5 : index + 1);
		if (onSetRating) {
			onSetRating(halfStar ? index + 0.5 : index + 1);
		}
	};
	return (
		<span
			role="button" style={starStyle}
			onClick={(e) => handleRating(e)}
			onMouseMove={(e) => handleRating(e, true)}
			onMouseLeave={onHoverOut}
		>
            {full
             ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
	             <g transform="translate(-1021.982 -806.071)">
		             <path
			             d="M-1962.1,17.233l-3.976-2.888a1,1,0,0,0-1.176,0l-3.975,2.888a1,1,0,0,1-1.538-1.118l1.518-4.674a1,1,0,0,0-.364-1.118l-3.976-2.888a1,1,0,0,1,.589-1.81h4.914a1,1,0,0,0,.95-.69l1.519-4.674a1,1,0,0,1,1.9,0l1.518,4.674a1,1,0,0,0,.95.69h4.915a1,1,0,0,1,.588,1.81l-3.975,2.888a1,1,0,0,0-.364,1.118l1.518,4.674a1,1,0,0,1-.953,1.314A.984.984,0,0,1-1962.1,17.233Z"
			             transform="translate(2998 807)"
		             />
		             <path
			             d="M11.049,2.927a1,1,0,0,1,1.9,0L14.47,7.6a1,1,0,0,0,.95.69h4.915a1,1,0,0,1,.588,1.81l-3.976,2.888a1,1,0,0,0-.363,1.118L18.1,18.781A1,1,0,0,1,16.564,19.9l-3.976-2.888a1,1,0,0,0-1.176,0L7.436,19.9A1,1,0,0,1,5.9,18.781l1.518-4.674a1,1,0,0,0-.363-1.118L3.077,10.1a1,1,0,0,1,.588-1.81H8.579A1,1,0,0,0,9.53,7.6l1.519-4.674Z"
			             transform="translate(1019.837 804.334)" fill={color} stroke={borderColor} strokeWidth="1"
		             />
	             </g>
             </svg>
             :
             half
             ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
	             <g transform="translate(-1021.982 -806.071)">
		             <path
			             d="M-1972.765,16.115l1.518-4.674a1,1,0,0,0-.364-1.118l-3.976-2.888a1,1,0,0,1,.589-1.81h4.914a1,1,0,0,0,.95-.69l1.519-4.674a.986.986,0,0,1,1.014-.689V14.156a1,1,0,0,0-.652.189l-3.975,2.888a.984.984,0,0,1-.584.2A1,1,0,0,1-1972.765,16.115Z"
			             transform="translate(2998 807)" fill={color}
		             />
		             <path
			             d="M11.049,2.927a1,1,0,0,1,1.9,0L14.47,7.6a1,1,0,0,0,.95.69h4.915a1,1,0,0,1,.588,1.81l-3.976,2.888a1,1,0,0,0-.363,1.118L18.1,18.781A1,1,0,0,1,16.564,19.9l-3.976-2.888a1,1,0,0,0-1.176,0L7.436,19.9A1,1,0,0,1,5.9,18.781l1.518-4.674a1,1,0,0,0-.363-1.118L3.077,10.1a1,1,0,0,1,.588-1.81H8.579A1,1,0,0,0,9.53,7.6l1.519-4.674Z"
			             transform="translate(1019.837 804.334)" fill="none" stroke={borderColor} strokeWidth="1"
		             />
	             </g>
             </svg>
             : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
	             <g transform="translate(-1021.982 -806.071)">
		             <path
			             d="M11.049,2.927a1,1,0,0,1,1.9,0L14.47,7.6a1,1,0,0,0,.95.69h4.915a1,1,0,0,1,.588,1.81l-3.976,2.888a1,1,0,0,0-.363,1.118L18.1,18.781A1,1,0,0,1,16.564,19.9l-3.976-2.888a1,1,0,0,0-1.176,0L7.436,19.9A1,1,0,0,1,5.9,18.781l1.518-4.674a1,1,0,0,0-.363-1.118L3.077,10.1a1,1,0,0,1,.588-1.81H8.579A1,1,0,0,0,9.53,7.6l1.519-4.674Z"
			             transform="translate(1019.837 804.334)" fill="none" stroke={borderColor} strokeWidth="1"
		             />
	             </g>
             </svg>
            }
        </span>
	);
};
