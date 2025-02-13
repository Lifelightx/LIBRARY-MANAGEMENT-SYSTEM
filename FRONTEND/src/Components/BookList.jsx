import React from 'react'

function BookList({title, books}) {
    return (
        <div className="bg-white p-4 rounded-xl border-b border-gray-200 mb-6">
            <h2 className="text-lg md:text-xl text-slate-700 font-[Montserrat] font-bold mb-3">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                {books.map((book, index) => (
                    <div
                        key={index}
                        className="p-2 md:p-3 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-auto object-cover border-1 border-gray-100 mx-auto rounded-md mb-2"
                            style={{ 
                                maxWidth: '160px', 
                                aspectRatio: '2/3',
                                height: 'auto',
                                width: '100%'
                            }}
                        />
                        <h3 className="text-sm md:text-md font-semibold line-clamp-2">{book.title}</h3>
                        <p className="text-xs md:text-sm text-[#006D77] line-clamp-1">by {book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookList