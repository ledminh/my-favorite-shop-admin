type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  classNames?: string;
};

const Button = ({ children, onClick, classNames }: Props) => (
  <button
    className={`p-4 font-bold border-2 rounded-lg border-blue-950 text-blue-950 hover:bg-blue-950/10 hover:shadow-stone-800 hover:shadow-md active:bg-blue-950/20 ${classNames}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
