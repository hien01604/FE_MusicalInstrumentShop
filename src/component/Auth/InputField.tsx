import type { InputHTMLAttributes } from 'react';

type Props = {
    label: string;
    required?: boolean;
    error?: string;
    hint?: string;
    containerClass?: string;
    inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ label, required, error, hint, containerClass,
    inputClassName, ...rest }: Props) {
    const isDateEmpty = rest.type === 'date' && !rest.value;
    return (
        <div className={`space-y-1 ${containerClass ?? ''}`}>
            <label className='block text-sm font-medium text-slate-700'>
                {label}
                {required && <span className='text-red-500'>*</span>}
            </label>
            <input
                {...rest}
                className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2
        text-sm outline-none focus:ring-2 focus:ring-orange-200
        disabled:bg-slate-100 disabled:text-slate-500 
        
        /* THÊM LOGIC MÀU CHỮ */
        ${isDateEmpty ? 'text-slate-400' : 'text-slate-700'} 
        
        ${inputClassName ?? ''}`}
            />
            {error ? (
                <p className="text-xs text-red-600">{error}</p>
            ) : hint ? (
                <p className="text-xs text-slate-400">{hint}</p>
            ) : null}
        </div>
    )
}