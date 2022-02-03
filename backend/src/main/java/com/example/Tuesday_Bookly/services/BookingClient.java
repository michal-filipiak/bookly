package com.example.Tuesday_Bookly.services;
import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import com.example.Tuesday_Bookly.models.bookings.BookingCrudModel;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BookingClient
{
    BookingDTO addBooking(BookingCrudModel booking, String token);
    BookingDTO updateBooking(long id, BookingDTO booking);
    boolean deleteBooking(long id);

    Page<BookingDTO> getBookings(Optional<Integer> typeFilter, Optional<String> loginFilter, String order, int pageNum, int pageSize);
    List<BookingDTO> getBookingsForUser(String token);
    Optional<BookingDTO> getBooking(long id);
}
