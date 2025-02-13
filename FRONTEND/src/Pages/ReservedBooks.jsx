import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context";

function ReservedBooks() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {token, url} = useContext(StoreContext);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
         // If using JWT authentication
        const response = await axios.get(`${url}/api/users/reserved-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (err) {
        setError("Failed to fetch reserved books.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reserved Books</h2>

      {loading && <p>Loading reserved books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {reservations.length === 0 && !loading ? (
        <p>No reserved books found.</p>
      ) : (
        <ul className="space-y-2">
          {reservations.map((reservation) => (
            <li key={reservation._id} className="p-3 border rounded-md shadow-sm">
              <strong>{reservation.book?.title}</strong> by {reservation.book?.author} <br />
              <span>Reservation Date: {new Date(reservation.reservationDate).toLocaleDateString()}</span> <br />
              <span>Expiry Date: {new Date(reservation.expiryDate).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReservedBooks;
