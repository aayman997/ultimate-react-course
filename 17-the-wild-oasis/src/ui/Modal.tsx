import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { cloneElement, createContext, useContext, useState, ReactNode, ReactElement, useMemo } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface BasePropsType {
	children: ReactNode;
}

interface ModalOpenPropsType extends BasePropsType {
	opens: string;
}

interface ModalWindowPropsType extends BasePropsType {
	name: string;
}

type ModalContextType = {
	openName?: string;
	close?: () => void;
	open?: (name: string) => void;
};

const ModalContext = createContext<ModalContextType | object>({});


const Modal = ({ children }: BasePropsType) => {
	const [openName, setOpenName] = useState<string>("");
	const close = () => setOpenName("");
	const open = setOpenName;

	const value = useMemo(() => {
		return {
			openName, close, open
		};
	}, [open, openName]);

	return (
		<ModalContext.Provider value={value}>
			{children}
		</ModalContext.Provider>
	);
};

const Open = ({ children, opens: opensWindowName }: ModalOpenPropsType) => {
	const { open } = useContext<ModalContextType>(ModalContext);

	return cloneElement(children as ReactElement, { onClick: () => open?.(opensWindowName) });
};

const Window = ({ children, name }: ModalWindowPropsType) => {
	const { openName, close } = useContext<ModalContextType>(ModalContext);
	const ref = useOutsideClick<HTMLDivElement>(close);
	if (name !== openName) {
		return null;
	}

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children as ReactElement, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body,
		"Modal"
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
