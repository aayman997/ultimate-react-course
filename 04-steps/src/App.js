import {useState} from "react";

const messages = [
	"Learn React ⚛️",
	"Apply for jobs 💼",
	"Invest your new income 🤑"
];
const App = () => {


	return (
		<div>
			<Step />
			<StepMessage curStep={1}>
				<p>Pass in content</p>
				<p>✌️</p>
			</StepMessage>
			<StepMessage curStep={2}>
				<p>Read children prop</p>
				<p>😎</p>
			</StepMessage>
		</div>
	);
};
const Step = () => {
	const [curStep, setCurStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	const prevStep = () => {
		if (curStep > 1) {
			setCurStep(s => s - 1);
		}
	};

	const nextStep = () => {
		if (curStep < 3) {
			setCurStep(s => s + 1);
		}
	};
	return (
		<>
			<button className="close" onClick={() => setIsOpen(is => !is)}>&times;</button>
			{isOpen && (
				<div className="steps">
					<div className="numbers">
						<div className={curStep >= 1 ? "active" : ""}>1</div>
						<div className={curStep >= 2 ? "active" : ""}>2</div>
						<div className={curStep >= 3 ? "active" : ""}>3</div>
					</div>
					<StepMessage curStep={curStep}>
						{messages[curStep - 1]}
						<div className="buttons">
							<Button bgColor="#e7e7e7" textColor="#333" onClick={() => alert(`Learn how to ${messages[curStep - 1]}`)}>Learn how</Button>
						</div>
					</StepMessage>
					<div className="buttons">
						<Button onClick={prevStep} disabled={curStep <= 1} textColor="#fff" bgColor="#7950F2">👈 Previous </Button>
						<Button onClick={nextStep} disabled={curStep >= 3} textColor="#fff" bgColor="#7950F2">Next 👉</Button>
					</div>
				</div>
			)}
		</>
	);
};
const StepMessage = ({curStep, children}) => {
	return (
		<div className="message">
			<h3>Step {curStep}</h3>
			{children}
		</div>
	);
};
const Button = ({textColor, bgColor, onClick, disabled, children}) => {
	return (
		<button onClick={onClick} disabled={disabled} style={{backgroundColor: bgColor, color: textColor}}>
			{children}
		</button>
	);
};

export default App;
