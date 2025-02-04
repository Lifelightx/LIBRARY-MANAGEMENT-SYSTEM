import React from 'react'

function BookList({title, books}) {
    return (
        <div className="bg-white p-4 rounded-xl border-b border-gray-200 mb-6">
            <h2 className="text-xl text-slate-700 font-[Montserrat] font-bold mb-3">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {books.map((book, index) => (
                    <div
                        key={index}
                        className="p-3 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <img
                            src={book.image}
                            alt={book.title}
                            className="object-cover border-1 border-gray-100 mx-auto rounded-md mb-2"
                            style={{ width: 160, height: 240 }}
                        />
                        <h3 className="text-md font-semibold">{book.title}</h3>
                        <p className="text-sm text-[#006D77]">by {book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookList
