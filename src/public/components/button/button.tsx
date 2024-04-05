import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
    text: string,
    handleClick: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
    const { text, handleClick } = props;
    return (
        <MuiButton variant="contained" onClick={handleClick}>{text}</MuiButton>
    );
}

export default Button;
