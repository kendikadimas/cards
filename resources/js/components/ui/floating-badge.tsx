function FloatingBadge({ icon: Icon, text, bgColor }: { icon: any, text: string, bgColor: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/70 shadow-md rounded-lg px-3 py-2">
      <div className={`p-2 ${bgColor} rounded-md flex items-center justify-center`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <span className="text-sm text-gray-800">
        {text}
      </span>
    </div>
  )
}

export default FloatingBadge