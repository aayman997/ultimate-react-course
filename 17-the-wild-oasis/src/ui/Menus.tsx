import styled from "styled-components";
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";
import SpinnerMini from "./SpinnerMini.tsx";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
type PositionType = {
	x: number;
	y: number
}

interface StyledListProps {
	$position: PositionType;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface createContextProps {
	openId: string;
	close: () => void;
	open: Dispatch<SetStateAction<string>>;
	position: PositionType | null;
	setPosition: Dispatch<SetStateAction<PositionType | null>>;
}

const MenusContext = createContext<createContextProps>({} as createContextProps);

interface MenusType {
	children: ReactNode;
}

const Menus = ({ children }: MenusType) => {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState<PositionType | null>(null);
	const close = () => setOpenId("");
	const open = setOpenId;
	return (
		<MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
			{children}
		</MenusContext.Provider>
	);
};

interface ToggleProps {
	id: number;
}

const Toggle = ({ id }: ToggleProps) => {
	const { openId, close, open, setPosition } = useContext(MenusContext);
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const rect = (e.target as HTMLButtonElement).closest("button")?.getBoundingClientRect();
		if (!rect) {
			return;
		}
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height
		});
		openId === "" || openId !== id.toString() ? open(id.toString()) : close();
	};

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
};

interface ListProps {
	id: number;
	children: ReactNode;
}

const List = ({ id, children }: ListProps) => {
	const { openId, position, close } = useContext(MenusContext);
	const ref = useOutsideClick<HTMLUListElement>(close, false);

	if (openId !== id.toString()) {
		return;
	}
	return (
		createPortal(
			<StyledList $position={position as PositionType} ref={ref}>{children}</StyledList>,
			document.body
		)
	);
};

interface ButtonProps {
	children: ReactNode;
	icon: ReactNode | string;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
}

const Button = ({ children, icon, onClick, disabled, isLoading }: ButtonProps) => {
	const { close } = useContext(MenusContext);
	const handleClick = () => {
		onClick?.();
		close();
	};
	return (
		<li>
			<StyledButton onClick={handleClick} disabled={disabled}>
				{
					isLoading
					? <SpinnerMini />
					: <>
						{icon}
						<span>{children}</span>
					</>
				}
			</StyledButton>
		</li>
	);
};


Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
