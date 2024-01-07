import * as React from "react"


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className="bg-zinc-100 hover:border-violet-300 font-mono  border-violet-500  border-[1px] p-3 rounded-md text-sm "
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
