/**
 * This is a layout wrapper component.
 */
import type { ReactNode } from "react";
import { Container } from "react-bootstrap";

type Props = {
    title: string; // The page heading
    children: ReactNode; // This is page content
    right?: ReactNode; // Optional content that appears aligned to the right of the title
};

export default function PageContainer ({ title, children, right }: Props){
    return (
        <Container className = "py-4">
            <div className = "d-flex align-items-center jutify-content-between gap-3 flex-wrap">
                <h1 className="h3 m-0">{title}</h1>
                {right}
            </div>
            <div className="mt-3">{children}</div>
        </Container>
    )
}