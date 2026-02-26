/* eslint-disable react/prop-types */
export default function Modal({ children, open, setOpen }) {
	return (
		open && (
			<div className="w-screen h-screen fixed top-0 left-0 z-[9999] grid place-items-center">
				<div
					onClick={() => setOpen(false)}
					className="w-full h-full bg-black/30 backdrop-blur-sm absolute top-0 left-0"
					title="Close Modal"
				></div>
				<div className="z-[9999] resize-model min-h-fit hide-scroll">
					{children}
				</div>
			</div>
		)
	);
}
