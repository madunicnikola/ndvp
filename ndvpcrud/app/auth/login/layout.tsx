import './globals.css';

const Auth = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full flex items-center justify-center bg-backgroundColor">
            {children}
        </div>
    );
}
export default Auth;