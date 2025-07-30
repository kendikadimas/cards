// Terima 'data' sebagai prop
export function CashlessSection({ data }) {
  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24 px-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {data.description}
          </p>
        </div>

        {/* Card Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gunakan data.cards untuk me-render list */}
          {data.cards.map((card, index) => (
            <div key={index} className="bg-white border-3 border-primary p-6 rounded-2xl text-center">
              <img 
                src={card.imageSrc} 
                alt={card.title} 
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
