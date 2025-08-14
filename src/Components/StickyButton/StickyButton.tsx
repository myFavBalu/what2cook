import React, {ReactElement, ReactNode} from "react";
import s from "./StickyButton.module.scss";
import clsx from "clsx";

export type StickyButtonProps = {
    className?: string,
    children: ReactNode,
    onClick: () => void
}

export function StickyButton({className, children, onClick}: StickyButtonProps): ReactElement {
    return <button className={clsx(s.StickyButton, className)} onClick={onClick}>{children}</button>
}
