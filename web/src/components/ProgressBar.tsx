interface ProgressBarProps {
  progress: number
}

export function ProgressBar({progress}: ProgressBarProps): JSX.Element {  
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div 
        aria-label="Progresso de hábitos completados nesse dia" 
        aria-valuenow={progress} 
        role="progressbar" 
        className="h-3 rounded-xl bg-violet-600"
        style={{
          width: `${progress}%`
        }} 
      />
    </div>
  )
}