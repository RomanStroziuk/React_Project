import { Link, useMatch } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
    const match = useMatch(to);
    console.log("CustomLink rendered:", { match }); // Додайте цей лог

    return (
        <Link
            to={to}
            style={{
                color: match ? 'var(--color-active)' : 'white',
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export  { CustomLink };
