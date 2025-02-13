import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context";

function ReservedBooks() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, url } = useContext(StoreContext);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${url}/api/users/reserved-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch reserved books. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token, url]);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${url}/api/users/reserved-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
        setError(null);
      } catch (err) {
        console.error('Retry fetch error:', err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch reserved books. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-lg text-gray-600">
            Loading reserved books...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <button
                onClick={retryFetch}
                className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ReservationCard = ({ reservation }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col space-y-2">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{reservation.book?.title}</h3>
          <p className="text-sm text-gray-500">by {reservation.book?.author}</p>
        </div>
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Reserved:</span>
            <span className="text-gray-900">
              {new Date(reservation.reservationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expires:</span>
            <span className="text-gray-900">
              {new Date(reservation.expiryDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full
            ${reservation.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
              reservation.status === 'EXPIRED' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'}`}>
            {reservation.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Reserved Books</h2>
        </div>

        {reservations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reserved books</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't reserved any books yet.</p>
          </div>
        ) : (
          <>
            {/* Desktop view */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reservation Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {reservation.book?.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            by {reservation.book?.author}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reservation.reservationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reservation.expiryDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${reservation.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                            reservation.status === 'EXPIRED' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {reservation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="sm:hidden">
              <div className="space-y-4 p-4">
                {reservations.map((reservation) => (
                  <ReservationCard key={reservation._id} reservation={reservation} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReservedBooks;