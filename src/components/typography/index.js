export const Heading = (props) => {
    const { className, children } = props;
    return (
        <h1 className={className}>{children}</h1>
    )
}

export const SubHeading = (props) => {
    const { className, children } = props;
    return (
        <h2 className={className}>{children}</h2>
    )
}

export const Paragraph = (props) => {
    const { className, children } = props;
    return (
        <p className={className}>{children}</p>
    )
}