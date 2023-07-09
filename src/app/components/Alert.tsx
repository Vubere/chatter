"use client";

export type alertType = 'success' | 'error' | 'warning' | 'info' | ''
type AlertProps = {
  type: alertType,
  message: string,
  close: () => any
}


export default function Alert({ type, message, close }: AlertProps) {

  const errorClasses = 'text-[#f00] font-[700]'
  const successClasses = 'text-[#0f0] font-[700]'
  const warningClasses = 'text-[#ff0] font-[700]'
  const infoClasses = 'text-[#00f] font-[700]'

  const classes = type === 'success' ? successClasses : type === 'error' ? errorClasses : type === 'warning' ? warningClasses : infoClasses

  return (
    <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[80%] max-w-[500px] h-[300px] p-4 gap-4 bg-white shadow rounded-[10px] flex flex-col items-center" role="alert">
      <div className="flex justify-end w-full">
        <span onClick={close || undefined} className="text-[#f00] font-[700] text-[22px]">
          x
        </span>
      </div>
      <h3 className={"font-bold text-[28px] uppercase w-full text-center "+classes}>{type.toUpperCase()}</h3>
      <p className={"text-center p-2 text-[18px] leading-[20px] w-[80%] "}>{message}</p>
    </div>
  )
}