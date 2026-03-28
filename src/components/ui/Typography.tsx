import type {ReactNode} from "react";

type TypographyProps = {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    className?: string;
    children: ReactNode;
}

export const Typography = ({ variant: Tag = "p", className, children }: TypographyProps) => {
    return <Tag className={className}>{children}</Tag>
}