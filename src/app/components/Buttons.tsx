

interface buttonProps { children: any, className?: string, onClick?: React.MouseEventHandler<HTMLButtonElement>; type?: 'submit' | 'button' ; disabled?: boolean}

function BlueButton({ children, className = '', onClick, type= 'button', disabled=false }: buttonProps) {

  const buttonClass = "w-[157px] h-[56px] rounded-[8px] text-white text-center bg-[#543ee0] " + className

  return (
    <button onClick={onClick} className={buttonClass} type={type} disabled={disabled}>
      {children}
    </button>
  )

}

function WhiteButton({ children, className = '', onClick, type='button', disabled=false }: buttonProps) {

  const buttonClass = "w-[157px] h-[56px] rounded-[8px] text-black text-center bg-[white] border border-black " + className

  return (
    <button onClick={onClick} className={buttonClass} type={type} disabled={disabled}>
      {children}
    </button>
  )

}


export { BlueButton, WhiteButton };